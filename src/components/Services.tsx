export default function Services() {
  const services = [
    {
      title: 'General Mobile Notary',
      description: 'Standard notarizations at your home, office, or preferred location across the metro area.',
      image: '/general-notary-work.png',
      link: '/general-notary-charlotte-nc'
    },
    {
      title: 'Hospital & Healthcare Notary',
      description: 'Compassionate, discreet notarizations for patients and caregivers at medical facilities.',
      image: '/hospital.png',
      link: '/hospital-notary-charlotte-nc'
    },
    {
      title: 'Estate Planning Documents',
      description: 'Secure notarization for wills, trusts, living wills, and advance directives.',
      image: '/personal-documents.png',
      link: '/estate-notary-charlotte-nc'
    },
    {
      title: 'After-Hours & Emergency Notary',
      description: 'Urgent evening and weekend appointments available when you need us most.',
      image: '/lender-sent-documents.png',
      link: '/after-hours-mobile-notary-charlotte-nc'
    },
    {
      title: 'Power of Attorney',
      description: 'Legally binding notarization for financial, medical, and general POAs.',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
      link: '/power-of-attorney-estate-documents-charlotte-nc'
    },
    {
      title: 'Loan Signing Agent',
      description: 'Professional mobile document signing support for real estate and mortgage appointments.',
      image: '/mobile-notary.jpg',
      link: '/loan-signing-agent-charlotte-nc'
    }
  ];

  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Our Services</h2>
          <p className="mt-4 text-lg text-slate-600">Professional mobile notary and signing services delivered directly to your location.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex flex-col">
              <div className="mb-6 w-full h-40 rounded-lg overflow-hidden bg-slate-100">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-600 mb-6 flex-grow">{service.description}</p>
              <a href={service.link} className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center mt-auto">
                Learn more &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
