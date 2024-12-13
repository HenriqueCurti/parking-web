import { Garagem } from "@/app/loja/configuracao/configSchema";


export async function getConfig(): Promise<Garagem> {    
    console.log("carregou tabela");
    
    const config = await fetch("https://b3tecnologia.com/EstacionaAqui/getGarageInfo.php?idGarage=1")
                       .then(res => res.json())
                       .then(data => {return data}); 
        return config                       
}

export async function gravarConfig(data: Garagem) {
    console.log(data);    
    try {
        await fetch('https://b3tecnologia.com/EstacionaAqui/postConfiguracao.php', {            
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data),
            method: "POST",
            mode: "cors",
            cache: "no-cache"
        })
    } finally {
        return;
    } 
}