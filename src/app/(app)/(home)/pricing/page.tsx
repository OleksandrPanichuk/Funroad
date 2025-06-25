import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Check,
    Crown,
    Headphones,
    Rocket,
    Shield,
    Star,
    Users,
    X,
    Zap,
} from 'lucide-react'

const plans = [
    {
        name: 'Starter',
        price: '$0',
        period: 'Forever',
        description: 'Perfect for getting started',
        icon: Rocket,
        features: [
            'Up to 3 projects',
            '1GB storage',
            'Basic analytics',
            'Email support',
            'Mobile app access',
        ],
        limitations: [
            'Advanced integrations',
            'Custom branding',
            'Priority support',
            'Team collaboration',
        ],
        buttonText: 'Get Started Free',
        buttonStyle: 'bg-black hover:bg-pink-400 hover:text-black text-white',
        popular: false,
    },
    {
        name: 'Pro',
        price: '$29',
        period: 'per month',
        description: 'Best for growing businesses',
        icon: Zap,
        features: [
            'Unlimited projects',
            '100GB storage',
            'Advanced analytics',
            'Priority email support',
            'Mobile app access',
            'Team collaboration',
            'Custom integrations',
            'API access',
        ],
        limitations: ['White-label options', 'Dedicated support'],
        buttonText: 'Start Pro Trial',
        buttonStyle: 'bg-pink-500 hover:bg-pink-400 text-black',
        popular: true,
    },
    {
        name: 'Enterprise',
        price: '$99',
        period: 'per month',
        description: 'For large organizations',
        icon: Crown,
        features: [
            'Everything in Pro',
            'Unlimited storage',
            'Advanced security',
            'Dedicated support manager',
            'White-label options',
            'Custom implementations',
            'SLA guarantee',
            'Training sessions',
        ],
        limitations: [],
        buttonText: 'Contact Sales',
        buttonStyle: 'bg-black hover:bg-pink-400 hover:text-black text-white',
        popular: false,
    },
]

const faqs = [
    {
        question: 'Can I change my plan anytime?',
        answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and we&apos;ll prorate any charges.',
    },
    {
        question: 'Is there a free trial?',
        answer: 'We offer a 14-day free trial on all paid plans. No credit card required to get started.',
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.',
    },
    {
        question: 'Do you offer refunds?',
        answer: 'Yes, we offer a 30-day money-back guarantee. If you&apos;re not satisfied, we&apos;ll refund your payment.',
    },
]

const Page = () => {
    return (
        <div className="min-h-screen bg-[#f4f4f0] py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <Star className="w-4 h-4 fill-current" />
                        Simple, transparent pricing
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
                        Choose the perfect
                        <span className="block text-pink-500">
                            plan for you
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Start free and scale as you grow. No hidden fees, no
                        surprises. Cancel anytime.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid lg:grid-cols-3 gap-8 mb-20">
                    {plans.map((plan, index) => (
                        <Card
                            key={index}
                            className={`relative overflow-hidden bg-white border-0 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                                plan.popular
                                    ? 'ring-2 ring-pink-500 scale-105'
                                    : ''
                            }`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-0 right-0 bg-pink-500 text-black text-center py-2 text-sm font-semibold">
                                    Most Popular
                                </div>
                            )}
                            <CardHeader
                                className={`text-center ${plan.popular ? 'pt-12' : 'pt-6'}`}
                            >
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <plan.icon className="w-8 h-8 text-pink-500" />
                                </div>
                                <CardTitle className="text-2xl font-bold text-black">
                                    {plan.name}
                                </CardTitle>
                                <p className="text-gray-600">
                                    {plan.description}
                                </p>
                                <div className="mt-6">
                                    <span className="text-4xl font-bold text-black">
                                        {plan.price}
                                    </span>
                                    <span className="text-gray-600 ml-2">
                                        {plan.period}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent className="px-6 pb-8">
                                <Button
                                    className={`w-full py-6 text-lg rounded-full font-semibold transition-all duration-300 transform hover:scale-105 mb-8 ${plan.buttonStyle}`}
                                >
                                    {plan.buttonText}
                                </Button>

                                <div className="space-y-4">
                                    <div className="font-semibold text-black mb-3">
                                        What&apos;s included:
                                    </div>
                                    {plan.features.map(
                                        (feature, featureIndex) => (
                                            <div
                                                key={featureIndex}
                                                className="flex items-center gap-3"
                                            >
                                                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                <span className="text-gray-700">
                                                    {feature}
                                                </span>
                                            </div>
                                        ),
                                    )}

                                    {plan.limitations.length > 0 && (
                                        <>
                                            <div className="border-t pt-4 mt-6">
                                                <div className="font-semibold text-gray-500 mb-3">
                                                    Not included:
                                                </div>
                                                {plan.limitations.map(
                                                    (
                                                        limitation,
                                                        limitIndex,
                                                    ) => (
                                                        <div
                                                            key={limitIndex}
                                                            className="flex items-center gap-3"
                                                        >
                                                            <X className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                                            <span className="text-gray-500">
                                                                {limitation}
                                                            </span>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Features Comparison */}
                <div className="bg-white rounded-3xl p-12 mb-20 shadow-lg">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-black mb-4">
                            Why customers love us
                        </h2>
                        <p className="text-xl text-gray-600">
                            See what makes our platform the best choice for your
                            business
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Users className="w-8 h-8 text-pink-500" />
                            </div>
                            <h3 className="text-xl font-bold text-black mb-4">
                                Easy to Use
                            </h3>
                            <p className="text-gray-600">
                                Intuitive interface that your entire team can
                                use from day one. No training required.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Shield className="w-8 h-8 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-bold text-black mb-4">
                                Secure & Reliable
                            </h3>
                            <p className="text-gray-600">
                                Enterprise-grade security with 99.9% uptime
                                guarantee. Your data is always safe.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Headphones className="w-8 h-8 text-green-500" />
                            </div>
                            <h3 className="text-xl font-bold text-black mb-4">
                                24/7 Support
                            </h3>
                            <p className="text-gray-600">
                                Get help whenever you need it. Our support team
                                is always ready to assist you.
                            </p>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-black mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-xl text-gray-600">
                            Got questions? We&apos;ve got answers.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {faqs.map((faq, index) => (
                            <Card key={index} className="bg-white border-0 p-8">
                                <CardContent className="p-0">
                                    <h3 className="text-xl font-bold text-black mb-4">
                                        {faq.question}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center bg-black rounded-3xl p-12 text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to get started?
                    </h2>
                    <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                        Join thousands of businesses already using our platform
                        to grow their success.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button className="bg-pink-500 hover:bg-pink-400 text-black px-8 py-6 text-lg rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                            Start Free Trial
                        </Button>
                        <Button
                            variant="outline"
                            className="border-white text-white bg-transparent hover:bg-white hover:text-black px-8 py-6 text-lg rounded-full transition-all duration-300"
                        >
                            Talk to Sales
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
