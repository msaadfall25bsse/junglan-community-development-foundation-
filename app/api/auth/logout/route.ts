import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { clearSessionCookie, getSession } from "@/lib/auth/cookies";
import { createAuditEntry } from "@/lib/services/audit.service";

// ==============================================================================
// POST /api/auth/logout
// ==============================================================================
// Section 87, 125 — Clears the HttpOnly session cookie and logs audit event.
// ==============================================================================

export async function POST(req: NextRequest) {
  try {
    // Get current session before clearing (for audit log)
    const session = await getSession();

    // Clear the HttpOnly session cookie
    await clearSessionCookie();

    // Log logout event if user was authenticated
    if (session?.sub) {
      await createAuditEntry(prisma, {
        action: "LOGOUT",
        module: "AUTH",
        recordId: session.sub,
        userId: session.sub,
        metadata: {
          email: session.email,
          ip:
            req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            "unknown",
        },
      });
    }

    return NextResponse.json({ success: true, message: "Logged out successfully." });
  } catch (error) {
    console.error("[/api/auth/logout] Error:", error);
    // Still clear cookie even if audit log fails
    await clearSessionCookie().catch(() => {});
    return NextResponse.json({ success: true, message: "Logged out." });
  }
}
