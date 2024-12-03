'user server'

import { signIn } from "@/auth";

export default async function (email: string, password: string) {

    console.log("==== User Login ====");         

    await signIn("credentials", {
        email: email as string, 
        password: password as string, 
        redirect: true,
        redirectTo: "/loja"
    })

}
