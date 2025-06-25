import { loadProductFilters } from '@/modules/products/search-params'
import { ProductListView } from '@/modules/products/ui/views/product-list-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import type { SearchParams } from 'nuqs/server'
import { DEFAULT_LIMIT } from '@/constants'

interface IPageProps {
    searchParams: Promise<SearchParams>
}

const Page = async ({ searchParams }: IPageProps) => {
    const filters = await loadProductFilters(searchParams)

    const queryClient = getQueryClient()
    void queryClient.prefetchInfiniteQuery(
        trpc.products.getMany.infiniteQueryOptions({
            limit: DEFAULT_LIMIT,
            ...filters,
        }),
    )

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductListView />
        </HydrationBoundary>
    )
}

export default Page
