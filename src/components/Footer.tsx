import { Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer id="contact" className="bg-blue-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="mb-6 inline-block">
              <Logo className="h-12 w-auto" textClassName="font-serif text-xl font-bold text-white" />
            </div>
            <p className="text-slate-400 mb-6">
              Professional mobile notary and loan signing services brought directly to your doorstep.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Need a Notary Now?</h3>
            <p className="text-slate-300 mb-6">
              Call or text <a href="tel:9803724103" className="text-blue-400 font-bold hover:underline">980-372-4103</a> to schedule your appointment. Same-day and after-hours appointments available.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-400 mr-3 mt-1" />
                <span className="text-slate-300">Serving the Greater Metro Area</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-blue-400 mr-3" />
                <a href="mailto:fcoxx@integrityclosingsclt.com" className="text-slate-300 hover:text-white transition-colors">fcoxx@integrityclosingsclt.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-slate-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/#services" className="text-slate-400 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/#locations" className="text-slate-400 hover:text-white transition-colors">Service Areas</Link></li>
              <li><Link to="/blog" className="text-slate-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/title-company-attorney-closing-support-charlotte-nc" className="text-slate-400 hover:text-white transition-colors">Title & Attorney Support</Link></li>
              <li><Link to="/faq" className="text-slate-400 hover:text-white transition-colors">FAQ</Link></li>
              <li><a href="/booking" className="text-slate-400 hover:text-white transition-colors">Book Appointment</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Integrity Closings CLT. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-slate-500">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
