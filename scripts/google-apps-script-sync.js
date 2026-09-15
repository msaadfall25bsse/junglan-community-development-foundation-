/**
 * ==============================================================================
 * JUNGLAN COMMUNITY DEVELOPMENT FOUNDATION (JCDF)
 * Full CRUD Google Apps Script Webhook (Add, Edit, Delete & Date-Sort)
 * ==============================================================================
 * 
 * Instructions for User:
 * 1. Open your Google Sheet: "Ambulance data 2026"
 * 2. Click "Extensions" -> "Apps Script"
 * 3. Delete existing code in Code.gs, paste this entire script, and click Save (Floppy icon).
 * 4. Click "Deploy" (top right) -> "New deployment"
 * 5. Select type: "Web app"
 * 6. Set Description: "JCDF Web App Sync v2"
 * 7. Set "Execute as": "Me"
 * 8. Set "Who has access": "Anyone"
 * 9. Click "Deploy", authorize permissions, and copy the Web App URL (https://script.google.com/macros/s/.../exec)
 * 10. In your website Data Entry page, click "Connect Google Drive" and paste the URL!
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(15000);

  try {
    var rawData = e.postData.contents;
    var payload = JSON.parse(rawData);
    var action = payload.action;
    var data = payload.data || {};
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    var tripSheet = ss.getSheetByName("2026 ambulance record complete ") || ss.getSheets()[0];
    var expenseSheet = ss.getSheetByName("Expanse") || ss.getSheets()[1];

    // --------------------------------------------------------------------------
    // ACTION: testConnection
    // --------------------------------------------------------------------------
    if (action === "testConnection") {
      var tripCount = Math.max(0, tripSheet.getLastRow() - 1);
      var expenseCount = Math.max(0, expenseSheet.getLastRow() - 1);
      return sendJSON({
        success: true,
        message: "Connected to Google Sheet: " + ss.getName(),
        stats: {
          tripCount: tripCount,
          expenseCount: expenseCount
        }
      });
    }

    // --------------------------------------------------------------------------
    // ACTION: addTrip
    // --------------------------------------------------------------------------
    if (action === "addTrip") {
      var distance = "";
      if (data.kmDrop && data.kmPick) {
        var numDrop = parseFloat(data.kmDrop);
        var numPick = parseFloat(data.kmPick);
        if (!isNaN(numDrop) && !isNaN(numPick) && numDrop >= numPick) {
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

      // Auto-Split into 'Expanse' sheet
      var sNo = data.sNo || "";
      var tripDate = data.date || "";

      // Row A: Used Service (if Received > 0)
      var receivedAmt = parseFloat(data.received);
      if (!isNaN(receivedAmt) && receivedAmt > 0) {
        expenseSheet.appendRow([tripDate, "", receivedAmt, "", "Used Service", sNo, "Trip fare from " + (data.patientName || "Patient")]);
      }

      // Row B: Petrol (if Petrol > 0)
      var petrolAmt = parseFloat(data.petrol);
      if (!isNaN(petrolAmt) && petrolAmt > 0) {
        expenseSheet.appendRow([tripDate, "", "", petrolAmt, "Petrol", sNo, "Ambulance fuel refill for trip " + sNo]);
      }

      // Row C: Maintenance/Other (if Other Expense > 0)
      var otherAmt = parseFloat(data.otherExpense);
      if (!isNaN(otherAmt) && otherAmt > 0) {
        var reasonCategory = data.reason || "Maintenance";
        expenseSheet.appendRow([tripDate, "", "", otherAmt, reasonCategory, sNo, "Incident expense for trip " + sNo]);
      }

      sortExpenseSheetByDate(expenseSheet);

      return sendJSON({
        success: true,
        message: "Trip #" + data.sNo + " registered and auto-split into ledger",
        sNo: data.sNo
      });
    }

    // --------------------------------------------------------------------------
    // ACTION: editTrip
    // --------------------------------------------------------------------------
    if (action === "editTrip") {
      var targetSNo = String(data.sNo || "").trim();
      if (!targetSNo) {
        return sendJSON({ success: false, error: "S.No is required to edit trip" });
      }

      var tripValues = tripSheet.getDataRange().getValues();
      var foundRowIndex = -1;

      for (var i = 1; i < tripValues.length; i++) {
        if (String(tripValues[i][0]).trim() === targetSNo) {
          foundRowIndex = i + 1; // 1-indexed for Sheet
          break;
        }
      }

      if (foundRowIndex === -1) {
        return sendJSON({ success: false, error: "Trip with S.No " + targetSNo + " not found" });
      }

      var distance = "";
      if (data.kmDrop && data.kmPick) {
        var numDrop = parseFloat(data.kmDrop);
        var numPick = parseFloat(data.kmPick);
        if (!isNaN(numDrop) && !isNaN(numPick)) {
          distance = (numDrop - numPick).toString();
        }
      }

      var updatedRow = [
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

      tripSheet.getRange(foundRowIndex, 1, 1, 14).setValues([updatedRow]);

      // Update associated ledger entries in Expanse sheet if needed
      return sendJSON({
        success: true,
        message: "Trip #" + targetSNo + " updated in Google Sheet",
        sNo: targetSNo
      });
    }

    // --------------------------------------------------------------------------
    // ACTION: deleteTrip
    // --------------------------------------------------------------------------
    if (action === "deleteTrip") {
      var targetSNo = String(data.sNo || "").trim();
      if (!targetSNo) {
        return sendJSON({ success: false, error: "S.No is required to delete trip" });
      }

      var tripValues = tripSheet.getDataRange().getValues();
      var foundRowIndex = -1;

      for (var i = 1; i < tripValues.length; i++) {
        if (String(tripValues[i][0]).trim() === targetSNo) {
          foundRowIndex = i + 1;
          break;
        }
      }

      if (foundRowIndex !== -1) {
        tripSheet.deleteRow(foundRowIndex);
      }

      // Also remove associated split rows in Expanse sheet (where JCDF Receipt == targetSNo)
      var expValues = expenseSheet.getDataRange().getValues();
      for (var j = expValues.length - 1; j >= 1; j--) {
        if (String(expValues[j][5]).trim() === targetSNo) {
          expenseSheet.deleteRow(j + 1);
        }
      }

      return sendJSON({
        success: true,
        message: "Trip #" + targetSNo + " and associated ledger entries deleted"
      });
    }

    // --------------------------------------------------------------------------
    // ACTION: addExpense
    // --------------------------------------------------------------------------
    if (action === "addExpense") {
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
      sortExpenseSheetByDate(expenseSheet);

      return sendJSON({
        success: true,
        message: "Expense voucher saved and sorted chronologically by date"
      });
    }

    // --------------------------------------------------------------------------
    // ACTION: editExpense
    // --------------------------------------------------------------------------
    if (action === "editExpense") {
      var rowIndex = parseInt(data.rowIndex, 10);
      if (isNaN(rowIndex) || rowIndex < 2) {
        // Fallback: search by date + reason + amount
        var expValues = expenseSheet.getDataRange().getValues();
        for (var k = 1; k < expValues.length; k++) {
          if (
            String(expValues[k][0]).trim() === String(data.oldDate || data.date).trim() &&
            String(expValues[k][4]).trim() === String(data.oldReason || data.reason).trim()
          ) {
            rowIndex = k + 1;
            break;
          }
        }
      }

      if (!isNaN(rowIndex) && rowIndex >= 2 && rowIndex <= expenseSheet.getLastRow()) {
        var updatedExpRow = [
          data.date || "",
          data.name || "",
          data.received ? Number(data.received) : "",
          data.expense ? Number(data.expense) : "",
          data.reason || "Other",
          data.jcdfReceipt || "",
          data.remark || ""
        ];
        expenseSheet.getRange(rowIndex, 1, 1, 7).setValues([updatedExpRow]);
        sortExpenseSheetByDate(expenseSheet);

        return sendJSON({
          success: true,
          message: "Expense voucher updated and re-sorted by date"
        });
      }

      return sendJSON({ success: false, error: "Expense row not found for editing" });
    }

    // --------------------------------------------------------------------------
    // ACTION: deleteExpense
    // --------------------------------------------------------------------------
    if (action === "deleteExpense") {
      var rowIndex = parseInt(data.rowIndex, 10);
      if (isNaN(rowIndex) || rowIndex < 2) {
        var expValues = expenseSheet.getDataRange().getValues();
        for (var m = expValues.length - 1; m >= 1; m--) {
          if (
            String(expValues[m][0]).trim() === String(data.date).trim() &&
            String(expValues[m][4]).trim() === String(data.reason).trim()
          ) {
            rowIndex = m + 1;
            break;
          }
        }
      }

      if (!isNaN(rowIndex) && rowIndex >= 2 && rowIndex <= expenseSheet.getLastRow()) {
        expenseSheet.deleteRow(rowIndex);
        return sendJSON({ success: true, message: "Expense voucher deleted successfully" });
      }

      return sendJSON({ success: false, error: "Expense row not found for deletion" });
    }

    return sendJSON({ success: false, error: "Unknown action: " + action });

  } catch (error) {
    return sendJSON({ success: false, error: error.toString() });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var action = (e && e.parameter && e.parameter.action) || "ping";

    if (action === "ping" || action === "testConnection") {
      var tripSheet = ss.getSheetByName("2026 ambulance record complete ") || ss.getSheets()[0];
      var expenseSheet = ss.getSheetByName("Expanse") || ss.getSheets()[1];
      return sendJSON({
        success: true,
        message: "Connected to Google Sheet: " + ss.getName(),
        stats: {
          totalTrips: Math.max(0, tripSheet.getLastRow() - 1),
          totalExpenses: Math.max(0, expenseSheet.getLastRow() - 1)
        }
      });
    }

    return sendJSON({ success: true, message: "JCDF Google Apps Script Webhook Active" });
  } catch (err) {
    return sendJSON({ success: false, error: err.toString() });
  }
}

function sendJSON(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function sortExpenseSheetByDate(sheet) {
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  if (lastRow > 2) {
    var range = sheet.getRange(2, 1, lastRow - 1, lastCol);
    range.sort({ column: 1, ascending: true });
  }
}
