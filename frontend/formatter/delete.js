import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🛠️ Force Absolute Path to your master JSON file
const jsonOutputPath =
  "C:\\Coding\\nepal-public-data\\frontend\\public\\data\\mortality_clean.json";

function resetSudurpaschimData() {
  try {
    if (!fs.existsSync(jsonOutputPath)) {
      console.error(`❌ Error: The file does not exist at ${jsonOutputPath}`);
      return;
    }

    // 1. Read the current data
    const rawData = fs.readFileSync(jsonOutputPath, "utf-8");
    const existingData = JSON.parse(rawData);
    console.log(`📊 Current total records in file: ${existingData.length}`);

    // 2. Filter out EVERYTHING matching "Sudurpaschim" (Case-Insensitive)
    const cleanedData = existingData.filter((item) => {
      // Keep the row only if it doesn't have a province, or if the province name is NOT Sudurpaschim
      if (!item.province) return true;
      return item.province.trim().toLowerCase() !== "sudurpaschim";
    });

    const removedCount = existingData.length - cleanedData.length;

    // 3. Save the clean records back to the file
    fs.writeFileSync(
      jsonOutputPath,
      JSON.stringify(cleanedData, null, 2),
      "utf-8",
    );

    console.log(
      `✨ Successfully deleted ${removedCount} Sudurpaschim records.`,
    );
    console.log(
      `🚀 Master file updated! New total records: ${cleanedData.length}`,
    );
  } catch (err) {
    console.error("❌ An error occurred during the reset:", err.stack);
  }
}

resetSudurpaschimData();
