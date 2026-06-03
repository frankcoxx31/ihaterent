import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (href: string) => {
    setIsOpen(false);
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/mobile-notary-charlotte-nc' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Resources', href: '/resources' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  const isHomePage = location.pathname === '/';
  const navBackground = isScrolled 
    ? 'bg-blue-950 shadow-md' 
    : (isHomePage ? 'bg-transparent' : 'bg-blue-950');

  return (
    <>
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${navBackground}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <Logo className="h-12 w-auto" textClassName="font-serif text-2xl font-bold text-white" />
              </Link>
            </div>
            
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavigation(link.href)}
                  className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-base font-bold transition-colors focus:outline-none"
                >
                  {link.name}
                </button>
              ))}
              <button 
                onClick={() => navigate('/booking')}
                className="flex items-center bg-white text-blue-950 px-6 py-2.5 rounded-full font-bold hover:bg-slate-100 transition-colors"
              >
                Book Now
              </button>
            </div>

            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-300 focus:outline-none"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden bg-blue-950 border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavigation(link.href)}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-bold text-white hover:text-blue-300 hover:bg-blue-900 focus:outline-none"
                >
                  {link.name}
                </button>
              ))}
              <button 
                onClick={() => navigate('/booking')}
                className="block w-full text-center mt-4 bg-white text-blue-950 px-4 py-3 rounded-full font-bold hover:bg-slate-100"
              >
                Book Now
              </button>
            </div>
          </div>
        )}
      </nav>
      {!isHomePage && <div className="h-20"></div>}
    </>
  );
}
