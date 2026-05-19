import { Link } from 'react-router-dom';

export default function Locations() {
  const locations = [
    {
      city: 'Charlotte',
      areas: 'Mint Hill, Huntersville, Cornelius, Davidson, Matthews, Pineville, Uptown and Downtown',
      image: '/charlotte.jpg',
      link: '/locations/charlotte'
    },
    {
      city: 'Concord',
      areas: 'China Grove, Kannapolis, Harrisburg, Mount Pleasant, Midland, Locust',
      image: '/concord.jpg',
      link: '/locations/concord-loan-signing-agent'
    },
    {
      city: 'Mint Hill',
      areas: 'Brighton Park, Farmwood, Olde Sycamore, Summerwood, Fairview Road',
      image: '/mint-hill.jpg',
      link: '/locations/mint-hill-loan-signing-agent'
    },
    {
      city: 'Gastonia',
      areas: 'Belmont, Mount Holly, Dallas, Bessemer City, Lowell, Stanley',
      image: '/gastiona.png',
      link: '/locations/gastonia'
    },
    {
      city: 'Salisbury',
      areas: 'China Grove, Faith, Rockwell, Spencer, Granite Quarry',
      image: '/salisbury-nc.jpg',
      link: '/locations/salisbury'
    },
    {
      city: 'Monroe',
      areas: 'Waxhaw, Indian Trail, Weddington, Stallings, Wesley Chapel, Marshville, Wingate',
      image: '/monroe-1.jpg',
      link: '/locations/monroe'
    },
    {
      city: 'Matthews',
      areas: 'Waxhaw, Indian Trail, Weddington, Stallings, Wesley Chapel, Mint Hill',
      image: '/matthews-1.jpg',
      link: '/locations/matthews-loan-signing-agent'
    }
  ];

  return (
    <section id="locations" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Mobile Notary Services in Charlotte, NC and Nearby Areas</h2>
          <p className="mt-4 text-lg text-slate-600">We proudly serve Charlotte, Matthews, Mint Hill, Concord, Pineville, Monroe, and surrounding areas. If you're searching for a mobile notary near you, we come directly to your location.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((loc, index) => (
            <Link key={index} to={loc.link} className="group flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="h-48 w-full overflow-hidden bg-slate-200">
                <img 
                  src={loc.image} 
                  alt={`${loc.city}, NC`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{loc.city}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">{loc.areas}</p>
                <span className="text-blue-600 font-medium inline-flex items-center group-hover:text-blue-800 transition-colors">
                  View Service Area &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
