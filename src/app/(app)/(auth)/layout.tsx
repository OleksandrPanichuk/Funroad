import { caller } from '@/trpc/server'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

const AuthLayout = async ({ children }: PropsWithChildren) => {
  const session = await caller.auth.session()

  if (session.user) {
    redirect('/')
  }

  return <>{children}</>
}

export default AuthLayout
