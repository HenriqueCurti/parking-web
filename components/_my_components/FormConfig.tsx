'use client'

import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";
import { DialogFooter } from "../ui/dialog";
import Spinner from "./Spinner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react"; 
import { SelectTypesVehicles } from "./SelectTypesVehicles";
import { DataTable } from "@/app/loja/configuracao/data-table";
import { columns } from "@/app/loja/configuracao/columns";
import { Vacancy } from "@/app/loja/configuracao/columns";
import { ToggleDias } from "@/app/loja/configuracao/ToggleDias";


export default function FormConfig() {

    type FormData = z.infer<typeof formSchema>;
    
    const formSchema = z.object({
        plate: z.string().length(7, "Placa deve ter exatamente 7 caracteres"),
        vehicle: z.string().nonempty("Modelo é obrigatório"),
        color: z.string().optional(),
        owner: z.string().optional(),
        checkin: z.date({ required_error: "Data de entrada é obrigatória" }),
      });
    
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

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const data = {
        garageId: 1,
        vehicleTypeId: 1,
        descVehicleType: "Carro",
        amount: 30,
        price: 5
    }

    async function onSubmit(values: FormData) {                              
          
  
        setIsLoading(true); // Inicia o carregamento
  
        try {
          //await handleInicializaVaga(valueData);
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
        <div>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex justify-around">
                    {/* Coluna: 1 */}
                    <div className="w-[45%]">
                        {/* Campo: Placa */}
                        <FormField
                            control={form.control}
                            name="plate"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                <Input {...field} placeholder="Digite o nome do estabelecimento" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <div className="flex ">
                            <div className="w-[95%] mr-2">
                                {/* Campo: Veículo */}
                                <FormField
                                    control={form.control}
                                    name="vehicle"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Logradouro</FormLabel>
                                        <FormControl>
                                        <Input {...field} placeholder="Digite o nome rua" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                            </div>
                            
                            <div>
                                {/* Campo: Cor */}
                                <FormField
                                    control={form.control}
                                    name="color"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Número</FormLabel>
                                        <FormControl>
                                        <Input {...field} placeholder="Digite o número" />
                                        </FormControl>
                                    </FormItem>
                                    )}
                                />
                            </div>        
                            
                        </div>

                        <div className="flex border-b-2 pb-4">
                            <div className="w-[95%] mr-2">
                                {/* Campo: Proprietário */}
                                <FormField
                                    control={form.control}
                                    name="owner"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cidade</FormLabel>
                                        <FormControl>
                                        <Input {...field} placeholder="Digite a cidade da garagem" />
                                        </FormControl>
                                    </FormItem>
                                    )}
                                />     
                            </div>
                            
                            <div>
                                {/* Campo: Proprietário */}
                                <FormField
                                    control={form.control}
                                    name="owner"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Estado</FormLabel>
                                        <FormControl>
                                        <Input {...field} placeholder="Digite o estado" />
                                        </FormControl>
                                    </FormItem>
                                    )}
                                />    
                            </div>        
                            
                        </div>  
                        
                        <div className="mt-6">                        

                            {/* Campo: Proprietário */}
                            <FormField
                                control={form.control}
                                name="owner"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Dias de Funcionamento</FormLabel>
                                    <FormControl>
                                    <ToggleDias />
                                    </FormControl>
                                </FormItem>
                                )}
                            /> 

                            <div className="flex justify-between">
                                <div className="mt-2 w-[45%]">
                                    {/* Campo: Proprietário */}
                                    <FormField
                                        control={form.control}
                                        name="owner"
                                        render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Abertura</FormLabel>
                                            <FormControl>
                                            <Input {...field} placeholder="Horário de abertura" />
                                            </FormControl>
                                        </FormItem>
                                        )}
                                    />     
                                </div>
                                
                                <div className="mt-2 w-[45%]">
                                    {/* Campo: Proprietário */}
                                    <FormField
                                        control={form.control}
                                        name="owner"
                                        render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Fechamento</FormLabel>
                                            <FormControl>
                                            <Input {...field} placeholder="Horário de fechamento" />
                                            </FormControl>
                                        </FormItem>
                                        )}
                                    />    
                                </div>                                                                 
                                
                            </div>
                        </div>    

                                                                                                          
                    </div>
                    
                    {/* Coluna: 2 */}                    
                    <div className="w-[45%]">
                    <div className="">                        

                        {/* Campo: Proprietário */}
                        <FormField
                            control={form.control}
                            name="owner"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tipos de Veículo</FormLabel>
                                <FormControl>
                                <SelectTypesVehicles /> 
                                </FormControl>
                            </FormItem>
                            )}
                        /> 

                        <div className="flex justify-between mb-4 border-b-2 pb-4">
                            <div className="mt-2">
                                {/* Campo: Proprietário */}
                                <FormField
                                    control={form.control}
                                    name="owner"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quantidade de Vagas</FormLabel>
                                        <FormControl>
                                        <Input {...field} placeholder="Vagas disponíveis" />
                                        </FormControl>
                                    </FormItem>
                                    )}
                                />     
                            </div>
                            
                            <div className="mt-2">
                                {/* Campo: Proprietário */}
                                <FormField
                                    control={form.control}
                                    name="owner"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Valor</FormLabel>
                                        <FormControl>
                                        <Input {...field} placeholder="Valor da hora" />
                                        </FormControl>
                                    </FormItem>
                                    )}
                                />    
                            </div>

                            <div className=" flex mt-2 items-end">
                                <Button className="items-end" type="submit" disabled={isLoading}> {isLoading ? <Spinner /> : "Adicionar"} </Button>
                            </div>  

          
    
                            </div>
                        </div>    
                       <DataTable columns={columns} data={data} />
                        {/* Campo: Placa
                        <FormField
                            control={form.control}
                            name="plate"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                <Input {...field} placeholder="Digite o nome do estabelecimento" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
            
                        {/* Campo: Veículo */}
                        {/* <FormField
                            control={form.control}
                            name="vehicle"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Logradouro</FormLabel>
                                <FormControl>
                                <Input {...field} placeholder="Digite o nome rua" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        /> */}
            
                        {/* Campo: Cor */}
                        {/* <FormField
                            control={form.control}
                            name="color"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Número</FormLabel>
                                <FormControl>
                                <Input {...field} placeholder="Digite o número do endereço" />
                                </FormControl>
                            </FormItem>
                            )}
                        /> */}
            
                        {/* Campo: Proprietário */}
                        {/* <FormField
                            control={form.control}
                            name="owner"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cidade</FormLabel>
                                <FormControl>
                                <Input {...field} placeholder="Digite a cidade da garagem" />
                                </FormControl>
                            </FormItem>
                            )}
                        />      */}

                        {/* Campo: Proprietário */}
                        {/* <FormField
                            control={form.control}
                            name="owner"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Estado</FormLabel>
                                <FormControl>
                                <Input {...field} placeholder="Digite o estado" />
                                </FormControl>
                            </FormItem>
                            )}
                        />           */}
                    </div>
                    
                </div>

  
              <DialogFooter>
                <Button type="submit" disabled={isLoading}> {isLoading ? <Spinner /> : "Salvar"} </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
    )
}