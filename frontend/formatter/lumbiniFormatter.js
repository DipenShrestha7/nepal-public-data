import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target file configurations
const INPUT_FILENAME = "./Mortality CSV Files/lumbini.csv";
const OUTPUT_FILENAME = "mortality_clean.json";

const csvFilePath = path.join(__dirname, INPUT_FILENAME);
const jsonOutputPath = path.join(
  __dirname,
  "..",
  "public",
  "data",
  OUTPUT_FILENAME,
);

// Targeted tracking list of Lumbini districts to verify records against
const LUMBINI_DISTRICTS = [
  "RUKUM (EAST)",
  "ROLPA",
  "PYUTHAN",
  "GULMI",
  "ARGHAKHANCHI",
  "PALPA",
  "NAWALPARASI (WEST)",
  "RUPANDEHI",
  "KAPILVASTU",
  "DANG",
  "BANKE",
  "BARDITYA",
  "BARDIA",
];

function runLumbiniMigration() {
  try {
    let masterCollection = [];

    // 1. Read existing clean JSON data store if it exists to append to it
    if (fs.existsSync(jsonOutputPath)) {
      try {
        masterCollection = JSON.parse(fs.readFileSync(jsonOutputPath, "utf-8"));
        console.log(
          `📂 Loaded ${masterCollection.length} historical entries from master json store.`,
        );
      } catch (e) {
        masterCollection = [];
      }
    }

    console.log(`📖 Parsing Lumbini resource dataset: ${INPUT_FILENAME}`);
    const rawContent = fs.readFileSync(csvFilePath, "utf-8");
    const lines = rawContent
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    let dataRowsStart = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].toLowerCase().startsWith("area,sex,age group")) {
        dataRowsStart = i + 1;
        break;
      }
    }

    const localFileEntries = [];

    // 2. Loop through and parse individual rows
    for (let i = dataRowsStart; i < lines.length; i++) {
      const row = lines[i].split(",").map((cell) => cell.trim());
      if (row.length < 14) continue;

      const rawArea = row[0];
      const areaUpper = rawArea.toUpperCase();
      const sexField = row[1];
      const ageField = row[2].replace(/\s+/g, " ");

      // Double-check row validity against target scope list
      if (!LUMBINI_DISTRICTS.includes(areaUpper)) continue;

      const entry = {
        province: "Lumbini",
        district: rawArea,
        sex: sexField,
        ageGroup: ageField,
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

      localFileEntries.push(entry);
    }

    // 3. MATH MATRIX AGGREGATION FOR LUMBINI TOTALS
    console.log(
      "⚠️ Summary rows missing for Lumbini Province. Computing matrix calculations...",
    );

    const sexOptions = ["Total", "Male", "Female"];
    const distinctAges = Array.from(
      new Set(localFileEntries.map((e) => e.ageGroup)),
    );
    const syntheticSummaryRows = [];

    sexOptions.forEach((sex) => {
      distinctAges.forEach((age) => {
        // Collect rows matching current gender & age parameters from all districts
        const targetSubgroupRows = localFileEntries.filter(
          (e) => e.sex === sex && e.ageGroup === age,
        );

        if (targetSubgroupRows.length === 0) return;

        // Construct the synthetic "All" row for this specific intersection
        const aggregateRow = {
          province: "Lumbini",
          district: "All",
          sex: sex,
          ageGroup: age,
          total: 0,
          causes: {
            communicable: 0,
            nonCommunicable: 0,
            roadAccident: 0,
            otherAccident: 0,
            pregnancyRelated: 0,
            crime: 0,
            suicide: 0,
            naturalDisaster: 0,
            other: 0,
            notStated: 0,
          },
        };

        // Combine the numbers
        targetSubgroupRows.forEach((src) => {
          aggregateRow.total += src.total;
          Object.keys(aggregateRow.causes).forEach((key) => {
            aggregateRow.causes[key] += src.causes[key];
          });
        });

        syntheticSummaryRows.push(aggregateRow);
      });
    });

    // 4. Prepend the computed provincial summary matrices right before the districts
    localFileEntries.unshift(...syntheticSummaryRows);
    console.log(
      `✨ Successfully generated ${syntheticSummaryRows.length} total metric rows for Lumbini (All).`,
    );

    // 5. Append to the master array stack and write out
    masterCollection.push(...localFileEntries);

    const targetDir = path.dirname(jsonOutputPath);
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

    fs.writeFileSync(
      jsonOutputPath,
      JSON.stringify(masterCollection, null, 2),
      "utf-8",
    );
    console.log(
      `🚀 Success! Total combined data entries now in file: ${masterCollection.length}`,
    );
  } catch (err) {
    console.error("Critical Execution Error:", err.message);
  }
}

runLumbiniMigration();
