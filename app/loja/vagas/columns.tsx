'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

export type Payment = {
    reservationId: number
    vehicleDescription: string
    plate: string
    color: string
    checkin: string
    checkout: string
    reservationStatus: string
    userName: string
    userEmail: string
}

export async function handleSubmit(value: any){

    const now = new Date()
    const formattedDate = now.toISOString().slice(0, 19).replace("T", " ");

    const data = {
        plate: value.original.plate,
        garageId: value.original.garageId,
        userId: "1",
        checkin: value.original.checkin,
        checkout: formattedDate
    };
    
    try {
        await fetch('https://b3tecnologia.com/EstacionaAqui/postReserva.php', {            
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data),
            method: "POST",
            mode: "cors",
            cache: "no-cache"
        })
    } catch (error) {
        console.log(error);        
    }
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "reservationId",
        header: "Ticket"
    },
    {
        accessorKey: "vehicleDescription",
        header: "Veículo"
    },
    {
        accessorKey: "plate",
        header: "Placa",
    },
    {
        accessorKey: "color",
        header: "Cor",
    },
    {
        accessorKey: "checkin",
        header: "Entrada"
    },
    {
        accessorKey: "checkout",
        header: "Saída",
    },
    {
        accessorKey: "reservationStatus",
        header: "Status",
    },
    {
        accessorKey: "userName",
        header: "Proprietário"
    },
    {
        accessorKey: "userEmail",
        header: "E-mail Proprietário",
    },
    {
        id: "acao",
        header: "Ação",
        cell: ({row}) => (                           
            
            // <Button onClick={() => handleSubmit(row)} className='' >
            //    Finalizar
            // </Button>
            <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Finalizar</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirma a baixa do Veículo?</AlertDialogTitle>          
          <AlertDialogDescription asChild>
            <div className='flex flex-col'>
                <div>
                   Placa:   {row.original.plate}  
                </div>                                  
                <div>
                   Modelo : {row.original.vehicleDescription}
                </div>
                <div>
                   Cor:     {row.original.color}
                </div> 
                <div>
                  Entrada:   {row.original.checkin}  
                </div>                                  
                <div>
                  Saída:   {`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`}  
                </div>                                                 
            </div>
                      
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={async () => await handleSubmit(row)}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
           
        ) 
    }
]