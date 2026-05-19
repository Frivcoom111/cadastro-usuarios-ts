import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../errors/AppError";

export const errorHandler = ( error: Error, req: Request, res: Response, next: NextFunction): void => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ error: error.message });
    return;
  }

  if (error instanceof ZodError) {
    res.status(400).json({ error: error.format() });
    return;
  }

  console.error(error);
  res.status(500).json({ error: "Erro interno do servidor." });
};
