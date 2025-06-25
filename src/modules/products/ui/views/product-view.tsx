'use client'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { StarRating } from '@/components/ui/star-rating'
import { formatCurrency, generateTenantURL } from '@/lib/utils'
import { useTRPC } from '@/trpc/client'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { CheckCheckIcon, LinkIcon, LoaderIcon, StarIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import { toast } from 'sonner'

interface IProductViewProps {
    tenantSlug: string
    productId: string
}

const CartButton = dynamic(
    () => import('../components/cart-button').then((m) => m.CartButton),
    {
        ssr: false,
        loading: () => (
            <Button
                className="flex-1 bg-pink-400"
                variant={'elevated'}
                disabled
            >
                Add to cart
            </Button>
        ),
    },
)

export const ProductView = ({ tenantSlug, productId }: IProductViewProps) => {
    const trpc = useTRPC()
    const { data } = useSuspenseQuery(
        trpc.products.getOne.queryOptions({
            id: productId,
        }),
    )

    const [isCopied, setIsCopied] = useState(false)

    return (
        <div className="px-4 lg:px-12 py-10">
            <div className="border rounded-sm bg-white overflow-hidden">
                <div className="relative aspect-[3.9] border-b">
                    <Image
                        src={data.image?.url || '/placeholder.png'}
                        alt={data.name}
                        className="object-cover"
                        fill
                    />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-6">
                    <div className="col-span-4">
                        <div className="p-4">
                            <h1 className="text-6xl font-medium">
                                {data.name}
                            </h1>
                        </div>
                        <div className="border-y flex">
                            <div className="px-6 py-4 flex items-center justify-center border-right">
                                <div className="relative px-2 py-1 border bg-pink-400 w-fit">
                                    <p className="text-base font-medium">
                                        {formatCurrency(data.price)}
                                    </p>
                                </div>
                            </div>
                            <div className="px-6 py-4 flex items-center justify-center lg:border-r ">
                                <Link
                                    className="flex items-center gap-2"
                                    href={generateTenantURL(tenantSlug)}
                                >
                                    {data.tenant.image?.url && (
                                        <Image
                                            src={data.tenant.image?.url}
                                            alt={data.tenant.name}
                                            width={20}
                                            height={20}
                                            className="rounded-full border shrink-0 size-[20px]"
                                        />
                                    )}
                                    <p className="underline text-base font-medium">
                                        {data.tenant.name}
                                    </p>
                                </Link>
                            </div>

                            <div className="hidden lg:flex px-6 py-4 items-center justify-center">
                                <div className="flex items-center gap-2">
                                    <StarRating
                                        rating={data.reviewRating}
                                        iconClassName="size-4"
                                    />
                                    <p className="text-base font-medium">
                                        {data.reviewCount} ratings
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="block lg:hidden px-6 py-4 items-center justify-center border-b ">
                            <div className="flex items-center gap-2">
                                <StarRating
                                    rating={data.reviewRating}
                                    iconClassName="size-4"
                                />
                                <p className="text-base font-medium">
                                    {data.reviewCount} ratings
                                </p>
                            </div>
                        </div>

                        <div className="p-6">
                            {data.description ? (
                                <RichText data={data.description} />
                            ) : (
                                <p className="font-medium text-muted-foreground italic">
                                    No description provided
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="col-span-2">
                        <div className="border-t lg:border-t-0 lg:border-l h-full">
                            <div className="flex flex-col gap-4 p-6 border-b">
                                <div className="flex flex-row items-center gap-2">
                                    <CartButton
                                        isPurchased={data.isPurchased}
                                        tenantSlug={tenantSlug}
                                        productId={productId}
                                    />
                                    <Button
                                        className="size-12"
                                        variant={'elevated'}
                                        onClick={() => {
                                            setIsCopied(true)
                                            navigator.clipboard.writeText(
                                                window.location.href,
                                            )
                                            toast.success(
                                                'Product link copied to clipboard',
                                            )

                                            setTimeout(() => {
                                                setIsCopied(false)
                                            }, 2000)
                                        }}
                                        disabled={isCopied}
                                    >
                                        {isCopied ? (
                                            <CheckCheckIcon />
                                        ) : (
                                            <LinkIcon />
                                        )}
                                    </Button>
                                </div>
                                <p className="text-center font-medium">
                                    {data.refundPolicy === 'no-refunds'
                                        ? 'No refunds'
                                        : `${data.refundPolicy} money back guarantee`}
                                </p>
                            </div>

                            <div className="p-6 ">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-medium ">
                                        Ratings
                                    </h3>
                                    <div className="flex items-center gap-x-1 font-medium">
                                        <StarIcon className="size-4 fill-black" />
                                        <p>({data.reviewRating})</p>
                                        <p className="text-base">
                                            {data.reviewCount} ratings
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-[auto_1fr_auto] gap-3 mt-3">
                                    {[5, 4, 3, 2, 1].map((stars) => (
                                        <Fragment key={stars}>
                                            <div className="font-medium">
                                                {stars}{' '}
                                                {stars === 1 ? 'star' : 'stars'}
                                            </div>
                                            <Progress
                                                value={
                                                    data.ratingDistribution[
                                                        stars
                                                    ]
                                                }
                                                className="h-[1lh]"
                                            />
                                            <div className="font-medium">
                                                {data.ratingDistribution[stars]}
                                                %
                                            </div>
                                        </Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const ProductViewSkeleton = () => {
    return (
        <div className="px-4 lg:px-12 py-10">
            <div className="border rounded-sm bg-white overflow-hidden">
                <div className="relative aspect-[3.9]">
                    <Skeleton className="h-full w-full absolute top-0 left-0" />
                    <LoaderIcon className="size-6 absolute top-1/2 left-1/2 text-muted-foreground animate-spin translate-x-[-50%] translate-y-[-50%]" />
                </div>
            </div>
        </div>
    )
}
