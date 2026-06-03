import CityPageLayout from '../../components/CityPageLayout';
import { FileSignature, FileText, Laptop, Clock, ShieldCheck, HeartPulse } from 'lucide-react';

export default function Charlotte() {
  return (
    <CityPageLayout
      city="Charlotte"
      image="https://images.unsplash.com/photo-1559530075-006499996884?auto=format&fit=crop&q=80&w=1920"
      introText={
        <>
          As the premier <strong>mobile notary in Charlotte, NC</strong>, Integrity Closings CLT provides professional, on-demand notarization services across the entire Queen City. Whether you're finalizing a corporate merger in <strong>Uptown</strong>, signing medical directives near <strong>Atrium Health Main</strong>, or closing on a new home in <strong>Ballantyne</strong>, we bring the notary office directly to your location. Skip the Charlotte traffic and let us handle your important documents with the precision and integrity you deserve.
        </>
      }
      services={[
        {
          title: "Loan Signing Services",
          description: <>Expert handling of mortgage refinances, HELOCs, and seller packages. We work with title companies and lenders to ensure error-free closings in neighborhoods like <strong>Myers Park, SouthPark, and Dilworth</strong>.</>,
          icon: <FileSignature className="w-6 h-6 text-blue-600" />,
          link: "/loan-signing-agent-charlotte-nc"
        },
        {
          title: "Estate Planning Notary",
          description: <>Secure notarization for Wills, Trusts, and Power of Attorney documents. We provide mobile service to your home or office in <strong>South End, NoDa, and Plaza Midwood</strong>.</>,
          icon: <FileText className="w-6 h-6 text-blue-600" />,
          link: "/estate-notary-charlotte-nc"
        },
        {
          title: "Hospital & Nursing Home",
          description: <>Compassionate bedside notary services for medical directives and urgent legal papers at <strong>Novant Health</strong> and <strong>Atrium Health</strong> facilities throughout Charlotte.</>,
          icon: <HeartPulse className="w-6 h-6 text-blue-600" />,
          link: "/hospital-notary-charlotte-nc"
        },
        {
          title: "After Hours & Emergency",
          description: <>Need a notary late at night or on the weekend? We offer 24/7 emergency mobile notary services for urgent matters across <strong>Mecklenburg County</strong>.</>,
          icon: <Clock className="w-6 h-6 text-blue-600" />,
          link: "/after-hours-mobile-notary-charlotte-nc"
        },
        {
          title: "General Notary Services",
          description: <>Fast and reliable notarization for affidavits, I-9 verifications, minor travel consents, and vehicle titles. We meet you at any <strong>Charlotte</strong> location.</>,
          icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
          link: "/general-notary-charlotte-nc"
        },
        {
          title: "Business & Corporate",
          description: <>Professional notary support for corporate contracts, NDAs, and employment documents. Serving businesses in <strong>Uptown</strong> and the <strong>University City</strong> area.</>,
          icon: <Laptop className="w-6 h-6 text-blue-600" />,
          link: "/services/business-documents"
        }
      ]}
      hospitalsIntro="We understand that legal needs often arise during medical challenges. We provide prompt, professional mobile notary services to patients and families at Charlotte's leading medical centers:"
      hospitals={[
        {
          name: "Atrium Health Carolinas Medical Center",
          location: "Charlotte, NC (Uptown/Midtown)",
          description: <>Providing bedside notarization for medical POAs, living wills, and financial documents for patients at the region's flagship hospital.</>
        },
        {
          name: "Novant Health Presbyterian Medical Center",
          location: "Charlotte, NC (Elizabeth)",
          description: <>Reliable mobile notary service for patients and staff, available for urgent signings and routine estate planning needs.</>
        }
      ]}
      additionalLocations={[
        "Uptown Charlotte Corporate Offices",
        "Charlotte Douglas International Airport (CLT)",
        "Bank of America Stadium",
        "SouthPark Mall Area",
        "University City / UNC Charlotte",
        "The Arboretum Shopping Center",
        "Steele Creek / Rivergate",
        "Northgate / North Croft",
        "Freedom Park",
        "NASCAR Hall of Fame"
      ]}
      faqs={[
        {
          question: "How much does a mobile notary in Charlotte cost?",
          answer: "Our fees consist of the North Carolina statutory notary fee per signature plus a travel fee based on your specific location in Charlotte and the time of day. Contact us for a precise quote."
        },
        {
          question: "Can you meet me at Charlotte Douglas Airport (CLT)?",
          answer: "Yes! We frequently meet clients at CLT airport for urgent travel consents, business contracts, and other time-sensitive documents."
        },
        {
          question: "Do you offer same-day notary appointments in Charlotte?",
          answer: "Absolutely. We specialize in same-day and emergency mobile notary services. We can often be at your location within 60-90 minutes depending on traffic."
        },
        {
          question: "What do I need to have ready for the notary?",
          answer: "You must have a valid, government-issued photo ID (like a driver's license or passport) and the document must be complete (no blank spaces) but unsigned until the notary is present."
        }
      ]}
      mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d208648.4014165584!2d-81.01211754020358!3d35.20307424683526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88541fc4fc381a81%3A0x884650e6bfde5145!2sCharlotte%2C%20NC!5e0!3m2!1sen!2sus!4v1712874200000!5m2!1sen!2sus"
    />
  );
}
