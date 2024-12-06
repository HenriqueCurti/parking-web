import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
 
async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  const list = await fetch("https://b3tecnologia.com/EstacionaAqui/getReservaAbertas.php?idGarage=1")
                     .then(res => res.json())
                     .then(data => {return data});
   return list; 
   
}

const VagasPage = async () => {
    const data = await getData()

    return <div className="flex justify-center h-[80%] w-full">
        <div className="fixed top-24 h-full w-[80%] max-w-[80%]:">
            <DataTable columns={columns} data={data} />
        </div>         
    </div>
}

export default VagasPage;