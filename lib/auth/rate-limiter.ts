// ==============================================================================
// BRUTE FORCE & RATE LIMITER — In-Memory Sliding Window
// ==============================================================================
// Section 126, 127 — Limits failed login attempts per IP/Email combination.
// Max 5 failed attempts per 15-minute window before lockout.
//
// Note: This is an in-process memory store, suitable for single-instance
// deployments. For multi-instance Vercel deployments, replace with
// Upstash Redis or Vercel KV for distributed rate limiting.
// ==============================================================================

interface AttemptRecord {
  count: number;
  firstAttemptAt: number;
  lockedUntil?: number;
}

// In-memory store: key → attempt record
const attemptStore = new Map<string, AttemptRecord>();

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;  // 15 minutes
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minute lockout

/**
 * Build a rate limit key from IP and email.
 * Combines both to prevent per-IP bypass via email rotation
 * and per-email bypass via IP rotation.
 */
function buildKey(ip: string, email: string): string {
  return `login:${ip}:${email.toLowerCase().trim()}`;
}

/**
 * Check if the given IP + email combination is currently rate limited.
 * Returns true if locked out (should block the request).
 */
export function isRateLimited(ip: string, email: string): boolean {
  const key = buildKey(ip, email);
  const record = attemptStore.get(key);

  if (!record) return false;

  const now = Date.now();

  // Check if currently in lockout period
  if (record.lockedUntil && now < record.lockedUntil) {
    return true;
  }

  // Check if window has expired — reset if so
  if (now - record.firstAttemptAt > WINDOW_MS) {
    attemptStore.delete(key);
    return false;
  }

  return record.count >= MAX_ATTEMPTS;
}

/**
 * Record a failed login attempt for the given IP + email.
 * Increments the counter and applies lockout if limit exceeded.
 */
export function recordFailedAttempt(ip: string, email: string): void {
  const key = buildKey(ip, email);
  const now = Date.now();
  const record = attemptStore.get(key);

  if (!record || now - record.firstAttemptAt > WINDOW_MS) {
    // New window
    attemptStore.set(key, {
      count: 1,
      firstAttemptAt: now,
    });
    return;
  }

  const newCount = record.count + 1;

  attemptStore.set(key, {
    ...record,
    count: newCount,
    lockedUntil: newCount >= MAX_ATTEMPTS ? now + LOCKOUT_MS : record.lockedUntil,
  });
}

/**
 * Clear the rate limit record on successful login.
 * Always call this after a successful login to reset the counter.
 */
export function clearAttempts(ip: string, email: string): void {
  const key = buildKey(ip, email);
  attemptStore.delete(key);
}

/**
 * Get remaining lockout time in seconds (for error messages).
 * Returns 0 if not locked out.
 */
export function getLockoutRemainingSeconds(ip: string, email: string): number {
  const key = buildKey(ip, email);
  const record = attemptStore.get(key);

  if (!record?.lockedUntil) return 0;

  const remaining = record.lockedUntil - Date.now();
  return remaining > 0 ? Math.ceil(remaining / 1000) : 0;
}
