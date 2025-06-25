import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { StarPicker } from '@/components/ui/star-picker'
import { Textarea } from '@/components/ui/textarea'
import { ReviewGetOneOutput } from '@/modules/reviews/types'
import { useTRPC } from '@/trpc/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

interface IReviewFormProps {
    productId: string
    initialData?: ReviewGetOneOutput
}

const formSchema = z.object({
    rating: z.number().min(1, 'Rating is required').max(5),
    description: z.string().min(1, 'Description is required'),
})

type FormValues = z.infer<typeof formSchema>

export const ReviewForm = ({ productId, initialData }: IReviewFormProps) => {
    const [isPreview, setIsPreview] = useState(!!initialData)

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            rating: initialData?.rating ?? 0,
            description: initialData?.description ?? '',
        },
    })

    const trpc = useTRPC()
    const queryClient = useQueryClient()

    const createReview = useMutation(
        trpc.reviews.create.mutationOptions({
            onSuccess: () => {
                queryClient.invalidateQueries(
                    trpc.reviews.getOne.queryOptions({ productId }),
                )

                setIsPreview(true)
            },
            onError: (error) => {
                toast.error(error.message || 'Failed to create review')
            },
        }),
    )

    const updateReview = useMutation(
        trpc.reviews.update.mutationOptions({
            onSuccess: () => {
                queryClient.invalidateQueries(
                    trpc.reviews.getOne.queryOptions({ productId }),
                )

                setIsPreview(true)
            },
            onError: (error) => {
                toast.error(error.message || 'Failed to update review')
            },
        }),
    )

    const onSubmit = (values: FormValues) => {
        if (initialData) {
            updateReview.mutate({
                reviewId: initialData.id,
                rating: values.rating,
                description: values.description,
            })
        } else {
            createReview.mutate({
                productId,
                rating: values.rating,
                description: values.description,
            })
        }
    }

    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <p className="font-medium">
                    {isPreview ? 'Your rating' : 'Liked it? Give it a rating!'}
                </p>
                <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <StarPicker
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={isPreview}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    placeholder="Want to leave a written review?"
                                    disabled={isPreview}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {!isPreview && (
                    <Button
                        variant={'elevated'}
                        type="submit"
                        size={'lg'}
                        className="bg-black text-white hover:bg-pink-400 hover:text-primary w-fit"
                        disabled={
                            createReview.isPending || updateReview.isPending
                        }
                    >
                        {initialData ? 'Update review' : 'Post review'}
                    </Button>
                )}
                {isPreview && (
                    <Button
                        onClick={() => setIsPreview(false)}
                        type="button"
                        variant={'elevated'}
                        className="w-fit"
                        disabled={
                            createReview.isPending || updateReview.isPending
                        }
                    >
                        Edit
                    </Button>
                )}
            </form>
        </Form>
    )
}

export const ReviewFormSkeleton = () => {
    return (
        <div className="flex flex-col gap-y-4">
            <p className="font-medium">Liked it? Give it a rating!</p>
            <StarPicker disabled />
            <Textarea placeholder="Want to leave a written review?" disabled />
            <Button
                variant={'elevated'}
                size={'lg'}
                className="bg-black text-white hover:bg-pink-400 hover:text-primary w-fit"
                disabled
            >
                Post review
            </Button>
        </div>
    )
}
