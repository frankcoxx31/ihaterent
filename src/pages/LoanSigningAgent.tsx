import { ArrowLeft, CheckCircle, MapPin, Phone, Briefcase, FileText, ShieldCheck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function LoanSigningAgent() {
  useEffect(() => {
    // SEO Meta Tags
    document.title = "Loan Signing Agent Charlotte NC | Integrity Closings CLT";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Professional loan signing agent in Charlotte, NC for buyer, seller, refinance, and HELOC signings. Mobile appointments available.");
    }

    // JSON-LD Schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'loan-signing-schema';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "name": "Loan Signing Agent in Charlotte, NC",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Integrity Closings CLT",
            "url": "https://www.integrityclosingsclt.com/"
          },
          "areaServed": {"@type": "City", "name": "Charlotte"},
          "serviceType": "Loan Signing Agent",
          "description": "Professional mobile loan signing services for buyers, sellers, refinances, HELOCs, and other real estate transactions in Charlotte, NC.",
          "url": "https://www.integrityclosingsclt.com/loan-signing-agent-charlotte-nc"
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What does a loan signing agent do?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A loan signing agent is a specialized professional trained to guide borrowers through mortgage loan documents. They ensure all signatures, dates, and initials are properly executed and return the documents promptly to the title company or lender."
              }
            },
            {
              "@type": "Question",
              "name": "Do you travel to my clients for loan closings?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we provide 100% mobile loan signing services. We can travel to your client's home, office, real estate agency, or any mutually agreed-upon location in the greater Charlotte area."
              }
            },
            {
              "@type": "Question",
              "name": "How quickly can you return the closing documents?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We immediately review all documents for accuracy at the signing table. Scantebacks are typically provided within hours of closing, and physical documents are dropped at FedEx or UPS the same day before the cutoff."
              }
            },
            {
              "@type": "Question",
              "name": "Are you background screened?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we are highly trained, background screened, and carry $100,000 in Errors and Omissions (E&O) insurance to protect both you and your clients."
              }
            },
            {
              "@type": "Question",
              "name": "What types of loan packages do you handle?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We handle Buyer, Seller, Refinance, HELOCs, Reverse Mortgages, Loan Modifications, and Commercial real estate packages."
              }
            }
          ]
        }
      ]
    });
    document.head.appendChild(script);
    return () => {
      const existingScript = document.getElementById('loan-signing-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const loanPackages = [
    "Buyer Packages",
    "Seller Packages",
    "Refinance Packages",
    "HELOCs",
    "Reverse Mortgages",
    "Investment Property Documents",
    "Commercial Loan Documents",
    "Cash Purchase Documents"
  ];

  const whyChooseUs = [
    "9+ Years Loan Signing Experience",
    "20+ Years Real Estate Background",
    "Professional, Accurate, and Reliable",
    "Mobile Service Throughout Charlotte Area",
    "Flexible Scheduling Available"
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
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200" 
              alt="Loan Signing Agent in Charlotte NC" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer" 
            />
          </div>
          
          <div className="p-8 sm:p-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Loan Signing Agent in Charlotte, NC
            </h1>
            
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Need a professional loan signing agent in Charlotte, NC? Integrity Closings CLT provides accurate, dependable mobile loan signing services for buyers, sellers, refinances, HELOCs, and other real estate transactions. We travel to homes, offices, and agreed meeting locations throughout Charlotte and surrounding areas.
            </p>

            <div className="mb-10 text-center">
              <a 
                href="tel:9803724103" 
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call or text 980-372-4103 to schedule your signing appointment.
              </a>
            </div>
            
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Briefcase className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-slate-900">Professional Mobile Loan Signing Services</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                We help borrowers complete loan documents accurately and on time. Integrity Closings CLT provides professional mobile loan signing services in Charlotte, NC for title companies, signing services, lenders, and private clients.
              </p>
            </section>
            
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <FileText className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-slate-900">Loan Packages We Commonly Handle</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {loanPackages.map((doc, i) => (
                  <div key={i} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">{doc}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-slate-900">Convenient Signing Appointments</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                We offer mobile loan signings at homes, offices, hospitals, nursing facilities, and other approved meeting locations. Evening and weekend appointments may be available based on scheduling.
              </p>
            </section>

            <section className="mb-12 p-6 bg-blue-50 rounded-xl border border-blue-100">
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
                    q: "What does a loan signing agent do?",
                    a: "A loan signing agent is a specialized professional trained to guide borrowers through mortgage loan documents. They ensure all signatures, dates, and initials are properly executed and return the documents promptly to the title company or lender."
                  },
                  {
                    q: "Do you travel to my clients for loan closings?",
                    a: "Yes, we provide 100% mobile loan signing services. We can travel to your client's home, office, real estate agency, or any mutually agreed-upon location in the greater Charlotte area."
                  },
                  {
                    q: "How quickly can you return the closing documents?",
                    a: "We immediately review all documents for accuracy at the signing table. Scantebacks are typically provided within hours of closing, and physical documents are dropped at FedEx or UPS the same day before the cutoff."
                  },
                  {
                    q: "Are you background screened?",
                    a: "Yes, we are highly trained, background screened, and carry $100,000 in Errors and Omissions (E&O) insurance to protect both you and your clients."
                  },
                  {
                    q: "What types of loan packages do you handle?",
                    a: "We handle Buyer, Seller, Refinance, HELOCs, Reverse Mortgages, Loan Modifications, and Commercial real estate packages."
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
              <div className="flex items-center mb-6">
                <MapPin className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-slate-900">Featured Loan Signing Areas</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link to="/locations/mint-hill-loan-signing-agent" className="p-3 bg-slate-50 border border-slate-100 rounded-lg hover:bg-slate-100 transition-colors text-slate-700 font-medium flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Mint Hill Loan Signing Agent
                </Link>
                <Link to="/locations/matthews-loan-signing-agent" className="p-3 bg-slate-50 border border-slate-100 rounded-lg hover:bg-slate-100 transition-colors text-slate-700 font-medium flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Matthews Loan Signing Agent
                </Link>
                <Link to="/locations/concord-loan-signing-agent" className="p-3 bg-slate-50 border border-slate-100 rounded-lg hover:bg-slate-100 transition-colors text-slate-700 font-medium flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Concord Loan Signing Agent
                </Link>
                <Link to="/locations/cabarrus-county-loan-signing-agent" className="p-3 bg-slate-50 border border-slate-100 rounded-lg hover:bg-slate-100 transition-colors text-slate-700 font-medium flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Cabarrus County Loan Signing
                </Link>
                <Link to="/locations/union-county-loan-signing-agent" className="p-3 bg-slate-50 border border-slate-100 rounded-lg hover:bg-slate-100 transition-colors text-slate-700 font-medium flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Union County Loan Signing
                </Link>
              </div>
              <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Title Company or Attorney?</h3>
                  <p className="text-slate-600">We offer specialized overflow and mobile closing support for Charlotte-area firms.</p>
                </div>
                <Link to="/title-company-attorney-closing-support-charlotte-nc" className="whitespace-nowrap px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                  View Professional Support
                </Link>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-slate-900">Areas We Serve</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                We provide loan signing services in Charlotte, Matthews, Mint Hill, Concord, Pineville, Monroe, and surrounding areas.
              </p>
            </section>
            
            <div className="text-center pt-10 border-t border-slate-100">
              <div className="inline-flex flex-col items-center">
                <p className="text-xl font-bold text-slate-900 mb-6">
                  Need a Loan Signing Agent in Charlotte, NC?
                </p>
                <a 
                  href="tel:9803724103" 
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call or text 980-372-4103 to book your appointment today.
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
