import bcrypt from "bcrypt"
import { getRequiredEnv } from "./getRequiredEnv"

const SALT = parseInt(getRequiredEnv("SALT"), 10)

export const generateHash = async (value: string): Promise<string> => {
  return await bcrypt.hash(value, SALT)
}
