import { ArrowLeft, CheckCircle, MapPin, Phone, Clock, ShieldCheck, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function AfterHoursNotary() {
  useEffect(() => {
    // SEO Meta Tags
    document.title = "After Hours Mobile Notary Charlotte NC | Evening Notary";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "After-hours mobile notary services in Charlotte, NC. Evening and weekend appointments available at your location.");
    }

    // JSON-LD Schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'after-hours-schema';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "name": "After Hours Mobile Notary in Charlotte, NC",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Integrity Closings CLT",
            "url": "https://www.integrityclosingsclt.com/"
          },
          "areaServed": {"@type": "City", "name": "Charlotte"},
          "serviceType": "After Hours Mobile Notary",
          "description": "After-hours mobile notary services in Charlotte, NC. Evening and weekend appointments available at your location.",
          "url": "https://www.integrityclosingsclt.com/after-hours-mobile-notary-charlotte-nc"
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What are your after-hours notary availability times?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We typically offer regular business hours from 8 AM to 6 PM, but our after-hours services are available late evenings and on weekends by appointment to accommodate emergency situations and working professionals."
              }
            },
            {
              "@type": "Question",
              "name": "Do you charge extra for evening or weekend appointments?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, standard notarial fees are regulated by the state at $10 per signature, but mobile travel and convenience fees will vary based on the time of day, distance, and urgency of the request."
              }
            },
            {
              "@type": "Question",
              "name": "What if I need an emergency notary in the middle of the night?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "For extreme emergencies like hospital bedside document notarizations, please call or text us right away. We do our absolute best to accommodate urgent medical needs 24/7."
              }
            },
            {
              "@type": "Question",
              "name": "Where can an after-hours notary meet me?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "For your safety and ours during late hours, we prefer meeting at well-lit public locations like 24-hour diners, hotel lobbies, hospital cafeterias, or safe-exchange zones at police stations."
              }
            },
            {
              "@type": "Question",
              "name": "How quickly can you arrive for an out-of-hours request?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Response times depend entirely on traffic and our current location in the Charlotte metro area. Typically, we can dispatch a mobile notary to your location within 60 to 90 minutes."
              }
            }
          ]
        }
      ]
    });
    document.head.appendChild(script);
    return () => {
      const existingScript = document.getElementById('after-hours-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const commonDocuments = [
    "Power of Attorney",
    "Loan Documents",
    "Real Estate Documents",
    "Affidavits",
    "Estate Planning Documents",
    "Medical Forms",
    "General Notary Documents"
  ];

  const whyChooseUs = [
    "After-hours and weekend availability",
    "Mobile service at your location",
    "Professional, accurate, and reliable",
    "Flexible scheduling options",
    "Serving Charlotte and surrounding areas"
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
              src="/lender-sent-documents.png" 
              alt="After Hours Mobile Notary in Charlotte NC" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer" 
            />
          </div>
          
          <div className="p-8 sm:p-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              After Hours Mobile Notary in Charlotte, NC
            </h1>
            
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Need a notary outside normal business hours in Charlotte, NC? Integrity Closings CLT offers after-hours mobile notary services, including evenings and weekends. We come to your home, office, hospital, or agreed meeting location when you need a notary the most.
            </p>

            <div className="mb-10 text-center">
              <a 
                href="tel:9803724103" 
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call or text 980-372-4103 to schedule your appointment.
              </a>
            </div>
            
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-slate-900">Evening and Weekend Notary Services</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                We understand that not everyone is available during standard business hours. Our after-hours mobile notary service in Charlotte, NC provides flexible scheduling for clients who need notarizations in the evening or on weekends.
              </p>
            </section>

            <section className="mb-12">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-slate-900">Convenient Mobile Appointments</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                We travel to homes, offices, hospitals, nursing homes, and other locations throughout Charlotte and surrounding areas. Our goal is to make notarization convenient, even outside of normal hours.
              </p>
            </section>
            
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <FileText className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-slate-900">Documents We Can Notarize</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {commonDocuments.map((doc, i) => (
                  <div key={i} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">{doc}</span>
                  </div>
                ))}
              </div>
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
                    q: "What are your after-hours notary availability times?",
                    a: "We typically offer regular business hours from 8 AM to 6 PM, but our after-hours services are available late evenings and on weekends by appointment to accommodate emergency situations and working professionals."
                  },
                  {
                    q: "Do you charge extra for evening or weekend appointments?",
                    a: "Yes, standard notarial fees are regulated by the state at $10 per signature, but mobile travel and convenience fees will vary based on the time of day, distance, and urgency of the request."
                  },
                  {
                    q: "What if I need an emergency notary in the middle of the night?",
                    a: "For extreme emergencies like hospital bedside document notarizations, please call or text us right away. We do our absolute best to accommodate urgent medical needs 24/7."
                  },
                  {
                    q: "Where can an after-hours notary meet me?",
                    a: "For your safety and ours during late hours, we prefer meeting at well-lit public locations like 24-hour diners, hotel lobbies, hospital cafeterias, or safe-exchange zones at police stations."
                  },
                  {
                    q: "How quickly can you arrive for an out-of-hours request?",
                    a: "Response times depend entirely on traffic and our current location in the Charlotte metro area. Typically, we can dispatch a mobile notary to your location within 60 to 90 minutes."
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
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-slate-900">Areas We Serve</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                We provide after-hours mobile notary services in Charlotte, Matthews, Mint Hill, Concord, Pineville, Monroe, and nearby areas.
              </p>
            </section>
            
            <div className="text-center pt-10 border-t border-slate-100">
              <div className="inline-flex flex-col items-center">
                <p className="text-xl font-bold text-slate-900 mb-6">
                  Need an after-hours mobile notary in Charlotte, NC?
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
