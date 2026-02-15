import Navbar from '@/components/Navbar'
import { Check, ShieldCheck, Zap, Users } from 'lucide-react'
import Link from 'next/link'

export default function ServicesPage() {
    const services = [
        {
            title: "Company Registration",
            category: "Legal & Compliance",
            price: "From ৳25,000",
            description: "Full service request for Private Limited Company registration with RJSC.",
            features: [
                "Name Clearance",
                "Drafting MoA & AoA",
                "RJSC Filing & Fees",
                "Incorporation Certificate"
            ]
        },
        {
            title: "Trade License",
            category: "Compliance",
            price: "From ৳5,000",
            description: "Hassle-free trade license application and renewal services for your business.",
            features: [
                "Form Filling",
                "Document Verification",
                "City Corporation Submission",
                "Delivery to Office"
            ]
        },
        {
            title: "VAT & Tax Filing",
            category: "Finance",
            price: "From ৳3,500",
            description: "Expert assistance with BIN registration and monthly VAT return filing.",
            features: [
                "BIN Registration",
                "Monthly Return Filing",
                "Tax Planning",
                "Audit Support"
            ]
        },
        {
            title: "Legal Consultation",
            category: "Legal",
            price: "From ৳2,000/hr",
            description: "One-on-one consultation with experienced corporate lawyers.",
            features: [
                "Contract Review",
                "Legal Compliance Audit",
                "Dispute Resolution",
                "Intellectual Property"
            ]
        },
        {
            title: "Digital Signature (DSC)",
            category: "Technical",
            price: "From ৳1,500",
            description: "Get your Class 2 or Class 3 Digital Signature Certificate quickly.",
            features: [
                "Identity Verification",
                "Token Issuance",
                "2-Year Validity",
                "Technical Support"
            ]
        },
        {
            title: "Trademark Registration",
            category: "Intellectual Property",
            price: "From ৳10,000",
            description: "Protect your brand identity with our seamless trademark registration service.",
            features: [
                "Trademark Search",
                "Application Filing",
                "Objection Handling",
                "Certificate Issuance"
            ]
        }
    ]

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-6 relative overflow-hidden">
                <div className="absolute top-0 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-[120px] -z-10" />
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                        Everything your business needs to <span className="gradient-text">Grow</span>
                    </h1>
                    <p className="text-xl text-secondary max-w-2xl mx-auto">
                        From incorporation to daily compliance, find verified expert services tailored for Bangladesh.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="pb-24 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="glass-card p-8 rounded-3xl hover:border-primary/50 transition-all hover:shadow-2xl hover:-translate-y-1 group">
                            <div className="text-xs font-bold uppercase tracking-widest text-primary mb-4 bg-primary/5 inline-block px-3 py-1 rounded-full">
                                {service.category}
                            </div>
                            <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                            <p className="text-secondary mb-6 h-12">{service.description}</p>

                            <div className="mb-6 space-y-3">
                                {service.features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-secondary">
                                        <Check className="w-4 h-4 text-green-500" />
                                        {feature}
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6 border-t border-glass-border flex items-center justify-between">
                                <div>
                                    <span className="text-xs text-secondary block">Starting at</span>
                                    <span className="text-xl font-bold">{service.price}</span>
                                </div>
                                <button className="px-6 py-2 rounded-xl gradient-bg text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
