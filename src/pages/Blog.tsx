import { BookOpen, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Blog() {
  const posts = [
    {
      title: 'Hospital Notary Services in Charlotte',
      slug: 'hospital-notary-services-charlotte',
      date: 'April 30, 2026',
      excerpt: 'When a loved one is in the hospital, the last thing you want to worry about is legal paperwork. Learn why a specialized hospital notary is essential for Power of Attorney and healthcare directives.',
      imageUrl: 'https://cdn.marblism.com/Ie0zTHtmFKR.webp'
    },
    {
      title: 'Charlotte, NC Remote Closings: How Mobile Notaries Help Buyers',
      slug: 'charlotte-nc-remote-closings-how-mobile-notaries-help-buyers',
      date: 'April 17, 2026',
      excerpt: 'Tired of Charlotte traffic? Learn how mobile notaries bring the home closing process to your kitchen table, making your next real estate move simple and stress-free.',
      imageUrl: 'https://cdn.marblism.com/S2zi-vf5vHv.webp'
    },
    {
      title: '5 Documents You Should Have Notarized Before You Turn 50',
      slug: '5-documents-notarized-before-50',
      date: 'April 9, 2026',
      excerpt: 'Turning 50 is a significant milestone. It is often a time of reflection, celebration, and, most importantly, proactive planning. While you are likely focused on your career peak or looking ahead toward retirement, there is a critical set of "housekeeping" tasks that often get pushed to the back burner: estate planning and legal protection.',
      imageUrl: 'https://cdn.marblism.com/hkSJJN7zxUI.webp'
    },
    {
      title: 'Settlement vs. Closing: Why You Won\'t Get Your Keys at the Signing Table in North Carolina',
      slug: 'settlement-vs-closing-nc-real-estate',
      date: 'April 1, 2026',
      excerpt: 'You have spent weeks, perhaps months, navigating the North Carolina real estate market. You have toured dozens of homes, survived the "Due Diligence" period, and finalized your mortgage. Now, the big day is here: Closing Day...',
      imageUrl: 'https://cdn.marblism.com/bMA7PAb3_YS.webp'
    },
    {
      title: 'Navigating the North Carolina Remote Electronic Notarization Act (RENA): What to Expect in 2025',
      slug: 'navigating-nc-rena-2025',
      date: 'March 27, 2026',
      excerpt: 'For years, the way you notarize documents in North Carolina has been in a state of transition. From the traditional pen-and-paper methods to the temporary "emergency" video measures introduced during the pandemic, the landscape has been shifting beneath our feet.',
      imageUrl: 'https://cdn.marblism.com/HhH2JJOzWG0.webp'
    },
    {
      title: '7 Mistakes Charlotte Sellers Make with Closings (And How Mobile Notary Services Fix Them)',
      slug: '7-mistakes-charlotte-sellers-make-with-closings',
      date: 'March 18, 2026',
      excerpt: 'Selling your Charlotte home should be exciting, not stressful. Yet many sellers find themselves scrambling at the last minute because they\'ve made preventable mistakes during the closing process.',
      imageUrl: 'https://cdn.marblism.com/wylLzlbVBtP.webp'
    },
    {
      title: 'Charlotte Notary Public Secrets Revealed: What Experts Don\'t Want You to Know',
      slug: 'charlotte-notary-public-secrets-revealed',
      date: 'March 18, 2026',
      excerpt: 'You trust notaries public with your most important documents: mortgage papers, property deeds, legal agreements that can change your life. But what if that trust is misplaced?',
      imageUrl: 'https://cdn.marblism.com/VTuQliWOuxM.webp'
    },
    {
      title: 'The "DIY" Mortgage Loan Modification: How to Get Your Documents Notarized at Home in Charlotte',
      slug: 'diy-mortgage-loan-modification-notarized-at-home-charlotte',
      date: 'March 15, 2026',
      excerpt: 'You’ve spent months on the phone with your lender. You’ve sent in pay stubs, written hardship letters, and navigated the grueling trial period of a loan modification...',
      imageUrl: 'https://cdn.marblism.com/ygYtnHwZ_eT.webp'
    },
    {
      title: 'Why Your Refinance Demands a Specialized Loan Signing Agent',
      slug: 'why-your-refinance-demands-specialized-loan-signing-agent',
      date: 'March 15, 2026',
      excerpt: 'Opening a thick envelope from your mortgage lender can be daunting. Tucked between pages of complex legal terminology is often a simple directive...',
      imageUrl: 'https://cdn.marblism.com/Ko03CDvLN27.webp'
    },
    {
      title: '3 Reasons a Certified Loan Signing Agent is a Must for Your Mortgage Refinance',
      slug: 'certified-loan-signing-agent-mortgage-refinance',
      date: 'March 15, 2026',
      excerpt: 'You hear a heavy "thud" on your front porch. You open the door to find a thick FedEx envelope—your mortgage refinance or loan modification documents...',
      imageUrl: 'https://cdn.marblism.com/5NFgiVVQnUQ.webp'
    },
    {
      title: 'Struggling with Loan Mod Paperwork? How a Mobile Notary Makes the Final Step Stress-Free',
      slug: 'struggling-with-loan-mod-paperwork',
      date: 'March 7, 2026',
      excerpt: 'You’ve been through the ringer. You’ve spent weeks, perhaps months, going back and forth with your lender, submitting pay stubs, tax returns, and letters of explanation...',
      imageUrl: 'https://cdn.marblism.com/AV3NIamNct8.webp'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Image Section */}
      <div className="w-full h-[250px] md:h-[400px] overflow-hidden relative bg-slate-900">
        <img 
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1920" 
          alt="Integrity Closings Blog Hero" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Blog Header Content */}
      <div className="bg-white py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-serif">Insights & Expert Advice</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Helpful articles, guides, and insights about notary services, loan signings, and more.
          </p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {posts.map((post, index) => (
            <Link 
              key={index} 
              to={`/blog/${post.slug}`}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow group flex flex-col"
            >
              <div className="aspect-w-16 aspect-h-9 relative h-64 overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center text-slate-500 text-sm mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  {post.date}
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors font-serif">
                  {post.title}
                </h2>
                <p className="text-slate-600 mb-6 flex-grow">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                  Read Article <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
