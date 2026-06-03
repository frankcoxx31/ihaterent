import CityPageLayout from '../../components/CityPageLayout';
import { FileSignature, FileText, Laptop, Clock, HeartPulse, ShieldCheck } from 'lucide-react';

export default function Locust() {
  return (
    <CityPageLayout
      city="Locust"
      image="/locust.png"
      introText={
        <>
          Searching for a professional <strong>mobile notary in Locust, NC</strong>? Integrity Closings CLT is your trusted partner for prompt and secure on-demand notary services. Serving Stanly County and surrounding regions, we bring professional notary solutions directly to your storefront, medical room, or living room. Experience hassle-free document authentication with a certified notary who meets you on your timeline.
        </>
      }
      services={[
        {
          title: "Loan Signing Services",
          description: <>Flawless facilitation of refinancing packets, HELOCs, buyer/seller packages, and home equity documentation. We travel straight to your Locust residence or local office space.</>,
          icon: <FileSignature className="w-6 h-6 text-blue-600" />,
          link: "/locations/union-county-loan-signing-agent"
        },
        {
          title: "Estate Planning Notary",
          description: <>We notarize crucial lifetime preparation documents including Wills, Living Trusts, Healthcare Directives, and Powers of Attorney (POA) right in Stanly County.</>,
          icon: <FileText className="w-6 h-6 text-blue-600" />,
          link: "/estate-notary-charlotte-nc"
        },
        {
          title: "Hospital & Nursing Home Notary",
          description: <>Caring bedside services at hospitals, nursing clinics, and rehabilitation facilities. We make sure patients have stress-free access to urgent notarizations.</>,
          icon: <HeartPulse className="w-6 h-6 text-blue-600" />,
          link: "/hospital-notary-charlotte-nc"
        },
        {
          title: "After Hours & Emergency Notary",
          description: <>Need an evening or holiday signature? Our 24/7 on-demand network makes matching a notary in the Locust area convenient for any urgent deadline.</>,
          icon: <Clock className="w-6 h-6 text-blue-600" />,
          link: "/after-hours-mobile-notary-charlotte-nc"
        },
        {
          title: "General Mobile Notary",
          description: <>Expedited and accurate notarizations of legal templates: bill of sales, vehicle titles, major passport permissions, parent consents, and legal affidavits.</>,
          icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
          link: "/general-notary-charlotte-nc"
        },
        {
          title: "Corporate & Business Solutions",
          description: <>Mobile solutions for corporate agreements, employment authorization documents, NDAs, and corporate affidavits for businesses in Locust and <strong>Stanly County</strong>.</>,
          icon: <Laptop className="w-6 h-6 text-blue-600" />,
          link: "/services/business-documents"
        }
      ]}
      hospitalsIntro="We recognize how critical family documents can be in medical scenarios. We provide timely and compassionate bedside notarizations to facilities in and around the Stanly County area:"
      hospitals={[
        {
          name: "Atrium Health Stanly (Nearby)",
          location: "Albemarle / Locust Region",
          description: <>Full bedside coverage for healthcare proxies, living wills, and financial Powers of Attorney for families facing health situations.</>
        },
        {
          name: "Locust Town Center Clinics",
          location: "Locust, NC",
          description: <>Prompt, reliable mobile services to nursing homes, general practice physical centers, and dental or physical therapy facilities in the local community.</>
        }
      ]}
      additionalLocations={[
        "Locust Town Center",
        "Locust City Hall and Park",
        "Highway 24/27 Commerce District",
        "West Stanly High School Area",
        "Stanly Community College (Locust Campus)",
        "Red Bridge Golf Club (Nearby)",
        "Locust Public Library",
        "West Stanly Middle School Vicinity"
      ]}
      faqs={[
        {
          question: "Can you meet me in Locust Town Center for a notary signing?",
          answer: "Yes, definitely. We love meeting clients at the beautiful Locust Town Center, local coffee shops, offices, restaurants, or directly at your apartment or house."
        },
        {
          question: "How quickly can a mobile notary arrive in Locust, NC?",
          answer: "Depending on your immediate schedule and traffic, we can usually place a notary at your exact Locust address within 60 to 90 minutes for urgent matters."
        },
        {
          question: "Is there a travel limit for your Locust mobile notary services?",
          answer: "No travel limit! We serve all of Locust, NC, as well as adjacent towns like Midland, Mount Pleasant, Oakboro, and Stanfield."
        },
        {
          question: "What should I inspect before our notary appointment?",
          answer: "Each signer must present a physical, unexpired state-issued identification with photo and signature. Please double-check that your document has all details filled out except for your signature."
        }
      ]}
      mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d355000.7851253457!2d-80.44111162484081!3d35.23152631623565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88541334c03fe061%3A0xeab50d87928e4624!2sLocust%2C%20NC!5e0!3m2!1sen!2sus!4v1715874900000!5m2!1sen!2sus"
    />
  );
}
