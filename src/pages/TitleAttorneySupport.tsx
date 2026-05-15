import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Scale, 
  ClipboardCheck, 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  UserCheck, 
  ArrowRight,
  CheckCircle2,
  FileSignature,
  Briefcase,
  Users
} from 'lucide-react';
import { useEffect } from 'react';

export default function TitleAttorneySupport() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Title Company & Attorney Closing Support | Charlotte, NC | Integrity Closings CLT";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Professional mobile closing support for title companies and real estate attorneys in Charlotte, NC. Reliable signer coordination and loan document execution.');
    }
  }, []);

  const features = [
    {
      title: "Mobile Convenience",
      description: "We meet your clients at their home, office, or any preferred location across the Charlotte region.",
      icon: <MapPin className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Punctual & Professional",
      description: "We represent your firm with the highest level of professionalism and reach every appointment on time.",
      icon: <Clock className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Clear Communication",
      description: "Prompt confirmations and status updates kept all parties informed throughout the signing process.",
      icon: <Users className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Familiar Workflows",
      description: "Experienced with lender requirements and common title company document packages.",
      icon: <ClipboardCheck className="w-6 h-6 text-blue-600" />
    }
  ];

  const services = [
    {
      title: "Mobile Loan Document Signings",
      description: "Facilitating scheduled appointments for various mortgage loan types with precision."
    },
    {
      title: "Borrower & Seller Packages",
      description: "Expert execution of purchase and sale documents for both sides of the transaction."
    },
    {
      title: "Refinance & HELOC Support",
      description: "Reliable coordination for secondary financing and equity-related document signings."
    },
    {
      title: "Overflow Closing Coverage",
      description: "Providing backup support to your office during high-volume periods or staff outages."
    },
    {
      title: "Out-of-Office Coordination",
      description: "Acting as your field extension when signers are unable to visit your physical office."
    },
    {
      title: "Professional Document Presentation",
      description: "Ensuring signers understand where to sign and initial while maintaining a neutral, helpful presence."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-24">
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1920" 
            alt="Real estate closing document signing" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-slate-900 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
              Title Company & Attorney Closing Support in Charlotte, NC
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              Integrity Closings CLT provides professional mobile closing support for scheduled loan document appointments, signer coordination, and field signing coverage. We act as a reliable extension of your team to ensure every appointment is handled with technical precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/booking" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25">
                Request Closing Support
              </Link>
              <a href="tel:9803724103" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-lg text-slate-900 bg-yellow-400 hover:bg-yellow-500 transition-all shadow-lg hover:shadow-yellow-500/25">
                <Phone className="w-5 h-5 mr-3" />
                (980) 372-4103
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* For Title Companies & Attorneys */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Expert Mobile Extension for Your Firm</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                As a transaction coordinator, title officer, or escrow professional, your reputation depends on the quality of the final signing experience. We provide the professional presence and technical proficiency required to represent your firm in the field.
              </p>
              <div className="space-y-4">
                {[
                  "Scheduled Mobile Signings",
                  "Last-Minute Overflow Support",
                  "Remote Signer Facilitation",
                  "Error-Free Document Execution"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    <span className="text-slate-800 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Title Companies", icon: <Building2 className="w-8 h-8" /> },
                { title: "Real Estate Attorneys", icon: <Scale className="w-8 h-8" /> },
                { title: "Escrow Teams", icon: <ShieldCheck className="w-8 h-8" /> },
                { title: "Closing Teams", icon: <Users className="w-8 h-8" /> }
              ].map((item, idx) => (
                <div key={idx} className="p-8 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col items-center text-center">
                  <div className="text-blue-600 mb-4">{item.icon}</div>
                  <h3 className="font-bold text-slate-900">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Supported */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Closing Support Services</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Focused on signing and document execution support for your professional real estate transactions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <FileSignature className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Use Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">The Professional Partner Choice</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Why Charlotte-area firms choose Integrity Closings CLT for their mobile signing needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {features.map((item, index) => (
              <div key={index} className="flex gap-6 p-6 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="flex-shrink-0 w-12 h-12 bg-white shadow-sm border border-slate-100 rounded-xl flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-16">How Closing Support Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mb-6">1</div>
              <h3 className="text-xl font-bold mb-4">Request Coordination</h3>
              <p className="text-slate-400">Share appointment details and document requirements via phone or our booking portal.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mb-6">2</div>
              <h3 className="text-xl font-bold mb-4">Professional Execution</h3>
              <p className="text-slate-400">We meet signers, facilitate the closing package, and perform all necessary notarizations.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mb-6">3</div>
              <h3 className="text-xl font-bold mb-4">Prompt Return</h3>
              <p className="text-slate-400">Documents are scanned back or dropped at your preferred shipping carrier immediately.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Service Region Coverage</h2>
          <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">
            Providing reliable mobile support across the greater Charlotte area.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["Charlotte", "Matthews", "Mint Hill", "Concord", "Monroe", "Cabarrus County", "Union County"].map((city, idx) => (
              <span key={idx} className="px-6 py-3 bg-slate-100 rounded-full text-slate-700 font-bold border border-slate-200">
                {city}
              </span>
            ))}
          </div>
          <div className="mt-12">
            <Link to="/areas-served" className="text-blue-600 font-bold hover:underline inline-flex items-center">
              View Specific Service Areas <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-blue-600 text-white text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Partner With a Reliable Closing Resource</h2>
          <p className="text-xl text-blue-100 mb-12">
            Don't let logistics slow down your closings. Support your clients with a punctual mobile partner they can trust.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/booking" className="w-full sm:w-auto px-10 py-5 bg-white text-blue-600 font-bold text-xl rounded-xl hover:bg-blue-50 transition-all shadow-xl">
              Request Closing Support
            </Link>
            <a href="tel:9803724103" className="w-full sm:w-auto px-10 py-5 bg-yellow-400 text-slate-900 font-bold text-xl rounded-xl hover:bg-yellow-500 transition-all shadow-xl flex items-center justify-center">
              <Phone className="w-6 h-6 mr-3" />
              980-372-4103
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
