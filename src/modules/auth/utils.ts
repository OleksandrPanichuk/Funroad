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
        sameSite: 'none',
        value,
        domain: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
        secure: process.env.NODE_ENV === 'production',
    })
}
