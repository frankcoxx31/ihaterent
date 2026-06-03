import CityPageLayout from '../../components/CityPageLayout';
import { FileSignature, FileText, Laptop, Clock, HeartPulse, ShieldCheck } from 'lucide-react';

export default function Monroe() {
  return (
    <CityPageLayout
      city="Monroe"
      image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1920"
      introText={
        <>
          Need a <strong>mobile notary in Monroe, NC</strong>? Integrity Closings CLT provides professional, on-demand notary services throughout Union County. Whether you are at a local coffee shop in <strong>Downtown Monroe</strong>, a business near <strong>Highway 74</strong>, or your own front door, we bring the notary office to you. We are committed to providing Monroe residents with secure, accurate, and stress-free notarizations for all their legal and financial documents.
        </>
      }
      services={[
        {
          title: "Loan Signing Services",
          description: <>Expert handling of mortgages, refinances, HELOCs, and seller packages. We serve homeowners in neighborhoods like <strong>Rolling Hills, South Monroe, and Benton Heights</strong>.</>,
          icon: <FileSignature className="w-6 h-6 text-blue-600" />,
          link: "/loan-signing-agent-charlotte-nc"
        },
        {
          title: "Estate Planning Notary",
          description: <>Secure notarization for Power of Attorney (POA), Wills, and Trusts. We are happy to meet at local landmarks such as <strong>Treehouse Vineyards</strong> or the <strong>Union County Library</strong>.</>,
          icon: <FileText className="w-6 h-6 text-blue-600" />,
          link: "/estate-notary-charlotte-nc"
        },
        {
          title: "Hospital & Nursing Home",
          description: <>Compassionate bedside notary services for medical POAs and living wills for patients at <strong>Atrium Health Union</strong> and <strong>Monroe Rehabilitation Center</strong>.</>,
          icon: <HeartPulse className="w-6 h-6 text-blue-600" />,
          link: "/hospital-notary-charlotte-nc"
        },
        {
          title: "After Hours Notary",
          description: <>Available for late-night and weekend signings across the Monroe area when standard offices are closed.</>,
          icon: <Clock className="w-6 h-6 text-blue-600" />,
          link: "/after-hours-mobile-notary-charlotte-nc"
        },
        {
          title: "General Notary Services",
          description: <>Quick and accurate notarization for affidavits, vehicle titles, and I-9 verifications. Serving all of <strong>Union County</strong> with mobile service.</>,
          icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
          link: "/general-notary-charlotte-nc"
        },
        {
          title: "Business & Corporate",
          description: <>Professional notary support for business contracts and employment paperwork. We meet you at your office or <strong>Monroe</strong> area businesses.</>,
          icon: <Laptop className="w-6 h-6 text-blue-600" />,
          link: "/services/business-documents"
        }
      ]}
      hospitalsIntro="Legal matters don't stop for medical emergencies. We provide compassionate, mobile notary services to patients and families at the primary healthcare hubs in the Monroe area:"
      hospitals={[
        {
          name: "Atrium Health Union",
          location: "Monroe, NC",
          description: <>We provide bedside notary services for medical POAs, living wills, and other urgent documents for patients at Atrium Health near <strong>Highway 74</strong>.</>
        },
        {
          name: "Monroe Rehabilitation Center",
          location: "Monroe, NC",
          description: <>Conveniently serving rehabilitation and nursing facilities. We offer flexible scheduling to meet you or your loved ones to handle important legal paperwork.</>
        }
      ]}
      additionalLocations={[
        "Sweet Union Flea Market",
        "Aw Shucks! Corn Maze",
        "Monroe Aquatics and Fitness Center",
        "Historic Union County Courthouse",
        "Charlotte-Monroe Executive Airport",
        "Belk Tonawanda Park",
        "Treehouse Vineyards",
        "Monroe Science Center",
        "Wingate University (Nearby)",
        "Union County Courthouse"
      ]}
      faqs={[
        {
          question: "Can you meet me at Treehouse Vineyards for a notarization?",
          answer: "Yes! We can meet you at Treehouse Vineyards or any other local landmark in Monroe for your convenience."
        },
        {
          question: "Do you offer mobile notary services at Atrium Health Union?",
          answer: "Absolutely. We provide prompt bedside notary services at Atrium Health Union for medical directives, powers of attorney, and other urgent legal documents."
        },
        {
          question: "Are you available for after-hours notary in Monroe?",
          answer: "Yes, we offer 24/7 mobile notary services by appointment in Monroe, including evenings, weekends, and holidays."
        },
        {
          question: "How do I book a mobile notary in Monroe?",
          answer: "You can book directly through our website's booking tool or call/text us at 980-372-4103 for immediate assistance."
        }
      ]}
      mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52165.41904712348!2d-80.54333335136719!3d34.98263590000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885404566735661d%3A0x884650e6bfde5145!2sMonroe%2C%20NC!5e0!3m2!1sen!2sus!4v1712874700000!5m2!1sen!2sus"
    />
  );
}
