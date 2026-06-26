import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🌟 DYNAMIC FIX: Read the filename directly from what you type in the terminal shell!
const INPUT_FILENAME = process.argv[2];
const OUTPUT_FILENAME = "mortality_clean.json";

if (!INPUT_FILENAME) {
  console.error("❌ CRITICAL ERROR: You forgot to provide a CSV file name!");
  console.log("👉 Usage example: node append_mortality.mjs madhesh.csv");
  process.exit(1);
}

const csvFilePath = path.join(__dirname, INPUT_FILENAME);
const jsonOutputPath = path.join(
  __dirname,
  "..",
  "public",
  "data",
  OUTPUT_FILENAME,
);

const PROVINCE_KEYWORDS = [
  "KOSHI",
  "MADHESH",
  "BAGMATI",
  "GANDAKI",
  "LUMBINI",
  "KARNALI",
  "SUDURPASHCHIM",
];

function runAbsoluteAppend() {
  try {
    let jsonResult = [];

    // DEBUG LOGS: Let's see where Node is actually looking on your hard drive!
    console.log("--------------------------------------------------");
    console.log(`🔍 CURRENT SCRIPT LOCATION: ${__dirname}`);
    console.log(`📂 LOOKING FOR EXISTING JSON AT: ${jsonOutputPath}`);
    console.log("--------------------------------------------------");

    // Check if the file exists
    if (fs.existsSync(jsonOutputPath)) {
      console.log(
        `✅ SUCCESS: Found existing ${OUTPUT_FILENAME}. Reading data...`,
      );
      const existingRaw = fs.readFileSync(jsonOutputPath, "utf-8");
      try {
        jsonResult = JSON.parse(existingRaw);
        console.log(
          `📦 Loaded ${jsonResult.length} old entries safely into memory.`,
        );
      } catch (e) {
        console.log(
          "⚠️ WARNING: Existing JSON file was empty or corrupted. Starting fresh.",
        );
        jsonResult = [];
      }
    } else {
      console.log(
        `❌ FILE NOT FOUND: No file exists at that JSON path yet. Creating a brand new array.`,
      );
    }

    // Read the new CSV
    console.log(`📖 Reading new CSV data from: ${csvFilePath}`);
    if (!fs.existsSync(csvFilePath)) {
      console.error(
        `❌ CRITICAL: The CSV file "${INPUT_FILENAME}" does not exist in this directory!`,
      );
      return;
    }

    const rawContent = fs.readFileSync(csvFilePath, "utf-8");
    const lines = rawContent
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    let dataRowsStart = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].toLowerCase().startsWith("area,sex,age group")) {
        dataRowsStart = i + 1;
        break;
      }
    }

    let currentProvince = "";
    let newEntriesCount = 0;

    for (let i = dataRowsStart; i < lines.length; i++) {
      const row = lines[i].split(",").map((cell) => cell.trim());
      if (row.length < 14) continue;

      const rawArea = row[0];
      const areaUpper = rawArea.toUpperCase();
      const sexField = row[1];
      const ageField = row[2];

      let districtName = "";

      const foundKeyword = PROVINCE_KEYWORDS.find((prov) =>
        areaUpper.includes(prov),
      );

      if (foundKeyword) {
        currentProvince =
          foundKeyword.charAt(0).toUpperCase() +
          foundKeyword.slice(1).toLowerCase();
        districtName = "All";
      } else if (
        sexField === "Total" &&
        ageField === "All Ages" &&
        !currentProvince
      ) {
        currentProvince =
          rawArea.charAt(0).toUpperCase() +
          rawArea.slice(1).toLowerCase().replace(" province", "");
        districtName = "All";
      } else {
        districtName = rawArea;
        if (!currentProvince) {
          const cleanFileName = INPUT_FILENAME.split(".")[0];
          currentProvince =
            cleanFileName.charAt(0).toUpperCase() +
            cleanFileName.slice(1).toLowerCase();
        }
      }

      const entry = {
        province: currentProvince,
        district: districtName,
        sex: sexField,
        ageGroup: ageField.replace(/\s+/g, " "),
        total: parseInt(row[3], 10) || 0,
        causes: {
          communicable: parseInt(row[4], 10) || 0,
          nonCommunicable: parseInt(row[5], 10) || 0,
          roadAccident: parseInt(row[6], 10) || 0,
          otherAccident: parseInt(row[7], 10) || 0,
          pregnancyRelated: parseInt(row[8], 10) || 0,
          crime: parseInt(row[9], 10) || 0,
          suicide: parseInt(row[10], 10) || 0,
          naturalDisaster: parseInt(row[11], 10) || 0,
          other: parseInt(row[12], 10) || 0,
          notStated: parseInt(row[13], 10) || 0,
        },
      };

      jsonResult.push(entry);
      newEntriesCount++;
    }

    // Ensure target output folder exists
    const dir = path.dirname(jsonOutputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Write everything back out
    fs.writeFileSync(
      jsonOutputPath,
      JSON.stringify(jsonResult, null, 2),
      "utf-8",
    );
    console.log("--------------------------------------------------");
    console.log(
      `🚀 DONE: Appended ${newEntriesCount} rows from ${INPUT_FILENAME}.`,
    );
    console.log(`📊 TOTAL ENTRIES NOW SAVED IN FILE: ${jsonResult.length}`);
    console.log("--------------------------------------------------");
  } catch (err) {
    console.error("❌ Execution Error:", err.message);
  }
}

runAbsoluteAppend();
