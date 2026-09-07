import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { LoginInputSchema } from "@/lib/validation/auth.schema";
import { normalizeEmail } from "@/lib/auth/email";
import { verifyPassword } from "@/lib/auth/password";
import { setSessionCookie } from "@/lib/auth/cookies";
import { getSafeRedirectUrl, getRoleDefaultRedirect } from "@/lib/auth/redirect";
import { isRateLimited, recordFailedAttempt, clearAttempts, getLockoutRemainingSeconds } from "@/lib/auth/rate-limiter";
import { createAuditEntry } from "@/lib/services/audit.service";

// ==============================================================================
// POST /api/auth/login
// ==============================================================================
// Sections 122, 123 — Verifies credentials, sets HttpOnly cookie, logs audit.
// User enumeration protection: always return the SAME generic error message.
// ==============================================================================

const GENERIC_ERROR = "Unable to sign in with the provided credentials.";

export async function POST(req: NextRequest) {
  try {
    // 1. Parse & validate request body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid request body." },
        { status: 400 }
      );
    }

    const parsed = LoginInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: GENERIC_ERROR },
        { status: 400 }
      );
    }

    const { email: rawEmail, password } = parsed.data;
    const email = normalizeEmail(rawEmail);

    // 2. Get client IP for rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // 3. Check rate limit
    if (isRateLimited(ip, email)) {
      const remaining = getLockoutRemainingSeconds(ip, email);
      return NextResponse.json(
        {
          success: false,
          error: `Too many failed attempts. Please try again in ${remaining} seconds.`,
        },
        { status: 429 }
      );
    }

    // 4. Lookup user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        passwordHash: true,
      },
    });

    // 5. Verify credentials — always run verifyPassword to prevent timing attacks
    const dummyHash = "$2a$12$dummy.hash.to.prevent.timing.attack.bypass.placeholder";
    const passwordMatches = await verifyPassword(
      password,
      user?.passwordHash ?? dummyHash
    );

    if (!user || !passwordMatches) {
      // Record failed attempt
      recordFailedAttempt(ip, email);

      // Log failed login attempt
      if (user) {
        await createAuditEntry(prisma, {
          action: "LOGIN",
          module: "AUTH",
          recordId: user.id,
          userId: user.id,
          metadata: { result: "FAILURE", reason: "INVALID_PASSWORD", ip },
        });
      }

      return NextResponse.json(
        { success: false, error: GENERIC_ERROR },
        { status: 401 }
      );
    }

    // 6. Check account is active
    if (!user.isActive) {
      recordFailedAttempt(ip, email);

      await createAuditEntry(prisma, {
        action: "LOGIN",
        module: "AUTH",
        recordId: user.id,
        userId: user.id,
        metadata: { result: "FAILURE", reason: "ACCOUNT_DISABLED", ip },
      });

      return NextResponse.json(
        { success: false, error: GENERIC_ERROR },
        { status: 401 }
      );
    }

    // 7. Clear rate limit on success
    clearAttempts(ip, email);

    // 8. Create session cookie
    await setSessionCookie({
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role as "ADMIN" | "DATA_ENTRY",
      isActive: user.isActive,
    });

    // 9. Update lastLoginAt
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // 10. Log successful login
    await createAuditEntry(prisma, {
      action: "LOGIN",
      module: "AUTH",
      recordId: user.id,
      userId: user.id,
      metadata: { result: "SUCCESS", ip },
    });

    // 11. Determine safe redirect URL
    const callbackUrl = req.nextUrl.searchParams.get("callbackUrl");
    const redirectTo =
      getSafeRedirectUrl(callbackUrl) ||
      getRoleDefaultRedirect(user.role as "ADMIN" | "DATA_ENTRY");

    // 12. Return safe user profile (NO passwordHash)
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      redirectTo,
    });
  } catch (error) {
    console.error("[/api/auth/login] Unexpected error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
