import CityPageLayout from '../../components/CityPageLayout';
import { FileSignature, FileText, Laptop, Clock, HeartPulse, ShieldCheck } from 'lucide-react';

export default function Midland() {
  return (
    <CityPageLayout
      city="Midland"
      image="/midland.png"
      introText={
        <>
          Need a reliable, professional <strong>mobile notary in Midland, NC</strong>? Integrity Closings CLT provides fully on-demand notary services throughout Cabarrus County and nearby communities. Whether you're near <strong>Highway 24/27</strong>, relaxing at <strong>Rob Wallace Park</strong>, or signing documents in the comfort of your own home, our mobile notary service brings precision, efficiency, and integrity straight to your doorstep.
        </>
      }
      services={[
        {
          title: "Loan Signing Services",
          description: <>Professional handling of mortgage refinances, HELOCs, and seller packages. We work with lenders and title companies to provide stress-free mobile closings for residents of <strong>Midland and Mount Pleasant</strong>.</>,
          icon: <FileSignature className="w-6 h-6 text-blue-600" />,
          link: "/locations/union-county-loan-signing-agent"
        },
        {
          title: "Estate Planning Notary",
          description: <>Secure mobile notarization for Living Trusts, Last Will and Testament, and Power of Attorney (POA). We can meet you at your home or popular spots like <strong>Reed Gold Mine</strong> area.</>,
          icon: <FileText className="w-6 h-6 text-blue-600" />,
          link: "/estate-notary-charlotte-nc"
        },
        {
          title: "Hospital & Bedside Notary",
          description: <>Bedside notarizations for directives, proxies, and urgent legal documents. We serve local clinics, rehabilitation centers, and nearby hospitals.</>,
          icon: <HeartPulse className="w-6 h-6 text-blue-600" />,
          link: "/hospital-notary-charlotte-nc"
        },
        {
          title: "After Hours & Emergency",
          description: <>Fast, 24/7 emergency notary services available for evenings, weekends, and holidays to accommodate Midland's busy, dynamic schedules.</>,
          icon: <Clock className="w-6 h-6 text-blue-600" />,
          link: "/after-hours-mobile-notary-charlotte-nc"
        },
        {
          title: "General Notary Services",
          description: <>Quick and pristine notarization for travel consents, vehicle title transfers, I-9 verifications, and general legal affidavits across Midland.</>,
          icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
          link: "/general-notary-charlotte-nc"
        },
        {
          title: "Business & Corporate Notary",
          description: <>Professional notary assistance for corporate agreements, employment paperwork, NDAs, and corporate resolutions for businesses across the <strong>Cabarrus County</strong> region.</>,
          icon: <Laptop className="w-6 h-6 text-blue-600" />,
          link: "/services/business-documents"
        }
      ]}
      hospitalsIntro="Should legal needs present themselves during an unexpected medical stay or health challenge, we provide gentle, prompt mobile bedside notary services across Midland and surrounding clinic facilities:"
      hospitals={[
        {
          name: "Atrium Health Cabarrus (Nearby)",
          location: "Concord / Midland Region",
          description: <>We offer complete compassionate bedside notarization for medical powers of attorney, healthcare directives, and estate planning documents for patients and families.</>
        },
        {
          name: "Local Midland/Locust Medical Clinics",
          location: "Midland, NC",
          description: <>We are fully mobile and available to travel directly to outpatient centers, medical offices, and physical rehabilitation campuses throughout Cabarrus County.</>
        }
      ]}
      additionalLocations={[
        "Rob Wallace Park",
        "Reed Gold Mine State Historic Site",
        "Midland Town Hall Area",
        "Highway 24/27 Corridor",
        "Rocky River Elementary Vicinity",
        "Midland Library & Community Centers",
        " Crossroads Plaza of Midland",
        "Rocky River Area"
      ]}
      faqs={[
        {
          question: "Can you meet me at Reed Gold Mine for a signing?",
          answer: "Yes, we can meet you at any location in Midland, NC, including famous town spots like Reed Gold Mine or local parks, libraries, coffee stations, or right to your residence."
        },
        {
          question: "How do I calculate the travel fee to Midland, NC?",
          answer: "Our fees are based on the NC statutory rate per notarized signature plus an affordable mobile travel fee calculated from your precise address. Let us know your address and we will provide an up-front quote."
        },
        {
          question: "Do you offer emergency or weekend notary in Midland?",
          answer: "Yes! We specialize in emergency and after-hours mobile notary services, operating in Midland 24 hours a day, 7 days a week by appointment."
        },
        {
          question: "What items should I have ready for the notary?",
          answer: "You must have a current government-issued photo ID (driver's license or passport). Do not sign the document beforehand—all signatures must be made in the direct presence of the notary."
        }
      ]}
      mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d355050.4851253457!2d-80.53673322484081!3d35.22152631623565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8854129cbd371cd7%3A0xeab50d87928e4612!2sMidland%2C%20NC!5e0!3m2!1sen!2sus!4v1715874800000!5m2!1sen!2sus"
    />
  );
}
