import { auth } from "@/auth";
import { FormCadastro } from "@/components/_my_components/FormCadastro";
import { redirect } from "next/navigation";

const CadastroPage = async () => {

  const session = await auth();

  if(session){
    return redirect('/loja')
  }

  return (
    <div className="flex justify-center items-center content-center flex-col h-full ">      
      <FormCadastro />
    </div>
  );
};

export default CadastroPage;
