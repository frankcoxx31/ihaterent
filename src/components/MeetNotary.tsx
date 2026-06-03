import { Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MeetNotary() {
  const navigate = useNavigate();
  
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16">
          {/* Photo Side */}
          <div className="flex-shrink-0 w-48 sm:w-64">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600 rounded-2xl transform rotate-3 opacity-10"></div>
              <div className="relative rounded-2xl shadow-lg overflow-hidden bg-slate-200 aspect-[3/4]">
                <img 
                  src="/new%20pic%20of%20me%20smaller.jpg" 
                  alt="Frank Coxx - Professional Notary" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-6 font-serif">
              Meet Your Notary
            </h2>
            <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
              <p>
                Hi, I'm Frank Coxx, the owner of Integrity Closings CLT. With over 7 years of experience in loan signings and 20 years in real estate, I take pride in providing accurate, stress-free notarizations — whether at your home, office, hospital, or wherever you need me.
              </p>
              <p>
                I built this business on trust and reliability, and I treat every signing like it's my own.
              </p>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
              <button 
                onClick={() => navigate('/booking')}
                className="inline-flex items-center justify-center px-8 py-3 text-base font-bold rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md"
              >
                Book Now
              </button>
              <a 
                href="tel:9803724103"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-bold rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                980-372-4103
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
