import z, { string } from "zod"

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6)
})

export const signupSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6)
})