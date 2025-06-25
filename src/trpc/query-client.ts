import { defaultShouldDehydrateQuery, QueryClient } from '@tanstack/react-query'
import superjson from 'superjson'

export function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 30 * 1000,
                retry: (failureCount, error: unknown) => {
                    const errorData = error as {
                        data?: { code?: string }
                        message?: string
                    }
                    if (
                        errorData?.data?.code === 'NOT_FOUND' ||
                        errorData?.message?.includes('not found')
                    ) {
                        return false
                    }

                    return failureCount < 3
                },
            },
            dehydrate: {
                serializeData: superjson.serialize,
                shouldDehydrateQuery: (query) =>
                    defaultShouldDehydrateQuery(query) ||
                    query.state.status === 'pending',
            },
            hydrate: {
                deserializeData: superjson.deserialize,
            },
        },
    })
}
