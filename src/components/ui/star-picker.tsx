'use client'

import { cn } from '@/lib/utils'
import { StarIcon } from 'lucide-react'
import { useState } from 'react'

interface StarPickerProps {
    value?: number
    onChange?: (value: number) => void
    disabled?: boolean
    className?: string
}

export const StarPicker = ({
    value = 0,
    onChange,
    disabled,
    className,
}: StarPickerProps) => {
    const [hoverValue, setHoverValue] = useState(0)

    return (
        <div
            className={cn(
                'flex items-center',
                disabled && 'opacity-50 cursor-not-allowed',
                className,
            )}
        >
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    className={cn(
                        'p-0.5 hover:scale-110 transition',
                        !disabled ? 'cursor-pointer' : 'hover:scale-100',
                    )}
                    onMouseEnter={() => setHoverValue(star)}
                    onMouseLeave={() => setHoverValue(0)}
                    onClick={() => onChange?.(star)}
                    disabled={disabled}
                >
                    <StarIcon
                        className={cn(
                            'size-5 stroke-black',
                            (hoverValue || value) >= star && 'fill-black',
                        )}
                    />
                </button>
            ))}
        </div>
    )
}
