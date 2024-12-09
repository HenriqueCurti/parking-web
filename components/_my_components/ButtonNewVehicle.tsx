// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { format } from "date-fns";
// import { CalendarIcon } from "lucide-react"; // Ícone para o botão
// import { Calendar } from "@/components/ui/calendar"; // Assuma que o Calendar é do ShadCN
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { useState, useMemo } from "react";
// import { string, z } from "zod";

// export function ButtonNewVehicle() {

//   const [date, setDate] = useState<Date | undefined>();
//   const [time, setTime] = useState<string>("12:00");
//   const [exists, setExists] = useState<boolean | undefined>(true)

//   // Combinar data e horário
//   const combinedDateTime = useMemo(() => {
//     if (!date) return null;
//     const [hours, minutes] = time.split(":").map(Number);
//     const newDate = new Date(date);
//     newDate.setHours(hours, minutes);
//     return newDate;
//   }, [date, time]);


//   const formSchema = z.object({
//     plate : z.string().min(7, "Quantidade inválida de carácteres").max(7, "Quantidade inválida de carácteres"),
//     vehicle: z.string(),
//     color: z.string(),
//     user: z.string(),
//     checkin: z.date()
//   })

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button >Adicionar</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader className="border-b-2 pb-2">
//           <DialogTitle className="mb-1">Entrada de Veículo</DialogTitle>
//           <DialogDescription>
//             Digite a placa do veículo e clique na lupa para iniciar a entrada do registro no sistema.
//           </DialogDescription>
//         </DialogHeader>
//         <div className="grid gap-4 py-2">
//             <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="plate" className="text-right">
//                     Placa
//                 </Label>
//                 <div className="col-span-3 relative">
//                     <Input
//                     id="plate"
//                     className="pr-10"
//                     placeholder="Digite a placa"
//                     />
//                     <Button
//                     type="submit"
//                     className="absolute inset-y-0 right-0 flex items-center px-3"
//                     variant="outline"
//                     >
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth={2}
//                         stroke="currentColor"
//                         className="w-5 h-5 text-gray-500"
//                     >
//                         <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M21 21l-4.35-4.35m1.64-5.21a7 7 0 11-14 0 7 7 0 0114 0z"
//                         />
//                     </svg>
//                     </Button>
//                 </div>
//             </div>

//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="vehicle" className="text-right">
//               Veículo
//             </Label>
//             <Input
//               id="vehicle"
//               className="col-span-3"
//               placeholder="Modelo"
              
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="color" className="text-right">
//               Cor
//             </Label>
//             <Input
//               id="color"
//               className="col-span-3"
//               placeholder="Cor"
//               readOnly={exists}
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="proprietario" className="text-right">
//               Proprietário
//             </Label>
//             <Input
//               id="proprietario"
//               className="col-span-3"
//               placeholder="Proprietário"
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <label htmlFor="checkin" className="text-right">
//                 Entrada
//             </label>
//             <div className="col-span-3 relative">
//                 <Popover>
//                 <PopoverTrigger asChild>
//                     <Button
//                     variant="outline"
//                     className="w-full justify-between"
//                     >
//                     {combinedDateTime
//                         ? format(combinedDateTime, "yyyy-MM-dd HH:mm")
//                         : "Selecione a data e hora"}
//                     <CalendarIcon className="w-4 h-4 ml-2 text-gray-500" />
//                     </Button>
//                 </PopoverTrigger>
//                 <PopoverContent align="start" className="w-auto p-0">
//                     <div className="p-4">
//                     <Calendar
//                         mode="single"
//                         selected={date}
//                         onSelect={setDate}
//                         initialFocus
//                     />
//                     <div className="mt-4 flex items-center">
//                         <Label htmlFor="time" className="mr-2">
//                         Hora:
//                         </Label>
//                         <Input
//                         id="time"
//                         type="time"
//                         value={time}
//                         onChange={(e) => setTime(e.target.value)}
//                         className="border rounded-md px-2 py-1"
//                         />
//                     </div>
//                     </div>
//                 </PopoverContent>
//                 </Popover>
//             </div>
//             </div>
//         </div>
//         <DialogFooter>
//           <Button type="submit">Salvar</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }

"use client";

import * as React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {    
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import{     
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,  
} from '@/components/ui/form'

import {
    Button,
} from '@/components/ui/button';

import {
    Calendar,
} from '@/components/ui/calendar'

import {
  Input,  
} from '@/components/ui/input'
import { Label } from "../ui/label";

const formSchema = z.object({
  plate: z.string().length(7, "Placa deve ter exatamente 7 caracteres"),
  vehicle: z.string().nonempty("Modelo é obrigatório"),
  color: z.string().optional(),
  owner: z.string().optional(),
  checkin: z.date({ required_error: "Data de entrada é obrigatória" }),
});

type FormData = z.infer<typeof formSchema>;

export function ButtonNewVehicle() {
    const [date, setDate] = React.useState<Date | undefined>();
    const [time, setTime] = React.useState<string>("12:00");
  
    const form = useForm<FormData>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        plate: "",
        vehicle: "",
        color: "",
        owner: "",
        checkin: undefined,
      },
    });
  
    // Calcular data e hora combinadas
    const combinedDateTime = React.useMemo(() => {
      if (!date) return null;
      const [hours, minutes] = time.split(":").map(Number);
      const newDate = new Date(date);
      newDate.setHours(hours, minutes);
      return newDate;
    }, [date, time]);
  
    function onSubmit(values: FormData) {
      if (!combinedDateTime) {
        alert("Por favor, selecione uma data e hora válidas.");
        return;
      }
      
      const valueData = {
        ...values,
        checkin: combinedDateTime
      }
  
      alert(`Formulário enviado com sucesso: ${JSON.stringify(valueData, null, 2)}`);
    }
  
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>Adicionar</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Entrada de Veículo</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Campo: Placa */}
              <FormField
                control={form.control}
                name="plate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Placa</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input {...field} placeholder="Digite a placa" className="pr-10" />
                        <Button
                          type="button"
                          variant="outline"
                          className="absolute inset-y-0 right-0 flex items-center px-3"
                        >
                          <CalendarIcon className="w-4 h-4 text-gray-500" />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              {/* Campo: Veículo */}
              <FormField
                control={form.control}
                name="vehicle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Modelo</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Modelo do veículo" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              {/* Campo: Cor */}
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cor</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Cor do veículo" />
                    </FormControl>
                  </FormItem>
                )}
              />
  
              {/* Campo: Proprietário */}
              <FormField
                control={form.control}
                name="owner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proprietário</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Proprietário do veículo" />
                    </FormControl>
                  </FormItem>
                )}
              />
  
              {/* Campo: Entrada */}
              <FormField
                control={form.control}
                name="checkin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entrada</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                        >
                          {combinedDateTime
                            ? format(combinedDateTime, "yyyy-MM-dd HH:mm")
                            : "Selecione a data e hora"}
                          <CalendarIcon className="w-4 h-4 ml-2 text-gray-500" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="w-auto p-0">
                        <div className="p-4">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(selected) => {
                              setDate(selected);
                              field.onChange(selected); // Atualizar no FormField
                            }}
                          />
                          <div className="mt-4 flex items-center">
                            <Label htmlFor="time" className="mr-2">
                              Hora:
                            </Label>
                            <Input
                              id="time"
                              type="time"
                              value={time}
                              onChange={(e) => setTime(e.target.value)}
                            />
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              <DialogFooter>
                <Button type="submit">Salvar</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
}
