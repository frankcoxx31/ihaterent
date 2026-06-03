import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function SpecialConsiderations() {
  useEffect(() => {
    document.title = "After-Hours & Special Consideration Notary Charlotte NC | Integrity Closings CLT";
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'special-notary-schema';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "name": "Special Consideration Mobile Notary",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Integrity Closings CLT",
            "url": "https://www.integrityclosingsclt.com/"
          },
          "areaServed": {"@type": "City", "name": "Charlotte"},
          "description": "Mobile notary for jail visits, after-hours emergencies, and public location meetups in Charlotte, NC.",
          "url": "https://www.integrityclosingsclt.com/services/special-considerations"
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Do you offer after-hours or late-night notary services?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we offer emergency after-hours notary services pending our availability. A premium after-hours travel fee will apply."
              }
            },
            {
              "@type": "Question",
              "name": "Can you notarize documents for an inmate at the Mecklenburg County Jail?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we routinely visit local detention centers for notarizations. We know the procedures required to efficiently get signed documents from incarcerated individuals."
              }
            },
            {
              "@type": "Question",
              "name": "Is there a specific process for jail notarizations?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Generally, the inmate must have a valid form of ID in their property, or we must use credible witnesses. We also need their full name and booking number."
              }
            },
            {
              "@type": "Question",
              "name": "Can we meet at a coffee shop or public place?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely. For safety, convenience, or privacy, many of our clients prefer to meet at local coffee shops, libraries, or outdoor public areas."
              }
            },
            {
              "@type": "Question",
              "name": "Can you come to my office while I'm at work?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Workplace visits are common. We just ask that you have a private space, like an empty conference room or breakroom, where we can review the documents undisturbed."
              }
            }
          ]
        }
      ]
    });
    document.head.appendChild(script);
    return () => {
      const existingScript = document.getElementById('special-notary-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const items = [
    { name: "Jail/Detention Center Visits", description: "Specialized notary services provided to individuals currently incarcerated." },
    { name: "After-Hours/Emergency Signings", description: "Notary services available outside of standard business hours for urgent needs." },
    { name: "Workplace/Office Visits", description: "Convenient notarization services brought directly to your place of business." },
    { name: "Public Location Meetups", description: "Flexible meetings at coffee shops, libraries, or other public spaces for your safety and convenience." }
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
            <img src="/special-considerations.png" alt="Special Considerations" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          
          <div className="p-8 sm:p-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Special Considerations</h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              We understand that not all notarizations happen during normal business hours or in standard locations. We offer flexible mobile notary services tailored to your unique circumstances.
            </p>
            
            <div className="space-y-6 mb-10">
              {items.map((item, i) => (
                <div key={i} className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{item.name}</h3>
                    <p className="text-slate-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <section className="mb-12 mt-12 border-t border-slate-100 pt-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {[
                  {
                    q: "Do you offer after-hours or late-night notary services?",
                    a: "Yes, we offer emergency after-hours notary services pending our availability. A premium after-hours travel fee will apply."
                  },
                  {
                    q: "Can you notarize documents for an inmate at the Mecklenburg County Jail?",
                    a: "Yes, we routinely visit local detention centers for notarizations. We know the procedures required to efficiently get signed documents from incarcerated individuals."
                  },
                  {
                    q: "Is there a specific process for jail notarizations?",
                    a: "Yes. Generally, the inmate must have a valid form of ID in their property, or we must use credible witnesses. We also need their full name and booking number."
                  },
                  {
                    q: "Can we meet at a coffee shop or public place?",
                    a: "Absolutely. For safety, convenience, or privacy, many of our clients prefer to meet at local coffee shops, libraries, or outdoor public areas."
                  },
                  {
                    q: "Can you come to my office while I'm at work?",
                    a: "Yes! Workplace visits are common. We just ask that you have a private space, like an empty conference room or breakroom, where we can review the documents undisturbed."
                  }
                ].map((faq, i) => (
                  <div key={i} className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                    <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                    <p className="text-slate-600">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
            
            <div className="text-center pt-6 border-t border-slate-100">
              <a href="/booking" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                Book Appointment
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
