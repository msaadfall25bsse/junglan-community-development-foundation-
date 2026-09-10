# Authentication & Authorization Security Architecture

**Project:** Junglan Community Development Foundation  
**Version:** 1.0 (Production Grade)  
**Specification:** PART 5 — AUTHENTICATION + AUTHORIZATION + SECURE ADMIN & DATA ENTRY ACCESS  

---

## 1. Executive Summary & Philosophy

This document details the identity, authentication, authorization, and secure session management architecture implemented for the **Junglan Community Development Foundation** platform. 

Security has been engineered **from the server-side first** (Section 1). Client-side UI elements, navigation visibility, and conditional component rendering are treated strictly as user-experience conveniences, never as security boundaries. Every operational boundary is enforced by Edge middleware, server-side authorization helpers, and database lookups.

---

## 2. Authentication Architecture

### 2.1 Technology Selection (Section 5)
* **Session Engine**: Stateless, compact, signed JSON Web Tokens (JWT) powered by **`jose`** (Web Crypto API standard, fully Edge and Node.js compatible).
* **Password Hashing**: **`bcryptjs`** with a cost factor of 12 salt rounds, timing-safe password comparison, and dummy hash fallbacks to eliminate timing attacks.
* **Validation**: Strict server-side Zod v4 schemas (`lib/validation/auth.schema.ts`).
* **Source of Truth**: PostgreSQL via **Prisma ORM**, backed by resilient local persistence (`lib/db/persistent-store.ts`).

### 2.2 Password Security & Policy (Sections 10, 11, 49, 78)
1. **Password Policy**:
   * Minimum 8 characters
   * At least 1 uppercase letter (`A-Z`)
   * At least 1 lowercase letter (`a-z`)
   * At least 1 numeric digit (`0-9`)
2. **Storage & Exposure Protections**:
   * Passwords and hashes are **NEVER** stored in plaintext, `localStorage`, `sessionStorage`, or query parameters.
   * `passwordHash` is excluded from all API responses, client payloads, and audit logs.
   * A dummy hash is evaluated whenever a user is not found, ensuring uniform response times to defeat timing side-channel attacks.

### 2.3 Email Normalization & Uniqueness (Sections 57, 58)
* All emails are normalized using `email.toLowerCase().trim()` before database querying or insertion (`lib/auth/email.ts`).
* The database schema enforces a strict `UNIQUE` index on `User.email`.

---

## 3. Session Management & Cookie Lifecycle

### 3.1 Token Lifecycle & Payload Minimization (Sections 12, 13, 38, 59)
To prevent sensitive data leakage and comply with Section 59, session payloads are strictly minimized:

```typescript
interface SessionPayload {
  sub: string;       // User UUID
  email: string;     // Normalized user email
  name: string;      // Display name
  role: "ADMIN" | "DATA_ENTRY";
  isActive: boolean; // Account status
  jti: string;       // Unique crypto UUID per session (fixation defense)
  iat: number;       // Issued at timestamp
  exp: number;       // Expiration timestamp (8 hours)
}
```
* **Lifetime**: 8 hours (`maxAge: 28800` seconds).
* **Session Fixation Defense**: Every successful authentication generates a fresh token with a cryptographically unique `jti`.

### 3.2 Cookie Security Flags (Sections 12, 39, 62)
The session cookie (`__session_jcdf`) is configured with the highest industry standards:
* **`HttpOnly: true`**: JavaScript in the browser cannot read or access the cookie, completely neutralizing Cross-Site Scripting (XSS) token theft.
* **`Secure: true`**: In production, cookies are transmitted exclusively over encrypted HTTPS connections.
* **`SameSite: "lax"`**: Protects against Cross-Site Request Forgery (CSRF) on cross-origin requests while enabling standard navigation.
* **`Path: "/"`**: Cookie is scoped across all platform routes.
* **`Cache-Control: "no-store, no-cache, private"`**: Injected via `next.config.ts` so private responses are never cached by CDNs or intermediate proxies.

### 3.3 Secure Logout (Section 14)
When a user logs out via `POST /api/auth/logout`:
1. The `__session_jcdf` cookie is deleted immediately with `maxAge: 0` and an expired timestamp.
2. A `LOGOUT` security event is recorded in the immutable audit trail.
3. The client is redirected to `/login`. Pressing the browser's Back button cannot restore private access because the session cookie has been destroyed and pages use `no-store` cache headers.

---

## 4. Role-Based Access Control (RBAC) Architecture

### 4.1 Exact Roles Supported (Section 6)
The platform strictly recognizes **exactly two private operational roles**:
1. **`ADMIN`**: Executive governance and full operational authority.
2. **`DATA_ENTRY`**: Restricted field operational recording desk.

*No extraneous roles (`Manager`, `Accountant`, `Supervisor`, `Editor`) are introduced (Section 4 & 6).*

### 4.2 Cross-Role Access Decision (Section 72)
Per Section 72 specification:
* **`ADMIN` has full access to both Administration (`/admin/*`) and Operational Data Entry (`/data-entry/*`)** to allow executive supervision and emergency operational entry.
* **`DATA_ENTRY` is strictly restricted to `/data-entry/*`** and is blocked from `/admin/*`, system settings, user management, and audit logs.

### 4.3 Comprehensive Testing & Permission Matrix (Section 71)

| System Resource | Public Visitor | Unauthenticated | ADMIN | DATA_ENTRY | Enforced At |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Public Website** (`/`, `/projects`, `/about`, `/reports`, etc.) | Allowed | Allowed | Allowed | Allowed | Public Routes |
| **Login Page** (`/login`) | Allowed | Allowed | Redirect to Role Home | Redirect to Role Home | Edge Middleware |
| **Admin Dashboard** (`/admin`) | Blocked | Blocked (➔ `/login`) | Allowed | Blocked (➔ `/unauthorized`) | Middleware + Layout |
| **Data Entry Desk** (`/data-entry`) | Blocked | Blocked (➔ `/login`) | Allowed (Sec 72) | Allowed | Middleware + Layout |
| **User Management** | Blocked | Blocked | Allowed | Blocked (403) | `requireAdmin()` |
| **Security Audit Logs** (`/api/audit-logs`) | Blocked | Blocked | Allowed | Blocked (403) | `requirePermission("AUDIT_LOGS_VIEW")` |
| **System Settings & CMS** (`/api/settings`) | Read Only | Read Only | Allowed (Full Mutate) | Blocked (403) | `requireAdmin()` |
| **Database Backups** (`/api/settings/backup`) | Blocked | Blocked | Allowed | Blocked (403) | `requireAdmin()` |
| **Patient Registry** (`/api/patients`) | Blocked | Blocked | Allowed | Allowed (`PATIENTS_WRITE`) | `requirePermission("PATIENTS_*")` |
| **Ambulance Trips** (`/api/trips`) | Blocked | Blocked | Allowed | Allowed (`TRIPS_WRITE`) | `requirePermission("TRIPS_*")` |
| **Expense Vouchers** (`/api/expenses`) | Blocked | Blocked | Allowed | Allowed (`EXPENSES_WRITE`) | `requirePermission("EXPENSES_*")` |
| **Funding Receipts** (`/api/funding`) | Blocked | Blocked | Allowed | Allowed (`FUNDING_WRITE`) | `requirePermission("FUNDING_*")` |

---

## 5. Server-Side Protection & API Security

### 5.1 Central Authorization Helpers (`lib/auth/server-auth.ts`)
* `getCurrentUser()`: Resolves user from cookie, validating against DB to confirm `isActive: true`.
* `requireAuth()`: Enforces active session, throwing `AuthenticationError` (HTTP 401) on failure.
* `requireRole(allowedRoles)`: Enforces role match, throwing `AuthorizationError` (HTTP 403) on violation.
* `requirePermission(permission)`: Checks role against the centralized `ROLE_PERMISSIONS` matrix.
* `requireAdmin()`: Convenience helper strictly guarding Admin-only operations.

### 5.2 Error Handling & Status Alignment (Sections 30, 31, 32)
* `AuthenticationError` maps directly to HTTP **401 Unauthorized** with error code `UNAUTHORIZED`.
* `AuthorizationError` maps directly to HTTP **403 Forbidden** with error code `FORBIDDEN`.
* User-facing error messages are generic (e.g., *"Unable to sign in with the provided credentials."*) to prevent user enumeration attacks (Section 48).
* Internal stack traces, database schema details, and credentials are never exposed in error responses.

### 5.3 Anti-Privilege Escalation & Mass Assignment (Sections 54, 55)
Incoming request bodies are sanitized via `stripPrivilegedFields()` (`lib/auth/sanitize.ts`). Unauthenticated or `DATA_ENTRY` callers cannot inject:
* `role`
* `isActive`
* `isAdmin`
* `permissions`
* `passwordHash`

### 5.4 Brute Force Defense & Rate Limiting (Sections 36, 37)
* Sliding window memory rate limiter (`lib/auth/rate-limiter.ts`) tracks failed login attempts by IP + Email combination.
* 5 failed attempts within 15 minutes triggers an immediate **15-minute lockout** returning HTTP `429 Too Many Requests`.
* Successful authentication clears the attempt counter.

### 5.5 Open Redirect Defense (Sections 33, 34)
* The `callbackUrl` query parameter is strictly validated using `getSafeRedirectUrl()` (`lib/auth/redirect.ts`).
* External URLs (`https://...`) and protocol-relative URLs (`//evil.com`) are rejected and automatically fall back to safe internal destinations.

---

## 6. Audit Logging & Security Trail (Sections 51, 52, 64)

The audit service (`lib/services/audit.service.ts`) logs security events to an immutable audit trail:
* `LOGIN_SUCCESS`: Authenticated user ID, IP address, timestamp.
* `LOGIN_FAILURE`: Attempted email, client IP, failure reason.
* `LOGOUT`: User ID, timestamp.
* `ACCOUNT_DISABLED`: User ID, administrative actor ID.
* `ROLE_CHANGED`: Target user ID, old role, new role, administrative actor ID.

**Strict Privacy Rule (Section 52)**: Audit metadata never contains passwords, hashes, JWT tokens, API keys, or database credentials.

---

## 7. Automated Testing & Verification (Sections 45, 73, 74, 75)

Automated security verification is executed via:
```bash
npx tsx scripts/test-auth-security.ts
```

### Verified Test Suite (25 Tests Passing):
1. **Cross-Role Routing Matrix (Section 45)**:
   * Test 1: Unauthenticated -> `/admin` (Blocked)
   * Test 2: Unauthenticated -> `/data-entry` (Blocked)
   * Test 3: `ADMIN` -> `/admin` (Allowed)
   * Test 4: `ADMIN` -> `/data-entry` (Allowed per Section 72)
   * Test 5: `DATA_ENTRY` -> `/admin` (Forbidden 403)
   * Test 6: `DATA_ENTRY` -> `/data-entry` (Allowed)
   * Test 7: `DATA_ENTRY` -> Admin APIs (`AUDIT_LOGS_VIEW`, `SYSTEM_SETTINGS`, `USERS_MANAGE`) (Forbidden)
   * Test 8: Invalid / Tampered token -> private URL (Blocked)
2. **Privilege Escalation Defense (Sections 54 & 55)**:
   * Strips `role`, `passwordHash`, `isAdmin`, and `permissions` from incoming payloads.
3. **Brute-Force Rate Limiting (Sections 36 & 37)**:
   * Locked out after 5 consecutive failed attempts.
   * Lockout cleared upon successful sign in.
4. **Open Redirect Defense (Sections 33 & 34)**:
   * Rejects external and protocol-relative destinations.
   * Accepts valid internal paths (`/admin/projects`, `/data-entry/trips`).
5. **Email Normalization & Password Policy (Sections 49, 57, 58)**:
   * Normalizes mixed-case and untrimmed email inputs.
   * Enforces 8+ characters, uppercase, lowercase, and numeric complexity.
6. **Bcrypt Hashing & Timing-Safe Verification (Sections 10, 11, 78)**:
   * Validates salt generation, timing-safe compare, and rejection of invalid passwords.
7. **Stateless JWT Lifecycle & Account Status (Sections 12, 13, 25, 50, 59)**:
   * Compact 3-part signed JWT issued and decoded.
   * Unique `jti` verified for session fixation protection.
   * Disabled account (`isActive: false`) detected and denied.

---

## 8. Preserved Assets & Public Site (Section 80)

All public pages remain 100% accessible to visitors without requiring authentication:
* Home (`/`)
* About (`/about`)
* Projects (`/projects`)
* Healthcare (`/healthcare`)
* Agriculture (`/agriculture`)
* News (`/news`)
* Reports (`/reports`)
* Contact (`/contact`)
* Donate (`/donate`)
