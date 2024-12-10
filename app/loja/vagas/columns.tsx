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
import { handleFinalizarVaga } from './actionFinalizaVaga'
import Spinner from '@/components/_my_components/Spinner'
import { useState } from 'react'

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
        cell: ({row}) => {
            
            const [isLoading, setIsLoading] = useState(false);

            const handleClick = async () => {
                setIsLoading(true);
                try {
                await handleFinalizarVaga(row.original);
                // Sucesso: Você pode adicionar lógica para atualizar a tabela ou exibir uma mensagem
                } catch (error) {
                console.error("Erro ao finalizar vaga:", error);
                } finally {
                setIsLoading(false);
                }
            };

            return (

            <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" disabled={isLoading}>{isLoading ? (
              <div className="flex items-center">
                <Spinner />
                <span className="ml-2">Processando...</span>
              </div>
            ) : (
              "Finalizar"
            )}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirma a saída do veículo?</AlertDialogTitle>          
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
          <AlertDialogAction disabled={isLoading} onClick={handleClick}>{isLoading ? (
              <div className="flex items-center">
                <Spinner />
                <span className="ml-2">Processando...</span>
              </div>
            ) : (
              "Continue"
            )}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
            )
        } 
    }
]