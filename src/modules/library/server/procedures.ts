import { DEFAULT_LIMIT } from '@/constants'
import type { Media, Tenant } from '@/payload-types'
import { createTRPCRouter, protectedProcedure } from '@/trpc/init'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const libraryRouter = createTRPCRouter({
    getOne: protectedProcedure
        .input(
            z.object({
                productId: z.string(),
            }),
        )
        .query(async ({ ctx, input }) => {
            const data = await ctx.db.find({
                collection: 'orders',
                pagination: false,
                limit: 1,
                where: {
                    and: [
                        {
                            product: {
                                equals: input.productId,
                            },
                        },
                        {
                            user: {
                                equals: ctx.session.user.id,
                            },
                        },
                    ],
                },
            })

            const order = data.docs[0]

            if (!order) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Order not found',
                })
            }

            const product = await ctx.db.findByID({
                collection: 'products',
                id: input.productId,
            })

            if (!product) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Product not found',
                })
            }

            return product
        }),
    getMany: protectedProcedure
        .input(
            z.object({
                cursor: z.number().default(1),
                limit: z.number().default(DEFAULT_LIMIT),
            }),
        )
        .query(async ({ ctx, input }) => {
            const data = await ctx.db.find({
                collection: 'orders',
                depth: 0,
                page: input.cursor,
                limit: input.limit,
                where: {
                    user: {
                        equals: ctx.session.user.id,
                    },
                },
            })

            const productIds = data.docs.map((doc) => doc.product) as string[]

            const productsData = await ctx.db.find({
                collection: 'products',
                pagination: false,
                where: {
                    id: {
                        in: productIds,
                    },
                },
            })

            const reviewStats = await ctx.db.find({
                collection: 'reviews',
                pagination: false,
                where: {
                    product: {
                        in: productIds,
                    },
                },
            })


            const reviewStatsMap = new Map()


            productIds.forEach((id) => {
                reviewStatsMap.set(id, {
                    count: 0,
                    totalRating: 0,
                    averageRating: 0,
                })
            })


            reviewStats.docs.forEach((review) => {
                const productId =
                    typeof review.product === 'string'
                        ? review.product
                        : review.product.id
                const current = reviewStatsMap.get(productId) || {
                    count: 0,
                    totalRating: 0,
                    averageRating: 0,
                }

                current.count += 1
                current.totalRating += review.rating
                current.averageRating = current.totalRating / current.count

                reviewStatsMap.set(productId, current)
            })


            const dataWithSummarizedReviews = productsData.docs.map((doc) => {
                const stats = reviewStatsMap.get(doc.id) || {
                    count: 0,
                    totalRating: 0,
                    averageRating: 0,
                }

                return {
                    ...doc,
                    reviewCount: stats.count,
                    reviewRating: stats.averageRating,
                }
            })

            return {
                ...productsData,
                docs: dataWithSummarizedReviews.map((doc) => ({
                    ...doc,
                    image: (doc.image as Media) || null,
                    tenant: {
                        ...(doc.tenant as Tenant),
                        image: ((doc.tenant as Tenant).image as Media) || null,
                    },
                })),
            }
        }),
})
