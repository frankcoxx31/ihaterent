import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function LegalDocuments() {
  useEffect(() => {
    document.title = "Legal Document Mobile Notary Charlotte NC | Integrity Closings CLT";
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'legal-notary-schema';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "name": "Legal Document Notarization",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Integrity Closings CLT",
            "url": "https://www.integrityclosingsclt.com/"
          },
          "areaServed": {"@type": "City", "name": "Charlotte"},
          "description": "Mobile notary for legal documents including court documents, divorce decrees, and custody agreements in Charlotte, NC.",
          "url": "https://www.integrityclosingsclt.com/services/legal-documents"
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Can you meet me at the courthouse to notarize a document?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we regularly provide mobile notary services at the Mecklenburg County Courthouse, law firms, and mediation centers."
              }
            },
            {
              "@type": "Question",
              "name": "Do you notarize divorce decrees and separation agreements?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely. Separation agreements and divorce papers frequently require notarization, and we can handle these with discretion and professionalism."
              }
            },
            {
              "@type": "Question",
              "name": "Are you able to provide legal advice on which form I need?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. Notaries in North Carolina are not attorneys and are strictly prohibited from providing legal advice or selecting forms for you."
              }
            },
            {
              "@type": "Question",
              "name": "What if my legal document doesn't have a notary block?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "You must instruct the notary on what type of notarization is required (Jurat or Acknowledgment). We can then attach the appropriate loose certificate."
              }
            },
            {
              "@type": "Question",
              "name": "Can both parties sign a settlement agreement at different times?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, parties can sign at different times and locations. We can meet each party separately, or you can use different notaries for each signature."
              }
            }
          ]
        }
      ]
    });
    document.head.appendChild(script);
    return () => {
      const existingScript = document.getElementById('legal-notary-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const items = [
    { name: "Court Documents", description: "Various filings, motions, and affidavits required for legal proceedings." },
    { name: "Divorce Decrees", description: "Final judgments issued by a court officially terminating a marriage." },
    { name: "Adoption Papers", description: "Legal documents required to finalize the adoption process." },
    { name: "Settlement Agreements", description: "Contracts between parties to resolve a legal dispute outside of court." },
    { name: "Guardianship Papers", description: "Legal documents granting someone the authority to care for another person or their property." }
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
            <img src="/legal-documents.png" alt="Legal Documents" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          
          <div className="p-8 sm:p-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Legal Documents</h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              We provide professional mobile notary services for a wide variety of legal documents. Whether you're handling court documents, adoption papers, or settlement agreements, we ensure your documents are properly executed and legally binding.
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
                    q: "Can you meet me at the courthouse to notarize a document?",
                    a: "Yes, we regularly provide mobile notary services at the Mecklenburg County Courthouse, law firms, and mediation centers."
                  },
                  {
                    q: "Do you notarize divorce decrees and separation agreements?",
                    a: "Absolutely. Separation agreements and divorce papers frequently require notarization, and we can handle these with discretion and professionalism."
                  },
                  {
                    q: "Are you able to provide legal advice on which form I need?",
                    a: "No. Notaries in North Carolina are not attorneys and are strictly prohibited from providing legal advice or selecting forms for you."
                  },
                  {
                    q: "What if my legal document doesn't have a notary block?",
                    a: "You must instruct the notary on what type of notarization is required (Jurat or Acknowledgment). We can then attach the appropriate loose certificate."
                  },
                  {
                    q: "Can both parties sign a settlement agreement at different times?",
                    a: "Yes, parties can sign at different times and locations. We can meet each party separately, or you can use different notaries for each signature."
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
