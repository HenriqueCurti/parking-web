import db from "@/lib/db";

type User = {
    id: string,
    email: string,
    name: string
};

export async function loginAction (email: string, password: string) : Promise <User | null> {

    console.log("==== Login Action ====");

    console.log(email);
    console.log(password);         

    if(!email || !password){
        return null;      
    }

    // const user = await db.user.findFirst({
    //     where: {
    //         email : email
    //     }
    // })

    const user = {
        id: "1",
        name: "Administrador",
        email: "adm@parking.com",
        password: "123456"
    }

    if(!user){
        return null       
    }

    console.log(user);
    

    const isAuthTrue = user.email === email;

    if(!isAuthTrue){
        return null
    }

    return { id: user.id, name: user.name, email: user.email};
}