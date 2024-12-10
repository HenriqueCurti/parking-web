'use server'

import { revalidatePath } from 'next/cache'
import { finalizarVaga } from '@/lib/db/vagas'

export async function handleInicializaVaga(data: any) {
    try {     
        
        const formattedDate = data.checkin.toISOString().slice(0, 19).replace("T", " ");

        const vagaData = {
            plate: data.plate as string,
            garageId: "1" as string,
            userId: "1",
            checkin: formattedDate as string,
            checkout: null
        };  
        
        console.log("Caiu inicializa vaga");
        
        
        await finalizarVaga(vagaData)
        revalidatePath('/loja/vagas')
    } catch (error) {
        console.error(error)
        throw error
    }
}