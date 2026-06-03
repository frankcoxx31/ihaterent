import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsOfService() {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-slate-600 hover:text-blue-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 font-sans">Terms of Service</h1>
          <div className="prose prose-slate max-w-none">
            <p>Last Updated: {new Date().toLocaleDateString()}</p>
            <p>Welcome to Integrity Closings CLT. By accessing our website or utilizing our mobile notary and loan signing services, you agree to comply with and be bound by the following Terms of Service. Please read them carefully.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">1. Services Provided</h2>
            <p>Integrity Closings CLT provides mobile notary public and loan signing agent services in the Charlotte, NC area and surrounding regions. We travel to your location to witness and authenticate the signing of documents, administer oaths, and perform other notarial acts as authorized by the State of North Carolina.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">2. Identification Requirements</h2>
            <p>By law, all signers must present a valid, unexpired, government-issued photo identification (such as a Driver's License, State ID, or Passport) at the time of the appointment. If proper identification cannot be provided, the notary act cannot be performed, and a travel fee may still apply.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">3. Refusal of Service</h2>
            <p>We reserve the right to refuse service if:</p>
            <ul>
              <li>The signer appears to be coerced, confused, or lacks the mental capacity to understand the document they are signing.</li>
              <li>The document is incomplete or contains blank spaces.</li>
              <li>Proper identification is not provided.</li>
              <li>The notary suspects fraud or illegal activity.</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">4. Fees and Payment</h2>
            <p>Fees for notarial acts are regulated by the State of North Carolina. In addition to the standard notarial fee, a travel/convenience fee will be charged based on the distance and time of the appointment. All fees will be agreed upon prior to the appointment. Payment is due at the time of service unless prior arrangements have been made (e.g., billing a title company).</p>

            <h2 className="text-xl font-bold mt-8 mb-4">5. Cancellations and Delays</h2>
            <p>We understand that schedules change. We ask for at least 2 hours' notice for cancellations. If the notary arrives at the agreed-upon location and the signer is unavailable, refuses to sign, or lacks proper ID, a travel fee will still be charged. A grace period of 15 minutes is typically allowed for delays; excessive delays may result in additional wait-time fees or rescheduling.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">6. Limitation of Liability</h2>
            <p>Integrity Closings CLT and its notaries are responsible only for the proper execution of the notarial act. We are not responsible for the contents, legality, or accuracy of the documents being notarized. We shall not be held liable for any direct, indirect, incidental, or consequential damages arising from the use of our services or errors in the documents provided by the client or third parties.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">7. Governing Law</h2>
            <p>These Terms of Service shall be governed by and construed in accordance with the laws of the State of North Carolina.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
