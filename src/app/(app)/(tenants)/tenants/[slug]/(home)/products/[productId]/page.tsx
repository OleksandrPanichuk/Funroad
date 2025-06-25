import {
    ProductView,
    ProductViewSkeleton,
} from '@/modules/products/ui/views/product-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'

interface IPageProps {
    params: Promise<{
        productId: string
        slug: string
    }>
}

export const dynamic = 'force-dynamic'

const Page = async ({ params }: IPageProps) => {
    const { productId, slug } = await params

    const queryClient = getQueryClient()

    void queryClient.prefetchQuery(
        trpc.products.getOne.queryOptions({
            id: productId,
        }),
    )

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<ProductViewSkeleton />}>
                <ProductView productId={productId} tenantSlug={slug} />
            </Suspense>
        </HydrationBoundary>
    )
}

export default Page
