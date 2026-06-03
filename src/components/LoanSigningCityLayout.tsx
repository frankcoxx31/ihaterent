import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, CheckCircle, Shield, Award, Clock, Calendar, MessageSquare, ChevronDown, FileSignature, FileText, Landmark, Key, Receipt } from 'lucide-react';

interface LoanSigningService {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface LoanSigningCityLayoutProps {
  location: string; // e.g., "Mint Hill" or "Cabarrus County"
  h1?: string;
  image: string;
  heroText: string;
  overviewText: React.ReactNode;
  coverageAreas: string[];
  faqs: FAQItem[];
  mapEmbedUrl: string;
  metaDescription: string;
}

export default function LoanSigningCityLayout({
  location,
  h1,
  image,
  heroText,
  overviewText,
  coverageAreas,
  nearbyAreas = [],
  faqs,
  mapEmbedUrl,
  metaDescription
}: LoanSigningCityLayoutProps & { nearbyAreas?: { name: string, link: string }[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const displayH1 = h1 || `${location} Loan Signing Agent`;

  useEffect(() => {
    document.title = `${displayH1} | Integrity Closings CLT`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', metaDescription);
    }

    const schemaId = `schema-loan-signing-${location.replace(/\s+/g, '-').toLowerCase()}`;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = schemaId;
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `${location} Loan Signing Agent Services`,
      "serviceType": "Loan Signing Agent",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Integrity Closings CLT",
        "telephone": "980-372-4103",
        "url": "https://www.integrityclosingsclt.com"
      },
      "areaServed": {
        "@type": "Place",
        "name": location
      },
      "description": metaDescription
    });
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById(schemaId);
      if (existing) document.head.removeChild(existing);
    };
  }, [displayH1, location, metaDescription]);

  const loanServices: LoanSigningService[] = [
    {
      title: "Refinance Packages",
      description: "Expert handling of refinance loan documents, ensuring all signatures, initials, and dates are captured accurately for a smooth funding process.",
      icon: <Receipt className="w-6 h-6" />
    },
    {
      title: "Purchase Closings",
      description: "Assisting buyers with their new home journey by professionally facilitating the signing of purchase mortgage documents at their convenience.",
      icon: <Key className="w-6 h-6" />
    },
    {
      title: "Seller Package Signings",
      description: "Coordinating with sellers to ensure all deed transfers and closing disclosures are properly executed and notarized.",
      icon: <FileSignature className="w-6 h-6" />
    },
    {
      title: "HELOC Signings",
      description: "Precise execution of Home Equity Line of Credit documents, catering to the specific requirements of lenders and title companies.",
      icon: <Landmark className="w-6 h-6" />
    },
    {
      title: "Mortgage Document Appointments",
      description: "Mobile notary support for various mortgage-related tasks, including loan modifications, partial releases, and more.",
      icon: <FileText className="w-6 h-6" />
    }
  ];

  const trustPoints = [
    {
      title: "Punctual & Professional",
      description: "We understand that loan closings are time-sensitive. We arrive on time, every time, dressed professionally."
    },
    {
      title: "Mobile Convenience",
      description: "We meet you at your home, office, or any agreed meeting location across the region."
    },
    {
      title: "Clear Communication",
      description: "We keep all parties informed and confirm appointments promptly to ensure no surprises."
    },
    {
      title: "Expert Workflow",
      description: "Familiar with all major loan document types and lender requirements for error-free signings."
    },
    {
      title: "Surrounding Coverage",
      description: "Extensive service across nearby communities, making us a versatile local partner."
    },
    {
      title: "Smooth Experience",
      description: "Our goal is to make the signing process the easiest part of the entire mortgage journey."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src={image} alt={`${location} Loan Signing Agent`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-slate-900 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">{displayH1}</h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            {heroText}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/booking" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25">
              <Calendar className="w-5 h-5 mr-2" />
              Book Appointment
            </Link>
            <a href="tel:9803724103" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-lg text-slate-900 bg-yellow-400 hover:bg-yellow-500 transition-all shadow-lg hover:shadow-yellow-500/25">
              <Phone className="w-5 h-5 mr-2" />
              Call (980) 372-4103
            </a>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Professional Mobile Loan Signing in {location}</h2>
            <div className="text-lg text-slate-700 leading-relaxed space-y-6">
              {overviewText}
            </div>
            <div className="mt-10 p-6 bg-blue-50 rounded-2xl border border-blue-100 italic">
              <p className="text-slate-700">"Integrity Closings CLT is built on the foundation of providing a professional, punctual, and confidential signing experience for every client."</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
            <iframe 
              src={mapEmbedUrl} 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title={`Google Map of ${location}`}
            ></iframe>
          </div>
        </div>
      </section>

      {/* Loan Signing Services Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Loan Signing Services</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">We provide comprehensive mobile support for all types of mortgage and real estate document closings.</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loanServices.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Integrity Closings CLT?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Experience the benefits of working with a professional mobile loan signing agent in the {location} area.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {trustPoints.map((point, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-blue-600 mt-1" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{point.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Coverage Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">{location} Service Area & Coverage</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {coverageAreas.map((area, index) => (
              <div key={index} className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-yellow-400" />
                <span className="text-slate-300 font-medium">{area}</span>
              </div>
            ))}
          </div>

          {nearbyAreas.length > 0 && (
            <div className="border-t border-slate-800 pt-12">
              <h3 className="text-xl font-bold mb-8 text-center text-slate-400">Nearby Service Locations</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {nearbyAreas.map((area, index) => (
                  <Link 
                    key={index} 
                    to={area.link}
                    className="px-6 py-3 bg-slate-800 rounded-full text-sm font-medium hover:bg-slate-700 transition-colors border border-slate-700"
                  >
                    {area.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-16 text-center">
            <p className="text-slate-400 mb-4">Looking for general information about our specialization?</p>
            <Link to="/loan-signing-agent-charlotte-nc" className="text-yellow-400 font-bold hover:underline inline-flex items-center">
              View All Loan Signing Services <Award className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-600">Common questions about mobile loan signing services in {location}.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-slate-200 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-900 text-lg">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="p-6 bg-slate-50 border-t border-slate-200 text-slate-700 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-blue-600 py-20 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Ready to Schedule Your {location} Loan Signing?</h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">Don't risk delays. Work with a punctual mobile loan signing agent who understands the importance of error-free documents.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/booking" className="w-full sm:w-auto px-10 py-5 bg-white text-blue-600 font-bold text-xl rounded-xl hover:bg-blue-50 transition-all shadow-xl">
              Book Appointment
            </Link>
            <a href="tel:9803724103" className="w-full sm:w-auto px-10 py-5 bg-yellow-400 text-slate-900 font-bold text-xl rounded-xl hover:bg-yellow-500 transition-all shadow-xl flex items-center justify-center">
              <Phone className="w-6 h-6 mr-3" />
              980-372-4103
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
