import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { ChangeEvent, useMemo } from 'react'

interface IPriceFilterProps {
  minPrice?: string | null
  maxPrice?: string | null
  onMinPriceChange: (value: string) => void
  onMaxPriceChange: (value: string) => void
}

export const formatAsCurrency = (value: string) => {
  const numericValue = value.replace(/[^0-9.]/g, '')
  const parts = numericValue.split('.')
  const formattedValue =
    parts[0] + (parts.length > 1 ? '.' + parts[1]?.slice(0, 2) : '')
  if (!formattedValue) {
    return ''
  }

  const numberValue = parseFloat(formattedValue)

  if (isNaN(numberValue)) {
    return ''
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numberValue)
}

export const PriceFilter = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}: IPriceFilterProps) => {
  const params = useParams()
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({
      category: params?.subcategory
        ? (params.subcategory as string)
        : (params?.category as string) || 'all',
    }),
  )

  const highestPrice = useMemo(() => {
    const sorted = [...data.docs].sort((a, b) => {
      return b.price - a.price
    })

    return sorted[0]?.price
  }, [data])

  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/[^0-9.]/g, '')
    onMinPriceChange(numericValue)
  }

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/[^0-9.]/g, '')
    onMaxPriceChange(numericValue)
  }

  return (
    <div className={'flex flex-col gap-2'}>
      <div className={'flex flex-col gap-2'}>
        <Label className={'font-medium text-base'}>Minimum price</Label>
        <Input
          type={'text'}
          placeholder={'$0'}
          value={minPrice ? formatAsCurrency(minPrice) : ''}
          onChange={handleMinPriceChange}
        />
      </div>
      <div className={'flex flex-col gap-2'}>
        <Label className={'font-medium text-base'}>Maximum price</Label>
        <Input
          type={'text'}
          placeholder={
            typeof highestPrice === 'undefined' ? '∞' : `$${highestPrice}`
          }
          value={maxPrice ? formatAsCurrency(maxPrice) : ''}
          onChange={handleMaxPriceChange}
        />
      </div>
    </div>
  )
}
