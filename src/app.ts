import express from "express";
import userRoutes from "./routes/users.routes";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import cors from "cors";
import { getRequiredEnv } from "./utils/getRequiredEnv";

const app = express();
app.use(express.json());

app.use(cors({
    origin: getRequiredEnv("FRONTEND_URL"),
    methods: "GET, POST, PATCH, PUT, DELETE",
}));

app.use("/users", userRoutes);

app.use(errorHandler);

export default app;