import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Link from 'next/link'

interface IBreadcrumbsNavigationProps {
  activeCategory?: string | null
  activeSubcategoryName?: string | null
  activeCategoryName?: string | null
}

export const BreadcrumbNavigation = ({
  activeCategoryName,
  activeSubcategoryName,
  activeCategory,
}: IBreadcrumbsNavigationProps) => {
  if (!activeCategoryName || activeCategory === 'all') {
    return null
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {activeSubcategoryName ? (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink
                className={'text-xl font-medium underline text-primary'}
                asChild
              >
                <Link href={`/${activeCategory}`}>{activeCategoryName}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className={'text-primary font-medium text-xl'}>
              /
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className={'text-xl font-medium'}>
                {activeSubcategoryName}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : (
          <BreadcrumbItem>
            <BreadcrumbPage className={'text-xl font-medium'}>
              {activeCategoryName}
            </BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
