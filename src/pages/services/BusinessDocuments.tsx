import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function BusinessDocuments() {
  useEffect(() => {
    // SEO Meta Tags
    document.title = "Business Document Mobile Notary Charlotte NC | Integrity Closings CLT";
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'business-notary-schema';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "name": "Business Document Notarization",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Integrity Closings CLT",
            "url": "https://www.integrityclosingsclt.com/"
          },
          "areaServed": {"@type": "City", "name": "Charlotte"},
          "description": "Mobile notary for business documents including contracts, corporate resolutions, lease agreements, and I-9 verification in Charlotte, NC.",
          "url": "https://www.integrityclosingsclt.com/services/business-documents"
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Can you notarize documents for a business entity?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we routinely notarize business documents such as corporate resolutions, operating agreements, and commercial leases for LLCs, Corporations, and Partnerships."
              }
            },
            {
              "@type": "Question",
              "name": "Do you travel to corporate offices in Upton Charlotte?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely. We provide mobile notary services to corporate offices, co-working spaces, and businesses throughout the entire Charlotte metropolitan area."
              }
            },
            {
              "@type": "Question",
              "name": "Can you act as an authorized agent for I-9 Employment Verification?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we can act as the Authorized Representative for remote employees to verify their identity and complete Section 2 of the Form I-9."
              }
            },
            {
              "@type": "Question",
              "name": "Do you offer corporate or bulk billing accounts?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, for local attorneys, HR departments, and property management companies that require frequent notary services, we offer monthly invoicing. Please contact us to set up an account."
              }
            },
            {
              "@type": "Question",
              "name": "What do my employees need to bring to get a document notarized?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The signer must bring the entire printed document (unsigned) and a valid, unexpired government-issued photo ID (like a Driver’s License or Passport)."
              }
            }
          ]
        }
      ]
    });
    document.head.appendChild(script);
    return () => {
      const existingScript = document.getElementById('business-notary-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const items = [
    { name: "Contracts", description: "Legally binding agreements between two or more parties for business transactions." },
    { name: "Corporate Resolutions", description: "Formal documents recording the decisions made by a corporation's board of directors." },
    { name: "Employment Verification", description: "Forms required to verify an employee's identity and eligibility to work." },
    { name: "Lease Agreements", description: "Contracts outlining the terms under which one party agrees to rent property owned by another." },
    { name: "Partnership Agreements", description: "Legal documents that dictate how a business partnership will be run and how profits will be shared." }
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
            <img src="/business-documents.png" alt="Business Documents" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          
          <div className="p-8 sm:p-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Business Documents</h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              We provide professional mobile notary services for a wide variety of business documents. Whether you're handling contracts, corporate resolutions, or employment verification, we ensure your documents are properly executed and legally binding.
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
                    q: "Can you notarize documents for a business entity?",
                    a: "Yes, we routinely notarize business documents such as corporate resolutions, operating agreements, and commercial leases for LLCs, Corporations, and Partnerships."
                  },
                  {
                    q: "Do you travel to corporate offices in Upton Charlotte?",
                    a: "Absolutely. We provide mobile notary services to corporate offices, co-working spaces, and businesses throughout the entire Charlotte metropolitan area."
                  },
                  {
                    q: "Can you act as an authorized agent for I-9 Employment Verification?",
                    a: "Yes, we can act as the Authorized Representative for remote employees to verify their identity and complete Section 2 of the Form I-9."
                  },
                  {
                    q: "Do you offer corporate or bulk billing accounts?",
                    a: "Yes, for local attorneys, HR departments, and property management companies that require frequent notary services, we offer monthly invoicing. Please contact us to set up an account."
                  },
                  {
                    q: "What do my employees need to bring to get a document notarized?",
                    a: "The signer must bring the entire printed document (unsigned) and a valid, unexpired government-issued photo ID (like a Driver’s License or Passport)."
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
                Book Corporate Appointment
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
