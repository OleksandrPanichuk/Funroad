import { isSuperAdmin } from '@/lib/access'
import { Tenant } from '@/payload-types'
import { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
    slug: 'products',
    access: {
        create: ({ req }) => {
            if (isSuperAdmin(req.user)) {
                return true
            }

            const tenant = req.user?.tenants?.[0]?.tenant as Tenant

            return Boolean(tenant?.stripeDetailsSubmitted)
        },
        delete: ({ req }) => isSuperAdmin(req.user),
    },
    admin: {
        useAsTitle: 'name',
        description: 'You must verify your acccount before creating products.',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            type: 'richText',
        },
        {
            name: 'price',
            admin: {
                description: 'In USD',
            },
            type: 'number',
            required: true,
        },
        {
            name: 'category',
            type: 'relationship',
            relationTo: 'categories',
            hasMany: false,
        },
        {
            name: 'tags',
            type: 'relationship',
            relationTo: 'tags',
            hasMany: true,
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'refundPolicy',
            type: 'select',
            options: [
                '30-day',
                '14-day',
                '7-day',
                '3-day',
                '1-day',
                'no-refunds',
            ],
            defaultValue: '14-day',
        },
        {
            name: 'content',
            type: 'richText',
            admin: {
                description:
                    'Protected content is only visible to customers after purchase. Add product documentation, downloadable files, getting started guides, and bonus materials. Supports Markdown formatting.',
            },
        },
        {
            name: 'isArchived',
            label: 'Archived',
            defaultValue: false,
            type: 'checkbox',
            admin: {
                description:
                    'If checked, this product will not be available for purchase.',
            },
        },
        {
            name: 'isPrivate',
            label: 'Private',
            defaultValue: false,
            type: 'checkbox',
            admin: {
                description:
                    'If checked, this product will not be shown on the public storefront.',
            },
        },
    ],
}
