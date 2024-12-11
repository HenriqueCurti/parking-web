// import { z } from "zod";
//
// export const configSchema = z.object({
//     id: z.string().min(1, "Id do estabelecimento inválido, favor verifique"),
//     name: z.string().min(1, "O nome do estabelecimento não pode ser nulo"),
//     state: z.string().min(1, "O estado não pode ser nulo"),
//     city: z.string().min(1, "A cidade não pode ser nula"),
//     street: z.string().min(1, "A rua não pode ser nula"),
//     number: z.number().min(1, "O número não pode ser nulo"),
//     services: z
//       .array(
//         z.object({
//           vehicleTypeId: z.string().min(1, "Id do tipo de veículo inválido, favor verifique"),
//           describe: z.string().min(1, "A descrição do serviço não pode ser nula"),
//           amount: z.number().min(1, "A quantidade de vagas disponíveis não pode ser nula"),
//           price: z.number().min(0, "O valor da hora de estacionamento não pode ser negativo"),
//         })
//       )
//       .min(1, "É necessário informar ao menos um serviço"),
//     schedule: 
//         z.array(
//           z.object({
//             diasSelecionados: z.array(z.object({
//                 domingo: z.boolean().default(false),
//                 segunda: z.boolean().default(true),
//                 terca: z.boolean().default(true),
//                 quarta: z.boolean().default(true),
//                 quinta: z.boolean().default(true),
//                 sexta: z.boolean().default(true),
//                 sabado: z.boolean().default(true)
//             })), 
//             abertura: z.string().min(1, "A hora de abertura não pode ser nula"),
//             encerramento: z.string().min(1, "A hora de encerramento não pode ser nula"),
//         })
//     ).min(1, "É necessário informar ao menos um horário"),    
//   });

export type diasSelecionado = {
    domingo: boolean
    segunda: boolean 
    terca: boolean 
    quarta: boolean 
    quinta: boolean 
    sexta: boolean 
    sabado: boolean
}

export type service = {
    vehicleTypeId: string
    describe: string
    amount: string
    price: string
}

export type schedule = {
    abertura: string
    encerramento: string
    diasSelecionados?: diasSelecionado[]
}
  
export type Garagem = {
    id?: string
    name?: string
    state?: string
    city?: string
    street?: string
    number?: string   
    services?: service[]
    schedules?: schedule[]
}