'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useCart } from '@/modules/checkout/hooks/use-cart'
import Link from 'next/link'

interface ICartButtonProps {
    tenantSlug: string
    productId: string
    isPurchased: boolean
}

export const CartButton = ({
    tenantSlug,
    productId,
    isPurchased,
}: ICartButtonProps) => {
    const cart = useCart(tenantSlug)

    if (isPurchased) {
        return (
            <Button
                variant={'elevated'}
                className="flex-1 font-medium bg-white"
                asChild
            >
                <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/library/${productId}`}>
                    View in library
                </Link>
            </Button>
        )
    }

    return (
        <Button
            onClick={() => cart.toggleProduct(productId)}
            variant={'elevated'}
            className={cn(
                'flex-1 bg-pink-400',
                cart.isProductInCart(productId) && 'bg-white',
            )}
        >
            {cart.isProductInCart(productId)
                ? 'Remove from cart'
                : 'Add to cart'}
        </Button>
    )
}
