'use client'

import { ColumnDef } from '@tanstack/react-table'

export type Vacancy = {
    garageId: number | null
    vehicleTypeId: number | null
    descVehicleType: string
    amount: number
    price: number
}

export const columns: ColumnDef<Vacancy>[] = [
    {
        accessorKey: "descVehicleType",
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