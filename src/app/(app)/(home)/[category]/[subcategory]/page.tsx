import { DEFAULT_LIMIT } from '@/constants'
import { loadProductFilters } from '@/modules/products/search-params'
import { ProductListSkeleton } from '@/modules/products/ui/components/product-list'
import { ProductListView } from '@/modules/products/ui/views/product-list-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import type { SearchParams } from 'nuqs/server'
import { Suspense } from 'react'

interface IPageProps {
    params: Promise<{
        category: string
        subcategory: string
    }>
    searchParams: Promise<SearchParams>
}

export const dynamic = 'force-dynamic'

const Page = async ({ params, searchParams }: IPageProps) => {
    const { subcategory } = await params

    const filters = await loadProductFilters(searchParams)

    const queryClient = getQueryClient()
    void queryClient.prefetchInfiniteQuery(
        trpc.products.getMany.infiniteQueryOptions({
            category: subcategory,
            limit: DEFAULT_LIMIT,
            ...filters,
        }),
    )
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<ProductListSkeleton />}>
                <ProductListView category={subcategory} />
            </Suspense>
        </HydrationBoundary>
    )
}

export default Page
