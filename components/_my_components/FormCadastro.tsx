'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '@/src/schemas/formSchema';
import registerAction from '@/app/cadastro/registerAction';
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
import { useState } from 'react';

import { AlertCircle } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

type FormData = z.infer<typeof formSchema>;

export const FormCadastro = () => {

   //const [state, formAction, isPending] = useActionState(registerAction, null)

   type DataReturn = {
    success: boolean,
    message: string
   }

   const initialState : DataReturn = {
                                        success: true,
                                        message : ""
                                      };

   const [response, setResponse] = useState(initialState);
   const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          email: "",
          password: ""
        },
      });    

    const onSubmit = async (data: FormData) => {     
        setIsLoading(true);   
        setResponse(initialState);
        const result = await registerAction(data);
        setIsLoading(false)
        setResponse(result);
    }
    
    return (
        <div className='w-2/5 space-y-4 p-8 bg-gray-800 rounded-lg'>
          <p className='flex justify-center items-center text-8'>Registro</p>
          {isLoading && (
            <div>
              <p>
                Carregando ...
              </p>
            </div>
          )}
          {response?.success == false && (
            <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {response.message}
            </AlertDescription>
          </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="border border-gray-200 dark:border-gray-700 space-y-4 p-8 rounded-lg">            
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome" {...field} />
                    </FormControl>
                    <FormDescription>
                      
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
              <Button type="submit" className='w-full font-bold'>Cadastrar</Button>              
            </form>
          </Form>
          <p className='flex justify-center items-center'>Já é registrado? Acesse sua conta <span className='px-1 text-blue-600'> <a href="/login">aqui</a> </span>!</p>
        </div>
    )

}