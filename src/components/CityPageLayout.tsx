import { Link } from 'react-router-dom';
import { MapPin, Phone, CheckCircle, Shield, Award, Clock, Calendar, MessageSquare, ChevronDown } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface ServiceCard {
  title: string;
  description: React.ReactNode;
  icon: React.ReactNode;
  link?: string;
}

interface HospitalCard {
  name: string;
  location: string;
  description: React.ReactNode;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface CityPageLayoutProps {
  city: string;
  image: string;
  introText: React.ReactNode;
  services: ServiceCard[];
  hospitalsIntro: string;
  hospitals: HospitalCard[];
  additionalLocations: string[];
  faqs: FAQItem[];
  mapEmbedUrl: string;
  metaDescription?: string;
}

export default function CityPageLayout({ 
  city, 
  image, 
  introText, 
  services, 
  hospitalsIntro, 
  hospitals, 
  additionalLocations,
  faqs,
  mapEmbedUrl,
  metaDescription
}: CityPageLayoutProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.title = `Mobile Notary ${city} NC | Integrity Closings CLT`;
    if (metaDescription) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute('content', metaDescription);
      }
    }

    const script1 = document.createElement('script');
    script1.type = 'application/ld+json';
    script1.id = `schema-city-${city.replace(/\s+/g, '-').toLowerCase()}`;
    script1.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "serviceType": "Mobile Notary Public",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Integrity Closings CLT",
            "image": "https://integrityclosingsclt.com/logo.png",
            "telephone": "980-372-4103",
            "url": "https://integrityclosingsclt.com",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": city,
              "addressRegion": "NC",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCircle",
              "itemOffered": {
                "@type": "Service",
                "name": "Mobile Notary"
              },
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": "35.2271",
                "longitude": "-80.8431"
              },
              "geoRadius": "50000"
            }
          },
          "areaServed": {
            "@type": "City",
            "name": city
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Notary Services",
            "itemListElement": services.map((s) => ({
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": s.title
              }
            }))
          }
        },
        {
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        }
      ]
    });
    
    document.head.appendChild(script1);

    return () => {
      const existing1 = document.getElementById(`schema-city-${city.replace(/\s+/g, '-').toLowerCase()}`);
      if (existing1) document.head.removeChild(existing1);
    };
  }, [city, metaDescription, services, faqs]);

  return (
    <div className="bg-white font-sans">
      {/* Header Section */}
      <div className="bg-blue-950 text-white py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src={image} alt={`Mobile Notary Services in ${city}, NC`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-blue-950 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Mobile Notary {city}, NC</h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Professional, Reliable, and Fast Notary Services Delivered Directly to Your Door in <span className="text-yellow-400 font-bold underline decoration-yellow-400/30 underline-offset-8">{city}</span>.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/booking" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25">
              <Calendar className="w-5 h-5 mr-2" />
              Book Appointment
            </a>
            <a href="tel:9803724103" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-lg text-blue-950 bg-yellow-400 hover:bg-yellow-500 transition-all shadow-lg hover:shadow-yellow-500/25">
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </a>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="bg-slate-100 py-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-950">7+</div>
              <div className="text-sm text-slate-600 uppercase tracking-wider font-semibold">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-950">5,000+</div>
              <div className="text-sm text-slate-600 uppercase tracking-wider font-semibold">Signings Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-950">100%</div>
              <div className="text-sm text-slate-600 uppercase tracking-wider font-semibold">Mobile Service</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-950">5-Star</div>
              <div className="text-sm text-slate-600 uppercase tracking-wider font-semibold">Professionalism</div>
            </div>
          </div>
        </div>
      </div>

      {/* Intro & Services Section */}
      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-8 leading-tight">Your Trusted Mobile Notary Partner in {city}</h2>
            <div className="text-lg text-slate-700 leading-relaxed space-y-6">
              {introText}
            </div>
            <div className="mt-10 p-6 bg-blue-50 rounded-2xl border border-blue-100">
              <h3 className="text-xl font-bold text-blue-950 mb-4 flex items-center">
                <Shield className="w-6 h-6 text-blue-600 mr-3" />
                Our Service Guarantee
              </h3>
              <p className="text-slate-700">We guarantee professional, accurate, and punctual service. If we make a clerical error on your notarization, we will return to correct it at no additional cost to you.</p>
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
              title={`Google Map of ${city}, NC`}
            ></iframe>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-950 mb-4">Specialized Notary Services</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">We handle complex legal documents with precision and care, ensuring every signing is legally binding and stress-free.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-4">{service.title}</h3>
              <div className="text-slate-600 leading-relaxed mb-6">{service.description}</div>
              {service.link && (
                <Link to={service.link} className="text-blue-600 font-bold flex items-center hover:underline">
                  Learn More
                  <Award className="w-4 h-4 ml-2" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Hospitals Section */}
      <div className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Hospital & Nursing Home Notary</h2>
            <p className="text-xl text-slate-300">
              {hospitalsIntro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {hospitals.map((hospital, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-yellow-500/50 transition-colors">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-blue-950 font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{hospital.name}</h3>
                    <p className="text-yellow-500 text-sm font-semibold uppercase tracking-wider mb-4">{hospital.location}</p>
                    <div className="text-slate-300 leading-relaxed">{hospital.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white/5 p-10 rounded-3xl border border-white/10">
            <h3 className="text-2xl font-bold mb-8 text-center">Neighborhoods & Landmarks We Serve in {city}:</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalLocations.map((location, index) => (
                <li key={index} className="flex items-center text-slate-300">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                  {location}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-600">Common questions about our mobile notary services in {city}, NC.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-slate-200 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-blue-950 text-lg">{faq.question}</span>
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
      </div>

      {/* Final CTA Section */}
      <div className="bg-blue-600 py-24 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Need a Notary in {city} Right Now?</h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">We offer same-day appointments and after-hours emergency services to ensure your documents are signed when you need them.</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="/booking" className="w-full sm:w-auto px-10 py-5 bg-white text-blue-600 font-bold text-xl rounded-xl hover:bg-blue-50 transition-all shadow-xl">
              Request Mobile Notary
            </a>
            <a href="tel:9803724103" className="w-full sm:w-auto px-10 py-5 bg-yellow-400 text-blue-950 font-bold text-xl rounded-xl hover:bg-yellow-500 transition-all shadow-xl flex items-center justify-center">
              <Phone className="w-6 h-6 mr-3" />
              980-372-4103
            </a>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-8 text-blue-100">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-yellow-400" />
              Licensed & Bonded
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-yellow-400" />
              E&O Insured
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-yellow-400" />
              NNA Certified
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
