'use client'

import { useProductFilters } from '@/modules/products/hooks/use-product-filters'
import { PriceFilter } from '@/modules/products/ui/components/price-filter'
import { ProductFilter } from '@/modules/products/ui/components/product-filter'
import { TagsFilter } from './tags-filter'

export const ProductFilters = () => {
    const [filters, setFilters] = useProductFilters()

    const onChange = (key: keyof typeof filters, value: unknown) => {
        setFilters({ ...filters, [key]: value })
    }

    const onClear = () => {
        setFilters({
            minPrice: '',
            maxPrice: '',
            tags: [],
        })
    }

    const hasAnyFilters = Object.entries(filters).some(([key, value]) => {
        if (key === 'sort') {
            return false
        }
        if (Array.isArray(value)) {
            return value.length > 0
        }
        if (typeof value === 'string') {
            return value !== ''
        }

        return value !== null
    })

    return (
        <div className={'border rounded-md bg-white '}>
            <div className={'p-4 border-b flex items-center justify-between'}>
                <p className={'font-medium'}>Filters</p>
                {hasAnyFilters && (
                    <button
                        className={'underline cursor-pointer'}
                        onClick={onClear}
                        type={'button'}
                    >
                        Clear
                    </button>
                )}
            </div>
            <ProductFilter title={'Price'}>
                <PriceFilter
                    minPrice={filters.minPrice}
                    maxPrice={filters.maxPrice}
                    onMinPriceChange={(value) => onChange('minPrice', value)}
                    onMaxPriceChange={(value) => onChange('maxPrice', value)}
                />
            </ProductFilter>
            <ProductFilter title={'Tags'} className="border-b-0">
                <TagsFilter
                    value={filters.tags}
                    onChange={(value) => onChange('tags', value)}
                />
            </ProductFilter>
        </div>
    )
}
