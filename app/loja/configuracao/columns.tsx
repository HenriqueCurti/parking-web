'use client'

import { ColumnDef } from '@tanstack/react-table'
import { serviceType } from './configSchema'

// export type Vacancy = {
//     garageId: string | null
//     vehicleTypeId: string | null
//     descVehicleType: string
//     amount: string
//     price: string
// }

export const columns: ColumnDef<serviceType>[] = [
    {
        accessorKey: "describe",
        header: "Tipo Veículo"
    },
    {
        accessorKey: "amount",
        header: "Quantidade"
    },
    {
        accessorKey: "price",
        header: "Valor",
    }
]