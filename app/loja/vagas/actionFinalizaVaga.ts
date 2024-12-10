'use server'

import { revalidatePath } from 'next/cache'
import { finalizarVaga } from '@/lib/db/vagas'

export async function handleFinalizarVaga(data: any) {
    try {
        const now = new Date()
        const formattedDate = now.toISOString().slice(0, 19).replace("T", " ");

        const vagaData = {
            plate: data.plate as string,
            garageId: data.garageId as string,
            userId: "1",
            checkin: data.checkin as string,
            checkout: formattedDate as string
        };
        
        await finalizarVaga(vagaData)
        revalidatePath('/loja/vagas')
    } catch (error) {
        console.error(error)
        throw error
    }
}