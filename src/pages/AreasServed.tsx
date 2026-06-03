import { MapPin, Phone, Building2, Compass, Map, FileSignature } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function AreasServed() {
  useEffect(() => {
    // SEO Meta Tags
    document.title = "Service Areas | Charlotte Mobile Notary & Loan Signing";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Integrity Closings CLT provides mobile notary services across Mecklenburg, Union, and Cabarrus counties including Mint Hill, Matthews, Huntersville, and more.");
    }
  }, []);

  const serviceAreas = [
    "Ballantyne",
    "Concord",
    "Harrisburg",
    "Huntersville",
    "Indian Trail",
    "Kannapolis",
    "Locust",
    "Matthews",
    "Midland",
    "Mint Hill",
    "Monroe",
    "NoDa (North Davidson)",
    "Pineville",
    "Stallings"
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="h-64 sm:h-80 w-full relative bg-slate-100">
            <img 
              src="/charlotte.jpg" 
              alt="Charlotte Skyline" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer" 
            />
          </div>
          
          <div className="p-8 sm:p-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-6">
              Our Service Areas
            </h1>
            
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Integrity Closings CLT is proud to be a premier mobile notary public and loan signing agency serving the greater Charlotte metropolitan area. We travel to homes, hospitals, nursing facilities, corporate offices, and coffee shops throughout Mecklenburg County, Union County, and Cabarrus County.
            </p>

            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Map className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-slate-900">Cities & Neighborhoods We Serve</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 mb-12">
                {serviceAreas.map((area, index) => (
                  <div key={index} className="flex items-center text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <MapPin className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                    <span className="font-medium">{area}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center mb-6">
                <FileSignature className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-slate-900">Featured Loan Signing Areas</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link to="/locations/mint-hill-loan-signing-agent" className="p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all group">
                  <div className="font-bold text-slate-900 group-hover:text-blue-600">Mint Hill Loan Signing Agent</div>
                  <div className="text-sm text-slate-500">Professional mobile mortgage closings in Mint Hill</div>
                </Link>
                <Link to="/locations/matthews-loan-signing-agent" className="p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all group">
                  <div className="font-bold text-slate-900 group-hover:text-blue-600">Matthews Loan Signing Agent</div>
                  <div className="text-sm text-slate-500">Mobile notary services for Matthews mortgage documents</div>
                </Link>
                <Link to="/locations/concord-loan-signing-agent" className="p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all group">
                  <div className="font-bold text-slate-900 group-hover:text-blue-600">Concord Loan Signing Agent</div>
                  <div className="text-sm text-slate-500">Expert loan signings throughout Concord & Cabarrus</div>
                </Link>
                <Link to="/locations/cabarrus-county-loan-signing-agent" className="p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all group">
                  <div className="font-bold text-slate-900 group-hover:text-blue-600">Cabarrus County Loan Signing</div>
                  <div className="text-sm text-slate-500">Full county coverage for lenders and title companies</div>
                </Link>
                <Link to="/locations/union-county-loan-signing-agent" className="p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all group">
                  <div className="font-bold text-slate-900 group-hover:text-blue-600">Union County Loan Signing</div>
                  <div className="text-sm text-slate-500">Reliable mobile signings in Monroe, Waxhaw & more</div>
                </Link>
              </div>
            </section>

            <section className="mb-12 bg-blue-50 p-6 rounded-xl border border-blue-100">
              <div className="flex items-start">
                <Compass className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Don't See Your City Listed?</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    While the locations above represent our primary service zone, we frequently accommodate special requests and extended travel for real estate closings and emergency bedside notarizations. 
                  </p>
                  <p className="text-sm text-slate-500 italic">
                    *Additional travel fees may apply for distances outside of our standard radius.
                  </p>
                </div>
              </div>
            </section>

            <div className="text-center pt-10 border-t border-slate-100">
              <div className="inline-flex flex-col items-center">
                <p className="text-xl font-bold text-slate-900 mb-6">
                  Ready to book a notary in your area?
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/booking" 
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    Book Appointment
                  </Link>
                  <a 
                    href="tel:9803724103" 
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors shadow-sm"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call 980-372-4103
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
