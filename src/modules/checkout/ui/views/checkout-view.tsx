'use client'
import { generateTenantURL } from '@/lib/utils'
import { useCart } from '@/modules/checkout/hooks/use-cart'
import { useCheckoutStates } from '@/modules/checkout/hooks/use-checkout-states'
import { CheckoutItem } from '@/modules/checkout/ui/components/checkout-item'
import { CheckoutSidebar } from '@/modules/checkout/ui/components/checkout-sidebar'
import { useTRPC } from '@/trpc/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { InboxIcon, LoaderIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

interface ICheckoutViewProps {
    tenantSlug: string
}

export const CheckoutView = ({ tenantSlug }: ICheckoutViewProps) => {
    const trpc = useTRPC()
    const { productIds, clearCart, removeProduct } = useCart(tenantSlug)
    const router = useRouter()
    const queryClient = useQueryClient()

    const [states, setStates] = useCheckoutStates()

    const { data, error, isLoading } = useQuery(
        trpc.checkout.getProducts.queryOptions({
            ids: productIds,
        }),
    )

    const purchase = useMutation(
        trpc.checkout.purchase.mutationOptions({
            onSuccess: (data) => {
                window.location.href = data.url
            },
            onError: (error) => {
                if (error.data?.code === 'UNAUTHORIZED') {
                    router.push('/sign-in')
                }

                toast.error(error.message)
            },
            onMutate: () => {
                setStates({
                    cancel: false,
                    success: false,
                })
            },
        }),
    )

    useEffect(() => {
        if (states.success) {
            setStates({
                cancel: false,
                success: false,
            })
            clearCart()

            queryClient.invalidateQueries(
                trpc.library.getMany.infiniteQueryFilter(),
            )

            router.push('/library')
        }
    }, [
        clearCart,
        router,
        setStates,
        states.success,
        queryClient,
        trpc.library.getMany,
    ])

    useEffect(() => {
        if (!error) return

        if (error.data?.code === 'NOT_FOUND') {
            clearCart()
            toast.warning('Invalid products found, cart cleared.')
        }
    }, [clearCart, error])

    if (isLoading) {
        return (
            <div className={'lg:pt-16 pt-4 px-4 lg:px-12'}>
                <div className="border border-black border-dashed flex flex-col items-center justify-center p-8 gap-y-4 bg-white w-full rounded-lg">
                    <LoaderIcon
                        className={'animate-spin text-muted-foreground'}
                    />
                </div>
            </div>
        )
    }

    if (!data || data?.totalDocs === 0) {
        return (
            <div className={'lg:pt-16 pt-4 px-4 lg:px-12'}>
                <div className="border border-black border-dashed flex flex-col items-center justify-center p-8 gap-y-4 bg-white w-full rounded-lg">
                    <InboxIcon />
                    <p className="text-base font-medium">No products found</p>
                </div>
            </div>
        )
    }

    return (
        <div className={'lg:pt-16 pt-4 px-4 lg:px-12'}>
            <div className={'grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16'}>
                <div className={'lg:col-span-4'}>
                    <div
                        className={'border rounded-md overflow-hidden bg-white'}
                    >
                        {data?.docs.map((product, index) => (
                            <CheckoutItem
                                key={product.id}
                                isLast={index === data.docs.length - 1}
                                imageUrl={product.image?.url}
                                name={product.name}
                                productUrl={`${generateTenantURL(product.tenant.slug)}/products/${product.id}`}
                                tenantUrl={generateTenantURL(
                                    product.tenant.slug,
                                )}
                                tenantName={product.tenant.name}
                                price={product.price}
                                onRemove={() => removeProduct(product.id)}
                            />
                        ))}
                    </div>
                </div>
                <div className={'lg:col-span-3'}>
                    <CheckoutSidebar
                        total={data.totalPrice}
                        onPurchase={() =>
                            purchase.mutate({
                                tenantSlug,
                                productIds,
                            })
                        }
                        isCanceled={states.cancel}
                        isPending={purchase.isPending}
                    />
                </div>
            </div>
        </div>
    )
}
