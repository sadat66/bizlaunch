import Link from 'next/link'
import { ArrowRight, ShieldCheck, Zap, Users } from 'lucide-react'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        {/* Animated Background blobs */}
        <div className="absolute top-0 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-8 animate-float">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Accelerating Bangladesh Business
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight">
            Launch Your Business in <br />
            <span className="gradient-text uppercase">Bangladesh</span> with Confidence.
          </h1>

          <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto mb-12 leading-relaxed">
            The all-in-one marketplace connecting entrepreneurs with verified tax, legal, and compliance experts. From Trade Licenses to VAT registration, we skip the bureaucracy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/services" className="w-full sm:w-auto px-8 py-4 rounded-2xl gradient-bg text-white font-bold text-lg shadow-2xl hover:scale-105 transition-transform flex items-center justify-center gap-2 group">
              Explore Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/professionals" className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-card font-bold text-lg hover:bg-white/5 transition-all">
              Become a Provider
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-20 flex flex-wrap justify-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all">
            <div className="flex items-center gap-2 italic font-semibold text-xl">Tax Practitioner Asscoiation</div>
            <div className="flex items-center gap-2 italic font-semibold text-xl">Legal Shield BD</div>
            <div className="flex items-center gap-2 italic font-semibold text-xl">Startup Dhaka</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white/50 dark:bg-black/20 backdrop-blur-sm border-y border-glass-border px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose BizLaunch?</h2>
            <p className="text-secondary max-w-xl mx-auto">We streamline every step of the company formation process in Bangladesh.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <ShieldCheck className="w-8 h-8 text-primary" />,
                title: "Verified Professionals",
                desc: "Every consultant, lawyer, and tax expert is vetted with checked credentials and licenses."
              },
              {
                icon: <Zap className="w-8 h-8 text-primary" />,
                title: "Swift Compliance",
                desc: "No more waiting months. Get your Trade License, RJSC, and VAT certificates in record time."
              },
              {
                icon: <Users className="w-8 h-8 text-primary" />,
                title: "Transparent Marketplace",
                desc: "Check reviews, compare prices, and pick the expert that fits your specific business needs."
              }
            ].map((feature, i) => (
              <div key={i} className="glass-card p-8 rounded-3xl hover:border-primary/50 transition-colors group">
                <div className="mb-6 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-secondary leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid (Preview) */}
      <section id="services" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Popular Services</h2>
              <p className="text-secondary max-w-lg">Everything you need to stay compliant with Bangladesh&apos;s business laws.</p>
            </div>
            <Link href="/services" className="text-primary font-bold flex items-center gap-2 group">
              View All Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Company Registration (Pvt Ltd)", price: "25,000", cat: "Legal" },
              { title: "Trade License Assistance", price: "5,000", cat: "Compliance" },
              { title: "VAT Registration (BIN)", price: "3,500", cat: "Tax" },
              { title: "Annual Income Tax Return", price: "8,000", cat: "Tax" }
            ].map((service, i) => (
              <div key={i} className="glass-card p-6 rounded-3xl hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="text-[10px] font-bold uppercase tracking-widest text-primary mb-4">{service.cat}</div>
                <h4 className="text-lg font-bold mb-4 h-12">{service.title}</h4>
                <div className="flex justify-between items-center mt-6">
                  <div>
                    <span className="text-xs text-secondary italic">Starts from</span>
                    <div className="font-bold text-lg">৳{service.price}</div>
                  </div>
                  <button className="w-10 h-10 rounded-xl gradient-bg text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats/Social Proof */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto glass-card p-12 rounded-[3rem] gradient-bg text-white">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl font-extrabold mb-2 underline decoration-accent decoration-4">500+</div>
              <div className="font-medium opacity-80">Businesses Launched</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold mb-2 underline decoration-accent decoration-4">120+</div>
              <div className="font-medium opacity-80">Verified Experts</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold mb-2 underline decoration-accent decoration-4">৳2.5M+</div>
              <div className="font-medium opacity-80">Revenue Saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-glass-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg">
              B
            </div>
            <span className="text-xl font-bold tracking-tight">BizLaunch</span>
          </div>
          <div className="text-sm text-secondary">
            © 2026 BizLaunch. Handcrafted for the entrepreneurs of Bangladesh.
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="text-secondary hover:text-primary transition-colors">Twitter</Link>
            <Link href="#" className="text-secondary hover:text-primary transition-colors">LinkedIn</Link>
            <Link href="#" className="text-secondary hover:text-primary transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
