import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function LenderProvidedDocuments() {
  useEffect(() => {
    document.title = "Loan Signing Agent Charlotte NC | Lender Provided Documents";
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'lender-notary-schema';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "name": "Lender Provided Document Notarization",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Integrity Closings CLT",
            "url": "https://www.integrityclosingsclt.com/"
          },
          "areaServed": {"@type": "City", "name": "Charlotte"},
          "description": "Mobile notary and loan signing agent for refinance packages, buyer/seller packages, and loan modifications in Charlotte, NC.",
          "url": "https://www.integrityclosingsclt.com/services/lender-provided-documents"
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Are you certified to handle loan signings?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, our team holds the National Notary Association (NNA) Certified Notary Signing Agent credential. We are thoroughly background-screened and maintain E&O insurance."
              }
            },
            {
              "@type": "Question",
              "name": "Will you print the loan package?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely. We are equipped with dual-tray laser printers to print your loan documents correctly in legal and letter sizes."
              }
            },
            {
              "@type": "Question",
              "name": "Can you provide scanbacks for the lender/title company?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we provide high-quality scanbacks of the signed documents directly to the title company or lender immediately after the signing."
              }
            },
            {
              "@type": "Question",
              "name": "Do you drop documents off at FedEx or UPS?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Upon completing the signing and quality check, we promptly deliver the documents to the requested carrier (FedEx/UPS) to ensure they make the cutoff time."
              }
            },
            {
              "@type": "Question",
              "name": "What if the borrower has questions about their loan terms?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "As Notary Signing Agents, we cannot explain or advise on loan terms. However, we will point the borrower to the closing disclosure and offer to contact the loan officer or escrow agent directly during the appointment."
              }
            }
          ]
        }
      ]
    });
    document.head.appendChild(script);
    return () => {
      const existingScript = document.getElementById('lender-notary-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const items = [
    { name: "Refinance Packages", description: "Comprehensive sets of documents required to close a mortgage refinance." },
    { name: "Buyer/Seller Packages", description: "Complete sets of documents needed for the purchase or sale of real estate." },
    { name: "Loan Modifications", description: "Agreements altering the terms of an existing loan, often to prevent foreclosure." },
    { name: "HELOCs", description: "Documents for establishing a Home Equity Line of Credit." },
    { name: "Reverse Mortgages", description: "Specialized loan packages for seniors converting home equity into cash." }
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
            <img src="/lender-provided-documents.png" alt="Lender Provided Documents" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          
          <div className="p-8 sm:p-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Lender Provided Documents</h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              We provide professional mobile notary and loan signing agent services for lender-provided document packages. We ensure all signatures, dates, and initials are properly executed for a smooth closing process.
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
                    q: "Are you certified to handle loan signings?",
                    a: "Yes, our team holds the National Notary Association (NNA) Certified Notary Signing Agent credential. We are thoroughly background-screened and maintain E&O insurance."
                  },
                  {
                    q: "Will you print the loan package?",
                    a: "Absolutely. We are equipped with dual-tray laser printers to print your loan documents correctly in legal and letter sizes."
                  },
                  {
                    q: "Can you provide scanbacks for the lender/title company?",
                    a: "Yes, we provide high-quality scanbacks of the signed documents directly to the title company or lender immediately after the signing."
                  },
                  {
                    q: "Do you drop documents off at FedEx or UPS?",
                    a: "Yes. Upon completing the signing and quality check, we promptly deliver the documents to the requested carrier (FedEx/UPS) to ensure they make the cutoff time."
                  },
                  {
                    q: "What if the borrower has questions about their loan terms?",
                    a: "As Notary Signing Agents, we cannot explain or advise on loan terms. However, we will point the borrower to the closing disclosure and offer to contact the loan officer or escrow agent directly during the appointment."
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
                Book Assignment
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
