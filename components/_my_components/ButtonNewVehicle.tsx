"use client";

import * as React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon, SearchIcon } from "lucide-react";

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
import { handleInicializaVaga } from "@/app/loja/vagas/actionInicializaVaga";
import Spinner from "./Spinner";

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
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
  
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
  
    async function onSubmit(values: FormData) {
      if (!combinedDateTime) {
        alert("Por favor, selecione uma data e hora válidas.");
        return;
      }
      
      const valueData = {
        ...values,
        checkin: combinedDateTime
      }           

      setIsLoading(true); // Inicia o carregamento

      try {
        await handleInicializaVaga(valueData);
        //alert(`Formulário enviado com sucesso: ${JSON.stringify(valueData, null, 2)}`);
        setIsDialogOpen(false); // Fecha o diálogo
      } catch (error) {
        console.error("Erro ao enviar o formulário:", error);
        alert("Ocorreu um erro ao enviar o formulário.");
      } finally {
        setIsLoading(false); // Finaliza o carregamento
      }
    }
  
    return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                          <SearchIcon className="w-4 h-4 text-gray-500" />
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
                <Button type="submit" disabled={isLoading}> {isLoading ? <Spinner /> : "Salvar"} </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
}
