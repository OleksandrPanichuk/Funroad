import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Clock,
    Globe,
    Headphones,
    Heart,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Send,
    Users,
} from 'lucide-react'

const contactMethods = [
    {
        icon: Mail,
        title: 'Email Us',
        description: 'Get in touch via email',
        contact: 'hello@funroad.com',
        subtext: 'We respond within 24 hours',
        color: 'text-blue-500',
        bgColor: 'bg-blue-100',
    },
    {
        icon: Phone,
        title: 'Call Us',
        description: 'Speak to our team',
        contact: '+1 (555) 123-4567',
        subtext: 'Mon-Fri, 9AM-6PM EST',
        color: 'text-green-500',
        bgColor: 'bg-green-100',
    },
    {
        icon: MessageCircle,
        title: 'Live Chat',
        description: 'Chat with support',
        contact: 'Available 24/7',
        subtext: 'Instant responses',
        color: 'text-purple-500',
        bgColor: 'bg-purple-100',
    },
    {
        icon: MapPin,
        title: 'Visit Us',
        description: 'Our headquarters',
        contact: '123 Business St, Suite 100',
        subtext: 'San Francisco, CA 94105',
        color: 'text-pink-500',
        bgColor: 'bg-pink-100',
    },
]

const departments = [
    {
        icon: Headphones,
        name: 'Customer Support',
        description:
            'Get help with your account, billing, or technical issues.',
        email: 'support@funroad.com',
    },
    {
        icon: Users,
        name: 'Sales Team',
        description:
            'Learn about our plans and find the right solution for your business.',
        email: 'sales@funroad.com',
    },
    {
        icon: Globe,
        name: 'Partnerships',
        description:
            'Interested in partnering with us? Let&apos;s discuss opportunities.',
        email: 'partners@funroad.com',
    },
    {
        icon: Heart,
        name: 'General Inquiries',
        description:
            'Any other questions or feedback? We&apos;d love to hear from you.',
        email: 'hello@funroad.com',
    },
]

const Page = () => {
    return (
        <div className="min-h-screen bg-[#f4f4f0] py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <MessageCircle className="w-4 h-4" />
                        Get in touch
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
                        We&apos;d love to
                        <span className="block text-pink-500">
                            hear from you
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Have questions, suggestions, or just want to say hello?
                        Our team is here to help you every step of the way.
                    </p>
                </div>

                {/* Contact Methods */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {contactMethods.map((method, index) => (
                        <Card
                            key={index}
                            className="text-center p-8 bg-white border-0 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
                        >
                            <CardContent className="p-0">
                                <div
                                    className={`w-16 h-16 ${method.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}
                                >
                                    <method.icon
                                        className={`w-8 h-8 ${method.color}`}
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-black mb-2">
                                    {method.title}
                                </h3>
                                <p className="text-gray-600 mb-3">
                                    {method.description}
                                </p>
                                <div className="font-semibold text-black mb-1">
                                    {method.contact}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {method.subtext}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Main Contact Section */}
                <div className="grid lg:grid-cols-2 gap-12 mb-20">
                    {/* Contact Form */}
                    <Card className="bg-white border-0 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-black">
                                Send us a message
                            </CardTitle>
                            <p className="text-gray-600">
                                Fill out the form below and we&apos;ll get back
                                to you as soon as possible.
                            </p>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <Label
                                            htmlFor="firstName"
                                            className="text-black font-medium"
                                        >
                                            First Name
                                        </Label>
                                        <Input
                                            id="firstName"
                                            placeholder="John"
                                            className="mt-2 border-gray-200 focus:border-pink-500 focus:ring-pink-500"
                                        />
                                    </div>
                                    <div>
                                        <Label
                                            htmlFor="lastName"
                                            className="text-black font-medium"
                                        >
                                            Last Name
                                        </Label>
                                        <Input
                                            id="lastName"
                                            placeholder="Doe"
                                            className="mt-2 border-gray-200 focus:border-pink-500 focus:ring-pink-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label
                                        htmlFor="email"
                                        className="text-black font-medium"
                                    >
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        className="mt-2 border-gray-200 focus:border-pink-500 focus:ring-pink-500"
                                    />
                                </div>

                                <div>
                                    <Label
                                        htmlFor="company"
                                        className="text-black font-medium"
                                    >
                                        Company (Optional)
                                    </Label>
                                    <Input
                                        id="company"
                                        placeholder="Acme Corp"
                                        className="mt-2 border-gray-200 focus:border-pink-500 focus:ring-pink-500"
                                    />
                                </div>

                                <div>
                                    <Label
                                        htmlFor="subject"
                                        className="text-black font-medium"
                                    >
                                        Subject
                                    </Label>
                                    <Input
                                        id="subject"
                                        placeholder="How can we help you?"
                                        className="mt-2 border-gray-200 focus:border-pink-500 focus:ring-pink-500"
                                    />
                                </div>

                                <div>
                                    <Label
                                        htmlFor="message"
                                        className="text-black font-medium"
                                    >
                                        Message
                                    </Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Tell us more about your inquiry..."
                                        rows={6}
                                        className="mt-2 border-gray-200 focus:border-pink-500 focus:ring-pink-500"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-pink-500 hover:bg-pink-400 text-black py-6 text-lg rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                                >
                                    <Send className="w-5 h-5 mr-2" />
                                    Send Message
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Department Cards */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-3xl font-bold text-black mb-4">
                                Choose your department
                            </h2>
                            <p className="text-gray-600 mb-8">
                                Not sure who to contact? Here are our different
                                departments to help you get in touch with the
                                right team.
                            </p>
                        </div>

                        {departments.map((dept, index) => (
                            <Card
                                key={index}
                                className="bg-white border-0 hover:shadow-lg transition-all duration-300 transform hover:-translate-x-2"
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <dept.icon className="w-6 h-6 text-pink-500" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-black mb-2">
                                                {dept.name}
                                            </h3>
                                            <p className="text-gray-600 mb-3">
                                                {dept.description}
                                            </p>
                                            <a
                                                href={`mailto:${dept.email}`}
                                                className="text-pink-500 hover:text-pink-600 font-medium transition-colors"
                                            >
                                                {dept.email}
                                            </a>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Office Hours */}
                <div className="bg-white rounded-3xl p-12 mb-20 shadow-lg">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                                <Clock className="w-4 h-4" />
                                Office Hours
                            </div>
                            <h2 className="text-4xl font-bold text-black mb-6">
                                When we&apos;re available
                            </h2>
                            <p className="text-gray-600 text-lg mb-8">
                                Our team is spread across different time zones
                                to provide you with the best support possible.
                            </p>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                    <span className="font-medium text-black">
                                        Monday - Friday
                                    </span>
                                    <span className="text-gray-600">
                                        9:00 AM - 6:00 PM EST
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                    <span className="font-medium text-black">
                                        Saturday
                                    </span>
                                    <span className="text-gray-600">
                                        10:00 AM - 4:00 PM EST
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                    <span className="font-medium text-black">
                                        Sunday
                                    </span>
                                    <span className="text-gray-600">
                                        Closed
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-3">
                                    <span className="font-medium text-black">
                                        Live Chat
                                    </span>
                                    <span className="text-green-600 font-medium">
                                        24/7 Available
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 rounded-2xl p-8 h-full flex items-center justify-center">
                                <div className="text-center">
                                    <Globe className="w-20 h-20 text-pink-500 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold text-black mb-2">
                                        Global Support
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        We have team members in North America,
                                        Europe, and Asia
                                    </p>
                                    <div className="text-sm text-gray-500">
                                        Average response time: &lt; 2 hours
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center bg-black rounded-3xl p-12 text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Still have questions?
                    </h2>
                    <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                        Can&apos;t find what you&apos;re looking for? Our team
                        is here to help you with anything you need.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button className="bg-pink-500 hover:bg-pink-400 text-black px-8 py-6 text-lg rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                            Start Live Chat
                        </Button>
                        <Button
                            variant="outline"
                            className="border-white text-white bg-transparent hover:bg-white hover:text-black px-8 py-6 text-lg rounded-full transition-all duration-300"
                        >
                            Browse FAQ
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
