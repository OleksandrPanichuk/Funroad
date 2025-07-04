import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function generateTenantURL(tenantSlug: string) {

    const isDevelopment = process.env.NODE_ENV === 'development'
    const isEnabled = process.env.NEXT_PUBLIC_ENABLE_SUBDOMAIN_ROUTING === "true"

    if(isDevelopment || !isEnabled) {
        return `${process.env.NEXT_PUBLIC_APP_URL}/tenants/${tenantSlug}`
    }

    const protocol = "https"
    const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN

    return `${protocol}://${tenantSlug}.${domain}`
}

export function formatCurrency(value: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(value)
}
