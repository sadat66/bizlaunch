import Navbar from '@/components/Navbar'
import { Sparkles, Check } from 'lucide-react'

export default function PricingPage() {
    const plans = [
        {
            name: "Starter",
            description: "For individuals looking to formalize their freelance or small business.",
            price: "0",
            type: "Month",
            features: [
                "Create Basic Profile",
                "Browse Verified Experts",
                "Community Support",
                "Limited Service Requests",
                "Email Support"
            ],
            cta: "Start Free",
            popular: false
        },
        {
            name: "Growth",
            description: "Perfect for new startups needing regular compliance and legal support.",
            price: "999",
            type: "Month",
            features: [
                "Priority Expert Matching",
                "Unlimited Service Requests",
                "Discounted Filing Fees",
                "Dedicated Account Manager",
                "Verified Business Badge"
            ],
            cta: "Get Pro",
            popular: true
        },
        {
            name: "Enterprise",
            description: "Comprehensive solutions for established companies scaling up.",
            price: "Custom",
            type: "Contact",
            features: [
                "Full Legal Audit",
                "On-Demand Corporate Lawyer",
                "Priority Government Liaison",
                "Custom Compliance Dashboard",
                "24/7 Dedicated Support"
            ],
            cta: "Contact Sales",
            popular: false
        }
    ]

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-24 px-6 text-center relative overflow-hidden">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                    Transparent <span className="gradient-text">Pricing</span> That Grows With You
                </h1>
                <p className="text-xl text-secondary max-w-2xl mx-auto">
                    No hidden fees. Choose the plan that fits your business stage.
                </p>
            </section>

            {/* Pricing Cards */}
            <section className="pb-32 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <div key={index} className={`glass-card p-8 rounded-3xl relative overflow-hidden flex flex-col ${plan.popular ? 'border-primary shadow-2xl scale-105 z-10' : 'hover:border-primary/50 hover:shadow-xl transition-all'}`}>

                            {plan.popular && (
                                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-widest shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                <p className="text-secondary text-sm h-10">{plan.description}</p>
                            </div>

                            <div className="mb-8 flex items-baseline gap-1">
                                <span className="text-4xl font-extrabold">{plan.price === "Custom" ? "Custom" : `৳${plan.price}`}</span>
                                {plan.price !== "Custom" && <span className="text-secondary text-sm">/{plan.type}</span>}
                            </div>

                            <div className="flex-grow space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3 text-sm">
                                        <Check className={`w-5 h-5 flex-shrink-0 ${plan.popular ? 'text-primary' : 'text-green-500'}`} />
                                        <span className="text-secondary-foreground">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.popular
                                    ? 'gradient-bg text-white shadow-xl hover:opacity-90'
                                    : 'bg-secondary/10 hover:bg-secondary/20 text-secondary-foreground'
                                }`}>
                                {plan.cta}
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-white/50 dark:bg-black/20 backdrop-blur-sm border-y border-glass-border px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        <details className="glass-card p-6 rounded-2xl group cursor-pointer transition-all open:ring-2 ring-primary/20">
                            <summary className="font-bold text-lg list-none flex justify-between items-center group-hover:text-primary transition-colors">
                                Are there government fees included?
                                <span className="opacity-50 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="mt-4 text-secondary leading-relaxed">
                                Our service fees cover the professional assistance and platform usage. Government fees (RJSC, Trade License challan fees, etc.) are separate and billed at actuals based on the government receipts.
                            </p>
                        </details>
                        <details className="glass-card p-6 rounded-2xl group cursor-pointer transition-all open:ring-2 ring-primary/20">
                            <summary className="font-bold text-lg list-none flex justify-between items-center group-hover:text-primary transition-colors">
                                Can I upgrade my plan later?
                                <span className="opacity-50 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="mt-4 text-secondary leading-relaxed">
                                Absolutely! You can upgrade to the Growth plan at any time from your dashboard. The benefits, such as discounted filing fees, will apply immediately to your next request.
                            </p>
                        </details>
                        <details className="glass-card p-6 rounded-2xl group cursor-pointer transition-all open:ring-2 ring-primary/20">
                            <summary className="font-bold text-lg list-none flex justify-between items-center group-hover:text-primary transition-colors">
                                Is support available on the free plan?
                                <span className="opacity-50 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="mt-4 text-secondary leading-relaxed">
                                Yes, our free Starter plan includes standard email support. For faster, priority support and dedicated account management, we recommend the Growth plan.
                            </p>
                        </details>
                    </div>
                </div>
            </section>
        </div>
    )
}
