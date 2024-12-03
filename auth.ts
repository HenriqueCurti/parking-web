import NextAuth from "next-auth"
import Crendentials from "next-auth/providers/credentials"
import {loginAction} from "./app/login/loginAction";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Crendentials({
    credentials:{
        email: {type: "email"},
        password: {type: "password"}
    },
    authorize: async (credentials) => {   
      
      console.log(credentials.email);      

        const user = await loginAction(credentials.email as string, credentials.password as string);  
        
        return user;
    }
  })],
})