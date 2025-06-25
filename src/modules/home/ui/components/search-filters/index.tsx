'use client'

import { DEFAULT_BACKGROUND_COLOR } from '@/modules/home/constants'
import { BreadcrumbNavigation } from '@/modules/home/ui/components/search-filters/breadcrumb-navigation'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { Categories } from './categories'
import { SearchInput } from './search-input'
import { useProductFilters } from '@/modules/products/hooks/use-product-filters'

export const SearchFilters = () => {
    const params = useParams()
    const [filters, setFilters] = useProductFilters()

    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions())

    const categoryParam = params?.category as string | undefined
    const activeCategory = categoryParam || 'all'

    const activeCategoryData = data.find((el) => el.slug === activeCategory)
    const activeCategoryColor =
        activeCategoryData?.color || DEFAULT_BACKGROUND_COLOR

    const activeCategoryName = activeCategoryData?.name || null

    const activeSubcategory = params?.subcategory as string | undefined

    const activeSubcategoryName =
        activeCategoryData?.subcategories?.find(
            (el) => el.slug === activeSubcategory,
        )?.name || null

    return (
        <div
            className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
            style={{
                backgroundColor: activeCategoryColor,
            }}
        >
            <SearchInput defaultValue={filters.search} onChange={(search) => setFilters({search})} />
            <div className="hidden lg:block">
                <Categories data={data} />
            </div>
            <BreadcrumbNavigation
                activeCategoryName={activeCategoryName}
                activeSubcategoryName={activeSubcategoryName}
                activeCategory={activeCategory}
            />
        </div>
    )
}
export const SearchFiltersSkeleton = () => {
    return (
        <div
            className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
            style={{
                backgroundColor: DEFAULT_BACKGROUND_COLOR,
            }}
        >
            <SearchInput disabled />
            <div className="hidden lg:block">
                <div className={'h-11'} />
            </div>
        </div>
    )
}
