import { cn } from '@/lib/utils'
import { StarIcon } from 'lucide-react'

const MAX_RATING = 5
const MIN_RATING = 0

interface IStarRatingProps {
    rating: number
    className?: string
    iconClassName?: string
    text?: string
}

export const StarRating = ({
    rating,
    className,
    iconClassName,
    text,
}: IStarRatingProps) => {
    const safeRating = Math.max(MIN_RATING, Math.min(MAX_RATING, rating))

    return (
        <div className={cn('flex items-center gap-x-1', className)}>
            {Array.from({ length: MAX_RATING }).map((_, index) => (
                <StarIcon
                    key={index}
                    className={cn(
                        'size-4',
                        index < safeRating ? 'fill-black' : '',
                        iconClassName,
                    )}
                />
            ))}
            {text && <p>{text}</p>}
        </div>
    )
}
