import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query'
import { BookmarkCheckIcon, ListFilter, SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CategoriesSidebar } from './categories-sidebar'

interface ISearchInputProps {
    disabled?: boolean
    defaultValue?: string
    onChange?: (value: string) => void
}

export const SearchInput = ({
    disabled,
    defaultValue,
    onChange,
}: ISearchInputProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [searchValue, setSearchValue] = useState(defaultValue || '')

    const trpc = useTRPC()
    const { data: session } = useQuery(trpc.auth.session.queryOptions())

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onChange?.(searchValue)
        }, 500)

        return () => clearTimeout(timeoutId)
    }, [searchValue, onChange])

    return (
        <div className="flex items-center gap-2 w-full">
            <CategoriesSidebar
                open={isSidebarOpen}
                onOpenChange={setIsSidebarOpen}
            />
            <div className="relative w-full">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
                <Input
                    className="pl-8"
                    placeholder="Search products"
                    disabled={disabled}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </div>
            <Button
                variant={'elevated'}
                className="size-12 shrink-0 flex lg:hidden"
                onClick={() => setIsSidebarOpen(true)}
            >
                <ListFilter />
            </Button>
            {session?.user && (
                <Button variant={'elevated'} asChild>
                    <Link href={'/library'} prefetch>
                        <BookmarkCheckIcon />
                        Library
                    </Link>
                </Button>
            )}
        </div>
    )
}
