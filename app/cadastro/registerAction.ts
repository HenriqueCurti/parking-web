'use server'

import { formSchema } from "@/src/schemas/formSchema";
import { hashSync} from 'bcrypt-ts'
import { z } from "zod";
import db from "@/lib/db";

type formData = z.infer<typeof formSchema>;

export default async function registerAction (_prevState: any, form: formData){     
    console.log("=== Action Register User ===")
        
    if(!form.name || !form.email || !form.password){
        return {
            error: 'Todos os dados devem ser preenchidos!'
        } 
    }

    const user = await db.user.findFirst({
        where: {
            email: form.email
        } 
    });

    if(user){
        throw new Error('Usuário já cadastrado!');
    }

    try {
        const res = await db.user.create({
            data: {
                name: form.email,
                email: form.email,
                passhashed: hashSync(form.password)
            }
        })

        return res.id;
    } catch (error) {
        console.log(error);        
    }   
}