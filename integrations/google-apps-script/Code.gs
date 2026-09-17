const SHEET_ID = "1zDCfG6oBdP7IHbB7uuy5M--KmH6sIN-GB3yfQiUkYFI";

function doPost(e) {
  const reply = (body) => ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
  try {
    const raw = e && e.postData && e.postData.contents;
    if (!raw || raw.length > 4096) return reply({ok:false});
    const data = JSON.parse(raw);
    const secret = PropertiesService.getScriptProperties().getProperty("REGISTRATION_SECRET");
    if (!secret || data.secret !== secret) return reply({ok:false});
    const name = typeof data.name === "string" ? data.name.trim() : "";
    const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
    const phone = typeof data.phone === "string" ? data.phone.trim() : "";
    if (!name || name.length > 120 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^\+[1-9]\d{7,14}$/.test(phone) || data.consent !== true) return reply({ok:false});
    const lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) return reply({ok:false});
    try {
      const book = SpreadsheetApp.openById(SHEET_ID);
      const sheet = book.getSheetByName("Inscritos");
      if (!sheet) return reply({ok:false});
      const last = sheet.getLastRow();
      if (last > 1) {
        const found = sheet.getRange(2, 2, last - 1, 1).createTextFinder(email).matchEntireCell(true).matchCase(false).useRegularExpression(false).findNext();
        if (found) return reply({ok:true});
      }
      const row = last + 1;
      if (row > sheet.getMaxRows()) sheet.insertRowsAfter(sheet.getMaxRows(), 100);
      // Store user input as literal text, never as a spreadsheet formula.
      const literal = (value) => /^[=+\-@']/.test(value) ? "'" + value : value;
      sheet.getRange(row, 1, 1, 3).setNumberFormat("@");
      sheet.getRange(row, 1, 1, 4).setValues([[literal(name), literal(email), literal(phone), new Date()]]);
      sheet.getRange(row, 4).setNumberFormat("dd/MM/yyyy HH:mm:ss");
      book.setSpreadsheetTimeZone("America/Guayaquil");
      SpreadsheetApp.flush();
      return reply({ok:true});
    } finally {
      lock.releaseLock();
    }
  } catch (_) {
    return reply({ok:false});
  }
}
