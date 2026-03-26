var CONFIG = {
  targetSheetName: "Escala",
  weekHeaderRows: [1, 3, 5, 7, 9],
  weekValueRows: [2, 4, 6, 8, 10],
  quintaColumn: 4,
  sundayColumns: {
    domingo1: 5,
    domingo2: 6,
    domingo3: 7
  },
  sundayLabels: {
    domingo1: "ZS07",
    domingo2: "ZS10",
    domingo3: "ZS16"
  }
};

function parsePayload_(e) {
  if (e && e.parameter && e.parameter.payload) {
    return JSON.parse(e.parameter.payload);
  }

  if (e && e.postData && e.postData.contents) {
    var contents = e.postData.contents;

    if (contents.indexOf("{") === 0) {
      return JSON.parse(contents);
    }

    if (contents.indexOf("payload=") !== -1) {
      var parts = contents.split("&");
      for (var index = 0; index < parts.length; index += 1) {
        if (parts[index].indexOf("payload=") === 0) {
          var encoded = parts[index].substring(8);
          return JSON.parse(decodeURIComponent(encoded.replace(/\+/g, " ")));
        }
      }
    }
  }

  return {};
}

function getTargetSheet_() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(CONFIG.targetSheetName);

  if (!sheet) {
    throw new Error('A aba "' + CONFIG.targetSheetName + '" nao foi encontrada.');
  }

  return sheet;
}

function formatDate_(isoDate) {
  if (!isoDate) {
    return "";
  }

  var parts = isoDate.split("-");
  if (parts.length !== 3) {
    return isoDate;
  }

  return parts[2] + "/" + parts[1];
}

function buildCellValue_(raw, weekIndex, dayKey) {
  var categories = dayKey === "domingo1"
    ? ["C1", "C2", "PC", "Superv"]
    : ["C1", "C2", "PC"];
  var outputLabels = {
    C1: "C1",
    C2: "C2",
    PC: "PC",
    Superv: "Supervisor"
  };

  return categories
    .map(function(category) {
      var value = raw["names:" + weekIndex + ":" + dayKey + ":" + category] || "";
      return value ? value + " (" + outputLabels[category] + ")" : "";
    })
    .filter(function(line) {
      return line !== "";
    })
    .join("\n");
}

function buildRichCellValue_(raw, weekIndex, dayKey) {
  var text = buildCellValue_(raw, weekIndex, dayKey);
  var builder = SpreadsheetApp.newRichTextValue().setText(text);
  var boldStyle = SpreadsheetApp.newTextStyle().setBold(true).build();
  var lines = text ? text.split("\n") : [];
  var cursor = 0;
  var boldMarker = dayKey === "domingo1" ? "(Supervisor)" : "(PC)";

  lines.forEach(function(line) {
    if (line.indexOf(boldMarker) !== -1) {
      builder.setTextStyle(cursor, cursor + line.length, boldStyle);
    }

    cursor += line.length + 1;
  });

  if (!text) {
    return builder.build();
  }

  return builder.build();
}

function clearWeekRange_(sheet, headerRow, valueRow) {
  sheet.getRange(headerRow, CONFIG.quintaColumn, 1, 4).clearContent();
  sheet.getRange(valueRow, CONFIG.quintaColumn, 1, 4).clearContent();
}

function writeWeek_(sheet, raw, weekIndex) {
  var headerRow = CONFIG.weekHeaderRows[weekIndex];
  var valueRow = CONFIG.weekValueRows[weekIndex];

  clearWeekRange_(sheet, headerRow, valueRow);

  var quintaDate = raw["date:" + weekIndex + ":quinta"] || "";
  sheet
    .getRange(headerRow, CONFIG.quintaColumn)
    .setValue(quintaDate ? "Quinta - " + formatDate_(quintaDate) : "");
  sheet
    .getRange(valueRow, CONFIG.quintaColumn)
    .setRichTextValue(buildRichCellValue_(raw, weekIndex, "quinta"));

  if (weekIndex >= 4) {
    return;
  }

  ["domingo1", "domingo2", "domingo3"].forEach(function(dayKey) {
    var column = CONFIG.sundayColumns[dayKey];
    var date = raw["date:" + weekIndex + ":" + dayKey] || "";
    var label = CONFIG.sundayLabels[dayKey];

    sheet
      .getRange(headerRow, column)
      .setValue(date ? label + " - " + formatDate_(date) : "");
    sheet
      .getRange(valueRow, column)
      .setRichTextValue(buildRichCellValue_(raw, weekIndex, dayKey));
  });
}

function doPost(e) {
  var data = parsePayload_(e);
  var raw = data.raw || {};
  var sheet = getTargetSheet_();

  for (var weekIndex = 0; weekIndex < CONFIG.weekHeaderRows.length; weekIndex += 1) {
    writeWeek_(sheet, raw, weekIndex);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, weeks: CONFIG.weekHeaderRows.length }))
    .setMimeType(ContentService.MimeType.JSON);
}
