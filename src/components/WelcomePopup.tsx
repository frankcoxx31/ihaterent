import { useState, useEffect } from 'react';
import { X, Calendar, MessageSquare, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the popup in this session
    const hasSeenPopup = sessionStorage.getItem('hasSeenWelcomePopup');
    
    if (!hasSeenPopup) {
      // Show popup after 1.5 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Remember that the user has seen the popup so it doesn't keep showing up
    sessionStorage.setItem('hasSeenWelcomePopup', 'true');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative animate-in fade-in zoom-in duration-300 overflow-hidden">
        
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-500 p-2 rounded-full transition-colors z-10"
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="px-6 pt-10 pb-8 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img 
              src="/logo.jpg" 
              alt="Integrity Closings CLT" 
              className="h-24 w-auto mix-blend-multiply object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-4">
            Need A Notary Now!
          </h2>
          
          {/* Body Text */}
          <p className="text-blue-950 mb-4 text-base leading-relaxed px-2 font-medium">
            If you need a notary immediately, use the buttons below or dial <a href="tel:9803724103" className="text-blue-700 font-bold hover:underline">(980)-372-4103</a> and ask for Frank Coxx.
          </p>
          
          <p className="text-blue-950 mb-8 text-base px-2 font-medium">
            Leave a message if no answer and he'll call you back asap...
          </p>
          
          {/* Buttons */}
          <div className="space-y-3">
            {/* Primary Button: Text/Call */}
            <a 
              href="sms:9805058050" 
              onClick={handleClose}
              className="flex items-center justify-center w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-md"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Text Now 980-505-8050
            </a>

            {/* Secondary Button: Book Online */}
            <a href="/booking" 
              onClick={handleClose}
              className="flex items-center justify-center w-full py-3 px-6 rounded-xl bg-slate-100 text-blue-950 font-bold hover:bg-slate-200 transition-colors"
            >
              <Calendar className="w-5 h-5 mr-2 text-blue-700" />
              Book Online
            </a>

            {/* Secondary Button: Quick Quote */}
            <Link 
              to="/calculator" 
              onClick={handleClose}
              className="flex items-center justify-center w-full py-3 px-6 rounded-xl bg-slate-100 text-blue-950 font-bold hover:bg-slate-200 transition-colors"
            >
              <Calculator className="w-5 h-5 mr-2 text-blue-700" />
              Quick Quote Calculator
            </Link>
          </div>
        </div>

        {/* Bottom Gradient Border */}
        <div className="h-2 w-full bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500"></div>
      </div>
    </div>
  );
}
