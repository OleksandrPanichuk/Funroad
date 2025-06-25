import Link from 'next/link'
import { CategoriesGetManyOutputSingle } from '@/modules/categories/types'

interface ISubcategoryMenuProps {
    category: CategoriesGetManyOutputSingle
    isOpen?: boolean
}

export const SubcategoryMenu = ({
    category,
    isOpen,
}: ISubcategoryMenuProps) => {
    if (!isOpen || !category.subcategories?.length) {
        return null
    }

    const backgroundColor = category.color || '#f5f5f5'

    return (
        <div className="absolute caret-zinc-100 left-0 top-[100%]">
            <div className="h-3 w-60" />
            <div
                style={{ backgroundColor }}
                className="w-60 max-h-[47vh] overflow-y-auto text-black rounded-md  border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px] no-scrollbar"
            >
                <div>
                    {category.subcategories.map((subcategory) => (
                        <Link
                            key={subcategory.slug}
                            href={`/${category.slug}/${subcategory.slug}`}
                            className="w-full text-left p-4 hover:bg-black hover:text-white justify-between items-center underline flex font-medium"
                        >
                            {subcategory.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
