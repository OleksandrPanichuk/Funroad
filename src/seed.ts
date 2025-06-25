import { getPayload } from 'payload'
import config from './payload.config'

import dotenv from 'dotenv'
import { stripe } from './lib/stripe'

dotenv.config()

const categories = [
    {
        name: 'All',
        slug: 'all',
    },
    {
        name: 'Business & Money',
        color: '#FFB347',
        slug: 'business-money',
        subcategories: [
            { name: 'Accounting', slug: 'accounting' },
            {
                name: 'Entrepreneurship',
                slug: 'entrepreneurship',
            },
            { name: 'Gigs & Side Projects', slug: 'gigs-side-projects' },
            { name: 'Investing', slug: 'investing' },
            { name: 'Management & Leadership', slug: 'management-leadership' },
            {
                name: 'Marketing & Sales',
                slug: 'marketing-sales',
            },
            {
                name: 'Networking, Careers & Jobs',
                slug: 'networking-careers-jobs',
            },
            { name: 'Personal Finance', slug: 'personal-finance' },
            { name: 'Real Estate', slug: 'real-estate' },
        ],
    },
    {
        name: 'Software Development',
        color: '#7EC8E3',
        slug: 'software-development',
        subcategories: [
            { name: 'Mobile Development', slug: 'mobile-development' },
            { name: 'Game Development', slug: 'game-development' },
            { name: 'Programming Languages', slug: 'programming-languages' },
            { name: 'DevOps', slug: 'devops' },
            { name: 'Backend Development', slug: 'backend-development' },
            { name: 'Frontend Development', slug: 'frontend-development' },
            { name: 'Database Design', slug: 'database-design' },
            { name: 'API Development', slug: 'api-development' },
            { name: 'Software Architecture', slug: 'software-architecture' },
            { name: 'Testing & QA', slug: 'testing-qa' },
            { name: 'Version Control', slug: 'version-control' },
            { name: 'Microservices', slug: 'microservices' },
            { name: 'Cloud Computing', slug: 'cloud-computing' },
            { name: 'Containerization', slug: 'containerization' },
        ],
    },
    {
        name: 'Programming',
        color: '#64B5F6',
        slug: 'programming',
        subcategories: [
            {
                name: 'Algorithms & Data Structures',
                slug: 'algorithms-data-structures',
            },
            {
                name: 'Object-Oriented Programming',
                slug: 'object-oriented-programming',
            },
            { name: 'Functional Programming', slug: 'functional-programming' },
            {
                name: 'Competitive Programming',
                slug: 'competitive-programming',
            },
            { name: 'Python', slug: 'python' },
            { name: 'JavaScript', slug: 'javascript' },
            { name: 'Java', slug: 'java' },
            { name: 'C/C++', slug: 'c-cpp' },
            { name: 'Rust', slug: 'rust' },
            { name: 'Go', slug: 'go' },
            { name: 'TypeScript', slug: 'typescript' },
            {
                name: 'Machine Learning Programming',
                slug: 'machine-learning-programming',
            },
            { name: 'Blockchain Development', slug: 'blockchain-development' },
        ],
    },
    {
        name: 'Writing & Publishing',
        color: '#D8B5FF',
        slug: 'writing-publishing',
        subcategories: [
            { name: 'Fiction', slug: 'fiction' },
            { name: 'Non-Fiction', slug: 'non-fiction' },
            { name: 'Blogging', slug: 'blogging' },
            { name: 'Copywriting', slug: 'copywriting' },
            { name: 'Self-Publishing', slug: 'self-publishing' },
        ],
    },
    {
        name: 'Other',
        slug: 'other',
    },
    {
        name: 'Education',
        color: '#FFE066',
        slug: 'education',
        subcategories: [
            { name: 'Online Courses', slug: 'online-courses' },
            { name: 'Tutoring', slug: 'tutoring' },
            { name: 'Test Preparation', slug: 'test-preparation' },
            { name: 'Language Learning', slug: 'language-learning' },
        ],
    },
    {
        name: 'Self Improvement',
        color: '#96E6B3',
        slug: 'self-improvement',
        subcategories: [
            { name: 'Productivity', slug: 'productivity' },
            { name: 'Personal Development', slug: 'personal-development' },
            { name: 'Mindfulness', slug: 'mindfulness' },
            { name: 'Career Growth', slug: 'career-growth' },
        ],
    },
    {
        name: 'Fitness & Health',
        color: '#FF9AA2',
        slug: 'fitness-health',
        subcategories: [
            { name: 'Workout Plans', slug: 'workout-plans' },
            { name: 'Nutrition', slug: 'nutrition' },
            { name: 'Mental Health', slug: 'mental-health' },
            { name: 'Yoga', slug: 'yoga' },
        ],
    },
    {
        name: 'Design',
        color: '#B5B9FF',
        slug: 'design',
        subcategories: [
            { name: 'UI/UX', slug: 'ui-ux' },
            { name: 'Graphic Design', slug: 'graphic-design' },
            { name: '3D Modeling', slug: '3d-modeling' },
            { name: 'Typography', slug: 'typography' },
        ],
    },
    {
        name: 'Drawing & Painting',
        color: '#FFCAB0',
        slug: 'drawing-painting',
        subcategories: [
            { name: 'Watercolor', slug: 'watercolor' },
            { name: 'Acrylic', slug: 'acrylic' },
            { name: 'Oil', slug: 'oil' },
            { name: 'Pastel', slug: 'pastel' },
            { name: 'Charcoal', slug: 'charcoal' },
        ],
    },
    {
        name: 'Music',
        color: '#FFD700',
        slug: 'music',
        subcategories: [
            { name: 'Songwriting', slug: 'songwriting' },
            { name: 'Music Production', slug: 'music-production' },
            { name: 'Music Theory', slug: 'music-theory' },
            { name: 'Music History', slug: 'music-history' },
        ],
    },
    {
        name: 'Photography',
        color: '#FF6B6B',
        slug: 'photography',
        subcategories: [
            { name: 'Portrait', slug: 'portrait' },
            { name: 'Landscape', slug: 'landscape' },
            { name: 'Street Photography', slug: 'street-photography' },
            { name: 'Nature', slug: 'nature' },
            { name: 'Macro', slug: 'macro' },
        ],
    },
    {
        name: 'Cooking & Food',
        color: '#77DD77',
        slug: 'cooking-food',
        subcategories: [
            { name: 'Recipes', slug: 'recipes' },
            { name: 'Baking', slug: 'baking' },
            { name: 'Meal Planning', slug: 'meal-planning' },
            { name: 'Nutrition Guides', slug: 'nutrition-guides' },
            { name: 'Specialty Diets', slug: 'specialty-diets' },
        ],
    },
    {
        name: 'Travel',
        color: '#AEC6CF',
        slug: 'travel',
        subcategories: [
            { name: 'Destination Guides', slug: 'destination-guides' },
            { name: 'Travel Photography', slug: 'travel-photography' },
            { name: 'Budget Travel', slug: 'budget-travel' },
            { name: 'Adventure Travel', slug: 'adventure-travel' },
            { name: 'Travel Planning', slug: 'travel-planning' },
        ],
    },
    {
        name: 'Technology',
        color: '#B19CD9',
        slug: 'technology',
        subcategories: [
            { name: 'Gadget Reviews', slug: 'gadget-reviews' },
            { name: 'Tech Tutorials', slug: 'tech-tutorials' },
            { name: 'AI & Machine Learning', slug: 'ai-machine-learning' },
            { name: 'Cybersecurity', slug: 'cybersecurity' },
            { name: 'Smart Home', slug: 'smart-home' },
            { name: 'Data Science', slug: 'data-science' },
            { name: 'Computer Vision', slug: 'computer-vision' },
            {
                name: 'Natural Language Processing',
                slug: 'natural-language-processing',
            },
            { name: 'Robotics', slug: 'robotics' },
            { name: 'IoT Development', slug: 'iot-development' },
        ],
    },
    {
        name: 'Crafts & DIY',
        color: '#FDFD96',
        slug: 'crafts-diy',
        subcategories: [
            { name: 'Knitting & Crochet', slug: 'knitting-crochet' },
            { name: 'Woodworking', slug: 'woodworking' },
            { name: 'Paper Crafts', slug: 'paper-crafts' },
            { name: 'Jewelry Making', slug: 'jewelry-making' },
            { name: 'Upcycling', slug: 'upcycling' },
        ],
    },
    {
        name: 'Home & Garden',
        color: '#C1E1C1',
        slug: 'home-garden',
        subcategories: [
            { name: 'Interior Design', slug: 'interior-design' },
            { name: 'Gardening', slug: 'gardening' },
            { name: 'Home Organization', slug: 'home-organization' },
            { name: 'Sustainable Living', slug: 'sustainable-living' },
            { name: 'DIY Home Improvement', slug: 'diy-home-improvement' },
        ],
    },
]

const seed = async () => {
    const payload = await getPayload({ config })

    const adminAccount = await stripe.accounts.create({})

    const adminTenant = await payload.create({
        collection: 'tenants',
        data: {
            name: process.env.ADMIN_USERNAME!,
            slug: process.env.ADMIN_USERNAME!,
            stripeAccountId: adminAccount.id,
        },
    })

    await payload.create({
        collection: 'users',
        data: {
            email: process.env.ADMIN_EMAIL!,
            password: process.env.ADMIN_PASSWORD!,
            roles: ['super-admin'],
            username: process.env.ADMIN_USERNAME!,
            tenants: [
                {
                    tenant: adminTenant.id,
                },
            ],
        },
    })

    for (const category of categories) {
        const parentCategory = await payload.create({
            collection: 'categories',
            data: {
                name: category.name,
                slug: category.slug,
                color: category.color,
                parent: null,
            },
        })

        for (const subcategory of category.subcategories || []) {
            await payload.create({
                collection: 'categories',
                data: {
                    name: subcategory.name,
                    slug: subcategory.slug,
                    parent: parentCategory.id,
                },
            })
        }
    }
}

try {
    await seed()
} catch (error) {
    console.error(error)
    process.exit(1)
}

process.exit(0)
