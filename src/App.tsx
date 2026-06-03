/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AIChatbot from './components/AIChatbot';
import WelcomePopup from './components/WelcomePopup';
import Home from './pages/Home';
import MobileNotaryServices from './pages/MobileNotaryServices';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import AfterHoursNotary from './pages/AfterHoursNotary';
import Contact from './pages/Contact';
import EstateNotary from './pages/EstateNotary';
import HospitalNotary from './pages/HospitalNotary';
import LoanSigningAgent from './pages/LoanSigningAgent';
import GeneralNotary from './pages/GeneralNotary';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Disclaimer from './pages/Disclaimer';
import FAQPage from './pages/FAQPage';
import QuoteCalculator from './pages/QuoteCalculator';
import Resources from './pages/Resources';
import Booking from './pages/Booking';
import BookLanding from './pages/BookLanding';

// Resource Articles
import AcknowledgmentVsJurat from './pages/resources/AcknowledgmentVsJurat';
import AcceptableIdNc from './pages/resources/AcceptableIdNc';
import WhatIsMobileNotary from './pages/resources/WhatIsMobileNotary';

// New Service Pages
import BusinessDocuments from './pages/services/BusinessDocuments';
import FinancialDocuments from './pages/services/FinancialDocuments';
import LegalDocuments from './pages/services/LegalDocuments';
import RealEstateDocuments from './pages/services/RealEstateDocuments';
import SpecialConsiderations from './pages/services/SpecialConsiderations';
import MiscellaneousDocuments from './pages/services/MiscellaneousDocuments';
import LenderProvidedDocuments from './pages/services/LenderProvidedDocuments';
import PowerOfAttorneyEstateDocuments from './pages/services/PowerOfAttorneyEstateDocuments';

// Location Pages
import Charlotte from './pages/locations/Charlotte';
import Concord from './pages/locations/Concord';
import Gastonia from './pages/locations/Gastonia';
import Salisbury from './pages/locations/Salisbury';
import Monroe from './pages/locations/Monroe';
import Matthews from './pages/locations/Matthews';
import Midland from './pages/locations/Midland';
import Locust from './pages/locations/Locust';
import MintHillLoanSigning from './pages/locations/MintHillLoanSigning';
import MatthewsLoanSigning from './pages/locations/MatthewsLoanSigning';
import ConcordLoanSigning from './pages/locations/ConcordLoanSigning';
import CabarrusCountyLoanSigning from './pages/locations/CabarrusCountyLoanSigning';
import UnionCountyLoanSigning from './pages/locations/UnionCountyLoanSigning';
import TitleAttorneySupport from './pages/TitleAttorneySupport';
import AreasServed from './pages/AreasServed';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/book';

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {!isLandingPage && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<BookLanding />} />
          <Route path="/mobile-notary-charlotte-nc" element={<MobileNotaryServices />} />
            
            {/* Detailed Service Pages */}
            <Route path="/estate-planning-notary-charlotte-nc" element={<EstateNotary />} />
            <Route path="/services/business-documents" element={<BusinessDocuments />} />
            <Route path="/services/financial-documents" element={<FinancialDocuments />} />
            <Route path="/services/legal-documents" element={<LegalDocuments />} />
            <Route path="/services/real-estate-documents" element={<RealEstateDocuments />} />
            <Route path="/services/special-considerations" element={<SpecialConsiderations />} />
            <Route path="/services/miscellaneous-documents" element={<MiscellaneousDocuments />} />
            <Route path="/services/hospitals-nursing-homes" element={<HospitalNotary />} />
            <Route path="/services/lender-provided-documents" element={<LenderProvidedDocuments />} />
            <Route path="/power-of-attorney-estate-documents-charlotte-nc" element={<PowerOfAttorneyEstateDocuments />} />

            {/* Location Pages */}
            <Route path="/areas-served" element={<AreasServed />} />
            <Route path="/locations/charlotte" element={<Charlotte />} />
            <Route path="/locations/concord" element={<Concord />} />
            <Route path="/locations/gastonia" element={<Gastonia />} />
            <Route path="/locations/locust" element={<Locust />} />
            <Route path="/locations/matthews" element={<Matthews />} />
            <Route path="/locations/midland" element={<Midland />} />
            <Route path="/locations/monroe" element={<Monroe />} />
            <Route path="/locations/salisbury" element={<Salisbury />} />
            <Route path="/locations/mint-hill-loan-signing-agent" element={<MintHillLoanSigning />} />
            <Route path="/locations/matthews-loan-signing-agent" element={<MatthewsLoanSigning />} />
            <Route path="/locations/concord-loan-signing-agent" element={<ConcordLoanSigning />} />
            <Route path="/locations/cabarrus-county-loan-signing-agent" element={<CabarrusCountyLoanSigning />} />
            <Route path="/locations/union-county-loan-signing-agent" element={<UnionCountyLoanSigning />} />
            <Route path="/title-company-attorney-closing-support-charlotte-nc" element={<TitleAttorneySupport />} />

            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/acknowledgment-vs-jurat" element={<AcknowledgmentVsJurat />} />
            <Route path="/resources/acceptable-id-nc" element={<AcceptableIdNc />} />
            <Route path="/resources/what-is-mobile-notary" element={<WhatIsMobileNotary />} />
            <Route path="/calculator" element={<QuoteCalculator />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/after-hours-mobile-notary-charlotte-nc" element={<AfterHoursNotary />} />
            <Route path="/estate-notary-charlotte-nc" element={<EstateNotary />} />
            <Route path="/hospital-notary-charlotte-nc" element={<HospitalNotary />} />
            <Route path="/loan-signing-agent-charlotte-nc" element={<LoanSigningAgent />} />
            <Route path="/general-notary-charlotte-nc" element={<GeneralNotary />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
          </Routes>
        </main>
        {!isLandingPage && <Footer />}
        {!isLandingPage && <AIChatbot />}
        {!isLandingPage && <WelcomePopup />}
      </div>
  );
}
