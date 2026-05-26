import z from "zod"

export const createUserSchema = z.object({
  name: z.string().min(3, "Mínimo 3 caracteres.").max(100, "Máximo 100 caracteres."),
  email: z.email("E-mail inválido."),
  password: z.string().min(6, "Mínimo 6 caracteres.").max(100, "Máximo 100 caracteres."),
  age: z
    .number({ error: "Idade deve ser um número." })
    .int("Idade deve ser um número inteiro.")
    .min(1, "Idade mínima é 1.")
    .max(120, "Idade máxima é 120."),
  phone: z
    .string()
    .regex(/^\d+$/, "Telefone deve conter apenas dígitos.")
    .min(10, "Mínimo 10 dígitos.")
    .max(11, "Máximo 11 dígitos."),
})

export const updateUserSchema = createUserSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Nenhum campo para atualizar.",
  })

export const idParams = z.object({
  id: z.string().uuid("ID inválido."),
})

export type ICreateUserInput = z.infer<typeof createUserSchema>
export type IUpdateUserInput = z.infer<typeof updateUserSchema>
export type IdParamsInput = z.infer<typeof idParams>
