import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function RealEstateDocuments() {
  useEffect(() => {
    document.title = "Real Estate Document Notary Charlotte NC | Integrity Closings CLT";
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'real-estate-schema';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "name": "Real Estate Document Notarization",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Integrity Closings CLT",
            "url": "https://www.integrityclosingsclt.com/"
          },
          "areaServed": {"@type": "City", "name": "Charlotte"},
          "description": "Expert mobile notary for real estate documents including deeds, closing disclosures, and property transfers in Charlotte, NC.",
          "url": "https://www.integrityclosingsclt.com/services/real-estate-documents"
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Do you handle seller packages for out-of-state transactions?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! We frequently assist Charlotte-area sellers closing on property located in other states by receiving the seller package and bringing it to them for execution."
              }
            },
            {
              "@type": "Question",
              "name": "What is a Closing Disclosure?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A Closing Disclosure is a five-page form that provides final details about the mortgage loan you have selected. It includes the loan terms, your projected monthly payments, and how much you will pay in fees."
              }
            },
            {
              "@type": "Question",
              "name": "Do you need any special certification to notarize real estate documents?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, our team holds the National Notary Association (NNA) Certified Notary Signing Agent credential, ensuring we are highly trained to handle complex real estate document packages securely and accurately."
              }
            },
            {
              "@type": "Question",
              "name": "Can you notarize a Quitclaim Deed?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we routinely notarize Quitclaim Deeds. However, we cannot draft the deed for you or provide advice on the legal consequences of signing one."
              }
            },
            {
              "@type": "Question",
              "name": "Will you drop off the real estate documents at FedEx/UPS?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, scanbacks and prompt FedEx or UPS drop-offs are included in our loan signing services. We ensure your documents make the required shipping cutoff."
              }
            }
          ]
        }
      ]
    });
    document.head.appendChild(script);
    return () => {
      const existingScript = document.getElementById('real-estate-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const items = [
    { name: "Deeds", description: "Legal documents that transfer ownership of real estate from one party to another." },
    { name: "Closing Disclosures", description: "Forms providing final details about the mortgage loan, including terms and costs." },
    { name: "Title Documents", description: "Records proving ownership of a property and any liens or encumbrances against it." },
    { name: "Property Transfers", description: "Documents facilitating the change of ownership of real estate." },
    { name: "Easements", description: "Legal rights to use another person's land for a specific limited purpose." }
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
            <img src="/real-estate-documents.png" alt="Real Estate Documents" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          
          <div className="p-8 sm:p-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Real Estate Documents</h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              We provide professional mobile notary services for a wide variety of real estate documents. Whether you're handling deeds, closing disclosures, or property transfers, we ensure your documents are properly executed and legally binding.
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
                    q: "Do you handle seller packages for out-of-state transactions?",
                    a: "Yes! We frequently assist Charlotte-area sellers closing on property located in other states by receiving the seller package and bringing it to them for execution."
                  },
                  {
                    q: "What is a Closing Disclosure?",
                    a: "A Closing Disclosure is a five-page form that provides final details about the mortgage loan you have selected. It includes the loan terms, your projected monthly payments, and how much you will pay in fees."
                  },
                  {
                    q: "Do you need any special certification to notarize real estate documents?",
                    a: "Yes, our team holds the National Notary Association (NNA) Certified Notary Signing Agent credential, ensuring we are highly trained to handle complex real estate document packages securely and accurately."
                  },
                  {
                    q: "Can you notarize a Quitclaim Deed?",
                    a: "Yes, we routinely notarize Quitclaim Deeds. However, we cannot draft the deed for you or provide advice on the legal consequences of signing one."
                  },
                  {
                    q: "Will you drop off the real estate documents at FedEx/UPS?",
                    a: "Yes, scanbacks and prompt FedEx or UPS drop-offs are included in our loan signing services. We ensure your documents make the required shipping cutoff."
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
