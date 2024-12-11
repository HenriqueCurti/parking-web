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
import { Label } from "@radix-ui/react-label";
import { Garagem } from "@/app/loja/configuracao/configSchema";


export default function FormConfig() {

    const [garage, setGarage] = useState<Garagem>({
        id:"",
        name:"",
        city:"",
        number:"",
        schedules:[],
        services:[],
        state:"",
        street:""
    })

    //type FormData = z.infer<typeof configSchema>;    
   
    //   const form = useForm<FormData>({
    //     resolver: zodResolver(configSchema),
    //     defaultValues: {
    //         id: "",
    //         name: "",
    //         state: "",
    //         city: "",
    //         street: "",
    //         number: undefined,
    //         services: [ {
    //             vehicleTypeId: "",
    //             amount: undefined,
    //             price: undefined,
    //             describe: ""
    //         }],
    //         schedule: [{
    //             diasSelecionados: [{
    //                 domingo: false,
    //                 segunda: true,
    //                 terca: true,
    //                 quarta: true,
    //                 quinta: true,
    //                 sexta: true,
    //                 sabado: true,
    //             }],
    //             abertura: "",
    //             encerramento: ""
    //         }]
    //       },
    //   });
    
    type newService = {
        vehicleTypeId: string
        describe: string
        amount: string
        price: string
    }
    
    const [servico, setServico] = useState<newService>({
        vehicleTypeId:"1",
        amount:"",
        describe:"",
        price:""
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

    const handleSubmit = () => {
        console.log("Clicou em salvar");
        
        console.log(garage);        
    }

    const handleAddTipo = () => {
        setGarage((prevGarage?) => {
            // Garante que prevGarage e prevGarage.services estão inicializados
            const services = prevGarage?.services || [];
    
            // Encontra o índice do serviço com o mesmo vehicleTypeId
            const serviceIndex = services.findIndex(
                (item) => item.vehicleTypeId === servico?.vehicleTypeId
            );
    
            if (serviceIndex !== -1) {
                // Serviço existe, atualiza
                const updatedServices = [...services];
                updatedServices[serviceIndex] = servico; // Substitui o serviço pelo novo
    
                return {
                    ...prevGarage,
                    services: updatedServices,
                };
            } else {
                // Serviço não existe, adiciona
                return {
                    ...prevGarage,
                    services: [...services, servico],
                };
            }
        });
    };

    async function onSubmit(values: FormData) {                              
          
  
        setIsLoading(true); // Inicia o carregamento
  
        try {
          //await handleInicializaVaga(valueData);
          alert(`Formulário enviado com sucesso: ${JSON.stringify(values, null, 2)}`);
          setIsDialogOpen(false); // Fecha o diálogo
        } catch (error) {
          console.error("Erro ao enviar o formulário:", error);
          alert("Ocorreu um erro ao enviar o formulário.");
        } finally {
          setIsLoading(false); // Finaliza o carregamento
        }
      }
    
    return (
        <div className="my-2">
            {/* <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex justify-around">
                    
                    <div className="w-[45%]">
                        
                        <FormField
                            control={form.control}
                            name="name"
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
                               
                                <FormField
                                    control={form.control}
                                    name="street"
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
                                
                                <FormField
                                    control={form.control}
                                    name="number"
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
                                
                                <FormField
                                    control={form.control}
                                    name="city"
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
                               
                                <FormField
                                    control={form.control}
                                    name="state"
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

                            
                            <FormField
                                control={form.control}
                                name="schedule"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Dias de Funcionamento</FormLabel>
                                    <FormControl >
                                    <ToggleDias />
                                    </FormControl>
                                </FormItem>
                                )}
                            /> 

                            <div className="flex justify-between">
                                <div className="mt-2 w-[45%]">
                                    
                                    <FormField
                                        control={form.control}
                                        name="schedule"
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
                                    
                                    <FormField
                                        control={form.control}
                                        name="schedule"
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
                    
                                      
                    <div className="w-[45%]">
                    <div className="">                        

                        
                        <FormField
                            control={form.control}
                            name="services"
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
                                
                                <FormField
                                    control={form.control}
                                    name="schedule"
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
                                
                                <FormField
                                    control={form.control}
                                    name="schedule"
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
                    </div>
                    
                </div>

  
              <DialogFooter>
                <div className="flex justify-end w-[100%] border-t-2 p-4 mx-6">
                    <Button className="w-32" type="submit" disabled={isLoading}> {isLoading ? <Spinner /> : "Salvar"} </Button>        
                </div>
                
              </DialogFooter>
            </form>
          </Form> */}


                 <div className="flex justify-around">
                    
                    <div className="w-[45%]">
                        <div className="mb-2">
                            <Label htmlFor="name">Nome do Estabelecimento</Label>
                            <Input id="name" value={garage?.name || ''} onChange={(e) => setGarage({...garage, name: e.target.value})} placeholder="Digite o nome do estabelecimento" />
                        </div>
                                

                        <div className="flex mb-2">
                            <div className="w-[95%] mr-2">
                                <Label htmlFor="street">Logradouro</Label>
                                <Input id="street" value={garage?.street || ''} onChange={(e) => setGarage({...garage, street: e.target.value})} placeholder="Digite o nome rua" />

                            </div>
                            
                            <div>
                                <Label htmlFor="number">Número</Label>
                                <Input id="number" value={garage?.number || ''} onChange={(e) => setGarage({...garage, number: e.target.value})} placeholder="Digite o número" />
                            </div>        
                            
                        </div>

                        <div className="flex border-b-2 pb-4">
                            <div className="w-[95%] mr-2">
                                
                                <Label htmlFor="city">Cidade</Label>
                                <Input id="city" value={garage?.city || ''} onChange={(e) => setGarage({...garage, city: e.target.value})} placeholder="Digite a cidade da garagem" />
  
                            </div>
                            
                            <div>
                                
                                <Label htmlFor="state">Estado</Label>
                                <Input id="state" value={garage?.state || ''} onChange={(e) => setGarage({...garage, state: e.target.value})} placeholder="Digite o estado" />   
                            </div>        
                            
                        </div>  
                        
                        <div className="my-2">                        

                            
                            <Label >Disponibilidade</Label>
                            <ToggleDias />


                            <div className="flex justify-between">
                                <div className="mt-2 w-[45%]">
                                    
                                    <Label htmlFor="abertura">Abertura</Label>
                                    <Input id="abertura" placeholder="Horário de abertura" />
 
                                </div>
                                
                                <div className="mt-2 w-[45%]">
                                    
                                    <Label htmlFor="encerramento">Encerramento</Label>
                                    <Input id="encerramento" placeholder="Horário de fechamento" />
  
                                </div>                                                                 
                                
                            </div>
                        </div>    

                                                                                                          
                    </div>
                    
                                       
                    <div className="w-[45%]">
                    <div className="">                        

                        
                        <Label htmlFor="">Tipo do Veículo</Label>
                        <SelectTypesVehicles
                            field={{
                                value: servico.vehicleTypeId || '', // Valor atual do estado `servico`
                                onChange: (value) => setServico({ ...servico, vehicleTypeId: value }), // Atualiza `servico` no estado
                                onBlur: () => {}, // Caso necessário, adicione lógica de validação ou manipulação ao desfocar
                            }}
                        />


                        <div className="flex justify-between mb-4 border-b-2 pb-4">
                            <div className="mt-2">
                                                              
                                <Label htmlFor="amount">Quantidade</Label>
                                <Input value={servico.amount || ''} onChange={(e) => setServico({...servico, amount: e.target.value})} id="amount" placeholder="Vagas disponíveis" />
   
                            </div>
                            
                            <div className="mt-2">
                                
                                <Label htmlFor="price">Valor da hora</Label>
                                <Input id="price" value={servico.price || ''} onChange={(e) => setServico({...servico, price: e.target.value})} placeholder="Valor da hora" />
 
                            </div>

                            <div className=" flex mt-2 items-end">
                                <Button className="items-end" onClick={handleAddTipo} disabled={isLoading}> {isLoading ? <Spinner /> : "Adicionar"} </Button>
                            </div>  

          
    
                            </div>
                        </div>    
                       <DataTable columns={columns} data={data} />
                    </div>
                    
                </div>

  

                <div className="flex justify-end w-[100%] border-t-2 p-4 mx-6">
                    <Button className="w-32" onClick={handleSubmit} disabled={isLoading}> {isLoading ? <Spinner /> : "Salvar"} </Button>        
                </div> *

        </div>
    )
}

// 'use client';

// import { z } from "zod";
// import { useForm, useFieldArray } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import Spinner from "./Spinner";
// import { SelectTypesVehicles } from "./SelectTypesVehicles";
// import { DataTable } from "@/app/loja/configuracao/data-table";
// import { columns } from "@/app/loja/configuracao/columns";
// import { ToggleDias } from "@/app/loja/configuracao/ToggleDias";
// import { configSchema } from "@/app/loja/configuracao/configSchema";

// export default function FormConfig() {
//   type FormData = z.infer<typeof configSchema>;

//   const form = useForm<FormData>({
//     resolver: zodResolver(configSchema),
//     defaultValues: {
//       id: "",
//       name: "",
//       state: "",
//       city: "",
//       street: "",
//       number: undefined,
//       services: [
//         {
//           vehicleTypeId: "",
//           describe: "",
//           amount: undefined,
//           price: undefined,
//         },
//       ],
//       schedule: [
//         {
//           diasSelecionados: [{
//             domingo: false,
//             segunda: false,
//             terca: false,
//             quarta: false,
//             quinta: false,
//             sexta: false,
//             sabado: false,
//           }],
//           abertura: "",
//           encerramento: "",
//         },
//       ],
//     },
//   });

//   const { fields: serviceFields, append: appendService } = useFieldArray({
//     control: form.control,
//     name: "services",
//   });

//   const { fields: scheduleFields, append: appendSchedule } = useFieldArray({
//     control: form.control,
//     name: "schedule",
//   });

//   const onSubmit = async (values: FormData) => {
//     console.log("Submitted Data:", values);
//   };

//   return (
//     <div className="my-2">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//           <div className="flex justify-between">
//             <div className="w-[45%]">
//               {/* Dados Básicos */}
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Nome</FormLabel>
//                     <FormControl>
//                       <Input {...field} placeholder="Digite o nome do estabelecimento" />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Endereço */}
//               <FormField
//                 control={form.control}
//                 name="street"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Logradouro</FormLabel>
//                     <FormControl>
//                       <Input {...field} placeholder="Digite o nome da rua" />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Tabela de Serviços */}
//               <div className="mt-6">
//                 <h4>Serviços</h4>
//                 {serviceFields.map((service, index) => (
//                   <div key={service.id} className="flex items-center space-x-4">
//                     <FormField
//                       control={form.control}
//                       name={`services.${index}.vehicleTypeId`}
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Tipo de Veículo</FormLabel>
//                           <FormControl>
//                             <SelectTypesVehicles field={field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name={`services.${index}.amount`}
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Quantidade</FormLabel>
//                           <FormControl>
//                             <Input {...field} placeholder="Quantidade" />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                 ))}
//                 <Button
//                   type="button"
//                   onClick={() => appendService({ vehicleTypeId: "", describe: "", amount: 0, price: 0 })}
//                 >
//                   Adicionar Serviço
//                 </Button>
//               </div>
//             </div>

//             <div className="w-[45%]">
//               {/* Horários */}
//               <div className="mt-6">
//                 <h4>Horários</h4>
//                 {scheduleFields.map((schedule, index) => (
//                   <div key={schedule.id} className="flex items-center space-x-4">
//                     {/* <FormField
//                         control={form.control}
//                         name={`schedule.${index}.diasSelecionados`} // Objeto com chaves dos dias
//                         render={({ field }) => (
//                             <FormItem>
//                             <FormLabel>Dias da Semana</FormLabel>
//                             <FormControl>
//                                 <ToggleDias field={field} />
//                             </FormControl>
//                             <FormMessage />
//                             </FormItem>
//                         )}
//                     /> */}
//                     <FormField
//                       control={form.control}
//                       name={`schedule.${index}.abertura`}
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Abertura</FormLabel>
//                           <FormControl>
//                             <Input {...field} placeholder="00:00" />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                 ))}
//                 <Button
//                   type="button"
//                   onClick={() => appendSchedule({ diasSelecionados: [], abertura: "", encerramento: "" })}
//                 >
//                   Adicionar Horário
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* Botão de Enviar */}
//           <div className="flex justify-end">
//             <Button type="submit">Salvar</Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// }

