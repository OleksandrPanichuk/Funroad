'use client'

import { Button } from '@/components/ui/button'
import { cn, generateTenantURL } from '@/lib/utils'
import { ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '../../hooks/use-cart'

interface ICheckoutButtonProps {
    className?: string
    tenantSlug: string
    hideIfEmpty?: boolean
}

export const CheckoutButton = ({
    tenantSlug,
    className,
    hideIfEmpty,
}: ICheckoutButtonProps) => {
    const { totalItems } = useCart(tenantSlug)

    if (hideIfEmpty && totalItems === 0) {
        return null
    }

    return (
        <Button
            variant={'elevated'}
            className={cn('bg-white', className)}
            asChild
        >
            <Link href={`${generateTenantURL(tenantSlug)}/checkout`}>
                <ShoppingCartIcon />
                {totalItems > 0 && totalItems}
            </Link>
        </Button>
    )
}
