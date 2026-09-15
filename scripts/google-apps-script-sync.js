/**
 * ==============================================================================
 * JUNGLAN COMMUNITY DEVELOPMENT FOUNDATION (JCDF)
 * Google Apps Script Webhook for Real-Time Sync & Storage
 * ==============================================================================
 * 
 * Instructions:
 * 1. Open your Google Sheet: "Ambulance data 2026"
 * 2. Click "Extensions" -> "Apps Script"
 * 3. Delete any code in Code.gs, paste this entire script, and click Save (Floppy icon).
 * 4. Click "Deploy" (top right) -> "New deployment"
 * 5. Select type: "Web app"
 * 6. Set Description: "JCDF Web App Sync"
 * 7. Set "Execute as": "Me"
 * 8. Set "Who has access": "Anyone" (so your Vercel web app can post data)
 * 9. Click "Deploy", authorize permissions, and copy the Web App URL (e.g. https://script.google.com/macros/s/.../exec)
 * 10. Paste the URL into your project's .env file:
 *     GOOGLE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/.../exec"
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var rawData = e.postData.contents;
    var payload = JSON.parse(rawData);
    var action = payload.action;
    var data = payload.data;
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    if (action === "addTrip") {
      // 1. Add to '2026 ambulance record complete ' (Tab 1)
      var tripSheet = ss.getSheetByName("2026 ambulance record complete ");
      if (!tripSheet) {
        tripSheet = ss.getSheets()[0]; // Fallback to first sheet
      }

      var distance = "";
      if (data.kmDrop && data.kmPick) {
        var numDrop = parseFloat(data.kmDrop);
        var numPick = parseFloat(data.kmPick);
        if (!isNaN(numDrop) && !isNaN(numPick)) {
          distance = (numDrop - numPick).toString();
        }
      }

      var tripRow = [
        data.sNo || "",
        data.date || "",
        data.day || "",
        data.time || "",
        data.patientName || "",
        data.pickup || "",
        data.drop || "",
        data.kmPick || "",
        data.kmDrop || "",
        distance,
        data.petrol || "",
        data.received || "",
        data.reason || "",
        data.otherExpense || ""
      ];

      tripSheet.appendRow(tripRow);

      // 2. Auto-Split into 'Expanse' sheet (Tab 2)
      var expenseSheet = ss.getSheetByName("Expanse");
      if (expenseSheet) {
        var sNo = data.sNo || "";
        var tripDate = data.date || "";

        // Row A: Used Service (if Received > 0)
        var receivedAmt = parseFloat(data.received);
        if (!isNaN(receivedAmt) && receivedAmt > 0) {
          expenseSheet.appendRow([
            tripDate,
            "",
            receivedAmt,
            "",
            "Used Service",
            sNo,
            ""
          ]);
        }

        // Row B: Petrol (if Petrol > 0)
        var petrolAmt = parseFloat(data.petrol);
        if (!isNaN(petrolAmt) && petrolAmt > 0) {
          expenseSheet.appendRow([
            tripDate,
            "",
            "",
            petrolAmt,
            "Petrol",
            sNo,
            ""
          ]);
        }

        // Row C: Maintenance/Other (if Other Expense > 0)
        var otherAmt = parseFloat(data.otherExpense);
        if (!isNaN(otherAmt) && otherAmt > 0) {
          var reasonCategory = data.reason || "Maintenance";
          expenseSheet.appendRow([
            tripDate,
            "",
            "",
            otherAmt,
            reasonCategory,
            sNo,
            ""
          ]);
        }

        // 3. Auto-sort 'Expanse' sheet by Date (Column A: 1)
        sortExpenseSheetByDate(expenseSheet);
      }

      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: "Trip and ledger rows added successfully",
        sNo: data.sNo
      })).setMimeType(ContentService.MimeType.JSON);

    } else if (action === "addExpense") {
      // Direct General/Documentary Expense
      var expenseSheet = ss.getSheetByName("Expanse");
      if (!expenseSheet) {
        expenseSheet = ss.getSheets()[1];
      }

      var expenseRow = [
        data.date || "",
        data.name || "",
        data.received ? Number(data.received) : "",
        data.expense ? Number(data.expense) : "",
        data.reason || "Other",
        data.jcdfReceipt || "",
        data.remark || ""
      ];

      expenseSheet.appendRow(expenseRow);

      // Auto-sort 'Expanse' sheet by Date (Column A: 1)
      sortExpenseSheetByDate(expenseSheet);

      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: "Expense voucher added and sorted by date successfully"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: "Unknown action: " + action
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var action = e.parameter.action || "getStats";

    if (action === "search") {
      var query = (e.parameter.q || "").toLowerCase().trim();
      var tripSheet = ss.getSheetByName("2026 ambulance record complete ") || ss.getSheets()[0];
      var data = tripSheet.getDataRange().getValues();
      var headers = data[0];
      var results = [];

      for (var i = 1; i < data.length; i++) {
        var row = data[i];
        if (!row[0] && !row[4]) continue; // Skip empty rows
        var sNoStr = String(row[0]).toLowerCase();
        var patientNameStr = String(row[4]).toLowerCase();
        var pickupStr = String(row[5]).toLowerCase();
        var dropStr = String(row[6]).toLowerCase();

        if (
          sNoStr.indexOf(query) !== -1 ||
          patientNameStr.indexOf(query) !== -1 ||
          pickupStr.indexOf(query) !== -1 ||
          dropStr.indexOf(query) !== -1
        ) {
          results.push({
            sNo: row[0],
            date: row[1] instanceof Date ? Utilities.formatDate(row[1], "Asia/Karachi", "yyyy-MM-dd") : row[1],
            day: row[2],
            time: row[3],
            patientName: row[4],
            pickup: row[5],
            drop: row[6],
            kmPick: row[7],
            kmDrop: row[8],
            distance: row[9],
            petrol: row[10],
            received: row[11],
            reason: row[12],
            otherExpense: row[13]
          });
        }
      }

      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        data: results
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Default: Return basic stats
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "JCDF Google Apps Script Endpoint Active"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Sorts the Expanse sheet by Date (Column 1 / A) chronologically
 * Skips the header row (row 1)
 */
function sortExpenseSheetByDate(sheet) {
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  if (lastRow > 2) {
    var range = sheet.getRange(2, 1, lastRow - 1, lastCol);
    range.sort({ column: 1, ascending: true });
  }
}
