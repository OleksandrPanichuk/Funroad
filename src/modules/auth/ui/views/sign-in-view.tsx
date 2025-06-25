'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/modules/auth/schemas'
import { z } from 'zod'
import Link from 'next/link'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useTRPC } from '@/trpc/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type FormValues = z.infer<typeof loginSchema>

const poppins = Poppins({
  weight: ['700'],
  subsets: ['latin'],
})

export const SignInView = () => {
  const router = useRouter()

  const trpc = useTRPC()
  const queryClient = useQueryClient()

  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
  })

  const { mutate: login, isPending } = useMutation(
    trpc.auth.login.mutationOptions({
      onError: (error) => {
        toast.error(error.message)
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.auth.session.queryFilter())
        router.push('/')
      },
    }),
  )

  const onSubmit = (values: FormValues) => {
    login(values)
  }

  return (
    <div className={'grid grid-cols-1 lg:grid-cols-5'}>
      <div
        className={'bg-[#f4f4f0] h-screen w-full lg:col-span-3 overflow-y-auto'}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={'flex flex-col gap-8 p-4 lg:p-16'}
          >
            <div className={'flex items-center justify-between mb-8'}>
              <Link href={'/'}>
                <span
                  className={cn('text-2xl font-semibold', poppins.className)}
                >
                  funroad
                </span>
              </Link>
              <Button
                variant={'ghost'}
                size={'sm'}
                className={'text-base border-none underline'}
                asChild
              >
                <Link href={'/sign-up'} prefetch>
                  Sign up
                </Link>
              </Button>
            </div>
            <h1 className={'text-4xl font-medium'}>Welcome back to Funroad!</h1>
            <FormField
              name={'email'}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={'text-base'}>Email</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={'password'}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={'text-base'}>Password</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} type={'password'} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type={'submit'}
              size={'lg'}
              variant={'elevated'}
              disabled={isPending}
              className={
                'bg-black text-white hover:bg-pink-400 hover:text-white'
              }
            >
              Log in
            </Button>
          </form>
        </Form>
      </div>
      <div
        className={'h-screen w-full lg:col-span-2 hidden lg:block'}
        style={{
          backgroundImage: "url('/auth-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </div>
  )
}
