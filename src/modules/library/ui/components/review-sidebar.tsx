import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query'
import { ReviewForm } from './review-form'

interface ReviewSidebarProps {
    productId: string
}

export const ReviewSidebar = ({ productId }: ReviewSidebarProps) => {
    const trpc = useTRPC()

    const { data, error, isLoading } = useQuery(
        trpc.reviews.getOne.queryOptions({ productId }),
    )

    if (isLoading) {
        return <div className="animate-pulse bg-gray-200 h-24 rounded"></div>
    }

    if (error) {
        return <ReviewForm productId={productId} />
    }

    return <ReviewForm productId={productId} initialData={data} />
}
