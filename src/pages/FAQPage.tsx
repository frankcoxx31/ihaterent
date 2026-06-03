import { Plus, Minus, MapPin } from 'lucide-react';
import React, { useState } from 'react';

export default function FAQPage() {
  const faqs = [
    {
      question: "How much does a mobile notary cost in Charlotte NC?",
      answer: "In North Carolina, the notary fee is $10 per notarized principal signature. Mobile notaries may also charge travel reimbursement at the IRS mileage rate ($0.725 per mile), which must be agreed to before the appointment."
    },
    {
      question: "Do you offer same-day mobile notary services in Charlotte?",
      answer: "Yes, same-day mobile notary services are available throughout Charlotte and surrounding areas, including evenings and weekends by appointment."
    },
    {
      question: "What areas of Charlotte do you serve as a mobile notary?",
      answer: "We provide mobile notary services throughout Charlotte, NC, including Uptown, South End, Ballantyne, University City, Mint Hill, Matthews, and nearby Mecklenburg County areas."
    },
    {
      question: "Can a mobile notary come to hospitals or nursing homes in Charlotte?",
      answer: "Yes, mobile notary services are available for hospitals, nursing homes, assisted living facilities, and private residences across Charlotte NC."
    },
    {
      question: "What documents can a mobile notary notarize in Charlotte NC?",
      answer: "Common documents include powers of attorney, affidavits, real estate documents, wills, trusts, and general notarizations permitted under North Carolina law."
    },
    {
      question: "What do I need to bring to my mobile notary appointment?",
      answer: "You must bring a valid, unexpired government-issued photo ID (such as a driver's license or passport) and the complete document to be notarized. Please do not sign the document until you are in the presence of the notary."
    },
    {
      question: "Can you notarize documents in a foreign language?",
      answer: "Yes, we can notarize documents in a foreign language as long as the notarial certificate is in English and the notary can communicate directly with the signer without a translator."
    },
    {
      question: "Are you a licensed attorney?",
      answer: "No, I am not an attorney licensed to practice law in North Carolina. I may not give legal advice or accept fees for legal advice."
    },
    {
      question: "Do you provide witnesses if my document requires them?",
      answer: "We can often provide witnesses for an additional fee if requested in advance. However, it is usually more cost-effective for you to provide your own witnesses (who must also have valid ID and not be named in the document)."
    },
    {
      question: "What forms of payment do you accept?",
      answer: "We accept all major credit cards, cash, and digital payments like Zelle or Venmo. Payment is due at the time of service."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-blue-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Find answers to common questions about our mobile notary and loan signing services in Charlotte, NC.
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Service Area Map */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">Our Service Area</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto flex items-center justify-center">
              <MapPin className="w-5 h-5 text-blue-600 mr-2" />
              Serving Charlotte, NC and surrounding Mecklenburg County areas.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 h-[500px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d208648.4014165584!2d-81.01211754020358!3d35.20307424683526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88541fc4fc381a81%3A0x884650e6bfde5145!2sCharlotte%2C%20NC!5e0!3m2!1sen!2sus!4v1712874200000!5m2!1sen!2sus"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Integrity Closings CLT Service Area Map"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
      >
        <span className="font-medium text-slate-900">{question}</span>
        {isOpen ? (
          <Minus className="w-5 h-5 text-blue-600 flex-shrink-0" />
        ) : (
          <Plus className="w-5 h-5 text-slate-400 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-slate-600 border-t border-slate-100 pt-4">
          {answer}
        </div>
      )}
    </div>
  );
}
