import { Payment } from "@/app/loja/vagas/columns";

export type finalizaVaga = {
    plate: string,
    garageId: string,
    userId: string,
    checkin: string,
    checkout: string
}

export async function getVagas(): Promise<Payment[]> {    
    console.log("carregou tabela");
    
    const list = await fetch("https://b3tecnologia.com/EstacionaAqui/getReservaAbertas.php?idGarage=1")
                       .then(res => res.json())
                       .then(data => {return data}); 
        return list                       
    }

export async function finalizarVaga (data: finalizaVaga) {
    console.log("Finalizando vaga");
    
    console.log(data);

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
    } finally {
        await getVagas();
    }      
}