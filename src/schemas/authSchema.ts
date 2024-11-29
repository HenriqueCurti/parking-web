import { formSchema } from "./formSchema";

export const authSchema = formSchema.pick({
    email: true,
    password: true
})