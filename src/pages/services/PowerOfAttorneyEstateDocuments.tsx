import { ArrowLeft, CheckCircle, Info, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function PowerOfAttorneyEstateDocuments() {
  useEffect(() => {
    // SEO Meta Tags
    document.title = "Power of Attorney & Estate Notary Charlotte NC | Mobile Notary";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Professional mobile notary for Power of Attorney, Wills, and Trust documents in Charlotte, NC. Home, hospital, and nursing home visits available.");
    }

    // JSON-LD Schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'poa-schema';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "name": "Power of Attorney & Estate Document Notary in Charlotte, NC",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Integrity Closings CLT",
            "url": "https://www.integrityclosingsclt.com/"
          },
          "areaServed": {
            "@type": "City",
            "name": "Charlotte"
          },
          "serviceType": "Power of Attorney & Estate Document Notary",
          "description": "Professional mobile notary for power of attorney, trusts, wills, and estate documents in Charlotte, NC. Home, hospital, nursing home, and after-hours appointments available.",
          "url": "https://www.integrityclosingsclt.com/power-of-attorney-estate-documents-charlotte-nc"
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is required to notarize a Power of Attorney?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The Principal (the person granting authority) must be physically present, have valid government-issued ID, and be alert and aware enough to understand what they are signing."
              }
            },
            {
              "@type": "Question",
              "name": "Can you draft a Power of Attorney for me?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. Under North Carolina law, Notaries Public are legally barred from drafting legal documents or providing advice. Please have an attorney or legal service prepare the POA before we arrive."
              }
            },
            {
              "@type": "Question",
              "name": "Do I need witnesses for a Healthcare Power of Attorney?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Typically, yes. Most Healthcare Power of Attorney forms in North Carolina require two impartial witnesses in addition to the notary. We recommend providing your own witnesses if possible."
              }
            },
            {
              "@type": "Question",
              "name": "If my parent is in the hospital, can you notarize their POA?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, as long as they are conscious, understand the document, and are willing to sign. We specialize in hospital visits for emergency POA signings."
              }
            },
            {
              "@type": "Question",
              "name": "What happens if the Principal cannot physically write?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "North Carolina allows for a 'Signature by Mark' (like an X) or a directed signature, provided the Principal can clearly communicate their intent and the proper witnesses are present."
              }
            }
          ]
        }
      ]
    });
    document.head.appendChild(script);
    return () => {
      const existingScript = document.getElementById('poa-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const commonDocuments = [
    "Power of Attorney",
    "Durable Power of Attorney",
    "Healthcare Power of Attorney",
    "Advance Directives",
    "Living Wills",
    "Trust Documents",
    "Estate Planning Documents",
    "Affidavits",
    "Authorization Forms"
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/mobile-notary-charlotte-nc" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to All Services
        </Link>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="h-64 sm:h-80 w-full relative bg-slate-100">
            <img 
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200" 
              alt="Power of Attorney & Estate Documents" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer" 
            />
          </div>
          
          <div className="p-8 sm:p-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Power of Attorney & Estate Document Notarization
            </h1>
            
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Integrity Closings CLT provides professional mobile notary services specializing in the precise notarization of Power of Attorney and critical estate planning documents. We travel directly to your location—whether it is a private residence, attorney’s office, hospital, or senior care facility—throughout the Greater Charlotte area.
            </p>
            
            <div className="mb-12 rounded-xl overflow-hidden shadow-sm border border-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200" 
                alt="Mobile notary signing documents in Charlotte NC" 
                className="w-full h-64 sm:h-80 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <section className="mb-10">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-slate-900">Mobile Service to Hospitals, Nursing Homes & Residences</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                We understand that coordinating signatures for Powers of Attorney often involves loved ones who may be in a medical center, rehabilitation facility, or simply prefer the comfort of home. We provide a calm, patient, and professional mobile service to ensure your documents are handled correctly and with respect.
              </p>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Documents We Commonly Notarize</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {commonDocuments.map((doc, i) => (
                  <div key={i} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">{doc}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12 p-6 bg-slate-50 rounded-xl border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Notary Fees & Travel</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  North Carolina law allows a maximum fee of $10.00 per notarized principal signature for traditional notarial acts.
                </p>
                <p>
                  For mobile appointments, a separate travel fee may apply at the current federal mileage rate when approved in writing before travel. 
                </p>
                <p className="text-sm italic">
                  Note: If witnesses, specific legal formats, or legal advice are required, clients should confirm those details with their attorney or document preparer prior to the appointment. Notaries cannot provide legal guidance.
                </p>
              </div>
            </section>

            <section className="mb-12 mt-12 border-t border-slate-100 pt-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {[
                  {
                    q: "What is required to notarize a Power of Attorney?",
                    a: "The Principal (the signer) must be physically present, have a valid government-issued photo ID, and be alert and aware enough to understand the document they are signing."
                  },
                  {
                    q: "Can the notary help me understand or draft the POA?",
                    a: "No. Under North Carolina law, Notaries Public are legally prohibited from drafting legal documents or providing advice. Please have an attorney or legal service prepare the documents before our arrival."
                  },
                  {
                    q: "Do I need to provide my own witnesses?",
                    a: "Yes. Most Healthcare Powers of Attorney and many general POAs in North Carolina require two impartial witnesses who are not named in the document or related to the signer. Please confirm witness requirements with your attorney."
                  },
                  {
                    q: "What if the signer is in a hospital or ICU?",
                    a: "We specialize in hospital visits for Power of Attorney signings. As long as the signer is conscious, understands what they are signing, and is willing to do so, we can proceed. If they are sedated or incapacitated, we legally cannot notarize."
                  }
                ].map((faq, i) => (
                  <div key={i} className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                    <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                    <p className="text-slate-600">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
            
            <section className="mb-10 p-6 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-start">
                <Info className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2">Signer Awareness & ID</h2>
                  <p className="text-slate-600 leading-relaxed">
                    By law, the notary must independently verify that the signer is aware of what they are signing and doing so willingly. A valid government-issued photo ID is required for every notarization.
                  </p>
                </div>
              </div>
            </section>
            
            <div className="text-center pt-10 border-t border-slate-100">
              <div className="inline-flex flex-col items-center">
                <p className="text-xl font-bold text-slate-900 mb-6">
                  Need a Power of Attorney or Estate Document Notarized?
                </p>
                <a 
                  href="tel:9803724103" 
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call or text 980-372-4103
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
