import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-slate-600 hover:text-blue-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 font-sans">Privacy Policy</h1>
          <div className="prose prose-slate max-w-none">
            <p>Last Updated: {new Date().toLocaleDateString()}</p>
            <p>At Integrity Closings CLT, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our mobile notary and loan signing services.</p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">1. Information We Collect</h2>
            <p>We collect information necessary to perform our notarial duties and communicate with you effectively. This may include:</p>
            <ul>
              <li><strong>Personal Identification Information:</strong> Name, address, phone number, and email address.</li>
              <li><strong>Notarial Records:</strong> Information required by state law to be recorded in our notary journal, such as the type of document notarized, date and time of the act, and the type of identification presented (e.g., driver's license number, issue/expiration dates).</li>
              <li><strong>Service Details:</strong> Location of the signing, appointment times, and specific service requests.</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
            <p>We use the collected information solely for the following purposes:</p>
            <ul>
              <li>To provide mobile notary and loan signing services.</li>
              <li>To communicate with you regarding appointments, confirmations, and service updates.</li>
              <li>To comply with state and federal laws regarding notarial record-keeping.</li>
              <li>To process payments for services rendered.</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">3. Data Protection and Security</h2>
            <p>We implement strict security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. Physical records (such as the notary journal) are kept secure in accordance with state regulations. Digital communications and records are protected using industry-standard encryption and security protocols.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">4. Sharing Your Information</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
            <ul>
              <li><strong>With your explicit consent:</strong> For example, returning executed loan documents to your lender or title company.</li>
              <li><strong>Legal Requirements:</strong> If required by law, subpoena, or a request from a government or regulatory authority (such as the Secretary of State).</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">5. Your Rights</h2>
            <p>You have the right to request access to the personal information we hold about you, subject to legal restrictions regarding notary journals. If you have any questions or concerns about our privacy practices, please contact us.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">6. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p>
              Integrity Closings CLT<br />
              Email: fcoxx@integrityclosingsclt.com<br />
              Phone: 980-372-4103
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
