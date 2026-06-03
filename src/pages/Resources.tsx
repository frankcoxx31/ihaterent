import React from 'react';
import { FileText, Video, BookOpen, ExternalLink, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Resources() {
  const videos = [
    { 
      id: '1', 
      title: 'What to Expect at Your Notary Appointment', 
      embedUrl: 'https://www.youtube.com/embed/ouP6wfjwpS0',
      description: 'A quick overview of the notarization process and what you need to bring to your appointment.'
    },
    { 
      id: '2', 
      title: 'Understanding Loan Signing Documents', 
      embedUrl: 'https://www.youtube.com/embed/pL4dILfo6Cc',
      description: 'Learn about the most common documents you will encounter during a real estate closing.'
    },
    { 
      id: '3', 
      title: 'How to Prepare for a Real Estate Closing', 
      embedUrl: 'https://www.youtube.com/embed/4SMx-hCXTSk',
      description: 'Tips and tricks to ensure your real estate closing goes smoothly and without delays.'
    }
  ];

  const articles = [
    { 
      title: 'How Mobile Loan Signing Support Saves Your Closing Team Time', 
      description: 'See how mobile loan signing support helps Charlotte title companies and closing attorneys reduce delays and handle overflow filings.', 
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      link: '/blog/mobile-loan-signing-support-saves-closing-team-time'
    },
    { 
      title: '5 Documents You Should Have Notarized Before You Turn 50', 
      description: 'Turning 50 is a major milestone. Ensure your future is secure by having these 5 essential legal documents properly notarized.', 
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      link: '/blog/5-documents-notarized-before-50'
    },
    { 
      title: 'The Difference Between an Acknowledgment and a Jurat', 
      description: 'Learn about the two most common types of notarizations and when each is required for your legal documents.', 
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      link: '/resources/acknowledgment-vs-jurat'
    },
    { 
      title: 'Acceptable Forms of ID for Notarization in NC', 
      description: 'A comprehensive guide to the types of identification you can use for your mobile notary appointment in North Carolina.', 
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
      link: '/resources/acceptable-id-nc'
    },
    { 
      title: 'What is a Mobile Notary?', 
      description: 'Discover the benefits of using a mobile notary service and how it saves you time and hassle.', 
      icon: <ExternalLink className="w-6 h-6 text-blue-600" />,
      link: '/resources/what-is-mobile-notary'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Hero Section */}
      <div className="bg-blue-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">
            Notary Resources & Insights
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Helpful articles to guide you through the notarization process and understand your legal documents better.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Articles Section */}
        <div className="mb-20">
          <div className="flex items-center mb-8">
            <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-slate-900">Helpful Articles & Guides</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <Link to={article.link} key={index} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                  {article.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{article.title}</h3>
                <p className="text-slate-600 leading-relaxed flex-grow">
                  {article.description}
                </p>
                <div className="mt-6 flex items-center text-blue-600 font-semibold hover:text-blue-700">
                  Read Article <ExternalLink className="w-4 h-4 ml-2" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Videos Section */}
        <div className="mb-20">
          <div className="flex items-center mb-8">
            <Video className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-slate-900">Featured Videos</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div key={video.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 relative pb-[56.25%] bg-slate-200">
                  <iframe
                    src={video.embedUrl}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  ></iframe>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{video.title}</h3>
                  <p className="text-slate-600">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NC Secretary of State Resources */}
        <div>
          <div className="flex items-center mb-8">
            <ExternalLink className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-slate-900">NC Secretary of State Resources</h2>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
            <p className="text-slate-600 mb-8 text-lg">
              For official guidelines, verification, and consumer protection, please refer to the North Carolina Secretary of State's office.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a href="https://www.sosnc.gov/divisions/notary" target="_blank" rel="noopener noreferrer" className="flex items-start p-6 border border-slate-100 rounded-xl hover:border-blue-600 hover:shadow-md transition-all group">
                <div className="bg-blue-50 p-3 rounded-lg mr-4 group-hover:bg-blue-600 transition-colors">
                  <FileText className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">NC Notary Public Division</h3>
                  <p className="text-slate-600 text-sm">Official home for all North Carolina notary public information and regulations.</p>
                </div>
              </a>
              <a href="https://www.sosnc.gov/online_services/notary/find_a_notary" target="_blank" rel="noopener noreferrer" className="flex items-start p-6 border border-slate-100 rounded-xl hover:border-blue-600 hover:shadow-md transition-all group">
                <div className="bg-blue-50 p-3 rounded-lg mr-4 group-hover:bg-blue-600 transition-colors">
                  <BookOpen className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">Verify a NC Notary</h3>
                  <p className="text-slate-600 text-sm">Search the official database to verify the commission status of any NC notary.</p>
                </div>
              </a>
              <a href="https://www.sosnc.gov/divisions/notary/file_a_complaint" target="_blank" rel="noopener noreferrer" className="flex items-start p-6 border border-slate-100 rounded-xl hover:border-blue-600 hover:shadow-md transition-all group">
                <div className="bg-blue-50 p-3 rounded-lg mr-4 group-hover:bg-blue-600 transition-colors">
                  <FileText className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">File a Complaint</h3>
                  <p className="text-slate-600 text-sm">Information for consumers on how to report notary misconduct or fraud.</p>
                </div>
              </a>
              <a href="https://www.sosnc.gov/divisions/notary/e_notary" target="_blank" rel="noopener noreferrer" className="flex items-start p-6 border border-slate-100 rounded-xl hover:border-blue-600 hover:shadow-md transition-all group">
                <div className="bg-blue-50 p-3 rounded-lg mr-4 group-hover:bg-blue-600 transition-colors">
                  <ExternalLink className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">Electronic Notarization (eNotary)</h3>
                  <p className="text-slate-600 text-sm">Learn about the rules and requirements for electronic notarizations in NC.</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
