import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WhatIsMobileNotary() {
  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <div className="bg-blue-950 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/resources" className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Resources
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 font-serif leading-tight">
            What is a Mobile Notary?
          </h1>
          <p className="text-lg text-blue-100">
            Discover the benefits of using a mobile notary service and how it saves you time and hassle.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12 text-slate-700 text-lg leading-relaxed space-y-6">
          <p>
            Traditionally, when you needed a document notarized, you had to find a local bank, shipping store, or law office, take time out of your day, travel to their location, and wait in line. A <strong className="text-slate-900">Mobile Notary</strong> flips this process around by bringing the notary service directly to you.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">How Does a Mobile Notary Work?</h2>
          <p>
            A mobile notary is a commissioned Notary Public who travels to the client's preferred location to perform notarial acts. This can be your home, your office, a hospital room, a nursing home, a local coffee shop, or even a park bench. You schedule an appointment, and the notary arrives with their stamp, journal, and expertise.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Top Benefits of Using a Mobile Notary</h2>
          
          <h3 className="text-xl font-bold text-slate-900 mt-6 mb-2">1. Ultimate Convenience</h3>
          <p>
            The biggest advantage is convenience. You don't have to fight traffic, find parking, or take time off work. The notary works around your schedule, often offering evening and weekend appointments that traditional businesses do not.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-6 mb-2">2. Privacy and Comfort</h3>
          <p>
            Many documents requiring notarization are highly sensitive—such as wills, trusts, power of attorney documents, or financial agreements. Discussing and signing these documents in the privacy of your own home or office is much more comfortable than doing so at a busy bank counter.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-6 mb-2">3. Ideal for Immobile or Hospitalized Individuals</h3>
          <p>
            For the elderly, disabled, or those recovering in a hospital or assisted living facility, traveling to a notary is often impossible. Mobile notaries regularly visit these facilities to ensure that everyone has access to vital notarial services.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-6 mb-2">4. Efficiency for Businesses</h3>
          <p>
            Law firms, title companies, and corporate offices frequently use mobile notaries to handle high volumes of documents or to facilitate remote real estate closings (often acting as Loan Signing Agents). This keeps business moving smoothly without requiring executives or clients to travel.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">What Does it Cost?</h2>
          <p>
            Mobile notaries charge the state-mandated fee for the notarization itself (in North Carolina, this is $10 per principal signature). In addition to this, they charge a travel or convenience fee to cover their time, mileage, and expenses for coming to you. This travel fee must be agreed upon by both parties before the appointment takes place.
          </p>

          <div className="mt-12 p-8 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Need a Mobile Notary in Charlotte?</h3>
            <p className="text-slate-600 mb-6">
              Integrity Closings CLT is ready to come to your location.
            </p>
            <a href="/booking" className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors">
              Book an Appointment
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
