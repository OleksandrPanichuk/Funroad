import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query'
import {
  CategoriesGetManyOutput,
  CategoriesGetManyOutputSingle,
} from '@/modules/categories/types'

interface ICategoriesSidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const CategoriesSidebar = ({
  open,
  onOpenChange,
}: ICategoriesSidebarProps) => {
  const trpc = useTRPC()
  const { data } = useQuery(trpc.categories.getMany.queryOptions())

  const [parentCategories, setParentCategories] =
    useState<CategoriesGetManyOutput | null>(null)

  const router = useRouter()

  const [selectedCategory, setSelectedCategory] =
    useState<CategoriesGetManyOutputSingle | null>(null)

  const currentCategories = parentCategories ?? data ?? []

  const handleOpenChange = (open: boolean) => {
    setSelectedCategory(null)
    setParentCategories(null)
    onOpenChange(open)
  }

  const handleCategoryClick = (category: CategoriesGetManyOutputSingle) => {
    if (!!category.subcategories?.length) {
      setParentCategories(category.subcategories as CategoriesGetManyOutput)
      setSelectedCategory(category)
    } else {
      if (parentCategories && selectedCategory) {
        router.push(`/${selectedCategory.slug}/${category.slug}`)
      } else {
        if (category.slug == 'all') {
          router.push('/')
        } else {
          router.push(`/${category.slug}`)
        }
      }

      handleOpenChange(false)
    }
  }

  const handleBackClick = () => {
    if (parentCategories) {
      setParentCategories(null)
      setSelectedCategory(null)
    }
  }

  const backgroundColor = selectedCategory?.color || 'white'

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        className="p-0  transition-colors"
        style={{ backgroundColor }}
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col overflow-y-auto h-full pb-2 no-scrollbar">
          {parentCategories && (
            <button
              onClick={handleBackClick}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center font-medium text-base"
            >
              <ChevronLeftIcon className="size-4 mr-2" />
              Back
            </button>
          )}
          {currentCategories.map((category) => (
            <button
              key={category.slug}
              onClick={() => handleCategoryClick(category)}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center font-medium justify-between text-base"
            >
              {category.name}
              {!!category.subcategories?.length && (
                <ChevronRightIcon className="" />
              )}
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
