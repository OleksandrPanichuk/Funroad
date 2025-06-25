import { isSuperAdmin } from '@/lib/access'
import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
    slug: 'categories',
    access: {
        read: () => true,
        create: ({ req }) => isSuperAdmin(req.user),
        delete: ({ req }) => isSuperAdmin(req.user),
        update: ({ req }) => isSuperAdmin(req.user),
    },
    admin: {
        useAsTitle: 'name',
        hidden: ({ user }) => !isSuperAdmin(user),
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            index: true,
        },
        {
            name: 'color',
            type: 'text',
        },
        {
            name: 'parent',
            type: 'relationship',
            relationTo: 'categories',
            hasMany: false,
            filterOptions: ({ id }) => ({
                parent: {
                    exists: false,
                },
                id: { not_equals: id },
            }),
        },
        {
            name: 'subcategories',
            type: 'join',
            collection: 'categories',
            on: 'parent',
            hasMany: true,
            admin: {
                condition: (data) => !data.parent,
            },
        },
    ],
    hooks: {
        beforeValidate: [
            ({ data }) => {
                if (
                    data?.parent &&
                    data?.subcategories &&
                    data?.subcategories.length > 0
                ) {
                    throw new Error(
                        'Subcategories cannot be set if a parent is selected.',
                    )
                }

                return data
            },
        ],
    },
}
