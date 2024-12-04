'use server'

import { signIn } from "@/auth";

export default async function userLogin (email: string, password: string) {

    console.log("==== User Login ====");         

    try {
        await signIn("credentials", {
          email: email,
          password: password,
          redirect: true,
          redirectTo: "/loja"
        });
      } catch (error) {
        console.error("Erro no login:", error);
        throw error;
      }

}

