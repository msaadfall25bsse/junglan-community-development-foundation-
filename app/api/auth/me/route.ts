import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/server-auth";

// ==============================================================================
// GET /api/auth/me
// ==============================================================================
// Section 125 — Returns the current user's safe profile (no passwordHash).
// Used by client components to check auth state without exposing secrets.
// ==============================================================================

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Not authenticated." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        lastLoginAt: user.lastLoginAt,
      },
    });
  } catch (error) {
    console.error("[/api/auth/me] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
