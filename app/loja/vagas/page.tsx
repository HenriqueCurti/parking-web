import vagasActionTypes from "@/redux/vagas/action-types";
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { getVagas } from "@/lib/db/vagas";
//import { useSelector, useDispatch } from 'react-redux' 

const VagasPage = async () => {

    const data = await getVagas()
  //  const dispatch = useDispatch();

   // dispatch({
   //     type: vagasActionTypes.GETVAGAS,
   //     payload: data
   // });

   /// const { vagasList } = useSelector((rootReducer: any) => rootReducer.vagasList)
   //const data = null;

    return <div className="flex justify-center h-[80%] w-full">
        <div className="fixed top-24 h-full w-[80%] max-w-[80%]:">
            <DataTable columns={columns} data={data} />
        </div>         
    </div>
}

export default VagasPage;