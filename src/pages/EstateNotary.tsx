import { ArrowLeft, CheckCircle, MapPin, Phone, FileText, ShieldCheck, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function EstateNotary() {
  useEffect(() => {
    // SEO Meta Tags
    document.title = "Estate & Trust Notarization Charlotte NC | Mobile Notary";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Professional mobile notary for estate planning and trust documents in Charlotte, NC. We travel to homes, hospitals, and nursing homes for Wills, Trusts, and POA.");
    }

    // JSON-LD Schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'estate-notary-schema';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "name": "Estate & Trust Notarization",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Integrity Closings CLT",
            "url": "https://www.integrityclosingsclt.com/"
          },
          "areaServed": {"@type": "City", "name": "Charlotte"},
          "description": "Professional mobile notary for estate planning and trust documents in Charlotte, NC. Hospital and nursing home visits available for Wills, Trusts, and POA.",
          "url": "https://www.integrityclosingsclt.com/estate-notary-charlotte-nc"
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What types of documents can you notarize for estate planning?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We frequently notarize Last Wills and Testaments, Revocable Living Trusts, Durable Powers of Attorney, Healthcare POAs, Advance Directives, Living Wills, and HIPAA Authorizations."
              }
            },
            {
              "@type": "Question",
              "name": "Do I need to have my witnesses ready?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Many NC estate documents require two impartial witnesses in addition to the notary. These witnesses generally cannot be named in the document or related to the signer. Please confirm witness requirements with your attorney and ensure they are present at the scheduled time."
              }
            },
            {
              "@type": "Question",
              "name": "Can the notary help me understand what I am signing?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. As a Notary Public, I am legally prohibited from explaining the legal effects of a document or providing any guidance on how to fill them out. Your attorney or document preparer is the only one who can provide that information."
              }
            },
            {
              "@type": "Question",
              "name": "Will you travel to patients in the ICU or memory care units?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we travel to all medical facilities. However, if the signer is under heavy sedation or cannot demonstrate awareness of the document and a willingness to sign, we legally cannot proceed with the notarization."
              }
            }
          ]
        }
      ]
    });
    document.head.appendChild(script);
    return () => {
      const existingScript = document.getElementById('estate-notary-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const commonDocuments = [
    "Power of Attorney",
    "Durable Power of Attorney",
    "Healthcare Power of Attorney",
    "Living Wills",
    "Advance Directives",
    "Trust Documents",
    "Estate Planning Documents",
    "Affidavits",
    "Authorization Forms"
  ];

  const whyChooseUs = [
    "Mobile service at your home, office, or care facility",
    "Professional, patient, and respectful with seniors",
    "Punctual and reliable for sensitive appointments",
    "Serving Charlotte, Matthews, Concord, and beyond",
    "Duly Commissioned NC Notary Public since 2017"
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
              alt="Estate Document Notary in Charlotte NC" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer" 
            />
          </div>
          
          <div className="p-8 sm:p-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Estate & Trust Notarization — Charlotte, NC
            </h1>
            
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Integrity Closings CLT provides professional mobile notary services specializing in the sensitive and precise nature of estate planning documents. We understand that these moments are critical, which is why we offer discreet, patient service directly to your home, attorney’s office, hospital room, or assisted living facility throughout the Greater Charlotte area.
            </p>

            <div className="mb-10 text-center">
              <a 
                href="tel:9803724103" 
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call or text 980-372-4103 to schedule your appointment.
              </a>
            </div>
            
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-slate-900">Mobile Service to Hospitals & Care Facilities</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Navigating the notarization of Wills, Trusts, and Powers of Attorney when a loved one is in a medical or senior living facility requires experience and patience. We regularly visit major hospitals and nursing homes in Mecklenburg County, providing a calm and professional presence for every signing.
              </p>
            </section>
            
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <FileText className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-slate-900">Documents We Commonly Notarize</h2>
              </div>
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
              <h2 className="text-xl font-bold text-slate-900 mb-4">Fees & Travel</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  North Carolina law allows a maximum fee of $10 per notarized principal signature for most traditional notarial acts.
                </p>
                <p>
                  For mobile appointments, a separate travel fee may apply at the current federal mileage rate when approved in writing before travel.
                </p>
                <p>
                  If witnesses, document requirements, or legal guidance are needed, clients should confirm those details with their attorney or document preparer before the appointment.
                </p>
              </div>
            </section>

            <section className="mb-12 p-6 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-start">
                <Info className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2">Signer Requirements</h2>
                  <p className="text-slate-600 leading-relaxed">
                    By law, all signers must be willing, fully aware, and able to communicate clearly with the notary during the appointment. A valid, unexpired government-issued photo ID (such as a Driver’s License or Passport) is required for each signer. 
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center mb-6">
                <ShieldCheck className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-slate-900">Why Choose Integrity Closings CLT</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {whyChooseUs.map((reason, i) => (
                  <div key={i} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{reason}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {[
                  {
                    q: "What types of documents can you notarize for estate planning?",
                    a: "We frequently notarize Last Wills and Testaments, Revocable Living Trusts, Durable Powers of Attorney, Healthcare POAs, Advance Directives, Living Wills, and HIPAA Authorizations."
                  },
                  {
                    q: "Do I need to have my witnesses ready?",
                    a: "Yes. Many NC estate documents require two impartial witnesses in addition to the notary. These witnesses generally cannot be named in the document or related to the signer. Please confirm witness requirements with your attorney and ensure they are present at the scheduled time."
                  },
                  {
                    q: "Can the notary help me understand what I am signing?",
                    a: "No. As a Notary Public, I am legally prohibited from explaining the legal effects of a document or providing any guidance on how to fill them out. Your attorney or document preparer is the only one who can provide that information."
                  },
                  {
                    q: "Will you travel to patients in the ICU or memory care units?",
                    a: "Yes, we travel to all medical facilities. However, if the signer is under heavy sedation or cannot demonstrate awareness of the document and a willingness to sign, we legally cannot proceed with the notarization."
                  }
                ].map((faq, i) => (
                  <div key={i} className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                    <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                    <p className="text-slate-600">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
            
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-slate-900">Areas We Serve</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                We provide estate document notarization in Charlotte, Matthews, Mint Hill, Concord, Pineville, Monroe, and nearby areas in Mecklenburg and Union County.
              </p>
            </section>
            
            <div className="text-center pt-10 border-t border-slate-100">
              <div className="inline-flex flex-col items-center">
                <p className="text-xl font-bold text-slate-900 mb-6">
                  Need an estate document notarized in Charlotte, NC?
                </p>
                <a 
                  href="tel:9803724103" 
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call or text 980-372-4103 to book your mobile notary appointment today.
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
