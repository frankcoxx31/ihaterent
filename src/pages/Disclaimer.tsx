import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Disclaimer() {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-slate-600 hover:text-blue-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 font-sans">Legal Disclaimer</h1>
          <div className="prose prose-slate max-w-none">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg font-bold text-blue-900 m-0 uppercase tracking-wide">
                I AM NOT AN ATTORNEY LICENSED TO PRACTICE LAW IN THE STATE OF NORTH CAROLINA, AND I MAY NOT GIVE LEGAL ADVICE OR ACCEPT FEES FOR LEGAL ADVICE.
              </p>
            </div>

            <p>The information provided on this website (Integrity Closings CLT) is for general informational purposes only and does not constitute legal, financial, or tax advice.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">Notary Public Limitations</h2>
            <p>As a commissioned Notary Public in the State of North Carolina, my role is strictly limited to acting as an impartial witness to the signing of documents, administering oaths and affirmations, and performing other notarial acts as authorized by law. </p>
            
            <p>Specifically, I <strong>cannot</strong> and <strong>will not</strong>:</p>
            <ul>
              <li>Explain the legal contents, meaning, or consequences of any document.</li>
              <li>Advise you on which type of notarial act (e.g., acknowledgment vs. jurat) is required for your document.</li>
              <li>Draft, prepare, or select legal documents on your behalf.</li>
              <li>Provide legal advice or representation in any matter.</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">Document Preparation</h2>
            <p>It is the responsibility of the document signer or the receiving agency to determine the appropriate type of notarization required. If you have questions regarding the legal effects of a document, how to fill it out, or which notarial certificate to attach, you must consult with a licensed attorney or the agency issuing/receiving the document prior to your appointment.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">Accuracy of Information</h2>
            <p>While we strive to keep the information on this website accurate and up-to-date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">Contact</h2>
            <p>If you require legal assistance, please contact the North Carolina State Bar or a qualified legal professional. For questions regarding our notary services, please contact us at fcoxx@integrityclosingsclt.com.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
