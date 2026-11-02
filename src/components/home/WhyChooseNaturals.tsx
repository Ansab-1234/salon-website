import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Award, 
  HeartHandshake, 
  CheckCircle, 
  Coffee,
  Gem,
  Users
} from 'lucide-react';

export default function WhyChooseNaturals() {
  const pillars = [
    {
      icon: <Award className="w-6 h-6 text-gold-700" />,
      title: "Certified Master Stylists",
      description: "Our senior stylists and dermat-certified skin therapists undergo rigorous continuous training by L'Oréal and Naturals Academy to master latest global techniques.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-gold-700" />,
      title: "100% Medical-Grade Hygiene",
      description: "Single-use disposable aprons, sanitized stainless-steel instruments, UV sterilization cabinets, and sealed waxing kits for ultimate peace of mind.",
    },
    {
      icon: <Gem className="w-6 h-6 text-gold-700" />,
      title: "100% Authentic Global Brands",
      description: "Zero product adulteration. We exclusively formulate using authentic L'Oréal Professionnel, Kérastase, Cheryl's, O3+, MAC, and Rica Italian Wax.",
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-gold-700" />,
      title: "Transparent & Honest Pricing",
      description: "Clear prices with no hidden salon charges. What you see on our menu is what you pay, with editable transparency through our client portal.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-gold-700" />,
      title: "Private Luxury Bridal Suite",
      description: "A serene, well-lit, fully air-conditioned private chamber tailored for brides, reception preparations, family trials, and saree draping.",
    },
    {
      icon: <Users className="w-6 h-6 text-gold-700" />,
      title: "15,000+ Happy Hyderabad Clients",
      description: "Consistently rated 4.8★ on Google. Trusted across Vijaya Nagar Colony, Masab Tank, Mehdipatnam, and Banjara Hills for over 8 years.",
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-white border-b border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-gold-700 block mb-2">
            The Naturals Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-onyx-950">
            Why Vijaya Nagar Colony Chooses Naturals
          </h2>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4 mb-4" />
          <p className="text-sm text-onyx-600 leading-relaxed">
            We blend international salon craftsmanship with warm hospitality to provide Hyderabad with an unmatched salon and wellness experience.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-ivory-50/60 border border-gold-500/20 hover:border-gold-500/60 hover:shadow-luxury transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white border border-gold-500/30 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-gold-500/10 transition-all">
                {pillar.icon}
              </div>
              <h3 className="font-serif text-xl font-bold text-onyx-950 mb-3 group-hover:text-gold-800 transition-colors">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-onyx-600 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
