import Navbar from '@/components/Navbar'
import { Rocket, ShieldCheck, UserCheck, MessageSquare } from 'lucide-react'

export default function HowItWorksPage() {
    const steps = [
        {
            icon: <Rocket className="w-12 h-12 text-primary" />,
            title: "1. Browse & Select",
            description: "Explore our catalog of verified business services. From company formation to tax filing, find exactly what your business needs."
        },
        {
            icon: <UserCheck className="w-12 h-12 text-primary" />,
            title: "2. Connect with Experts",
            description: "We verify every professional. Once you select a service, you'll be matched with a qualified expert ready to initiate your request."
        },
        {
            icon: <MessageSquare className="w-12 h-12 text-primary" />,
            title: "3. Track Progress",
            description: "Monitor the status of your request directly from your dashboard. Communicate securely and upload necessary documents seamlessly."
        },
        {
            icon: <ShieldCheck className="w-12 h-12 text-primary" />,
            title: "4. Receive & Launch",
            description: "Get your deliverables—whether it's a license, certificate, or legal document—verified and ready for use. It's time to launch!"
        }
    ]

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-24 px-6 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[150px] -z-10" />
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 max-w-4xl mx-auto">
                    Simplifying Business Launch in <br />
                    <span className="gradient-text">4 Easy Steps</span>
                </h1>
                <p className="text-xl text-secondary max-w-2xl mx-auto">
                    We've streamlined the bureaucratic process so you can focus on building your dream business.
                </p>
            </section>

            {/* Steps Timeline */}
            <section className="pb-32 px-6">
                <div className="max-w-5xl mx-auto relative">
                    {/* Vertical Line (Hidden on Mobile) */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-glass-border transform -translate-x-1/2"></div>

                    <div className="space-y-12">
                        {steps.map((step, index) => (
                            <div key={index} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                                {/* Content Side */}
                                <div className="w-full md:w-1/2 p-4">
                                    <div className={`glass-card p-8 rounded-3xl hover:border-primary/50 transition-all ${index % 2 === 0 ? 'text-left md:text-left' : 'text-left md:text-right'}`}>
                                        <div className={`mb-6 inline-flex p-4 rounded-2xl bg-primary/10 shadow-lg ${index % 2 === 0 ? '' : 'md:float-right md:ml-6'}`}>
                                            {step.icon}
                                        </div>
                                        <div className="clear-both">
                                            <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                                            <p className="text-secondary leading-relaxed">{step.description}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Center Point (Hidden on Mobile) */}
                                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-background border-4 border-primary z-10 items-center justify-center">
                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                </div>

                                {/* Empty Side for Spacing */}
                                <div className="hidden md:block w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-white/50 dark:bg-black/20 backdrop-blur-sm border-y border-glass-border text-center px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Start?</h2>
                    <p className="text-secondary text-lg mb-8">
                        Join thousands of Bangladeshi entrepreneurs launching their businesses with confidence.
                    </p>
                    <a href="/signup" className="inline-block px-8 py-4 rounded-2xl gradient-bg text-white font-bold text-lg shadow-2xl hover:scale-105 transition-transform group">
                        Get Started Now
                    </a>
                </div>
            </section>
        </div>
    )
}
