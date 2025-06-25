'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { MenuIcon } from 'lucide-react'
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PropsWithChildren, useState } from 'react'
import { NavbarSidebar } from './navbar-sidebar'
import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
})

interface INavbarItemProps extends PropsWithChildren {
  href: string
  isActive?: boolean
}

const NavbarItem = ({ href, isActive, children }: INavbarItemProps) => {
  return (
    <Button
      className={cn(
        'bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg',
        isActive && 'bg-black text-white hover:bg-black hover:text-white',
      )}
      variant={'outline'}
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  )
}

const navbarItems = [
  {
    href: '/',
    children: 'Home',
  },
  {
    href: '/about',
    children: 'About',
  },
  {
    href: '/features',
    children: 'Features',
  },
  {
    href: '/pricing',
    children: 'Pricing',
  },
  {
    href: '/contact',
    children: 'Contact',
  },
]

export const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()

  const trpc = useTRPC()

  const { data: session } = useQuery(trpc.auth.session.queryOptions())

  return (
    <nav className="flex h-20 border-b justify-between font-medium bg-white">
      <NavbarSidebar
        items={navbarItems}
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />
      <Link href={'/public'} className="pl-6 flex items-center">
        <span className={cn('text-5xl font-semibold ', poppins.className)}>
          funroad
        </span>
      </Link>

      <div className="lg:flex items-center gap-4 hidden">
        {navbarItems.map((item) => (
          <NavbarItem
            key={item.href}
            href={item.href}
            isActive={pathname === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>
      {session?.user ? (
        <div className={'hidden lg:flex'}>
          <Button
            variant={'secondary'}
            className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black  text-white hover:bg-pink-400 transition-colors hover:text-black text-lg"
            asChild
          >
            <Link href="/admin">Dashboard</Link>
          </Button>
        </div>
      ) : (
        <div className="hidden lg:flex">
          <Button
            variant={'secondary'}
            className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-white hover:bg-pink-400 transition-colors text-lg"
            asChild
          >
            <Link href={'/sign-in'} prefetch>
              Log in
            </Link>
          </Button>
          <Button
            variant={'secondary'}
            className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black  text-white hover:bg-pink-400 transition-colors hover:text-black text-lg"
            asChild
          >
            <Link href="/sign-up" prefetch>
              Start selling
            </Link>
          </Button>
        </div>
      )}
      <div className="flex lg:hidden items-center justify-center mr-6">
        <Button
          variant={'ghost'}
          className="size-12 border-transparent bg-white"
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuIcon />
        </Button>
      </div>
    </nav>
  )
}
