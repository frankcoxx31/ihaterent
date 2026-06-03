import CityPageLayout from '../../components/CityPageLayout';
import { FileSignature, FileText, Laptop, Clock, HeartPulse, ShieldCheck } from 'lucide-react';

export default function Salisbury() {
  return (
    <CityPageLayout
      city="Salisbury"
      image="https://images.unsplash.com/photo-1559530075-006499996884?auto=format&fit=crop&q=80&w=1920"
      introText={
        <>
          Looking for a <strong>mobile notary in Salisbury, NC</strong>? Integrity Closings CLT provides professional, on-demand notary services throughout Rowan County. Whether you are at a local coffee shop in the <strong>Historic District</strong>, a business near <strong>Innes Street</strong>, or your own front door, we bring the notary office to you. We specialize in handling sensitive legal documents and complex loan signings with the highest level of professionalism and integrity.
        </>
      }
      services={[
        {
          title: "Loan Signing Services",
          description: <>Expert handling of mortgages, refinances, HELOCs, and seller packages. We serve homeowners in neighborhoods like <strong>Fulton Heights, Brooklyn South Square, and Country Club</strong>.</>,
          icon: <FileSignature className="w-6 h-6 text-blue-600" />,
          link: "/loan-signing-agent-charlotte-nc"
        },
        {
          title: "Estate Planning Notary",
          description: <>Secure notarization for Power of Attorney (POA), Wills, and Trusts. We are happy to meet at local landmarks such as <strong>Bell Tower Green</strong> or the <strong>Rowan Public Library</strong>.</>,
          icon: <FileText className="w-6 h-6 text-blue-600" />,
          link: "/estate-notary-charlotte-nc"
        },
        {
          title: "Hospital & Nursing Home",
          description: <>Compassionate bedside notary services for medical POAs and living wills for patients at <strong>Novant Health Rowan</strong> and the <strong>VA Medical Center</strong>.</>,
          icon: <HeartPulse className="w-6 h-6 text-blue-600" />,
          link: "/hospital-notary-charlotte-nc"
        },
        {
          title: "After Hours Notary",
          description: <>Available for late-night and weekend signings in <strong>West Square</strong> and across the Salisbury area when standard offices are closed.</>,
          icon: <Clock className="w-6 h-6 text-blue-600" />,
          link: "/after-hours-mobile-notary-charlotte-nc"
        },
        {
          title: "General Notary Services",
          description: <>Fast and reliable notarization for affidavits, vehicle titles, and school forms. We meet you at any <strong>Salisbury</strong> location for your convenience.</>,
          icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
          link: "/general-notary-charlotte-nc"
        },
        {
          title: "Business & Corporate",
          description: <>Professional notary support for corporate contracts and employment documents. Serving businesses in the <strong>Innes Street</strong> shopping district.</>,
          icon: <Laptop className="w-6 h-6 text-blue-600" />,
          link: "/services/business-documents"
        }
      ]}
      hospitalsIntro="Legal matters don't stop for medical emergencies. We provide compassionate, mobile notary services to patients and families at the primary healthcare hubs in the Salisbury area:"
      hospitals={[
        {
          name: "Novant Health Rowan Medical Center",
          location: "Salisbury, NC",
          description: <>We provide bedside notary services for medical POAs, living wills, and other urgent documents for patients at Novant Health near <strong>Mocksville Ave</strong>.</>
        },
        {
          name: "W.G. (Bill) Hefner VA Medical Center",
          location: "Salisbury, NC",
          description: <>Conveniently serving our veterans and their families. We offer flexible scheduling to meet you or your loved ones at the VA Medical Center.</>
        }
      ]}
      additionalLocations={[
        "NC Transportation Museum",
        "Dan Nicholas Park",
        "Dr. Josephus Hall House",
        "Salisbury National Cemetery",
        "Catawba College",
        "Livingstone College",
        "Bell Tower Green Park",
        "Rowan County Courthouse",
        "Historic Salisbury Station",
        "Innes Street Shopping District"
      ]}
      faqs={[
        {
          question: "Can you meet me at Catawba College for a notarization?",
          answer: "Yes! We frequently meet students, faculty, and staff at Catawba College and Livingstone College for various notary needs."
        },
        {
          question: "Do you offer mobile notary services at the Salisbury VA Medical Center?",
          answer: "Absolutely. We are honored to serve our veterans and can meet you at the W.G. (Bill) Hefner VA Medical Center for any necessary document notarization."
        },
        {
          question: "Are you available for weekend notary services in Salisbury?",
          answer: "Yes, we offer 24/7 mobile notary services by appointment, including Saturdays and Sundays, to ensure your documents are handled on your schedule."
        },
        {
          question: "How much is the travel fee for Salisbury?",
          answer: "Our travel fees are competitive and based on the specific location in Salisbury and the time of day. Contact us for a quick and transparent quote."
        }
      ]}
      mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51865.41904712348!2d-80.47333335136719!3d35.67263590000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885404566735661d%3A0x884650e6bfde5145!2sSalisbury%2C%20NC!5e0!3m2!1sen!2sus!4v1712874500000!5m2!1sen!2sus"
    />
  );
}
