import { Calendar, Phone, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("/hero-bj.jpg")' }}
      ></div>
      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-slate-900/80 z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center py-12 md:py-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Mobile Notary Services
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-4 max-w-4xl mx-auto">
          We come to you for same-day notarizations, hospital visits, estate documents, and loan signings.
        </p>
        <p className="text-lg text-blue-400 font-semibold mb-8">
          Same-Day Service • After Hours Available • Professional Signings
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-4xl mx-auto">
          <Link 
            to="/booking" 
            className="flex-1 inline-flex items-center justify-center px-6 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Book Appointment
          </Link>
          <Link 
            to="/calculator" 
            className="flex-1 inline-flex items-center justify-center px-6 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 transition-colors"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Free Quote
          </Link>
          <a 
            href="tel:9803724103" 
            className="flex-1 inline-flex items-center justify-center px-6 py-4 border-2 border-white text-lg font-medium rounded-md text-white bg-transparent hover:bg-white hover:text-slate-900 transition-colors"
          >
            <Phone className="w-5 h-5 mr-2" />
            Call: 980-372-4103
          </a>
        </div>
      </div>
    </div>
  );
}
