'use server'

import { signOut } from "@/auth";

export default async function userLogout () {

    console.log("Logout clique");
    
    await signOut();
}