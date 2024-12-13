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
import { getConfig, gravarConfig } from "@/lib/db/configuracao";
import { PlusIcon, SaveIcon } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";


var InitialSchedule: string[] = [];
var list: Garagem;

await getConfig().then((data) => {
  data.schedules?.forEach((schedule) => {
    Object.entries(schedule).forEach(([dia, ativo]) => {
      if (ativo) {
        InitialSchedule.push(dia); // Adiciona o nome do dia se `ativo` for true
      }
    });
  });

  list = data;
});

export default function FormConfig() {

    const [garage, setGarage] = useState<Garagem>(list?list:{
        id:0,
        name:"",
        city:"",
        number:0,
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
        vehicleTypeId: number
        describe: string
        amount: number
        price: number
    }
        
    const [servico, setServico] = useState<newService>({
        vehicleTypeId:0,
        amount:0,
        describe:"",
        price:0
    });

    const [diasSemana, setDiasSemana] = useState<string[]>(InitialSchedule?InitialSchedule:[])
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateInputs = () => {
      const newErrors: Record<string, string> = {};
    
      if (!garage.name) newErrors.name = "O nome do estabelecimento é obrigatório.";
      if (!garage.street) newErrors.street = "O logradouro é obrigatório.";
      if (!garage.number) newErrors.number = "O número é obrigatório.";
      if (!garage.city) newErrors.city = "A cidade é obrigatória.";
      if (!garage.state) newErrors.state = "O estado é obrigatório.";
      if (!garage.abertura) newErrors.abertura = "O horário de abertura é obrigatório.";
      if (!garage.encerramento) newErrors.encerramento = "O horário de encerramento é obrigatório.";
    
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }; 
    
    const validateTypeVehicle = () => {
      const newErrors: Record<string, string> = {};

      if (!servico.vehicleTypeId) newErrors.vehicleTypeId = "Selecione o tipo de veículo.";
      if (!servico.amount || servico.amount < 0) newErrors.amount = "A quantidade deve ser maior que 0.";
      if (!servico.price || servico.price < 0) newErrors.price = "O valor deve ser maior que 0.";
    
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };    

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

    const handleSubmit = async () => {

        if (!validateInputs()) {
          console.log("Erros de validação:", errors);
          return;
        }

        setIsLoading(true); // Inicia o carregamento
        
        try {
          await gravarConfig(garage);
          //alert(`Formulário enviado com sucesso: ${JSON.stringify(valueData, null, 2)}`);
        } catch (error) {
          console.error("Erro ao enviar o formulário:", error);
          alert("Ocorreu um erro ao enviar o formulário.");
        } finally {
          setIsLoading(false); // Finaliza o carregamento
          if(validateInputs()){
            setErrors({});
          }
        }
                
    }

    const handleAddTipo = () => {
        if (!validateTypeVehicle()) {
          console.log("Erros de validação:", errors);
          return;
        }
      
        const typeVehicle = servico.vehicleTypeId;
        let descricao: string;
      
        switch (typeVehicle) {
          case 1:
            descricao = "Moto";
            break;
          case 2:
            descricao = "Carro";
            break;
          case 3:
            descricao = "Caminhonete";
            break;
          case 4:
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
      
        // Atualiza o estado da garagem
        setGarage((prevGarage) => {
          const services = prevGarage?.services || [];
          const serviceIndex = services.findIndex(
            (item) => item.vehicleTypeId === updatedServico.vehicleTypeId
          );
      
          if (serviceIndex !== -1) {
            // Serviço existe, 
            const updatedServices = [...services];            
            
            if(servico.amount === 0 || servico.price === 0){
              updatedServices[serviceIndex] = {};
            }else{
              updatedServices[serviceIndex] = updatedServico;
            }                       
      
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
          amount: 0,
          describe: "",
          price: 0,
          vehicleTypeId: 0,
        });

        // Limpa Erros
        if(validateTypeVehicle()){
          setErrors({});
        }
      };     


    useEffect(() => {         
        handleUpdateDias()
    }, [diasSemana])
    
    return (
        <div className="my-2">           

                 <div className="flex justify-around">
                    
                    <div className="w-[45%]">
                        <div className="mb-2">
                            <Label htmlFor="name">Nome do Estabelecimento</Label>
                            <Input className={errors.name ? "border-red-500" : ""} id="name" value={garage?.name || ''} onChange={(e) => setGarage({...garage, name: e.target.value})} placeholder="Digite o nome do estabelecimento" />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>
                                

                        <div className="flex mb-2">
                            <div className="w-[95%] mr-2">
                                <Label htmlFor="street">Logradouro</Label>
                                <Input className={errors.street ? "border-red-500" : ""} id="street" value={garage?.street || ''} onChange={(e) => setGarage({...garage, street: e.target.value})} placeholder="Digite o nome rua" />
                                {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}
                            </div>
                            
                            <div>
                                <Label htmlFor="number">Número</Label>
                                <Input className={errors.number ? "border-red-500" : ""} id="number" value={garage?.number || ''} onChange={(e) => setGarage({...garage, number: Number(e.target.value)})} placeholder="Digite o número" />
                                {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}
                            </div>        
                            
                        </div>

                        <div className="flex border-b-2 pb-4">
                            <div className="w-[95%] mr-2">
                                
                                <Label htmlFor="city">Cidade</Label>
                                <Input className={errors.city ? "border-red-500" : ""} id="city" value={garage?.city || ''} onChange={(e) => setGarage({...garage, city: e.target.value})} placeholder="Digite a cidade da garagem" />
                                {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                            </div>
                            
                            <div>                                
                                <Label htmlFor="state">Estado</Label>
                                <Input className={errors.state ? "border-red-500" : ""} id="state" value={garage?.state || ''} onChange={(e) => setGarage({...garage, state: e.target.value})} placeholder="Digite o estado" />   
                                {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
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
                                    <Input className={errors.abertura ? "border-red-500" : ""} id="abertura" value={garage?.abertura || ''} onChange={(e) => setGarage({...garage, abertura: e.target.value})} placeholder="Horário de abertura" />
                                    {errors.abertura && <p className="text-red-500 text-sm">{errors.abertura}</p>}
                                </div>
                                
                                <div className="mt-2 w-[45%]">
                                    
                                    <Label htmlFor="encerramento">Encerramento</Label>
                                    <Input className={errors.encerramento ? "border-red-500" : ""} id="encerramento" value={garage?.encerramento || ''} onChange={(e) => setGarage({...garage, encerramento: e.target.value})} placeholder="Horário de fechamento" />
                                    {errors.encerramento && <p className="text-red-500 text-sm">{errors.encerramento}</p>}
                                </div>                                                                 
                                
                            </div>
                        </div>    

                                                                                                          
                    </div>
                    
                                       
                    <div className="w-[45%]">
                    <div className="">                        

                        
                        <Label htmlFor="">Tipo do Veículo</Label>
                        <SelectTypesVehicles
                            field={{
                                value: Number(servico.vehicleTypeId) || 0, // Valor atual do estado `servico`
                                onChange: (value) => setServico({ ...servico, vehicleTypeId: Number(value) }), // Atualiza `servico` no estado
                                onBlur: () => {}, // Caso necessário, adicione lógica de validação ou manipulação ao desfocar
                                className: `${errors.vehicleTypeId ? "border-red-500" : ""}`
                            }}                            
                        />  
                        {errors.vehicleTypeId && <p className="text-red-500 text-sm">{errors.vehicleTypeId}</p>}                      


                        <div className="flex justify-between mb-4 border-b-2 pb-4">
                            <div className="mt-2">
                                                              
                                <Label htmlFor="amount">Quantidade</Label>
                                <Input type="number" className={errors.amount ? "border-red-500" : ""} value={servico.amount || ''} onChange={(e) => setServico({...servico, amount: Number(e.target.value)})} id="amount" placeholder="Vagas disponíveis" />
                                {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
                            </div>
                            
                            <div className="mt-2">
                                
                                <Label htmlFor="price">Valor da hora</Label>
                                <Input type="number" className={errors.price ? "border-red-500" : ""} id="price" value={servico.price || ''} onChange={(e) => setServico({...servico, price: Number(e.target.value)})} placeholder="Valor da hora" />
                                {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                            </div>

                            <div className=" flex mt-2 items-end">
                                <Button className="items-end w-18" onClick={handleAddTipo} disabled={isLoading}> {isLoading ? <Spinner /> : <> <PlusIcon className="mr-1"/> Adicionar</>} </Button>
                            </div>  

          
    
                            </div>
                        </div>    

                       <ScrollArea className="h-60">
                          <DataTable columns={columns} data={garage.services} />
                       </ScrollArea>       

                    </div>
                    
                </div>

  

                <div className="flex justify-end w-[100%] border-t-2 p-4 mx-6">
                    <Button className="w-28 mr-6" onClick={handleSubmit} disabled={isLoading}> {isLoading ? <Spinner /> : <> <SaveIcon className="mr-1" /> Salvar</>} </Button>        
                </div> 

        </div>
    )
}
