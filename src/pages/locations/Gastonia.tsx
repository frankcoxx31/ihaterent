import CityPageLayout from '../../components/CityPageLayout';
import { FileSignature, FileText, Laptop, Clock, HeartPulse, ShieldCheck } from 'lucide-react';

export default function Gastonia() {
  return (
    <CityPageLayout
      city="Gastonia"
      image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1920"
      introText={
        <>
          Need a <strong>mobile notary in Gastonia, NC</strong>? Integrity Closings CLT provides professional, on-demand notary services throughout Gaston County. Whether you're at a local coffee shop in the <strong>Historic District</strong>, a business near <strong>Franklin Square</strong>, or your own front door, we bring the notary office to you. We are committed to providing Gastonia residents with secure, accurate, and stress-free notarizations for all their legal and financial documents.
        </>
      }
      services={[
        {
          title: "Loan Signing Services",
          description: <>Expert handling of mortgages, refinances, HELOCs, and seller packages. We serve homeowners in neighborhoods like <strong>Loray Mill, Boogertown, and Ranlo</strong>.</>,
          icon: <FileSignature className="w-6 h-6 text-blue-600" />,
          link: "/loan-signing-agent-charlotte-nc"
        },
        {
          title: "Estate Planning Notary",
          description: <>Secure notarization for Power of Attorney (POA), Wills, and Trusts. We are happy to meet at local landmarks such as <strong>Schiele Museum</strong> or the <strong>Gaston County Public Library</strong>.</>,
          icon: <FileText className="w-6 h-6 text-blue-600" />,
          link: "/estate-notary-charlotte-nc"
        },
        {
          title: "Hospital & Nursing Home",
          description: <>Compassionate bedside notary services for medical POAs and living wills for patients at <strong>CaroMont Regional Medical Center</strong> and surrounding care facilities.</>,
          icon: <HeartPulse className="w-6 h-6 text-blue-600" />,
          link: "/hospital-notary-charlotte-nc"
        },
        {
          title: "After Hours Notary",
          description: <>Available for late-night and weekend signings near <strong>Crowders Mountain</strong> and across the Gastonia area when standard offices are closed.</>,
          icon: <Clock className="w-6 h-6 text-blue-600" />,
          link: "/after-hours-mobile-notary-charlotte-nc"
        },
        {
          title: "General Notary Services",
          description: <>Mobile notarization for affidavits, I-9 verifications, and vehicle titles. We meet you anywhere in <strong>Gastonia</strong> for your convenience.</>,
          icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
          link: "/general-notary-charlotte-nc"
        },
        {
          title: "Business & Corporate",
          description: <>Professional notary support for corporate contracts and employment documents. Serving businesses in the <strong>FUSE District</strong> and beyond.</>,
          icon: <Laptop className="w-6 h-6 text-blue-600" />,
          link: "/services/business-documents"
        }
      ]}
      hospitalsIntro="Legal matters don't stop for medical emergencies. We provide compassionate, mobile notary services to patients and families at the primary healthcare hubs in the Gastonia area:"
      hospitals={[
        {
          name: "CaroMont Regional Medical Center",
          location: "Gastonia, NC",
          description: <>We provide bedside notary services for medical POAs, living wills, and other urgent documents for patients at CaroMont near <strong>Court Drive</strong>.</>
        },
        {
          name: "Peak Resources Gastonia",
          location: "Gastonia, NC",
          description: <>Conveniently serving rehabilitation and nursing facilities. We offer flexible scheduling to meet you or your loved ones to handle important legal paperwork.</>
        }
      ]}
      additionalLocations={[
        "Crowders Mountain State Park",
        "Daniel Stowe Botanical Garden",
        "Rankin Lake Park",
        "Eastridge Mall",
        "FUSE District",
        "Spencer Mountain",
        "Gastonia Conference Center",
        "Loray Mill Historic District",
        "Lineberger Park",
        "Gaston County Courthouse"
      ]}
      faqs={[
        {
          question: "How quickly can a mobile notary get to Gastonia?",
          answer: "We can often have a notary at your location in Gastonia within 60-90 minutes, depending on current availability and traffic."
        },
        {
          question: "Do you offer notary services near Franklin Square?",
          answer: "Yes! We frequently serve the Franklin Square area, meeting clients at offices, restaurants, or their homes in the surrounding neighborhoods."
        },
        {
          question: "Can you notarize documents at CaroMont Regional Medical Center?",
          answer: "Absolutely. We frequently provide bedside notary services at CaroMont for medical directives, powers of attorney, and other urgent legal documents."
        },
        {
          question: "What are your hours for mobile notary in Gastonia?",
          answer: "We offer 24/7 mobile notary services by appointment. This includes evenings, weekends, and holidays to accommodate your busy schedule."
        }
      ]}
      mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52084.70014712348!2d-81.18333335136719!3d35.26263590000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8856977777777777%3A0x884650e6bfde5145!2sGastonia%2C%20NC!5e0!3m2!1sen!2sus!4v1712874400000!5m2!1sen!2sus"
    />
  );
}
