import { columns } from "./columns"
import { DataTable } from "./data-table"
import { getVagas } from "@/lib/db/vagas";

const VagasPage = async () => {

    const data = await getVagas()

    return <div className="flex justify-center h-[80%] w-full">
        <div className="fixed top-24 h-full w-[80%] max-w-[80%]:">
            <DataTable columns={columns} data={data} />
        </div>         
    </div>
}

export default VagasPage;