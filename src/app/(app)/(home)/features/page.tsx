import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    BarChart3,
    CheckCircle,
    Globe,
    Heart,
    Palette,
    Shield,
    Smartphone,
    Star,
    Users,
    Zap,
} from 'lucide-react'

const features = [
    {
        icon: Zap,
        title: 'Lightning Fast',
        description:
            'Experience blazing-fast performance with our optimized platform that loads in milliseconds.',
        color: 'text-yellow-500',
    },
    {
        icon: Shield,
        title: 'Enterprise Security',
        description:
            'Bank-level security with end-to-end encryption to keep your data safe and secure.',
        color: 'text-green-500',
    },
    {
        icon: Users,
        title: 'Team Collaboration',
        description:
            'Work seamlessly with your team using real-time collaboration tools and shared workspaces.',
        color: 'text-blue-500',
    },
    {
        icon: BarChart3,
        title: 'Advanced Analytics',
        description:
            'Get deep insights with comprehensive analytics and detailed reporting dashboards.',
        color: 'text-purple-500',
    },
    {
        icon: Palette,
        title: 'Customizable Design',
        description:
            'Personalize your experience with flexible themes and customizable interface elements.',
        color: 'text-pink-500',
    },
    {
        icon: Smartphone,
        title: 'Mobile Optimized',
        description:
            'Access everything on-the-go with our fully responsive mobile-first design.',
        color: 'text-orange-500',
    },
]

const benefits = [
    'Increase productivity by 40%',
    'Reduce operational costs',
    'Scale effortlessly as you grow',
    '24/7 customer support',
    'No setup fees or hidden costs',
    'Free updates and maintenance',
]

const Page = () => {
    return (
        <div className="min-h-screen bg-[#f4f4f0] py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <Star className="w-4 h-4 fill-current" />
                        Features that matter
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
                        Everything you need to
                        <span className="block text-pink-500">
                            succeed online
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Discover powerful features designed to transform your
                        business and help you achieve more than ever before.
                    </p>
                    <Button className="bg-black hover:bg-pink-400 hover:text-black text-white px-8 py-6 text-lg rounded-full transition-all duration-300 transform hover:scale-105">
                        Start Free Trial
                    </Button>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0"
                        >
                            <CardHeader>
                                <div
                                    className={`w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                                >
                                    <feature.icon
                                        className={`w-6 h-6 ${feature.color}`}
                                    />
                                </div>
                                <CardTitle className="text-xl font-bold text-black group-hover:text-pink-500 transition-colors">
                                    {feature.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Benefits Section */}
                <div className="bg-white rounded-3xl p-12 mb-20 shadow-lg">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                                <Heart className="w-4 h-4 fill-current" />
                                Why choose us
                            </div>
                            <h2 className="text-4xl font-bold text-black mb-6">
                                Built for modern businesses
                            </h2>
                            <p className="text-gray-600 text-lg mb-8">
                                Join thousands of successful businesses who have
                                transformed their operations with our platform.
                            </p>
                            <div className="space-y-4">
                                {benefits.map((benefit, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3"
                                    >
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-700">
                                            {benefit}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-8 h-full flex items-center justify-center">
                                <div className="text-center">
                                    <Globe className="w-20 h-20 text-pink-500 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold text-black mb-2">
                                        Global Reach
                                    </h3>
                                    <p className="text-gray-600">
                                        Trusted by businesses in 150+ countries
                                        worldwide
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center bg-black rounded-3xl p-12 text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to get started?
                    </h2>
                    <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                        Join thousands of satisfied customers and transform your
                        business today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button className="bg-pink-500 hover:bg-pink-400 text-black px-8 py-6 text-lg rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                            Start Free Trial
                        </Button>
                        <Button
                            variant="outline"
                            className="border-white text-white bg-transparent hover:bg-white hover:text-black px-8 py-6 text-lg rounded-full transition-all duration-300"
                        >
                            Schedule Demo
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
