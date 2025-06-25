'use client'
import { Button } from '@/components/ui/button'
import { useTRPC } from '@/trpc/client'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import { ReviewFormSkeleton } from '../components/review-form'
import { ReviewSidebar } from '../components/review-sidebar'

interface IProductViewProps {
    productId: string
}

export const ProductView = ({ productId }: IProductViewProps) => {
    const trpc = useTRPC()
    
    const { data, error, isLoading } = useSuspenseQuery(
        trpc.library.getOne.queryOptions({ productId }),
    )

    if (isLoading) {
        return <ProductViewSkeleton />
    }

    if (error) {
        const isNotFound =
            error.message?.includes('not found') ||
            error.message?.includes('NOT_FOUND')

        return (
            <div className="min-h-screen bg-white">
                <nav className="p-4 bg-[#F4F4F0] w-full border-b">
                    <Link
                        href={'/library'}
                        className="flex items-center gap-2"
                        prefetch
                    >
                        <ArrowLeftIcon className="size-4" />
                        <span className="font-medium">Back to library</span>
                    </Link>
                </nav>
                <div className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 py-10">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">
                            {isNotFound
                                ? 'Product Not Found'
                                : 'Something went wrong'}
                        </h1>
                        <p className="text-muted-foreground mb-6">
                            {isNotFound
                                ? 'The product you&apos;re looking for doesn&apos;t exist or you don&apos;t have access to it.'
                                : 'An error occurred while loading this product.'}
                        </p>
                        <Link href="/library">
                            <Button>Go back to library</Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    if (!data) {
        return <ProductViewSkeleton />
    }

    return (
        <div className="min-h-screen bg-white">
            <nav className="p-4 bg-[#F4F4F0] w-full border-b">
                <Link
                    href={'/library'}
                    className="flex items-center gap-2"
                    prefetch
                >
                    <ArrowLeftIcon className="size-4" />
                    <span className="font-medium">Back to library</span>
                </Link>
            </nav>
            <header className="bg-[#F4F4F0] py-8 border-b">
                <div className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12">
                    <h1 className="text-[40px] font-medium">{data.name}</h1>
                </div>
            </header>
            <section className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16">
                    <div className="lg:col-span-2">
                        <div className="p-4 bg-white rounded-md border gap-4">
                            <Suspense fallback={<ReviewFormSkeleton />}>
                                <ReviewSidebar productId={productId} />
                            </Suspense>
                        </div>
                    </div>
                    <div className="lg:col-span-5">
                        {data.content ? (
                            <RichText data={data.content} />
                        ) : (
                            <p>No special content added</p>
                        )}
                        <p className="font-medium italic  text-muted-foreground"></p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export const ProductViewSkeleton = () => {
    return (
        <div className="min-h-screen bg-white">
            <nav className="p-4 bg-[#F4F4F0] w-full border-b">
                <div className="flex items-center gap-2">
                    <ArrowLeftIcon className="size-4" />
                    <span className="font-medium">Back to library</span>
                </div>
            </nav>
        </div>
    )
}
