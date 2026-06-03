import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function GeneralNotary() {
  useEffect(() => {
    // SEO Meta Tags
    document.title = "General Mobile Notary Charlotte NC | We Come To You";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "General mobile notary services in Charlotte, NC. Skip the line and hassle, we travel to you for affidavits, auto titles, I-9s, and general documents.");
    }

    // JSON-LD Schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'general-notary-schema';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "name": "General Mobile Notary",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Integrity Closings CLT",
            "url": "https://www.integrityclosingsclt.com/"
          },
          "areaServed": {"@type": "City", "name": "Charlotte"},
          "description": "General mobile notary services in Charlotte, NC. Skip the line and hassle, we travel to you for affidavits, auto titles, I-9s, and general documents.",
          "url": "https://www.integrityclosingsclt.com/services/general-notary"
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What does a General Notary do?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A General Notary Public serves as an impartial witness to the signing of important documents, verifying the identity of the signers and ensuring they are signing voluntarily. This deters fraud."
              }
            },
            {
              "@type": "Question",
              "name": "Will you notarize my handwritten document?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we can notarize signatures on handwritten documents as long as the document has appropriate notarial wording (a jurat or acknowledgment certificate) attached or included, and all signers have valid ID."
              }
            },
            {
              "@type": "Question",
              "name": "Do you offer I-9 Employment Verification?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. While I-9 forms technically do not require a notary seal, we frequently act as an Authorized Representative for remote employees to verify their physical I-9 identity documents on behalf of their employer."
              }
            },
            {
              "@type": "Question",
              "name": "How much does a general mobile notary cost?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "In North Carolina, the maximum fee for a notarial act is $10 per signature. However, as a mobile notary, we also charge a separate travel/convenience fee which varies based on the travel distance and time of day."
              }
            },
            {
              "@type": "Question",
              "name": "Can you meet me at a coffee shop or my office?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely! We provide true mobile services and are happy to meet you at a local Starbucks, your workplace lobby, or any public location where you feel comfortable."
              }
            }
          ]
        }
      ]
    });
    document.head.appendChild(script);
    return () => {
      const existingScript = document.getElementById('general-notary-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="h-64 sm:h-80 w-full relative">
            <img src="/general-notary-work.png" alt="General Mobile Notary" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-white text-center px-4">General Mobile Notary</h1>
            </div>
          </div>
          <div className="p-8 sm:p-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Convenient Notarization at Your Location</h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Skip the hassle of finding a local notary office, waiting in lines, or dealing with limited business hours. Our general mobile notary service brings the notary public directly to you—whether you're at home, at the office, or even a local coffee shop.
            </p>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Common Documents We Notarize:</h3>
            <ul className="space-y-3 mb-8">
              {[
                'Affidavits & Sworn Statements', 
                'Auto Title Transfers', 
                'I-9 Employment Verification', 
                'Travel Consent Forms for Minors', 
                'Contracts & Business Agreements'
              ].map((item, i) => (
                <li key={i} className="flex items-center text-slate-700">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-8">
              <h3 className="text-lg font-bold text-blue-900 mb-2">Fast, Flexible, and Reliable</h3>
              <p className="text-blue-800">We offer flexible scheduling, including evenings and weekends, to accommodate your busy lifestyle. Just let us know where and when, and we'll be there to ensure your documents are legally and properly notarized.</p>
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {[
                  {
                    q: "What does a General Notary do?",
                    a: "A General Notary Public serves as an impartial witness to the signing of important documents, verifying the identity of the signers and ensuring they are signing voluntarily. This deters fraud."
                  },
                  {
                    q: "Will you notarize my handwritten document?",
                    a: "Yes, we can notarize signatures on handwritten documents as long as the document has appropriate notarial wording (a jurat or acknowledgment certificate) attached or included, and all signers have valid ID."
                  },
                  {
                    q: "Do you offer I-9 Employment Verification?",
                    a: "Yes. While I-9 forms technically do not require a notary seal, we frequently act as an Authorized Representative for remote employees to verify their physical I-9 identity documents on behalf of their employer."
                  },
                  {
                    q: "How much does a general mobile notary cost?",
                    a: "In North Carolina, the maximum fee for a notarial act is $10 per signature. However, as a mobile notary, we also charge a separate travel/convenience fee which varies based on the travel distance and time of day."
                  },
                  {
                    q: "Can you meet me at a coffee shop or my office?",
                    a: "Absolutely! We provide true mobile services and are happy to meet you at a local Starbucks, your workplace lobby, or any public location where you feel comfortable."
                  }
                ].map((faq, i) => (
                  <div key={i} className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                    <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                    <p className="text-slate-600">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="text-center mt-12">
              <a href="/booking" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                Request a Notary <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
