import "reflect-metadata";
import "dotenv/config";
import app from "./app";
import { getRequiredEnv } from "./utils/getRequiredEnv";
import AppDataSource from "./config/database";

const PORT = getRequiredEnv("PORT");

AppDataSource.initialize()
  .then(() => {
    console.log("Conectado ao banco de dados.");

    app.listen(PORT, () => {
      console.log(`Servidor rodando: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error:", error);
  });
