import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
    Award,
    Globe,
    Heart,
    Lightbulb,
    Rocket,
    Target,
    TrendingUp,
    Users,
} from 'lucide-react'

const stats = [
    { number: '10K+', label: 'Happy Customers', icon: Users },
    { number: '50+', label: 'Countries Served', icon: Globe },
    { number: '99.9%', label: 'Uptime', icon: TrendingUp },
    { number: '24/7', label: 'Support', icon: Heart },
]

const values = [
    {
        icon: Target,
        title: 'Mission Driven',
        description:
            'We believe in empowering businesses to reach their full potential through innovative technology solutions.',
    },
    {
        icon: Lightbulb,
        title: 'Innovation First',
        description:
            'Constantly pushing boundaries and exploring new ways to solve complex business challenges.',
    },
    {
        icon: Heart,
        title: 'Customer Centric',
        description:
            'Every decision we make is guided by what&apos;s best for our customers and their success.',
    },
    {
        icon: Award,
        title: 'Excellence',
        description:
            'We maintain the highest standards in everything we do, from product development to customer service.',
    },
]

const team = [
    {
        name: 'Sarah Johnson',
        role: 'CEO & Founder',
        description:
            'Former tech executive with 15+ years building scalable platforms.',
        gradient: 'from-pink-400 to-purple-400',
    },
    {
        name: 'Michael Chen',
        role: 'CTO',
        description:
            'Engineering leader passionate about creating beautiful, functional products.',
        gradient: 'from-blue-400 to-cyan-400',
    },
    {
        name: 'Emily Rodriguez',
        role: 'Head of Design',
        description:
            'Award-winning designer focused on user experience and accessibility.',
        gradient: 'from-green-400 to-teal-400',
    },
]

const Page = () => {
    return (
        <div className="min-h-screen bg-[#f4f4f0] py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <Rocket className="w-4 h-4" />
                        Our Story
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
                        Building the future of
                        <span className="block text-pink-500">
                            digital commerce
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                        We started with a simple mission: to make powerful
                        business tools accessible to everyone. Today, we&apos;re
                        helping thousands of businesses thrive in the digital
                        age.
                    </p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {stats.map((stat, index) => (
                        <Card
                            key={index}
                            className="text-center p-8 bg-white border-0 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <CardContent className="p-0">
                                <stat.icon className="w-8 h-8 text-pink-500 mx-auto mb-4" />
                                <div className="text-3xl font-bold text-black mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600">
                                    {stat.label}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Story Section */}
                <div className="bg-white rounded-3xl p-12 mb-20 shadow-lg">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-black mb-6">
                                Our journey began in 2020
                            </h2>
                            <div className="space-y-6 text-gray-600 leading-relaxed">
                                <p>
                                    What started as a small team of passionate
                                    developers has grown into a global platform
                                    trusted by thousands of businesses
                                    worldwide. We saw the challenges that
                                    companies faced in adapting to the digital
                                    landscape and knew we could help.
                                </p>
                                <p>
                                    Our founders, coming from diverse
                                    backgrounds in technology, design, and
                                    business, combined their expertise to create
                                    something truly special. We didn&apos;t just
                                    want to build another platform – we wanted
                                    to build the platform that would change how
                                    businesses operate online.
                                </p>
                                <p>
                                    Today, we&apos;re proud to be at the
                                    forefront of digital innovation, constantly
                                    evolving and improving to meet the changing
                                    needs of our customers.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 rounded-2xl p-8 h-full">
                                <div className="grid grid-cols-2 gap-4 h-full">
                                    <div className="bg-white rounded-xl p-4 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-pink-500">
                                                2020
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                Founded
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-xl p-4 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-blue-500">
                                                2021
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                First 1K users
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-xl p-4 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-green-500">
                                                2023
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                Global expansion
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-xl p-4 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-purple-500">
                                                2024
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                10K+ customers
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Values Section */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-black mb-4">
                            Our Values
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            The principles that guide everything we do and shape
                            our company culture.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <Card
                                key={index}
                                className="text-center p-8 bg-white border-0 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
                            >
                                <CardContent className="p-0">
                                    <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <value.icon className="w-8 h-8 text-pink-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-black mb-4">
                                        {value.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {value.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Team Section */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-black mb-4">
                            Meet Our Team
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            The passionate individuals behind our platform,
                            working tirelessly to bring you the best experience.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <Card
                                key={index}
                                className="overflow-hidden bg-white border-0 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                            >
                                <div
                                    className={`h-32 bg-gradient-to-r ${member.gradient}`}
                                ></div>
                                <CardContent className="p-8 -mt-8 relative">
                                    <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 shadow-lg"></div>
                                    <div className="text-center">
                                        <h3 className="text-xl font-bold text-black mb-1">
                                            {member.name}
                                        </h3>
                                        <div className="text-pink-500 font-medium mb-4">
                                            {member.role}
                                        </div>
                                        <p className="text-gray-600">
                                            {member.description}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center bg-black rounded-3xl p-12 text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Join our mission
                    </h2>
                    <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                        Be part of the journey as we continue to innovate and
                        shape the future of digital commerce.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button className="bg-pink-500 hover:bg-pink-400 text-black px-8 py-6 text-lg rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                            Get Started
                        </Button>
                        <Button
                            variant="outline"
                            className="border-white text-white bg-transparent hover:bg-white hover:text-black px-8 py-6 text-lg rounded-full transition-all duration-300"
                        >
                            Contact Us
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
