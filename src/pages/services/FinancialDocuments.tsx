import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function FinancialDocuments() {
  useEffect(() => {
    document.title = "Financial Document Mobile Notary Charlotte NC | Integrity Closings CLT";
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'financial-notary-schema';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "name": "Financial Document Notarization",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Integrity Closings CLT",
            "url": "https://www.integrityclosingsclt.com/"
          },
          "areaServed": {"@type": "City", "name": "Charlotte"},
          "description": "Mobile notary for financial documents including loan modifications, HELOCs, and promissory notes in Charlotte, NC.",
          "url": "https://www.integrityclosingsclt.com/services/financial-documents"
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Can you notarize loan modifications at my home?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we specialize in mobile loan modifications and refinancing documents. We’ll meet you at your home or office to ensure everything is signed correctly."
              }
            },
            {
              "@type": "Question",
              "name": "Will you print the financial documents for me?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, simply email the secure PDFs to our office. We provide document printing services for an additional fee and bring the physical copies to you."
              }
            },
            {
              "@type": "Question",
              "name": "How quickly can you accommodate a HELOC signing?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We offer same-day and after-hours appointments. We can often accommodate a HELOC signing within a few hours of your request in the Charlotte area."
              }
            },
            {
              "@type": "Question",
              "name": "Are you certified to handle Reverse Mortgages?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, our team consists of NNA Certified Loan Signing Agents who are experienced in walking seniors through Reverse Mortgage application and closing packages."
              }
            },
            {
              "@type": "Question",
              "name": "Do you double-check the documents before shipping them back?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our Quality Assurance process ensures that every signature, date, and notary stamp is double-checked before the documents are handed back or dropped at FedEx/UPS."
              }
            }
          ]
        }
      ]
    });
    document.head.appendChild(script);
    return () => {
      const existingScript = document.getElementById('financial-notary-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const items = [
    { name: "Loan Modifications", description: "Agreements that permanently change the terms of an existing mortgage or loan." },
    { name: "Refinances", description: "Documents required to replace an existing debt obligation with another debt obligation under different terms." },
    { name: "HELOCs", description: "Home Equity Line of Credit documents allowing homeowners to borrow against their home's equity." },
    { name: "Reverse Mortgages", description: "Loans for homeowners 62 and older that convert part of their home equity into cash." },
    { name: "Promissory Notes", description: "Written promises to pay a specific sum of money to a specific person or entity." }
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
            <img src="/financial-documents.png" alt="Financial Documents" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          
          <div className="p-8 sm:p-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Financial Documents</h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              We provide professional mobile notary services for a wide variety of financial documents. Whether you're handling loan modifications, refinances, or promissory notes, we ensure your documents are properly executed and legally binding.
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
                    q: "Can you notarize loan modifications at my home?",
                    a: "Yes, we specialize in mobile loan modifications and refinancing documents. We’ll meet you at your home or office to ensure everything is signed correctly."
                  },
                  {
                    q: "Will you print the financial documents for me?",
                    a: "Yes, simply email the secure PDFs to our office. We provide document printing services for an additional fee and bring the physical copies to you."
                  },
                  {
                    q: "How quickly can you accommodate a HELOC signing?",
                    a: "We offer same-day and after-hours appointments. We can often accommodate a HELOC signing within a few hours of your request in the Charlotte area."
                  },
                  {
                    q: "Are you certified to handle Reverse Mortgages?",
                    a: "Yes, our team consists of NNA Certified Loan Signing Agents who are experienced in walking seniors through Reverse Mortgage application and closing packages."
                  },
                  {
                    q: "Do you double-check the documents before shipping them back?",
                    a: "Our Quality Assurance process ensures that every signature, date, and notary stamp is double-checked before the documents are handed back or dropped at FedEx/UPS."
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
