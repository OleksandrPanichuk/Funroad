import { PropsWithChildren, useState } from 'react'
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface IProductFilterProps extends PropsWithChildren {
  title: string
  className?: string
}

export const ProductFilter = ({
  className,
  title,
  children,
}: IProductFilterProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const Icon = isOpen ? ChevronDownIcon : ChevronRightIcon

  return (
    <div className={cn('p-4 border-b flex flex-col gap-2', className)}>
      <div
        onClick={() => setIsOpen((current) => !current)}
        className={'flex items-center justify-between cursor-pointer'}
      >
        <p className={'font-medium'}>{title}</p>
        <Icon className={'size-5'} />
      </div>
      {isOpen && children}
    </div>
  )
}
