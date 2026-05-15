import CityPageLayout from '../../components/CityPageLayout';
import { FileSignature, FileText, Laptop, Clock, HeartPulse, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Concord() {
  return (
    <CityPageLayout
      city="Concord"
      image="https://images.unsplash.com/photo-1580655653885-65763b2597d0?auto=format&fit=crop&q=80&w=1920"
      introText={
        <>
          Searching for a <strong>mobile notary in Concord, NC</strong>? Integrity Closings CLT provides professional general notary services throughout Cabarrus County. We meet you at your convenience—at home, at work, or a local Concord landmark—to notarize your legal paperwork quickly and securely.
          <br /><br />
          <em>Closing on a home?</em> Please see our <Link to="/locations/concord-loan-signing-agent" className="text-blue-600 font-bold hover:underline">Concord Loan Signing Agent</Link> page for specialized mortgage document facilitation.
        </>
      }
      services={[
        {
          title: "Loan Signing Specialty",
          description: <>Specialized mortgage closing facilitation for lenders and borrowers. Visit our <Link to="/locations/concord-loan-signing-agent" className="text-blue-600 font-bold hover:underline">Concord Loan Signing</Link> page.</>,
          icon: <FileSignature className="w-6 h-6 text-blue-600" />,
          link: "/locations/concord-loan-signing-agent"
        },
        {
          title: "Estate Planning Notary",
          description: <>Secure notarization for Power of Attorney (POA), Wills, and Trusts. We are happy to meet at local landmarks such as <strong>Cabarrus Brewing Company</strong> or the <strong>Concord Library</strong>.</>,
          icon: <FileText className="w-6 h-6 text-blue-600" />,
          link: "/estate-notary-charlotte-nc"
        },
        {
          title: "Hospital & Nursing Home",
          description: <>Compassionate bedside notary services for medical POAs and living wills for patients at <strong>Atrium Health Cabarrus</strong> and surrounding medical offices.</>,
          icon: <HeartPulse className="w-6 h-6 text-blue-600" />,
          link: "/hospital-notary-charlotte-nc"
        },
        {
          title: "After Hours Notary",
          description: <>Available for late-night and weekend signings in <strong>Coddle Creek, Roberta Mill</strong>, and across the Concord area when standard offices are closed.</>,
          icon: <Clock className="w-6 h-6 text-blue-600" />,
          link: "/after-hours-mobile-notary-charlotte-nc"
        },
        {
          title: "General Notary Services",
          description: <>Quick and accurate notarization for affidavits, vehicle titles, and school forms. Serving all of <strong>Cabarrus County</strong> with mobile convenience.</>,
          icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
          link: "/general-notary-charlotte-nc"
        },
        {
          title: "Business & Corporate",
          description: <>Mobile notary support for business contracts and employment paperwork. We meet you at your office or <strong>Concord Mills</strong> area businesses.</>,
          icon: <Laptop className="w-6 h-6 text-blue-600" />,
          link: "/services/business-documents"
        }
      ]}
      hospitalsIntro="Legal matters don't stop for medical emergencies. We provide compassionate, mobile notary services to patients and families at the primary healthcare hubs in the Concord area:"
      hospitals={[
        {
          name: "Atrium Health Cabarrus",
          location: "Concord, NC",
          description: <>We provide bedside notary services for medical POAs, living wills, and other urgent documents for patients at Atrium Health near <strong>Carolina Mall</strong>.</>
        },
        {
          name: "Gateway Surgery Center",
          location: "Concord, NC",
          description: <>Conveniently serving the surgical center and surrounding medical offices. We offer flexible scheduling to meet you or your loved ones when it matters most.</>
        }
      ]}
      additionalLocations={[
        "Charlotte Motor Speedway",
        "Concord Mills Mall",
        "Great Wolf Lodge Water Park",
        "Frank Liske Park",
        "Historic Cabarrus County Courthouse",
        "Zmax Dragway",
        "Concord Regional Airport",
        "Cabarrus Arena & Events Center",
        "Gibson Mill",
        "Carolina Mall Area"
      ]}
      faqs={[
        {
          question: "Do you offer mobile notary services near Concord Mills?",
          answer: "Yes! We frequently serve the Concord Mills area, including the surrounding business parks and residential neighborhoods like Christie's Crossing."
        },
        {
          question: "Can you meet me at the Charlotte Motor Speedway?",
          answer: "Absolutely. We can meet you at the Speedway, Zmax Dragway, or any of the surrounding hotels and corporate offices for your notarization needs."
        },
        {
          question: "Are you available for after-hours notary in Concord?",
          answer: "Yes, we offer 24/7 emergency mobile notary services in Concord. Whether it's a late-night hospital signing or a weekend real estate closing, we are here to help."
        },
        {
          question: "How do I book a mobile notary in Concord?",
          answer: "You can book directly through our website's booking tool or call/text us at 980-372-4103 for immediate assistance."
        }
      ]}
      mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51965.41904712348!2d-80.64166255136719!3d35.40263590000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885404566735661d%3A0x884650e6bfde5145!2sConcord%2C%20NC!5e0!3m2!1sen!2sus!4v1712874300000!5m2!1sen!2sus"
    />
  );
}
