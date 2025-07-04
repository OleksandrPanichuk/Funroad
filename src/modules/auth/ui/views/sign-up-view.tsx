'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '@/modules/auth/schemas'
import { z } from 'zod'
import Link from 'next/link'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
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

type FormValues = z.infer<typeof registerSchema>

const poppins = Poppins({
  weight: ['700'],
  subsets: ['latin'],
})

export const SignUpView = () => {
  const router = useRouter()

  const trpc = useTRPC()
  const queryClient = useQueryClient()

  const form = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    mode: 'all',
  })

  const { mutate: register, isPending } = useMutation(
    trpc.auth.register.mutationOptions({
      onError: (error) => {
        toast.error(error.message)
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.auth.session.queryFilter())
        router.push('/')
      },
    }),
  )

  const username = form.watch('username')
  const usernameErrors = form.formState.errors.username

  const showPreview = username && !usernameErrors

  const onSubmit = (values: FormValues) => {
    register(values)
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
                <Link href={'/sign-in'} prefetch>
                  Sign in
                </Link>
              </Button>
            </div>
            <h1 className={'text-4xl font-medium'}>
              Join over 1,580 creators earning money on Funroad.
            </h1>
            <FormField
              name={'username'}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={'text-base'}>Username</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormDescription
                    className={cn('hidden', showPreview && 'block')}
                  >
                    Your store will be available at &nbsp;
                    <strong>{username}</strong>.shop.com
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              Create account
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
