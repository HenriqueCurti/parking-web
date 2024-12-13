'use server'

import { formSchema } from "@/src/schemas/formSchema";
import { hashSync} from 'bcrypt-ts'
import { z } from "zod";
import db from "@/lib/db";

type formData = z.infer<typeof formSchema>;

export default async function registerAction (form: formData){     
    console.log("=== Action Register User ===")
        
    if(!form.name || !form.email || !form.password){
        return {
            success: false,
            message: 'Todos os dados devem ser preenchidos!'
        } 
    }

    return {
        success: true,
        message: 'Cadastrado!'
    } 

    // const user = await db.user.findFirst({
    //     where: {
    //         email: form.email
    //     } 
    // });

    // const user = null;

    // if(user){
    //     return {
    //         success: false,
    //         message: 'Usuário já cadastrado!'
    //     } 
    // }

    // try {
    //     const res = await db.user.create({
    //         data: {
    //             name: form.email,
    //             email: form.email,
    //             passhashed: hashSync(form.password)
    //         }
    //     })

    //     return {
    //         success: true,
    //         message: ""
    //     };
    // } catch (error) {
    //     return {
    //         success: false,
    //         message: "Ops, Algo inesperado aconteceu!"
    //     }       
    // }   
}