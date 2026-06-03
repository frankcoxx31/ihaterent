import React, { useState } from 'react';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.details || errorData.error || 'Failed to send message');
      }

      setIsSubmitted(true);
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
      // Do not auto-reset isSubmitted too quickly, let them see it.
      // But we can reset it after 10 seconds if we want.
      setTimeout(() => setIsSubmitted(false), 10000);
    } catch (err: any) {
      console.error('Contact submit error:', err);
      setSubmitError(err.message || 'There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">Contact Us</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Need a mobile notary? Have questions about our services? Fill out the form below or reach out directly.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Contact Info */}
            <div className="bg-blue-950 text-white p-8 sm:p-12">
              <h2 className="text-2xl font-bold mb-8">Get in Touch</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-blue-400 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Phone</h3>
                    <p className="text-slate-300 mt-1">980-372-4103</p>
                    <p className="text-sm text-slate-400 mt-1">Call or text for immediate assistance</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-blue-400 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p className="text-slate-300 mt-1">info@integrityclosingsclt.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-blue-400 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Service Area</h3>
                    <p className="text-slate-300 mt-1">Charlotte, NC & Surrounding Counties</p>
                    <p className="text-sm text-slate-400 mt-1">We travel to your location</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-blue-400 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Business Hours</h3>
                    <p className="text-slate-300 mt-1">Monday - Saturday: 9:00am - 7:00pm</p>
                    <p className="text-slate-300">Sunday: Closed</p>
                    <p className="text-sm text-slate-400 mt-1">After-hours service available (7:00pm - 11:00pm)</p>
                  </div>
                </div>

                <div className="pt-8 border-t border-blue-900">
                  <h3 className="font-semibold text-lg mb-4">Leave a Google Review</h3>
                  <div className="bg-white p-3 rounded-xl inline-block">
                    <img 
                      src="/google_review_qr.png" 
                      alt="Google Review QR Code" 
                      className="w-32 h-32"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <p className="text-sm text-slate-400 mt-3">Scan to share your experience with us!</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-8 sm:p-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Send a Message</h2>
              
              {submitError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                  {submitError}
                </div>
              )}

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-8 text-center h-full flex flex-col justify-center items-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                  <p>Thank you for reaching out. We will get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                      <input type="text" id="firstName" value={formData.firstName} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors" placeholder="John" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                      <input type="text" id="lastName" value={formData.lastName} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors" placeholder="Doe" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                    <input type="email" id="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors" placeholder="john@example.com" />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                    <input type="tel" id="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors" placeholder="(555) 123-4567" />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                    <textarea id="message" value={formData.message} onChange={handleInputChange} required rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors resize-none" placeholder="How can we help you today?"></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-colors disabled:bg-blue-400 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
