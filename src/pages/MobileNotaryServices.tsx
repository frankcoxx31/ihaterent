import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function MobileNotaryServices() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'mobile-notary-schema';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "name": "Mobile Notary Services in Charlotte, NC",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Integrity Closings CLT",
            "url": "https://www.integrityclosingsclt.com/"
          },
          "areaServed": {"@type": "City", "name": "Charlotte"},
          "serviceType": "Mobile Notary Services",
          "description": "Professional mobile notary services in Charlotte, NC for affidavits, powers of attorney, estate planning documents, medical forms, and more.",
          "url": "https://www.integrityclosingsclt.com/mobile-notary-charlotte-nc"
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is a mobile notary?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A mobile notary is a commissioned Notary Public who travels to your specific location—whether that's your home, office, hospital room, or local coffee shop—to perform notarial acts, rather than you having to visit a storefront."
              }
            },
            {
              "@type": "Question",
              "name": "How much does a mobile notary cost in North Carolina?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The State of North Carolina regulates the notarial fee at a maximum of $10 per principal signature. In addition to this state-mandated fee, mobile notaries charge a separate travel fee which varies based on distance."
              }
            },
            {
              "@type": "Question",
              "name": "Do you provide witnesses for document signings?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "If your documents require additional witnesses beyond the notary, we can often provide them given enough advance notice. An additional fee applies per witness provided."
              }
            },
            {
              "@type": "Question",
              "name": "How far do you travel in the Charlotte area?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We travel extensively throughout Mecklenburg County, Union County, and parts of Cabarrus County. This includes Charlotte, Mint Hill, Matthews, Pineville, Concord, Monroe, and Indian Trail."
              }
            },
            {
              "@type": "Question",
              "name": "Can you print my documents before arriving?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we offer document printing services for an additional fee. You can simply email us your PDF documents beforehand, and we will bring the physical copies to your location."
              }
            }
          ]
        }
      ]
    });
    document.head.appendChild(script);
    return () => {
      const existingScript = document.getElementById('mobile-notary-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const serviceCategories = [
    {
      title: "Personal Documents",
      image: "/personal-documents.png",
      link: "/estate-notary-charlotte-nc",
      items: ["Affidavits", "Power of Attorney", "Wills & Trusts", "Medical Directives", "Passport Applications"]
    },
    {
      title: "Business Documents",
      image: "/business-documents.png",
      link: "/services/business-documents",
      items: ["Contracts", "Corporate Resolutions", "Employment Verification", "Lease Agreements", "Partnership Agreements"]
    },
    {
      title: "Financial Documents",
      image: "/financial-documents.png",
      link: "/services/financial-documents",
      items: ["Loan Modifications", "Refinances", "HELOCs", "Reverse Mortgages", "Promissory Notes"]
    },
    {
      title: "Legal Documents",
      image: "/legal-documents.png",
      link: "/services/legal-documents",
      items: ["Court Documents", "Divorce Decrees", "Adoption Papers", "Settlement Agreements", "Guardianship Papers"]
    },
    {
      title: "Real Estate Documents",
      image: "/real-estate-documents.png",
      link: "/services/real-estate-documents",
      items: ["Deeds", "Closing Disclosures", "Title Documents", "Property Transfers", "Easements"]
    },
    {
      title: "Special Considerations",
      image: "/special-considerations.png",
      link: "/services/special-considerations",
      items: ["Jail/Detention Center Visits", "After-Hours/Emergency Signings", "Workplace/Office Visits", "Public Location Meetups"]
    },
    {
      title: "Miscellaneous Documents",
      image: "/miscellaneous-documents.png",
      link: "/services/miscellaneous-documents",
      items: ["Vehicle Title Transfers", "School Forms", "Travel Consents", "I-9 Verification", "Copy Certifications"]
    },
    {
      title: "Hospitals & Nursing Homes",
      image: "/hospital-and-nursing-home-notarizations-pua.jpg",
      link: "/hospital-notary-charlotte-nc",
      items: ["Medical Power of Attorney", "Living Wills", "Advance Directives", "HIPAA Authorizations", "Healthcare Proxies"]
    },
    {
      title: "Lender Provided Documents",
      image: "/lender-provided-documents.png",
      link: "/loan-signing-agent-charlotte-nc",
      items: ["Refinance Packages", "Buyer/Seller Packages", "Loan Modifications", "HELOCs", "Reverse Mortgages"]
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Mobile Notary Services</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive mobile notary services tailored to your needs. We come to you—home, office, hospital, or coffee shop.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Same-Day Mobile Notary In The Charlotte Area</h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                For those urgent situations where you need documents notarized quickly, our same-day notarization service offers unparalleled convenience. Simply reach out to us via phone, text, or our online booking form, and we'll promptly check our availability to schedule a meeting at a time and location that works best for you, often within hours of your request.
              </p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                This service is designed for immediate needs, ensuring your critical documents are handled efficiently and without delay.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/booking" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">Book Now</a>
                <a 
                  href="tel:9803724103" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-base font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 transition-colors"
                >
                  Call 980-372-4103
                </a>
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-lg font-bold text-blue-900 mb-3">Why Choose Integrity Closings CLT?</h3>
              <ul className="space-y-3">
                {[
                  "Mobile Notary That Comes to You",
                  "Same-Day & Emergency Appointments Available",
                  "Experienced Loan Signing Agent",
                  "Professional, Accurate, and Reliable Service",
                  "Serving Charlotte and Surrounding Areas"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-blue-900 font-medium italic">We make notarization simple, fast, and convenient—right at your location.</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {serviceCategories.map((category, index) => (
            <Link to={category.link} key={index} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow flex flex-col group">
              <div className="mb-5 w-full h-48 rounded-xl overflow-hidden bg-slate-100">
                <img src={category.image} alt={category.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">{category.title}</h3>
              <ul className="space-y-2 mb-6 flex-grow">
                {category.items.map((item, idx) => (
                  <li key={idx} className="text-slate-600 text-sm flex items-start">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center text-blue-600 font-medium">
                Learn More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "What is a mobile notary?",
                a: "A mobile notary is a commissioned Notary Public who travels to your specific location—whether that's your home, office, hospital room, or local coffee shop—to perform notarial acts, rather than you having to visit a storefront."
              },
              {
                q: "How much does a mobile notary cost in North Carolina?",
                a: "The State of North Carolina regulates the notarial fee at a maximum of $10 per principal signature. In addition to this state-mandated fee, mobile notaries charge a separate travel fee which varies based on distance."
              },
              {
                q: "Do you provide witnesses for document signings?",
                a: "If your documents require additional witnesses beyond the notary, we can often provide them given enough advance notice. An additional fee applies per witness provided."
              },
              {
                q: "How far do you travel in the Charlotte area?",
                a: "We travel extensively throughout Mecklenburg County, Union County, and parts of Cabarrus County. This includes Charlotte, Mint Hill, Matthews, Pineville, Concord, Monroe, and Indian Trail."
              },
              {
                q: "Can you print my documents before arriving?",
                a: "Yes, we offer document printing services for an additional fee. You can simply email us your PDF documents beforehand, and we will bring the physical copies to your location."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Book your appointment online now or give us a call to schedule your mobile notary service.
          </p>
          <a href="/booking" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-slate-900 bg-white hover:bg-slate-100 transition-colors">Book Appointment</a>
        </div>
      </div>
    </div>
  );
}
