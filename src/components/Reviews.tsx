import { Star } from 'lucide-react';

export default function Reviews() {
  const reviews = [
    {
      name: "Sarah Jenkins",
      date: "2 weeks ago",
      text: "Incredibly professional and arrived right on time. Made the loan closing process so easy! Highly recommend their mobile notary services.",
      initial: "S",
      color: "bg-purple-500"
    },
    {
      name: "Michael T.",
      date: "1 month ago",
      text: "Needed a notary at the hospital last minute for my father. They were compassionate, quick, and very helpful during a stressful time.",
      initial: "M",
      color: "bg-blue-500"
    },
    {
      name: "David Chen",
      date: "2 months ago",
      text: "Great communication and very convenient. They came right to my office in Uptown Charlotte. Will definitely use them again.",
      initial: "D",
      color: "bg-emerald-500"
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">What Our Clients Say</h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="text-lg font-semibold text-slate-700">Excellent</span>
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="text-lg text-slate-600">5.0 out of 5</span>
          </div>
          <p className="mt-2 text-slate-500">Based on Google Reviews</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl ${review.color}`}>
                  {review.initial}
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-slate-900">{review.name}</h3>
                  <p className="text-sm text-slate-500">{review.date}</p>
                </div>
                <div className="ml-auto">
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed">"{review.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
