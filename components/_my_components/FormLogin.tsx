'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authSchema } from '@/src/schemas/authSchema';
import { z } from 'zod';

import { Button} from '../ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Input } from '../ui/input';

type FormData = z.infer<typeof authSchema>;

export const FormLogin = () => {

    const form = useForm<z.infer<typeof authSchema>>({
        resolver: zodResolver(authSchema),
        defaultValues: {
          email: "",
          password: ""
        },
      });    

    const onSubmit = (data: FormData) => {
        console.log(data);
        
    }
    
    return (
        <div className='w-2/5 space-y-2 p-8 bg-gray-800 rounded-lg'>
            <p className='flex justify-center items-center text-8'>Login</p>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="border border-gray-200 dark:border-gray-700 space-y-4 p-8 bg-gray-800 rounded-lg">                          
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                        <Input type='email' placeholder="Digite seu e-mail" {...field} />
                    </FormControl>
                    <FormDescription>
                        
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                        <Input type='password' {...field} />
                    </FormControl>
                    <FormDescription>
                        
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" className='w-full font-bold'>Entrar</Button>                
            </form>
            </Form>
            <p className='flex justify-center items-center'>Ainda não é registrado? Realize o <span className='px-1 text-blue-600'> <a href="/cadastro">cadastro</a> </span> agora!</p>
        </div>
    )

}