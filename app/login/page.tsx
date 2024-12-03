import { FormLogin } from '@/components/_my_components/FormLogin'

import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const LoginPage = async () => {

  const session = await auth();

  if(session){
    return redirect('/loja')
  }
    return (
      <div className="flex justify-center items-center content-center flex-col h-full ">      
        <FormLogin />
      </div>
    )
}

export default LoginPage;