import { loadProductFilters } from '@/modules/products/search-params'
import { ProductListView } from '@/modules/products/ui/views/product-list-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import type { SearchParams } from 'nuqs/server'
import { DEFAULT_LIMIT } from '@/constants'

interface IPageProps {
    params: Promise<{
        category: string
    }>
    searchParams: Promise<SearchParams>
}

export const dynamic = 'force-dynamic'

const Page = async ({ params, searchParams }: IPageProps) => {
    const { category } = await params
    const filters = await loadProductFilters(searchParams)

    const queryClient = getQueryClient()
    void queryClient.prefetchInfiniteQuery(
        trpc.products.getMany.infiniteQueryOptions({
            category,
            limit: DEFAULT_LIMIT,
            ...filters,
        }),
    )

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductListView category={category} />
        </HydrationBoundary>
    )
}

export default Page
