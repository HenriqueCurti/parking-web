import { string, z } from 'zod';

export const formSchema = z.object({
    name: string().min(1, "O nome é um campo obrigatório"),
    email: string().email("Por favor, digite um e-mail válido"),
    password: string().min(6, "A senha deve conter no mínimo 6 caracteres")
})
