import type { NextFunction, Request, Response } from "express"
import { ZodError } from "zod"
import { AppError } from "../validators/AppError"

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ error: error.message })
    return
  }

  if (error instanceof ZodError) {
    res.status(400).json({ error: error.format() })
    return
  }

  console.error(error)
  res.status(500).json({ error: "Erro interno do servidor." })
}
