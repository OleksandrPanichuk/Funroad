import { DEFAULT_LIMIT } from '@/constants'
import { loadProductFilters } from '@/modules/products/search-params'
import { ProductListView } from '@/modules/products/ui/views/product-list-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { SearchParams } from 'nuqs/server'

interface IPageProps {
    searchParams: Promise<SearchParams>
    params: Promise<{
        slug: string
    }>
}

export const dynamic = 'force-dynamic'

const Page = async ({ searchParams, params }: IPageProps) => {
    const { slug } = await params
    const filters = await loadProductFilters(searchParams)

    const queryClient = getQueryClient()
    void queryClient.prefetchInfiniteQuery(
        trpc.products.getMany.infiniteQueryOptions({
            tenantSlug: slug,
            limit: DEFAULT_LIMIT,
            ...filters,
        }),
    )

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductListView tenantSlug={slug} narrowView />
        </HydrationBoundary>
    )
}

export default Page
