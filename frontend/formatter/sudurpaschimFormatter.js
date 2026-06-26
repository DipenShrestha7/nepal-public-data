import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as XLSX from "xlsx";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurations
const INPUT_EXCEL_FILE = "./Mortality CSV Files/sudurpaschim - Copy.xlsx";
const OUTPUT_JSON_FILE = "mortality_clean.json";

// 🛠️ FORCE ABSOLUTE PATHS (Replace lines 10 through 20 with this)
const excelFilePath =
  "C:\\Coding\\nepal-public-data\\frontend\\formatter\\Mortality CSV Files\\sudurpaschim - Copy.xlsx";
const jsonOutputPath =
  "C:\\Coding\\nepal-public-data\\frontend\\public\\data\\mortality_clean.json";

function parseSudurpaschimExcel() {
  try {
    let masterCollection = [];

    // 1. Read existing clean JSON data store so we can append to it
    if (fs.existsSync(jsonOutputPath)) {
      try {
        masterCollection = JSON.parse(fs.readFileSync(jsonOutputPath, "utf-8"));
        console.log(
          `📂 Loaded ${masterCollection.length} historical entries from master JSON.`,
        );
      } catch (e) {
        masterCollection = [];
      }
    }

    console.log(`📖 Directly processing Excel workbook: ${excelFilePath}`);

    // 🛠️ SAFE FIX: Read file as a binary buffer first, then pass to SheetJS
    const fileBuffer = fs.readFileSync(excelFilePath);
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });

    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    // Convert sheet to a raw 2D array matrix (rows and columns)
    const rawRows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const localFileEntries = [];
    let currentSex = "Total"; // Fallback state tracking gender changes down the sheet

    console.log(`Processing ${rawRows.length} matrix rows from spreadsheet...`);

    // 2. Loop through the raw rows
    for (let i = 0; i < rawRows.length; i++) {
      const row = rawRows[i];
      if (!row || row.length === 0) continue;

      // Filter down cells to find data boundaries
      // Clean row from any completely empty trailing or leading cells
      const cells = row
        .map((c) => (typeof c === "string" ? c.trim() : c))
        .filter((c) => c !== undefined && c !== null && c !== "");

      if (cells.length < 12) continue; // Skip header blocks and title spaces

      const firstCellStr = String(cells[0]);

      // Track Sex state switches if the spreadsheet introduces Male/Female sub-tables down the line
      if (firstCellStr.toLowerCase() === "male") {
        currentSex = "Male";
        continue;
      } else if (firstCellStr.toLowerCase() === "female") {
        currentSex = "Female";
        continue;
      } else if (firstCellStr.toLowerCase() === "total" && cells.length < 5) {
        currentSex = "Total";
        continue;
      }

      // Identify data rows by checking if the second value is an age-group pattern or if the first cell matches age spans
      const ageField = cells.find(
        (c) =>
          typeof c === "string" &&
          (c.includes("-") ||
            c.includes("<") ||
            c.includes("+") ||
            c.toLowerCase() === "all ages"),
      );
      if (!ageField) continue;

      // Locate the start index of the numbers array inside the spreadsheet row matrix
      const totalIndex = cells.indexOf(ageField) + 1;

      // Ensure we have all 11 required core data counts
      if (cells.length < totalIndex + 11) continue;

      // Build the standard schema structure matching your frontend table
      const entry = {
        province: "Sudurpaschim",
        district: "All", // The snapshot is the total provincial summary row block
        sex: currentSex,
        ageGroup: ageField.replace(/\s+/g, " "),
        total: parseInt(cells[totalIndex], 10) || 0,
        causes: {
          communicable: parseInt(cells[totalIndex + 1], 10) || 0,
          nonCommunicable: parseInt(cells[totalIndex + 2], 10) || 0,
          roadAccident: parseInt(cells[totalIndex + 3], 10) || 0,
          otherAccident: parseInt(cells[totalIndex + 4], 10) || 0,
          pregnancyRelated: parseInt(cells[totalIndex + 5], 10) || 0,
          crime: parseInt(cells[totalIndex + 6], 10) || 0,
          suicide: parseInt(cells[totalIndex + 7], 10) || 0,
          naturalDisaster: parseInt(cells[totalIndex + 8], 10) || 0,
          other: parseInt(cells[totalIndex + 9], 10) || 0,
          notStated: parseInt(cells[totalIndex + 10], 10) || 0,
        },
      };

      localFileEntries.push(entry);
    }

    console.log(
      `✨ Successfully extracted ${localFileEntries.length} clean demographic rows for Sudurpaschim.`,
    );

    // 3. Append and save out data
    masterCollection.push(...localFileEntries);

    const targetDir = path.dirname(jsonOutputPath);
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

    fs.writeFileSync(
      jsonOutputPath,
      JSON.stringify(masterCollection, null, 2),
      "utf-8",
    );
    console.log(
      `🚀 Success! Total combined database entries updated to: ${masterCollection.length}`,
    );
  } catch (err) {
    console.error("❌ Critical Excel Conversion Error:", err.message);
  }
}

parseSudurpaschimExcel();
