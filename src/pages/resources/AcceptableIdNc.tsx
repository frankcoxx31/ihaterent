import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AcceptableIdNc() {
  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <div className="bg-blue-950 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/resources" className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Resources
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 font-serif leading-tight">
            Acceptable Forms of ID for Notarization in NC
          </h1>
          <p className="text-lg text-blue-100">
            A comprehensive guide to the types of identification you can use for your mobile notary appointment in North Carolina.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12 text-slate-700 text-lg leading-relaxed space-y-6">
          <p>
            One of the primary duties of a Notary Public is to verify the identity of the document signer. This prevents fraud and ensures that the person signing the document is exactly who they claim to be. In North Carolina, state law dictates what forms of identification are acceptable.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Standard Requirements for ID</h2>
          <p>
            To be accepted by a North Carolina notary, your identification must generally meet the following criteria:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>It must be issued by a state or federal government agency.</li>
            <li>It must contain a photograph of your face.</li>
            <li>It must contain your signature.</li>
            <li>It must be current and unexpired.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Commonly Accepted Forms of ID</h2>
          <p>The most frequently used and accepted forms of identification include:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-slate-900">Driver's License:</strong> Issued by North Carolina or any other U.S. state.</li>
            <li><strong className="text-slate-900">State Non-Driver ID Card:</strong> Issued by the DMV.</li>
            <li><strong className="text-slate-900">U.S. Passport:</strong> A valid, unexpired United States passport.</li>
            <li><strong className="text-slate-900">Foreign Passport:</strong> Must be stamped by the U.S. Citizenship and Immigration Services (USCIS).</li>
            <li><strong className="text-slate-900">U.S. Military ID:</strong> Must contain a photo and signature. (Note: Some modern military IDs do not contain a signature and may require supplemental ID).</li>
            <li><strong className="text-slate-900">Tribal ID Card:</strong> Issued by a federally recognized Indian tribe.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Unacceptable Forms of ID</h2>
          <p>The following forms of ID are <strong className="text-slate-900">NOT</strong> acceptable for notarization in North Carolina:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Social Security Cards</li>
            <li>Birth Certificates</li>
            <li>Credit Cards or Debit Cards</li>
            <li>School or University ID Cards</li>
            <li>Library Cards</li>
            <li>Expired IDs of any kind</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">What if I don't have a valid ID?</h2>
          <p>
            If you do not have a valid, unexpired government-issued ID, you may still be able to have your document notarized using <strong className="text-slate-900">Credible Witnesses</strong>.
          </p>
          <p>
            A credible witness is someone who personally knows you and can swear under oath to your identity. In North Carolina, you typically need two credible witnesses who have valid ID themselves, are not named in the document, and do not have a financial interest in the transaction.
          </p>
          
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8 rounded-r-lg">
            <h3 className="text-xl font-bold text-blue-900 mb-2">Pro Tip for Your Appointment</h3>
            <p className="text-blue-800">
              Always ensure the name on your document matches the name on your ID. If your document says "John Robert Doe" but your ID only says "John Doe," it may cause issues depending on the receiving agency's strictness.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
