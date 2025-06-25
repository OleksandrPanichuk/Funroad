import { cookies as getCookies } from 'next/headers'

interface IGenerateAuthCookieProps {
    prefix: string
    value: string
}

export const generateAuthCookie = async ({
    prefix,
    value,
}: IGenerateAuthCookieProps) => {
    const cookies = await getCookies()

    cookies.set({
        name: `${prefix}-token`,
        httpOnly: true,
        path: '/',
        value,
        ...(process.env.NODE_ENV !== 'development' && {
            sameSite: 'none',
            domain: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
            secure: true,
        }),
    })
}
