'use client'

import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from './button'

interface ErrorBoundaryState {
    hasError: boolean
    error?: Error
}

interface ErrorBoundaryProps {
    children: React.ReactNode
    fallback?: React.ComponentType<{ error: Error; reset: () => void }>
}

export class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            const FallbackComponent =
                this.props.fallback || DefaultErrorFallback
            return (
                <FallbackComponent
                    error={this.state.error!}
                    reset={() => this.setState({ hasError: false })}
                />
            )
        }

        return this.props.children
    }
}

function DefaultErrorFallback({
    error,
    reset,
}: {
    error: Error
    reset: () => void
}) {
    const isNotFound =
        error.message?.includes('not found') ||
        error.message?.includes('NOT_FOUND')

    if (isNotFound) {
        return (
            <div className="min-h-screen bg-white">
                <nav className="p-4 bg-[#F4F4F0] w-full border-b">
                    <Link
                        href={'/library'}
                        className="flex items-center gap-2"
                        prefetch
                    >
                        <ArrowLeftIcon className="size-4" />
                        <span className="font-medium">Back to library</span>
                    </Link>
                </nav>
                <div className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 py-10">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">
                            Product Not Found
                        </h1>
                        <p className="text-muted-foreground mb-6">
                            The product you&apos;re looking for doesn&apos;t
                            exist or you don&apos;t have access to it.
                        </p>
                        <Link href="/library">
                            <Button>Go back to library</Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            <nav className="p-4 bg-[#F4F4F0] w-full border-b">
                <Link
                    href={'/library'}
                    className="flex items-center gap-2"
                    prefetch
                >
                    <ArrowLeftIcon className="size-4" />
                    <span className="font-medium">Back to library</span>
                </Link>
            </nav>
            <div className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 py-10">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">
                        Something went wrong
                    </h1>
                    <p className="text-muted-foreground mb-6">
                        An error occurred while loading this page.
                    </p>
                    <div className="space-x-4">
                        <Button onClick={reset} variant="outline">
                            Try again
                        </Button>
                        <Link href="/library">
                            <Button>Go back to library</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
