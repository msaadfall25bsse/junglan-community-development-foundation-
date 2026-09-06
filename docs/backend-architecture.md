# Backend Architecture & Database Specification

**Junglan Community Development Foundation (JCDF)**  
**Version:** 1.0.0 (Production Foundation)  
**Specification Reference:** 46-Page System Architecture & Section 85 STOP RULE  

---

## 1. System Philosophy & Source of Truth

The backend architecture for the **Junglan Community Development Foundation** platform is built on strict data integrity, non-profit financial precision, patient confidentiality, and layered separation of concerns.

### Key Architectural Tenets:
1. **PostgreSQL is the Sole Authoritative System of Record**:
   - All transactions, patient intakes, ambulance dispatches, financial vouchers, and audit trails live in PostgreSQL.
   - External platforms (e.g., Google Sheets, Google Drive) serve solely as downstream synchronization or backup targets. They **never** replace or supersede the PostgreSQL database.
2. **Zero Floating-Point Drift for Financial Accounting**:
   - JavaScript native `Number` floats are strictly prohibited for monetary amounts to avoid IEEE-754 precision drift (e.g., `0.1 + 0.2 = 0.30000000000000004`).
   - All financial columns use PostgreSQL `Decimal @db.Decimal(12, 2)` handled via Prisma's high-precision `Decimal` object.
3. **Multi-Table Transaction Atomicity**:
   - Related mutations run inside `prisma.$transaction`. For example, dispatching an ambulance atomically creates the `Trip` record and transitions the `AmbulanceVehicle` status to `ON_TRIP`.
4. **Historical Record Preservation**:
   - Operational entities belong to a designated `YearPeriod`. Modifying or inserting records into closed or archived fiscal years is blocked with HTTP `409 Conflict`.
5. **Strict Patient Privacy**:
   - Patient medical condition summaries, phone numbers, and CNICs are strictly restricted to authorized staff. Public statistics are completely decoupled and anonymized.

---

## 2. Layered Architecture

The application implements a decoupled, 4-tier backend architecture:

```
┌────────────────────────────────────────────────────────┐
│                   HTTP Request                         │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 1. Next.js App Router (app/api/*)                      │
│    - Extracts parameters, headers, and request body     │
│    - Invokes Validation Layer                          │
│    - Wraps handlers in universal handleApiError()      │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 2. Server-Side Validation (lib/validation/*)           │
│    - Zod schemas for all domain entities               │
│    - Sanitizes strings, parses positive Decimals       │
│    - Formats 422 field-level issue dictionaries        │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 3. Domain Service Layer (lib/services/*)               │
│    - Implements business logic & historical guards     │
│    - Generates institutional IDs (JCD-P-*, TRP-*, etc.)│
│    - Executes multi-table prisma.$transaction calls    │
│    - Writes automated, immutable AuditLog entries      │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 4. ORM & Database Layer (lib/prisma.ts, PostgreSQL)    │
│    - Singleton PrismaClient with hot-reload cache      │
│    - 20 Relational Models, enums, and foreign keys     │
│    - Query hot-path indexing (deletedAt, date, status) │
└────────────────────────────────────────────────────────┘
```

---

## 3. Database Schema Overview (20 Relational Models)

| Category | Models | Description |
| :--- | :--- | :--- |
| **Access Control & RBAC** | `User`, `Permission`, `RolePermission` | Two private operational roles: `ADMIN` and `DATA_ENTRY`. Granular permissions mapping. |
| **Fiscal Periods** | `YearPeriod` | Fiscal year preservation, `isCurrentActive` flag, single-active-year rule. |
| **Healthcare Fleet & Patients** | `Patient`, `AmbulanceVehicle`, `Trip` | Demographics, vehicle statuses (`AVAILABLE`, `ON_TRIP`, `MAINTENANCE`), mission tracking. |
| **Financial Accounting** | `Expense`, `Funding` | Exact `@db.Decimal(12, 2)` monetary precision, voucher numbers, donation allocations. |
| **Fleet Maintenance & Fuel** | `FuelLog`, `MaintenanceLog` | Fuel liters, station records, workshop invoices, odometer tracking. |
| **Community Projects & CMS** | `Project`, `ProjectUpdate`, `News`, `OperationalLocation` | Multi-sector projects (Healthcare, Agriculture, Infrastructure), public news articles. |
| **Audit, Reports & Sync** | `AuditLog`, `Report`, `ReportGeneration`, `Document`, `GoogleIntegration` | Immutable audit trail, document storage references (Local, Drive, S3), sync metadata. |

---

## 4. Standardized API Response & Error Contracts

All API endpoints strictly conform to the following JSON envelopes:

### Success Envelope (`ApiResponse<T>`)
```json
{
  "success": true,
  "data": { ... },
  "message": "Resource created successfully",
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### Error Envelope (`ApiErrorResponse`)
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "One or more validation constraints failed for the supplied payload.",
    "details": {
      "amountPKR": ["Amount must be a positive number greater than zero"],
      "contactNumber": ["Please provide a valid Pakistani contact number"]
    },
    "timestamp": "2026-03-01T12:00:00.000Z"
  }
}
```

### Standard HTTP Status Codes:
- `200 OK`: Successful read or update.
- `201 Created`: Successful resource creation.
- `400 Bad Request`: Malformed JSON or invalid syntax.
- `401 Unauthorized`: Authentication required.
- `403 Forbidden`: Insufficient role permissions.
- `404 Not Found`: Resource not found or soft-deleted.
- `409 Conflict`: Duplicate unique field (CNIC, voucher number) or inactive fiscal year.
- `422 Unprocessable Entity`: Zod schema validation failure with field-level issues.
- `500 Internal Server Error`: Unhandled server exception (logged, internal details hidden).

---

## 5. API Endpoints Registry

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/health` | `GET` | System health, database connectivity, and active YearPeriod. |
| `/api/patients` | `GET` | Paginated search of patient intake registry. |
| `/api/patients` | `POST` | Create new patient intake with atomic audit log and sequential ID. |
| `/api/patients/[id]` | `GET` | Retrieve single patient profile with related mission history. |
| `/api/patients/[id]` | `PATCH` | Update patient record, review flag, or soft-archival. |
| `/api/trips` | `GET` | Paginated ambulance mission history with vehicle and patient relations. |
| `/api/trips` | `POST` | Dispatch ambulance; marks vehicle `ON_TRIP` and creates trip record. |
| `/api/trips/[id]/complete` | `POST` | Complete mission; advances vehicle odometer and resets status to `AVAILABLE`. |
| `/api/expenses` | `GET` | Paginated expense vouchers with category, date, and amount filters. |
| `/api/expenses` | `POST` | Record expense voucher with strict Decimal amount and audit trail. |
| `/api/funding` | `GET` | Paginated funding receipts with source and project filters. |
| `/api/funding` | `POST` | Record donation receipt; atomically increments project funding if allocated. |
| `/api/audit-logs` | `GET` | Paginated audit trail query with module, action, and date filters. |

---

## 6. Section 85 STOP RULE Compliance Audit

In strict compliance with **Section 85 STOP RULE** of the Foundation Specifications:

- [x] **NO Real Authentication / Login UI Implemented**: Deferring real authentication provider and login UI to subsequent phases.
- [x] **NO Live Google Sheets API Calls**: Only sync metadata fields and schema foundations are provided; zero live network calls to Google Sheets API are made in Part 4.
- [x] **NO Google Drive Uploads**: Document reference schemas are ready, but no external drive upload pipeline is activated in Part 4.
- [x] **NO Payment Gateway Webhooks**: Donation tracking uses receipt and voucher numbers; no external payment gateway SDKs are wired in Part 4.
- [x] **NO AI Agents or Python Analytics**: Architecture is pure TypeScript/Next.js/Prisma; zero external AI or Python workers are deployed in Part 4.
- [x] **NO Mock Data in Production**: All seed or test data is confined to isolated test suites and deleted upon completion.

---

## 7. Verification Results

- **Prisma Schema Validation**: Validated via Prisma ORM 6.4.1.
- **Section 64 Automated Integrity Test Suite**: 17 / 17 tests passed (envelopes, validation trapping, conflict mapping, Decimal arithmetic, and health contracts).
- **TypeScript Compilation (`npx tsc --noEmit`)**: 0 errors.
- **ESLint (`npm run lint`)**: 0 errors, 0 warnings.
- **Next.js Production Build (`npm run build`)**: 31 frontend routes + 8 API endpoints compiled in 1.8s.
