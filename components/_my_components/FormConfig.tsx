'use client'

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Spinner from "./Spinner";
import { useEffect, useState } from "react"; 
import { SelectTypesVehicles } from "./SelectTypesVehicles";
import { DataTable } from "@/app/loja/configuracao/data-table";
import { columns } from "@/app/loja/configuracao/columns";
import { ToggleDias } from "@/app/loja/configuracao/ToggleDias";
import { Label } from "@radix-ui/react-label";
import { Garagem } from "@/app/loja/configuracao/configSchema";


export default function FormConfig() {

    const [garage, setGarage] = useState<Garagem>({
        id:"",
        name:"",
        city:"",
        number:"",
        abertura: "",
        encerramento: "",
        schedules:[{
            domingo: false,
            segunda: true,
            terca: true,
            quarta: true,
            quinta: true,
            sexta: true,
            sabado: true
        }],
        services:[],
        state:"",
        street:""
    })
    
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

    const [diasSemana, setDiasSemana] = useState<string[]>([])

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const data = [{
        garageId: 1,
        vehicleTypeId: 1,
        descVehicleType: "Carro",
        amount: 30,
        price: 5
    }]

    const handleUpdateDias = () => {       

        setGarage(prevGarage => ({
            ...prevGarage,
            schedules: [{domingo: diasSemana.includes('domingo'),
                segunda: diasSemana.includes('segunda'),
                terca: diasSemana.includes('terca'),
                quarta: diasSemana.includes('quarta'),
                quinta: diasSemana.includes('quinta'),
                sexta: diasSemana.includes('sexta'),
                sabado: diasSemana.includes('sabado')}]
        }));
        
        // Use um callback para garantir que o estado foi atualizado
        setGarage(prevGarage => {
            return prevGarage;
        });
    }

    const handleSubmit = () => {
        console.log("Clicou em salvar");            
        console.log(garage);        
    }

    const handleAddTipo = () => {
        if (servico.vehicleTypeId === '') {
          console.log("Vazio");
          return;
        }
      
        const typeVehicle = servico.vehicleTypeId;
        let descricao: string;
      
        switch (typeVehicle) {
          case "1":
            descricao = "Moto";
            break;
          case "2":
            descricao = "Carro";
            break;
          case "3":
            descricao = "Caminhonete";
            break;
          case "4":
            descricao = "Caminhão";
            break;
          default:
            descricao = "";
            break;
        }
      
        // Atualiza o serviço com a descrição correta localmente
        const updatedServico = {
          ...servico,
          describe: descricao,
        };
      
        console.log(descricao); // Verifica se a descrição está correta
        console.log(updatedServico); // Verifica o objeto atualizado
      
        // Atualiza o estado da garagem
        setGarage((prevGarage) => {
          const services = prevGarage?.services || [];
          const serviceIndex = services.findIndex(
            (item) => item.vehicleTypeId === updatedServico.vehicleTypeId
          );
      
          if (serviceIndex !== -1) {
            // Serviço existe, atualiza
            const updatedServices = [...services];
            updatedServices[serviceIndex] = updatedServico;
      
            return {
              ...prevGarage,
              services: updatedServices,
            };
          } else {
            // Serviço não existe, adiciona
            return {
              ...prevGarage,
              services: [...services, updatedServico],
            };
          }
        });
      
        // Redefine o estado do serviço
        setServico({
          amount: "",
          describe: "",
          price: "",
          vehicleTypeId: "",
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

    useEffect(() => {         
        handleUpdateDias()
    }, [diasSemana])
    
    return (
        <div className="my-2">           

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
                            <ToggleDias field={{
                                value: diasSemana || '', // Valor atual do estado `servico`
                                onChange: (value) => setDiasSemana(value), // Atualiza `servico` no estado
                                onBlur: () => {}, // Caso necessário, adicione lógica de validação ou manipulação ao desfocar
                            }} />


                            <div className="flex justify-between">
                                <div className="mt-2 w-[45%]">
                                    
                                    <Label htmlFor="abertura">Abertura</Label>
                                    <Input id="abertura" value={garage?.abertura || ''} onChange={(e) => setGarage({...garage, abertura: e.target.value})} placeholder="Horário de abertura" />
 
                                </div>
                                
                                <div className="mt-2 w-[45%]">
                                    
                                    <Label htmlFor="encerramento">Encerramento</Label>
                                    <Input id="encerramento" value={garage?.encerramento || ''} onChange={(e) => setGarage({...garage, encerramento: e.target.value})} placeholder="Horário de fechamento" />
  
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
                       <DataTable columns={columns} data={garage.services} />
                    </div>
                    
                </div>

  

                <div className="flex justify-end w-[100%] border-t-2 p-4 mx-6">
                    <Button className="w-32" onClick={handleSubmit} disabled={isLoading}> {isLoading ? <Spinner /> : "Salvar"} </Button>        
                </div> *

        </div>
    )
}
