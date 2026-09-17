const SHEET_ID = "1zDCfG6oBdP7IHbB7uuy5M--KmH6sIN-GB3yfQiUkYFI";

function doPost(e) {
  const reply = body => ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
  const literal = value => /^[=+\-@']/.test(value) ? "'" + value : value;
  try {
    const raw = e && e.postData && e.postData.contents;
    if (!raw || raw.length > 4096) return reply({ok:false});
    const data = JSON.parse(raw);
    const secret = PropertiesService.getScriptProperties().getProperty("REGISTRATION_SECRET");
    if (!secret || data.secret !== secret) return reply({ok:false});
    const action = data.action || "register";
    if (action !== "register" && action !== "whatsapp_click") return reply({ok:false});
    const name = typeof data.name === "string" ? data.name.trim() : "";
    const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
    const phone = typeof data.phone === "string" ? data.phone.trim() : "";
    if (action === "register" && (!name || name.length > 120 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^\+[1-9]\d{7,14}$/.test(phone) || data.consent !== true)) return reply({ok:false});
    if (action === "whatsapp_click" && (typeof data.id !== "string" || !/^[a-zA-Z0-9-]{1,80}$/.test(data.id))) return reply({ok:false});
    const lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) return reply({ok:false,code:"busy"});
    try {
      const cache = CacheService.getScriptCache();
      // Shared across Vercel instances; cache expiry/eviction means this is best-effort abuse protection.
      const allow = (key, max, seconds) => {
        const count = Number(cache.get(key) || 0);
        if (count >= max) return false;
        cache.put(key, String(count + 1), seconds);
        return true;
      };
      if (!allow("global:" + Math.floor(Date.now() / 60000), 60, 120)) return reply({ok:false,code:"rate_limited"});
      if (action === "register" && data.clientKey && (!/^[a-f0-9]{64}$/.test(data.clientKey) || !allow("ip:" + data.clientKey + ":" + Math.floor(Date.now() / 600000), 5, 600))) return reply({ok:false,code:"rate_limited"});
      const book = SpreadsheetApp.openById(SHEET_ID);
      book.setSpreadsheetTimeZone("America/Guayaquil");
      const sheet = book.getSheetByName("Inscritos");
      if (!sheet) return reply({ok:false});
      if (sheet.getMaxColumns() < 14) sheet.insertColumnsAfter(sheet.getMaxColumns(), 14 - sheet.getMaxColumns());
      if (sheet.getRange(1,5).getValue() !== "ID de registro") {
        sheet.getRange(1,1,1,14).setValues([["Nombre completo","Correo electrónico","Teléfono","Fecha de registro (Ecuador)","ID de registro","utm_source","utm_medium","utm_campaign","utm_content","utm_term","Medición autorizada","Registro autorizado","Versión de privacidad","Primer clic en WhatsApp (Ecuador)"]]);
        sheet.getRange(1,1,1,14).setBackground("#142039").setFontColor("#ffffff").setFontWeight("bold");
        sheet.setFrozenRows(1);
      }
      const last = sheet.getLastRow();
      if (action === "whatsapp_click") {
        if (last < 2) return reply({ok:false});
        const found = sheet.getRange(2,5,last-1,1).createTextFinder(data.id).matchEntireCell(true).matchCase(true).useRegularExpression(false).findNext();
        if (!found || sheet.getRange(found.getRow(),11).getValue() !== "Sí") return reply({ok:false});
        const cell = sheet.getRange(found.getRow(),14);
        if (!cell.getValue()) cell.setValue(new Date()).setNumberFormat("dd/MM/yyyy HH:mm:ss");
        SpreadsheetApp.flush();
        return reply({ok:true});
      }
      if (last > 1) {
        const found = sheet.getRange(2,2,last-1,1).createTextFinder(email).matchEntireCell(true).matchCase(false).useRegularExpression(false).findNext();
        if (found) return reply({ok:true,duplicate:true});
      }
      const row = last + 1;
      if (row > sheet.getMaxRows()) sheet.insertRowsAfter(sheet.getMaxRows(),100);
      const measurement = data.measurement === true;
      const attrs = data.attribution || {};
      const campaign = ["utm_source","utm_medium","utm_campaign","utm_content","utm_term"].map(key => measurement && typeof attrs[key] === "string" && /^[\p{L}\p{N} _.-]{1,80}$/u.test(attrs[key]) ? literal(attrs[key]) : "");
      const id = typeof data.id === "string" && /^[a-zA-Z0-9-]{1,80}$/.test(data.id) ? data.id : Utilities.getUuid();
      sheet.getRange(row,1,1,14).setNumberFormat("@");
      sheet.getRange(row,1,1,14).setValues([[literal(name),literal(email),literal(phone),new Date(),id].concat(campaign,[measurement ? "Sí" : "No","Sí",data.policyVersion === "2026-09-17" ? data.policyVersion : "Anterior",""])]);
      sheet.getRange(row,4).setNumberFormat("dd/MM/yyyy HH:mm:ss");
      SpreadsheetApp.flush();
      return reply({ok:true,duplicate:false});
    } finally { lock.releaseLock(); }
  } catch (_) { return reply({ok:false}); }
}
