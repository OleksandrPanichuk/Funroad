import { Footer } from '@/modules/tenants/ui/components/footer'
import { Navbar, NavbarSkeleton } from '@/modules/tenants/ui/components/navbar'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { PropsWithChildren, Suspense } from 'react'

interface ILayoutProps extends PropsWithChildren {
    params: Promise<{
        slug: string
    }>
}

const Layout = async ({ params, children }: ILayoutProps) => {
    const { slug } = await params

    const queryClient = getQueryClient()

    await queryClient.prefetchQuery(
        trpc.tenants.getOne.queryOptions({
            slug,
        }),
    )

    const dehydratedState = dehydrate(queryClient)

    return (
        <div className={'min-h-screen bg-[#f4f4f0] flex flex-col'}>
            <HydrationBoundary state={dehydratedState}>
                <Suspense fallback={<NavbarSkeleton />}>
                    <Navbar slug={slug} />
                </Suspense>
            </HydrationBoundary>
            <div className={'flex-1'}>
                <div className={'max-w-(--breakpoint-xl) mx-auto'}>
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Layout
