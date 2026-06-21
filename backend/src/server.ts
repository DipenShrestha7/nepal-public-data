import Fastify from "fastify";
import sequelize from "#/config/db";

const app = Fastify();

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    await app.listen({ port: 3000 });
    console.log("Server running on http://localhost:3000");
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
};

start();
