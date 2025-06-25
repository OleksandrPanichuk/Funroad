import {
    createLoader,
    parseAsArrayOf,
    parseAsString,
    parseAsStringLiteral,
} from 'nuqs/server'

export const sortValues = ['curated', 'trending', 'hot_and_new'] as const

const params = {
    minPrice: parseAsString
        .withOptions({
            clearOnDefault: true,
        })
        .withDefault(''),
    maxPrice: parseAsString
        .withOptions({
            clearOnDefault: true,
        })
        .withDefault(''),
    tags: parseAsArrayOf(parseAsString)
        .withOptions({
            clearOnDefault: true,
        })
        .withDefault([]),
    sort: parseAsStringLiteral(sortValues).withDefault('curated'),
    page: parseAsString.withDefault('1').withOptions({
        clearOnDefault: true,
    }),
}

export const loadProductFilters = createLoader(params)
