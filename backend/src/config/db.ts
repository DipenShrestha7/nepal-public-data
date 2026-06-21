import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const databaseUrl = process.env.DATABASE_URL || "";

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined in the environment variables");
}

// 1. Check if we are running locally or in production/cloud
const isLocal =
  databaseUrl.includes("localhost") || databaseUrl.includes("127.0.0.1");

const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  dialectOptions: {
    // 2. Only apply SSL configuration if it's NOT a local connection
    ssl: isLocal
      ? false
      : {
          require: true,
          rejectUnauthorized: false,
        },
  },
  logging: false,
});

export default sequelize;
