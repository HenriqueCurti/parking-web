import { formSchema } from "@/src/schemas/formSchema";
import { hashSync} from 'bcrypt-ts'
import { z } from "zod";
import db from "@/lib/db";

type FormData = z.infer<typeof formSchema>;

export default async function registerAction (form: FormData){ 
    
    console.log("=== Action Register User ===")
    
    
    if(!form.name || !form.email || !form.password){
        throw new Error('Todos os dados devem ser preenchidos!');
    }

    const user = await db.user.findUnique({
        where: {
            email: form.email
        } 
    });

    if(user){
        throw new Error('Usuário já cadastrado!');
    }

    try {

        console.log(form.email);

        await db.user.create({
            data: {
                name: form.email,
                email: form.email,
                password: hashSync(form.password)
            }
        })
    } catch (error) {
        console.log(error);        
    }

    


}