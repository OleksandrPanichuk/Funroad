'use client'

import { Button } from '@/components/ui/button'
import { DEFAULT_LIMIT } from '@/constants'
import { cn } from '@/lib/utils'
import { useProductFilters } from '@/modules/products/hooks/use-product-filters'
import { useTRPC } from '@/trpc/client'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { InboxIcon } from 'lucide-react'
import { ProductCard, ProductCardSkeleton } from './product-card'

interface IProductListProps {
    category?: string
    tenantSlug?: string
    narrowView?: boolean
}

export const ProductList = ({
    category,
    tenantSlug,
    narrowView,
}: IProductListProps) => {
    const [filters] = useProductFilters()
    const trpc = useTRPC()
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
        useSuspenseInfiniteQuery(
            trpc.products.getMany.infiniteQueryOptions(
                {
                    category,
                    tenantSlug,
                    ...filters,
                },
                {
                    getNextPageParam: (lastPage) =>
                        lastPage.docs.length > 0
                            ? lastPage.nextPage
                            : undefined,
                },
            ),
        )

    if (data.pages?.[0]?.docs.length === 0) {
        return (
            <div className="border border-black border-dashed flex flex-col items-center justify-center p-8 gap-y-4 bg-white w-full rounded-lg">
                <InboxIcon />
                <p className="text-base font-medium">No products found</p>
            </div>
        )
    }

    return (
        <>
            <div
                className={cn(
                    'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4',
                    narrowView &&
                        'lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3',
                )}
            >
                {data?.pages
                    .flatMap((page) => page.docs)
                    .map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            imageUrl={product.image?.url}
                            price={product.price}
                            tenantSlug={product.tenant?.slug}
                            tenantImageUrl={product.tenant?.image?.url}
                            reviewCount={product.reviewCount}
                            reviewRating={product.reviewRating}
                        />
                    ))}
            </div>
            <div className="flex justify-center pt-8">
                {hasNextPage && (
                    <Button
                        disabled={isFetchingNextPage}
                        onClick={() => fetchNextPage()}
                        className="font-medium disabled:opacity-50 bg-white"
                        variant={'elevated'}
                    >
                        Load more
                    </Button>
                )}
            </div>
        </>
    )
}

export const ProductListSkeleton = ({
    narrowView,
}: {
    narrowView?: boolean
}) => {
    return (
        <div
            className={cn(
                'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4',
                narrowView && 'lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3',
            )}
        >
            {Array.from({ length: DEFAULT_LIMIT }).map((_, index) => (
                <ProductCardSkeleton key={index} />
            ))}
        </div>
    )
}
