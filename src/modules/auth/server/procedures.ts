import { stripe } from '@/lib/stripe'
import { loginSchema, registerSchema } from '@/modules/auth/schemas'
import { generateAuthCookie } from '@/modules/auth/utils'
import { baseProcedure, createTRPCRouter } from '@/trpc/init'
import { TRPCError } from '@trpc/server'
import { headers as getHeaders } from 'next/headers'

export const authRouter = createTRPCRouter({
    session: baseProcedure.query(async ({ ctx }) => {
        const headers = await getHeaders()
        return await ctx.db.auth({ headers })
    }),
    register: baseProcedure
        .input(registerSchema)
        .mutation(async ({ ctx, input }) => {
            const existingData = await ctx.db.find({
                collection: 'users',
                where: {
                    username: {
                        equals: input.username,
                    },
                },
                limit: 1,
            })

            const existingUser = existingData.docs[0]

            if (existingUser) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Username already taken',
                })
            }

            const account = await stripe.accounts.create({})

            if (!account) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Failed to create Stripe account',
                })
            }

            const tenant = await ctx.db.create({
                collection: 'tenants',
                data: {
                    name: input.username,
                    slug: input.username,
                    stripeAccountId: account.id,
                },
            })

            await ctx.db.create({
                collection: 'users',
                data: {
                    email: input.email,
                    username: input.username,
                    password: input.password,
                    tenants: [
                        {
                            tenant: tenant.id,
                        },
                    ],
                },
            })

            const data = await ctx.db.login({
                collection: 'users',
                data: {
                    email: input.email,
                    password: input.password,
                },
            })

            if (!data.token) {
                throw new TRPCError({
                    code: 'UNAUTHORIZED',
                    message: 'Failed to login',
                })
            }

            await generateAuthCookie({
                prefix: ctx.db.config.cookiePrefix,
                value: data.token,
            })

            return data
        }),
    login: baseProcedure.input(loginSchema).mutation(async ({ ctx, input }) => {
        const data = await ctx.db.login({
            collection: 'users',
            data: {
                email: input.email,
                password: input.password,
            },
        })

        if (!data.token) {
            throw new TRPCError({
                code: 'UNAUTHORIZED',
                message: 'Failed to login',
            })
        }

        await generateAuthCookie({
            prefix: ctx.db.config.cookiePrefix,
            value: data.token,
        })

        return data
    }),
})
