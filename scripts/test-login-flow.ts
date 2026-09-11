import { NextRequest } from "next/server";
import { POST as loginHandler } from "../app/api/auth/login/route";

async function testLogin() {
  console.log("\n=== Testing Admin Login Handler Directly ===");

  // 1. Test with correct Admin credentials
  const reqValid = new NextRequest("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": "127.0.0.1",
    },
    body: JSON.stringify({
      email: "admin@junglan.org",
      password: "Admin@Junglan2026",
    }),
  });

  const resValid = await loginHandler(reqValid);
  const dataValid = await resValid.json();
  const cookies = resValid.headers.get("set-cookie");

  console.log("Status:", resValid.status);
  console.log("Response data:", dataValid);
  console.log("Cookie set:", cookies ? "YES (__session_jcdf set)" : "NO");

  if (resValid.status === 200 && dataValid.success && dataValid.user.role === "ADMIN") {
    console.log("✅ Admin Login Test: PASSED!");
  } else {
    console.error("❌ Admin Login Test: FAILED!");
    process.exit(1);
  }

  // 2. Test with incorrect password
  console.log("\n=== Testing Invalid Password ===");
  const reqInvalid = new NextRequest("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": "127.0.0.1",
    },
    body: JSON.stringify({
      email: "admin@junglan.org",
      password: "WrongPassword123!",
    }),
  });

  const resInvalid = await loginHandler(reqInvalid);
  const dataInvalid = await resInvalid.json();
  console.log("Status:", resInvalid.status);
  console.log("Response data:", dataInvalid);

  if (resInvalid.status === 401 && !dataInvalid.success) {
    console.log("✅ Invalid Credentials Test: PASSED (Rejected properly)");
  } else {
    console.error("❌ Invalid Credentials Test: FAILED");
    process.exit(1);
  }

  // 3. Test Data Entry user
  console.log("\n=== Testing Data Entry User Login ===");
  const reqData = new NextRequest("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": "127.0.0.1",
    },
    body: JSON.stringify({
      email: "dataentry@junglan.org",
      password: "DataEntry@Junglan2026",
    }),
  });

  const resData = await loginHandler(reqData);
  const dataEntry = await resData.json();
  console.log("Status:", resData.status);
  console.log("Response data:", dataEntry);

  if (resData.status === 200 && dataEntry.success && dataEntry.user.role === "DATA_ENTRY") {
    console.log("✅ Data Entry Login Test: PASSED!");
  } else {
    console.error("❌ Data Entry Login Test: FAILED!");
    process.exit(1);
  }

  console.log("\n🎉 ALL DIRECT LOGIN TESTS PASSED SUCCESSFULLY!\n");
}

testLogin().catch((err) => {
  console.error("Error in testLogin:", err);
  process.exit(1);
});
