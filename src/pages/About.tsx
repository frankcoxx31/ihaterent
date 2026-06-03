import { CheckCircle, Shield, Award, Briefcase, Calendar } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Header Image */}
      <div className="h-64 sm:h-80 w-full mb-8">
        <img src="/hero-bj.jpg" alt="About Integrity Closings CLT" className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 font-serif">About Us</h1>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden p-8 sm:p-12">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-6">
                Integrity Closings CLT
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                We are a premier mobile notary service based in Charlotte, NC, dedicated to providing convenient, professional, and reliable notarization services. We understand that your time is valuable, which is why we come to you—whether you're at home, in the office, at a hospital, or a local coffee shop.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Our team is experienced in handling sensitive documents with care and confidentiality. From real estate loan signings to urgent hospital notarizations, we ensure your documents are executed correctly the first time.
              </p>
              
              <div className="space-y-4">
                {[
                  'Certified Loan Signing Agents',
                  'Background Screened & E&O Insured',
                  'Same-Day & Weekend Appointments',
                  'Serving Mecklenburg & Surrounding Counties'
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-12 lg:mt-0 relative">
              <div className="absolute inset-0 bg-blue-600 rounded-2xl transform rotate-3 opacity-10"></div>
              <img 
                src="/about-page.jpg" 
                alt="Professional Notary Service" 
                className="relative rounded-2xl shadow-xl w-full object-cover h-96"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Credentials Section */}
          <div className="mt-16 pt-12 border-t border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Credentials & Certifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex flex-col items-center text-center">
                <Award className="w-10 h-10 text-blue-600 mb-4" />
                <h4 className="font-bold text-slate-900 mb-2">NNA Certified</h4>
                <p className="text-sm text-slate-600">National Notary Association Certified Notary Signing Agent.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex flex-col items-center text-center">
                <Shield className="w-10 h-10 text-blue-600 mb-4" />
                <h4 className="font-bold text-slate-900 mb-2">E&O Insurance</h4>
                <p className="text-sm text-slate-600">$100,000 Errors & Omissions Policy Coverage.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex flex-col items-center text-center">
                <Briefcase className="w-10 h-10 text-blue-600 mb-4" />
                <h4 className="font-bold text-slate-900 mb-2">Experience</h4>
                <p className="text-sm text-slate-600">Over 7 years of specialized mobile notary and loan signing experience.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex flex-col items-center text-center">
                <Calendar className="w-10 h-10 text-blue-600 mb-4" />
                <h4 className="font-bold text-slate-900 mb-2">Active Commission</h4>
                <p className="text-sm text-slate-600">Valid North Carolina Notary Commission & Annual Background Screening.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
