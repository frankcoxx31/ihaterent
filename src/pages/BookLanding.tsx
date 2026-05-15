import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Calendar as CalendarIcon, 
  CheckCircle, 
  Shield, 
  Search, 
  MapPin, 
  Clock, 
  User, 
  Mail, 
  FileText, 
  ChevronDown, 
  ChevronUp,
  MessageSquare,
  Award,
  ArrowRight,
  Globe,
  Building,
  Heart,
  ChevronLeft,
  ChevronRight,
  Star,
  Lock
} from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, startOfWeek, endOfWeek, parseISO } from 'date-fns';
import Logo from '../components/Logo';

// --- Data ---

const SERVICES = [
  {
    id: 'loan-signing',
    name: 'Loan Signing Appointment',
    description: 'Professional mortgage closings for buyers, sellers, and refinances. Expert handling of full loan packages.',
    icon: <Building className="w-8 h-8" />
  },
  {
    id: 'estate-planning',
    name: 'Estate Planning Documents',
    description: 'Wills, Trusts, Healthcare Directives, and Powers of Attorney handled with extreme care and confidentiality.',
    icon: <FileText className="w-8 h-8" />
  },
  {
    id: 'general-notary',
    name: 'General Notary Work',
    description: 'Affidavits, acknowledgments, jurats, and standard notarizations for your everyday legal needs.',
    icon: <Globe className="w-8 h-8" />
  },
  {
    id: 'hospital-visit',
    name: 'Hospital, Hospice, or Facility Visit',
    description: 'Compassionate bedside service at Charlotte hospitals and care facilities. We coordinate with facility staff.',
    icon: <Heart className="w-8 h-8" />
  },
  {
    id: 'real-estate',
    name: 'Real Estate Documents',
    description: 'Deeds, promissory notes, easements, and other critical property documents notarized at your convenience.',
    icon: <MapPin className="w-8 h-8" />
  },
  {
    id: 'business-i9',
    name: 'Business & I-9 Documents',
    description: 'Corporate contracts, resolutions, and I-9 Employment Eligibility Verification for HR departments.',
    icon: <Award className="w-8 h-8" />
  }
];

const FAQS = [
  {
    question: "How much does notarization cost in North Carolina?",
    answer: "In North Carolina, the statutory notary fee is $10 per principal signature. As a mobile service, we also charge a travel fee based on the distance and time of day, which must be agreed upon prior to the appointment. We provide clear, upfront quotes."
  },
  {
    question: "What ID do I need?",
    answer: "You must provide a current, unexpired government-issued photo ID. Acceptable forms include a Driver's License, US Passport, Military ID, or State ID. The name on your ID must match the name on the document."
  },
  {
    question: "Can you come to a hospital or care facility?",
    answer: "Yes, we specialize in bedside notarizations at hospitals (like Atrium Health and Novant Health) and nursing homes across the Charlotte area. We handle these sensitive appointments with patience and professionalism."
  },
  {
    question: "Do estate planning documents need witnesses?",
    answer: "Many estate planning documents (like Wills and some POAs) require one or two disinterested witnesses. While we can sometimes assist in finding witnesses, it is usually best if you coordinate with friends or neighbors who are not named in the document."
  },
  {
    question: "Do you offer same-day appointments?",
    answer: "Absolutely. We pride ourselves on offering same-day mobile notary services whenever possible. If you have an urgent need, calling us directly is the fastest way to secure a same-day slot."
  },
  {
    question: "Can you notarize real estate documents?",
    answer: "Yes, we are highly experienced in real estate closings. Whether it's a seller's package, a refinance, or a simple quitclaim deed, we ensure every page is initialed and signed correctly the first time."
  },
  {
    question: "Do you provide legal advice?",
    answer: "No. As Notaries Public, we are prohibited by law from providing legal advice, explaining the effects of a document, or assisting with the preparation of legal forms. Please consult an attorney for legal questions."
  },
  {
    question: "What areas do you serve?",
    answer: "We primarily serve Charlotte and Mint Hill, but we travel throughout Mecklenburg and surrounding counties including Matthews, Indian Trail, Harrisburg, Concord, Monroe, and more."
  }
];

const TESTIMONIALS = [
  {
    quote: "Very professional and punctual. Needed a last-minute POA notarized at the hospital and Integrity Closings was there within two hours. Exceptional service.",
    author: "Sarah J., Charlotte"
  },
  {
    quote: "I've used several mobile notaries in the area, but the attention to detail here is unmatched. They handled our complex real estate closing perfectly.",
    author: "David M., Mint Hill"
  },
  {
    quote: "Convenient beyond words. Not having to drive across town with kids and documents in tow was worth every penny. Highly recommend!",
    author: "Amanda R., Weddington"
  }
];

const SERVICE_AREAS = [
  "Charlotte", "Mint Hill", "Matthews", "Indian Trail", "Harrisburg", "Concord", 
  "Pineville", "Ballantyne", "Huntersville", "University City", "SouthPark", 
  "Monroe", "Stallings", "Waxhaw", "Weddington"
];

// --- Sub-components ---

function SectionHeading({ title, subtitle, light = false }: { title: string, subtitle?: string, light?: boolean }) {
  return (
    <div className="text-center mb-12">
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 tracking-tight ${light ? 'text-white' : 'text-[#0F1A2B]'}`}>
        {title}
      </h2>
      {subtitle && <p className={`max-w-2xl mx-auto text-lg ${light ? 'text-slate-300' : 'text-[#6B7283]'}`}>{subtitle}</p>}
      <div className={`w-20 h-1 mx-auto mt-6 rounded-full ${light ? 'bg-[#A87A35]' : 'bg-[#0F1A2B]'}`}></div>
    </div>
  );
}

// --- Main Page Component ---

export default function BookLanding() {
  const formRef = useRef<HTMLDivElement>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // SEO Meta Tags
  useEffect(() => {
    document.title = "Schedule Your Mobile Notary | Integrity Closings CLT | Charlotte, NC";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Professional mobile notary and loan signing services in Charlotte and Mint Hill. Book your appointment online today. Same-day service available.");
    }
  }, []);

  const scrollToForm = (serviceId?: string) => {
    if (serviceId) setSelectedService(serviceId);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // --- Booking Form Logic (Extracted and refined from original Booking.tsx) ---
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Generate availability
  useEffect(() => {
    async function fetchAvailability() {
      if (!selectedDate || !selectedService) return;
      setIsLoadingSlots(true);
      try {
        const response = await fetch('/api/availability', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ date: selectedDate.toISOString() })
        });
        if (!response.ok) throw new Error('Failed to fetch availability');
        const { busy } = await response.json();
        
        // Use slot generator
        const slots = [];
        for (let i = 9; i <= 23; i++) {
          const hour = i > 12 ? i - 12 : i;
          const ampm = i >= 12 ? 'PM' : 'AM';
          slots.push(`${hour}:00 ${ampm}`);
          if (i !== 23) slots.push(`${hour}:30 ${ampm}`);
        }

        const filtered = slots.filter(timeStr => {
          const timeMatch = timeStr.match(/(\d+):(\d+)\s+(AM|PM)/);
          if (!timeMatch) return false;
          let hours = parseInt(timeMatch[1]);
          const minutes = parseInt(timeMatch[2]);
          const ampm = timeMatch[3];
          if (ampm === 'PM' && hours < 12) hours += 12;
          if (ampm === 'AM' && hours === 12) hours = 0;
          const slotStart = new Date(selectedDate);
          slotStart.setHours(hours, minutes, 0, 0);
          const slotEnd = new Date(slotStart.getTime() + 30 * 60000); 

          const isBusy = busy.some((busyPeriod: {start: string, end: string}) => {
            const busyStart = parseISO(busyPeriod.start);
            const busyEnd = parseISO(busyPeriod.end);
            return slotStart < busyEnd && slotEnd > busyStart;
          });
          const now = new Date();
          if (isSameDay(selectedDate, now) && slotStart < now) return false;
          return !isBusy;
        });
        setAvailableSlots(filtered);
      } catch (error) {
        console.error('Error fetching availability:', error);
        setAvailableSlots([]); 
      } finally {
        setIsLoadingSlots(false);
      }
    }
    fetchAvailability();
  }, [selectedDate, selectedService]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      if (!selectedDate || !selectedTime || !selectedService) throw new Error('Missing details');
      const timeMatch = selectedTime.match(/(\d+):(\d+)\s+(AM|PM)/);
      if (!timeMatch) throw new Error('Invalid time');
      let hours = parseInt(timeMatch[1]);
      const ampm = timeMatch[3];
      if (ampm === 'PM' && hours < 12) hours += 12;
      if (ampm === 'AM' && hours === 12) hours = 0;
      const startTime = new Date(selectedDate);
      startTime.setHours(hours, parseInt(timeMatch[2]), 0, 0);
      const endTime = new Date(startTime.getTime() + 30 * 60000);

      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          serviceName: SERVICES.find(s => s.id === selectedService)?.name,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
        }),
      });
      if (!response.ok) throw new Error('Failed to book');
      setStep(4); // Success step
    } catch (error) {
      setSubmitError('Booking failed. Please call (980) 372-4103.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white font-sans text-[#0F1A2B] selection:bg-[#0F1A2B] selection:text-white">
      
      {/* 1. STICKY HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E3E8EF] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <Logo className="h-8 md:h-10 w-auto" />
              <span className="font-serif font-bold text-lg md:text-xl hidden sm:inline">Integrity Closings CLT</span>
            </Link>
            <div className="h-6 w-[1px] bg-slate-200 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center text-[#6B7283] text-sm font-medium">
              <MapPin className="w-4 h-4 mr-1 text-[#A87A35]" />
              Charlotte, NC
            </div>
          </div>
          <a 
            href="tel:9803724103" 
            className="bg-[#0F1A2B] text-white px-4 py-2 md:px-6 md:py-2.5 rounded-full font-bold text-sm md:text-base hover:bg-[#1B2A40] transition-colors shadow-sm flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden xs:inline">(980) 372-4103</span>
            <span className="xs:hidden">Call</span>
          </a>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[#F8FAFC] -z-10 skew-y-1 origin-top-left scale-150"></div>
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#A87A35]/10 text-[#A87A35] rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <Award className="w-4 h-4" /> Professional Mobile Notary
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight md:leading-[1.1] mb-6 text-[#0F1A2B]">
              A trusted notary, at your door — <span className="text-[#A87A35]">often the same day.</span>
            </h1>
            <p className="text-xl text-[#6B7283] mb-10 leading-relaxed max-w-xl">
              Loan signings, estate planning documents, and everyday notarizations, handled with care at your home, office, hospital, or care facility. No driving across town. No surprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button 
                onClick={() => scrollToForm()}
                className="bg-[#0F1A2B] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#1B2A40] transition-all shadow-xl hover:shadow-[#0F1A2B]/20 flex items-center justify-center gap-2"
              >
                Book an appointment <ArrowRight className="w-5 h-5" />
              </button>
              <a 
                href="tel:9803724103" 
                className="border-2 border-[#E3E8EF] text-[#0F1A2B] px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                Call (980) 372-4103
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-slate-200">
              {[
                { title: "NNA", desc: "Certified" },
                { title: "$100K", desc: "E&O Insured" },
                { title: "BCG", desc: "Screened" },
                { title: "9+", desc: "Years Exp" }
              ].map((trust, idx) => (
                <div key={idx} className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <span className="text-[10px] font-extrabold uppercase tracking-tighter text-[#A87A35] mb-1">{trust.title}</span>
                  <span className="text-xs font-bold text-[#0F1A2B]">{trust.desc}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block relative animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="relative z-10 rounded-2xl shadow-2xl overflow-hidden border-8 border-white">
              <img 
                src="https://cdn.marblism.com/u0LLXUUVgpD.webp" 
                alt="Notary with document" 
                className="w-full aspect-[4/5] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Accent shapes */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#A87A35] rounded-2xl -z-0 opacity-20"></div>
            <div className="absolute -top-6 -right-6 w-64 h-64 bg-[#0F1A2B] rounded-full -z-0 opacity-5"></div>
          </div>
        </div>
      </section>

      {/* 4. TRUST STRIP */}
      <div className="bg-[#0F1A2B] py-8 text-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center md:justify-around gap-y-6 gap-x-12">
          {[
            { icon: <Shield className="w-5 h-5 text-[#A87A35]" />, text: "NNA Certified" },
            { icon: <CheckCircle className="w-5 h-5 text-[#A87A35]" />, text: "$100K E&O Insured" },
            { icon: <Search className="w-5 h-5 text-[#A87A35]" />, text: "Background Screened" },
            { icon: <Lock className="w-5 h-5 text-[#A87A35]" />, text: "Confidential Appointments" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 font-bold text-sm tracking-wide">
              {item.icon}
              {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* 3. SERVICE SELECTION SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading 
            title="Pick the service that fits your appointment" 
            subtitle="Expert mobile service for every stage of your document needs, from simple signatures to complex loan signings." 
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((s) => (
              <div 
                key={s.id} 
                className="group p-8 rounded-2xl border border-[#E3E8EF] bg-[#F8FAFC] hover:bg-white hover:shadow-2xl hover:shadow-[#0F1A2B]/5 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="bg-white w-16 h-16 rounded-xl flex items-center justify-center text-[#0F1A2B] mb-6 shadow-sm group-hover:bg-[#0F1A2B] group-hover:text-white transition-colors duration-300">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{s.name}</h3>
                <p className="text-[#6B7283] line-clamp-3 mb-8 min-h-[4.5rem]">{s.description}</p>
                <button 
                  onClick={() => scrollToForm(s.id)}
                  className="w-full flex items-center justify-between text-sm font-bold uppercase tracking-wider text-[#A87A35] hover:text-[#0F1A2B] transition-colors"
                >
                  Select this service <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS SECTION */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <SectionHeading title="How it works" subtitle="Three simple steps to getting your documents notarized legally and securely." />
          <div className="grid md:grid-cols-3 gap-8 relative mt-16">
            <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-[2px] bg-slate-200 border-dashed border-t"></div>
            {[
              { num: "01", title: "Choose your service", desc: "Select the notarization type you need from our list of expert services." },
              { num: "02", title: "Confirm appointment", desc: "Pick a date and time that works and tell us where the notary should meet you." },
              { num: "03", title: "Meet your notary", desc: "We arrive promptly, verify your ID, witness your signature, and apply the official seal." }
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center">
                <div className="w-14 h-14 bg-[#0F1A2B] text-white rounded-full flex items-center justify-center font-bold text-lg mb-6 shadow-lg shadow-[#0F1A2B]/20">
                  {step.num}
                </div>
                <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                <p className="text-sm text-[#6B7283] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ABOUT SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://cdn.marblism.com/hHCdisgRgA2.webp" 
                alt="About Integrity Closings CLT" 
                className="w-full aspect-video object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-[#A87A35] text-white p-8 rounded-2xl hidden md:block max-w-[240px]">
              <p className="text-4xl font-serif font-bold mb-1">9+</p>
              <p className="text-xs font-bold uppercase tracking-widest opacity-80">Years of dedicated service in Charlotte</p>
            </div>
          </div>
          <div>
            <span className="text-[#A87A35] font-bold text-xs uppercase tracking-widest mb-4 block">About the Business</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F1A2B] mb-8 leading-tight">Professionalism. Punctuality. Confidentiality.</h2>
            <p className="text-lg text-[#6B7283] mb-8 leading-relaxed">
              Integrity Closings CLT provides mobile notary and loan signing services across Charlotte, Mint Hill, and nearby areas, with a focus on professionalism, punctuality, and confidentiality.
            </p>
            <p className="text-lg text-[#6B7283] mb-10 leading-relaxed">
              We understand that your time is valuable and your legal matters are private. Our goal is to make the notarization process the smoothest part of your transaction, handled with the precision that 9+ years of experience brings.
            </p>
            <button 
              onClick={() => scrollToForm()}
              className="px-8 py-4 bg-[#0F1A2B] text-white font-bold rounded-xl hover:bg-[#1B2A40] transition-colors"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      {/* 7. SERVICE AREA SECTION */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="Service Areas" subtitle="We travel across the greater Charlotte metro and Mint Hill region to reach you wherever you are." />
          <div className="bg-white rounded-3xl p-10 shadow-sm border border-[#E3E8EF]">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {SERVICE_AREAS.map((area) => (
                <div key={area} className="flex items-center gap-2 group">
                  <div className="w-2 h-2 rounded-full bg-[#A87A35] group-hover:scale-125 transition-transform"></div>
                  <span className="font-bold text-[#0F1A2B] group-hover:translate-x-1 transition-transform">{area}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 italic text-[#6B7283]">
                And surrounding areas...
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. BOOKING FORM SECTION */}
      <section ref={formRef} className="py-20 bg-white" id="book-section">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeading title="Schedule Your Appointment" />
          
          <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(15,26,43,0.1)] border border-[#E3E8EF] overflow-hidden">
            <div className="bg-[#0F1A2B] p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold font-serif mb-1 uppercase tracking-tight">Appointment Request</h3>
                <p className="text-slate-400 text-sm">Secure & Confidential Booking</p>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3].map(s => (
                  <div key={s} className={`w-10 h-2 rounded-full ${step >= s ? 'bg-[#A87A35]' : 'bg-white/20'}`}></div>
                ))}
              </div>
            </div>

            <div className="p-8 md:p-12">
              {step === 1 && (
                <div className="animate-in fade-in duration-500">
                  <h4 className="text-xl font-bold mb-8">What service do you need?</h4>
                  <div className="grid sm:grid-cols-2 gap-4 mb-10">
                    {SERVICES.map((s, idx) => (
                      <button 
                        key={s.id}
                        onClick={() => setSelectedService(s.id)}
                        className={`p-6 rounded-2xl border-2 text-left transition-all ${
                          selectedService === s.id 
                            ? 'border-[#0F1A2B] bg-[#0F1A2B]/5 shadow-inner' 
                            : 'border-slate-100 hover:border-slate-200 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-lg ${selectedService === s.id ? 'bg-[#0F1A2B] text-white' : 'bg-slate-50 text-slate-400'}`}>
                            {idx % 2 === 0 ? <FileText className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
                          </div>
                          <span className={`font-bold transition-colors ${selectedService === s.id ? 'text-[#0F1A2B]' : 'text-[#6B7283]'}`}>{s.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => setStep(2)}
                    disabled={!selectedService}
                    className="w-full py-5 bg-[#0F1A2B] text-white font-bold rounded-2xl hover:bg-[#1B2A40] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
                  >
                    Select Service & Continue <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="animate-in fade-in duration-500">
                  <div className="flex items-center justify-between mb-8">
                    <h4 className="text-xl font-bold">Pick Date & Time</h4>
                    <button onClick={() => setStep(1)} className="text-sm font-bold text-[#A87A35] hover:underline">Change Service</button>
                  </div>
                  
                  <div className="grid lg:grid-cols-2 gap-10">
                    <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-[#E3E8EF]">
                       <div className="flex justify-between items-center mb-6">
                         <h5 className="font-bold">{format(currentMonth, "MMMM yyyy")}</h5>
                         <div className="flex gap-2">
                           <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-1 hover:bg-white rounded border">
                             <ChevronLeft className="w-4 h-4" />
                           </button>
                           <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-1 hover:bg-white rounded border">
                             <ChevronRight className="w-4 h-4" />
                           </button>
                         </div>
                       </div>
                       <div className="grid grid-cols-7 gap-1 text-center text-[10px] uppercase font-bold text-[#6B7283] mb-4">
                         {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => <div key={d}>{d}</div>)}
                       </div>
                       <div className="grid grid-cols-7 gap-1">
                         {eachDayOfInterval({ 
                           start: startOfWeek(startOfMonth(currentMonth)), 
                           end: endOfWeek(endOfMonth(currentMonth)) 
                         }).map((day, i) => {
                           const isCurrentMonth = isSameMonth(day, currentMonth);
                           const isPast = (day as any) < new Date().setHours(0, 0, 0, 0);
                           const isSelected = selectedDate && isSameDay(day, selectedDate);
                           return (
                             <button
                               key={i}
                               disabled={isPast || !isCurrentMonth}
                               onClick={() => { setSelectedDate(day); setSelectedTime(null); }}
                               className={`
                                 aspect-square rounded-lg text-sm flex items-center justify-center transition-all
                                 ${!isCurrentMonth ? 'opacity-0 pointer-events-none' : ''}
                                 ${isPast ? 'text-slate-300 pointer-events-none' : 'hover:bg-[#0F1A2B] hover:text-white text-[#0F1A2B] font-medium'}
                                 ${isSelected ? 'bg-[#0F1A2B] text-white shadow-lg' : ''}
                                 ${isToday(day) && !isSelected ? 'border border-[#A87A35] text-[#A87A35]' : ''}
                               `}
                             >
                               {format(day, "d")}
                             </button>
                           )
                         })}
                       </div>
                    </div>

                    <div className="flex flex-col">
                      <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-[#E3E8EF] flex-grow">
                        <h5 className="font-bold mb-4 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#A87A35]" />
                          {selectedDate ? format(selectedDate, "EEEE, MMM d") : "Select a date"}
                        </h5>
                        {selectedDate ? (
                          isLoadingSlots ? (
                            <div className="h-40 flex items-center justify-center"><div className="w-6 h-6 border-2 border-[#0F1A2B] border-t-transparent rounded-full animate-spin"></div></div>
                          ) : availableSlots.length > 0 ? (
                            <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-2 custom-scrollbar">
                              {availableSlots.map(time => (
                                <button
                                  key={time}
                                  onClick={() => setSelectedTime(time)}
                                  className={`py-3 px-2 rounded-xl border text-xs font-bold transition-all ${
                                    selectedTime === time ? 'bg-[#0F1A2B] text-white border-[#0F1A2B]' : 'bg-white border-slate-100 hover:border-[#E3E8EF]'
                                  }`}
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                          ) : <p className="text-sm text-[#6B7283]">No slots available.</p>
                        ) : <p className="text-sm text-[#6B7283]">Pick a date to see times.</p>}
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 flex gap-4">
                    <button onClick={() => setStep(1)} className="px-8 py-5 border-2 border-slate-100 text-[#6B7283] font-bold rounded-2xl hover:bg-slate-50 transition-colors">Back</button>
                    <button 
                      onClick={() => setStep(3)}
                      disabled={!selectedDate || !selectedTime}
                      className="flex-grow py-5 bg-[#0F1A2B] text-white font-bold rounded-2xl hover:bg-[#1B2A40] transition-colors disabled:opacity-50"
                    >
                      Enter Your Details
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <form onSubmit={handleFormSubmit} className="animate-in fade-in duration-500">
                  <div className="flex items-center justify-between mb-8">
                    <h4 className="text-xl font-bold">Contact & Location</h4>
                    <button type="button" onClick={() => setStep(2)} className="text-sm font-bold text-[#A87A35] hover:underline">Change Time</button>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-2">
                       <label className="text-xs font-extrabold uppercase tracking-widest text-[#6B7283]">Full Name</label>
                       <div className="grid grid-cols-2 gap-2">
                         <input required name="firstName" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} placeholder="First" className="w-full p-4 rounded-xl border border-slate-100 focus:border-[#0F1A2B] focus:ring-0 outline-none bg-[#F8FAFC]" />
                         <input required name="lastName" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} placeholder="Last" className="w-full p-4 rounded-xl border border-slate-100 focus:border-[#0F1A2B] focus:ring-0 outline-none bg-[#F8FAFC]" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-extrabold uppercase tracking-widest text-[#6B7283]">Email Address</label>
                       <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="email@example.com" className="w-full p-4 rounded-xl border border-slate-100 focus:border-[#0F1A2B] focus:ring-0 outline-none bg-[#F8FAFC]" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-extrabold uppercase tracking-widest text-[#6B7283]">Phone Number</label>
                       <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="(980) 000-0000" className="w-full p-4 rounded-xl border border-slate-100 focus:border-[#0F1A2B] focus:ring-0 outline-none bg-[#F8FAFC]" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-extrabold uppercase tracking-widest text-[#6B7283]">Appointment Location</label>
                       <input required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="Street address, City, ZIP" className="w-full p-4 rounded-xl border border-slate-100 focus:border-[#0F1A2B] focus:ring-0 outline-none bg-[#F8FAFC]" />
                    </div>
                    <div className="sm:col-span-2 space-y-2">
                       <label className="text-xs font-extrabold uppercase tracking-widest text-[#6B7283]">Notes / Message</label>
                       <textarea value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} placeholder="Any special instructions or document details?" className="w-full p-4 rounded-xl border border-slate-100 focus:border-[#0F1A2B] focus:ring-0 outline-none bg-[#F8FAFC] h-24 resize-none" />
                    </div>
                  </div>

                  {submitError && <div className="p-4 bg-red-50 text-red-600 rounded-xl mb-6 text-sm font-bold">{submitError}</div>}

                  <div className="p-6 bg-[#0F1A2B]/5 rounded-2xl mb-10 text-xs text-[#6B7283] flex gap-3 italic">
                    <Shield className="w-5 h-5 shrink-0 text-[#A87A35]" />
                    Privacy Note: Your information is only used to respond to your appointment request.
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-6 bg-[#0F1A2B] text-white font-extrabold text-xl rounded-2xl hover:bg-[#1B2A40] transition-all shadow-2xl shadow-[#0F1A2B]/20 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isSubmitting ? "Requesting..." : "Send Appointment Request"}
                    {!isSubmitting && <ArrowRight className="w-6 h-6" />}
                  </button>
                </form>
              )}

              {step === 4 && (
                <div className="text-center py-12 animate-in zoom-in-95 duration-500">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-extrabold mb-4">Request Sent!</h3>
                  <p className="text-lg text-[#6B7283] mb-8 font-medium">Thank you, {formData.firstName}. We'll review your request for <span className="text-[#0F1A2B]">{selectedDate && format(selectedDate, "MMM d")} at {selectedTime}</span> and contact you shortly.</p>
                  <button onClick={() => setStep(1)} className="px-10 py-4 border-2 border-[#0F1A2B] text-[#0F1A2B] font-bold rounded-xl hover:bg-[#0F1A2B] hover:text-white transition-all">Make Another Request</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS SECTION */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="What our clients say" />
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl border border-[#E3E8EF] relative">
                <MessageSquare className="absolute top-8 right-8 w-8 h-8 text-[#E3E8EF]" />
                <div className="flex gap-1 mb-6 text-[#A87A35]">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-lg mb-8 italic leading-relaxed text-[#0F1A2B]">"{t.quote}"</p>
                <p className="font-extrabold uppercase tracking-widest text-[#A87A35] text-xs">{t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeading title="Frequently Asked Questions" />
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-[#E3E8EF] rounded-2xl overflow-hidden shadow-sm">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-extrabold text-[#0F1A2B] text-lg">{faq.question}</span>
                  {activeFaq === i ? <ChevronUp className="w-6 h-6 text-[#A87A35]" /> : <ChevronDown className="w-6 h-6 text-[#A87A35]" />}
                </button>
                {activeFaq === i && (
                  <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-200">
                    <p className="text-[#6B7283] leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FINAL CTA SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-[#0F1A2B] rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#A87A35] opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">Need a notary today?</h2>
              <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                We're standing by to assist with your most critical appointments. Secure, professional, and reliable mobile service across the Charlotte metro.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button 
                  onClick={() => scrollToForm()}
                  className="px-10 py-5 bg-[#A87A35] text-white font-extrabold text-xl rounded-2xl hover:bg-[#8e672d] transition-all shadow-xl shadow-[#A87A35]/20"
                >
                  Book an appointment
                </button>
                <a 
                  href="tel:9803724103" 
                  className="px-10 py-5 border-2 border-white/20 text-white font-extrabold text-xl rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                >
                  <Phone className="w-6 h-6" /> (980) 372-4103
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. FOOTER */}
      <footer className="bg-[#0F1A2B] pt-20 pb-10 text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12 mb-20">
          <div>
            <div className="flex items-center gap-2 mb-8 scale-110 origin-left">
              <Logo className="h-10 w-auto" />
              <span className="font-serif font-bold text-2xl">Integrity Closings CLT</span>
            </div>
            <p className="text-slate-400 mb-8 max-w-xs leading-relaxed font-medium">
              Professional mobile notary, loan signing, and estate planning support available at your location across the Charlotte and Mint Hill area.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-[#A87A35] mb-8">Contact & Location</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-[#A87A35]" />
                <div>
                  <a href="tel:9803724103" className="text-xl font-bold hover:text-[#A87A35] transition-colors">(980) 372-4103</a>
                  <p className="text-xs text-slate-500 mt-1 font-bold">Call or Text for appointments</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[#A87A35]" />
                <div>
                  <p className="text-lg font-bold">Charlotte / Mint Hill Area</p>
                  <p className="text-xs text-slate-500 mt-1 font-bold uppercase tracking-tighter">Serving Mecklenburg & Cabarrus Counties</p>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-[#A87A35] mb-8">Quick Links</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Link to="/" className="block text-sm font-bold text-slate-400 hover:text-white transition-colors">Home</Link>
                <Link to="/about" className="block text-sm font-bold text-slate-400 hover:text-white transition-colors">About Us</Link>
                <Link to="/blog" className="block text-sm font-bold text-slate-400 hover:text-white transition-colors">Latest Posts</Link>
                <Link to="/areas-served" className="block text-sm font-bold text-slate-400 hover:text-white transition-colors">Areas Served</Link>
              </div>
              <div className="space-y-4">
                <button onClick={() => scrollToForm()} className="block text-sm font-bold text-slate-400 hover:text-white transition-colors text-left">Book Now</button>
                <Link to="/faq" className="block text-sm font-bold text-slate-400 hover:text-white transition-colors">Help Center</Link>
                <Link to="/privacy-policy" className="block text-sm font-bold text-slate-400 hover:text-white transition-colors">Policy</Link>
                <Link to="/disclaimer" className="block text-sm font-bold text-slate-400 hover:text-white transition-colors">Disclaimer</Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Integrity Closings CLT. Notary services are not legal advice.
          </p>
          <div className="flex gap-4">
            <span className="text-[10px] bg-white/5 border border-white/10 px-3 py-1 rounded-full text-slate-500 font-extrabold uppercase whitespace-nowrap">NNA Certified</span>
            <span className="text-[10px] bg-white/5 border border-white/10 px-3 py-1 rounded-full text-slate-500 font-extrabold uppercase whitespace-nowrap">E&O Insured</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
