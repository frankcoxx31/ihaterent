import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AcknowledgmentVsJurat() {
  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <div className="bg-blue-950 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/resources" className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Resources
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 font-serif leading-tight">
            The Difference Between an Acknowledgment and a Jurat
          </h1>
          <p className="text-lg text-blue-100">
            Learn about the two most common types of notarizations and when each is required for your legal documents.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12 text-slate-700 text-lg leading-relaxed space-y-6">
          <p>
            When you need a document notarized, you might be asked whether you need an <strong className="text-slate-900">Acknowledgment</strong> or a <strong className="text-slate-900">Jurat</strong>. While a Notary Public cannot tell you which one you need (as that would constitute unauthorized practice of law), understanding the difference between the two can help you make the right choice or know what to ask the agency receiving your document.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">What is an Acknowledgment?</h2>
          <p>
            The purpose of an acknowledgment is to declare that you have willingly signed a document. 
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-slate-900">Signing:</strong> You do <em>not</em> necessarily have to sign the document in front of the notary. You can sign it beforehand.</li>
            <li><strong className="text-slate-900">Appearance:</strong> You <em>must</em> personally appear before the notary at the time of notarization to declare (acknowledge) that the signature on the document is yours and that you signed it willingly.</li>
            <li><strong className="text-slate-900">Common Uses:</strong> Real estate documents, deeds, powers of attorney, and contracts.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">What is a Jurat?</h2>
          <p>
            The purpose of a jurat is for you to swear or affirm that the contents of the document are true.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-slate-900">Signing:</strong> You <em>must</em> sign the document in the physical presence of the notary. You cannot sign it ahead of time.</li>
            <li><strong className="text-slate-900">Oath/Affirmation:</strong> The notary must administer a spoken oath or affirmation, and you must respond out loud, swearing or affirming that the statements in the document are true.</li>
            <li><strong className="text-slate-900">Common Uses:</strong> Affidavits, depositions, and any document requiring you to testify to its truthfulness under penalty of perjury.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Key Differences at a Glance</h2>
          <div className="overflow-x-auto my-8">
            <table className="min-w-full border-collapse border border-slate-200 text-base">
              <thead>
                <tr className="bg-slate-50">
                  <th className="border border-slate-200 px-4 py-3 text-left text-slate-900">Feature</th>
                  <th className="border border-slate-200 px-4 py-3 text-left text-slate-900">Acknowledgment</th>
                  <th className="border border-slate-200 px-4 py-3 text-left text-slate-900">Jurat</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-200 px-4 py-3 font-medium text-slate-900">Must sign in front of Notary?</td>
                  <td className="border border-slate-200 px-4 py-3">No</td>
                  <td className="border border-slate-200 px-4 py-3">Yes</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-3 font-medium text-slate-900">Requires an Oath/Affirmation?</td>
                  <td className="border border-slate-200 px-4 py-3">No</td>
                  <td className="border border-slate-200 px-4 py-3">Yes</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-3 font-medium text-slate-900">Primary Purpose</td>
                  <td className="border border-slate-200 px-4 py-3">Confirm identity and willing signature</td>
                  <td className="border border-slate-200 px-4 py-3">Swear to the truthfulness of the document</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">What if my document doesn't have a notarial certificate?</h2>
          <p>
            If your document does not contain pre-printed notarial wording (the certificate), the notary will ask you which type of notarization you need. If you are unsure, you should contact the person or agency that issued the document or will be receiving it to ask whether they require an acknowledgment or a jurat.
          </p>
        </div>
      </div>
    </div>
  );
}
