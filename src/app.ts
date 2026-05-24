import cors from "cors"
import express from "express"
import { errorHandler } from "./middlewares/errorHandler.middleware"
import userRoutes from "./routes/users.routes"
import { getRequiredEnv } from "./utils/getRequiredEnv"

const app = express()
app.use(express.json())

app.use(
  cors({
    origin: getRequiredEnv("FRONTEND_URL"),
  }),
)

app.use("/users", userRoutes)

app.use(errorHandler)

export default app
