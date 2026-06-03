import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function MiscellaneousDocuments() {
  useEffect(() => {
    document.title = "Miscellaneous Document Notary Charlotte NC | Integrity Closings CLT";
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'misc-notary-schema';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "name": "Miscellaneous Document Notarization",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Integrity Closings CLT",
            "url": "https://www.integrityclosingsclt.com/"
          },
          "areaServed": {"@type": "City", "name": "Charlotte"},
          "description": "Mobile notary for vehicle titles, school forms, I-9 verification, and travel consents in Charlotte, NC.",
          "url": "https://www.integrityclosingsclt.com/services/miscellaneous-documents"
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Can a notary help with a vehicle title transfer?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, North Carolina law requires a notary's acknowledgement on the transfer section of vehicle titles. We can meet you and the buyer/seller to notarize the signatures."
              }
            },
            {
              "@type": "Question",
              "name": "Do both parents need to sign a minor travel consent form?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "If a minor is traveling internationally with only one parent, typically the non-traveling parent must sign the consent form in front of a notary."
              }
            },
            {
              "@type": "Question",
              "name": "What is an I-9 Employment Verification?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Employers use Form I-9 to verify employment eligibility. While not a strict notarial act, mobile notaries commonly act as an 'Authorized Representative' for employers to verify an applicant's ID."
              }
            },
            {
              "@type": "Question",
              "name": "Can you certify a copy of my birth certificate?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. In North Carolina, notaries are prohibited from certifying copies of vital records (birth, death, marriage certificates). You must obtain certified copies directly from the issuing government agency."
              }
            },
            {
              "@type": "Question",
              "name": "What school forms require a notary?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Common school forms requiring notarization include residency affidavits, guardianship forms, and medical consent forms for field trips."
              }
            }
          ]
        }
      ]
    });
    document.head.appendChild(script);
    return () => {
      const existingScript = document.getElementById('misc-notary-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const items = [
    { name: "Vehicle Title Transfers", description: "Documents required to transfer ownership of a motor vehicle." },
    { name: "School Forms", description: "Various educational documents requiring notarization, such as residency affidavits." },
    { name: "Travel Consents", description: "Letters authorizing a minor to travel internationally with only one parent or a non-parent." },
    { name: "I-9 Verification", description: "Forms used to verify the identity and employment authorization of individuals hired for employment in the U.S." },
    { name: "Copy Certifications", description: "Notarized copies of original documents verifying that the copy is a true, exact, and complete reproduction." }
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
            <img src="/miscellaneous-documents.png" alt="Miscellaneous Documents" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          
          <div className="p-8 sm:p-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Miscellaneous Documents</h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              We provide professional mobile notary services for a wide variety of miscellaneous documents. Whether you're handling vehicle title transfers, school forms, or travel consents, we ensure your documents are properly executed and legally binding.
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
                    q: "Can a notary help with a vehicle title transfer?",
                    a: "Yes, North Carolina law requires a notary's acknowledgement on the transfer section of vehicle titles. We can meet you and the buyer/seller to notarize the signatures."
                  },
                  {
                    q: "Do both parents need to sign a minor travel consent form?",
                    a: "If a minor is traveling internationally with only one parent, typically the non-traveling parent must sign the consent form in front of a notary."
                  },
                  {
                    q: "What is an I-9 Employment Verification?",
                    a: "Employers use Form I-9 to verify employment eligibility. While not a strict notarial act, mobile notaries commonly act as an 'Authorized Representative' for employers to verify an applicant's ID."
                  },
                  {
                    q: "Can you certify a copy of my birth certificate?",
                    a: "No. In North Carolina, notaries are prohibited from certifying copies of vital records (birth, death, marriage certificates). You must obtain certified copies directly from the issuing government agency."
                  },
                  {
                    q: "What school forms require a notary?",
                    a: "Common school forms requiring notarization include residency affidavits, guardianship forms, and medical consent forms for field trips."
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
