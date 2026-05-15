import LoanSigningCityLayout from '../../components/LoanSigningCityLayout';

export default function CabarrusCountyLoanSigning() {
  return (
    <LoanSigningCityLayout
      location="Cabarrus County"
      h1="Cabarrus County Loan Signing Agent"
      image="/concord.jpg"
      heroText="County-wide mobile loan signing services. Serving Concord, Kannapolis, and Harrisburg with professional mortgage document facilitation."
      overviewText={
        <>
          <p>Integrity Closings CLT acts as your mobile partner for <strong>loan signing agent services across Cabarrus County, NC</strong>. Mortgage professionals and title companies depend on our punctuality, attention to detail, and flexible mobile scheduling.</p>
          <p>We offer extensive coverage, reaching clients in <strong>Concord, Kannapolis, Harrisburg, Midland, and Mount Pleasant</strong>. Our objective is to deliver a consistent, high-standard signing experience regardless of where your closing takes place within the county.</p>
        </>
      }
      coverageAreas={[
        "Concord",
        "Kannapolis",
        "Harrisburg",
        "Midland",
        "Mount Pleasant",
        "Georgeville",
        "Odell School",
        "Cabarrus Hills"
      ]}
      nearbyAreas={[
        { name: "Concord", link: "/locations/concord-loan-signing-agent" },
        { name: "Kannapolis", link: "/locations/concord-loan-signing-agent" },
        { name: "Salisbury", link: "/locations/salisbury" },
        { name: "China Grove", link: "/locations/concord-loan-signing-agent" }
      ]}
      faqs={[
        {
          question: "How far do you travel within Cabarrus County?",
          answer: "We cover the entire county, from the Mecklenburg line in Harrisburg to the rural areas of Mount Pleasant and Midland. Travel fees are transparent and included in our quotes."
        },
        {
          question: "Do you offer loan modifications in Cabarrus County?",
          answer: "Yes, we provide mobile notary support for loan modifications and all other mortgage-related document updates throughout Cabarrus County."
        }
      ]}
      mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d417024.0!2d-80.5!3d35.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8854045f2dc85e4d%3A0xedc9d23315a676f!2sCabarrus%20County%2C%20NC!5e0!3m2!1sen!2sus!4v1712874200000!5m2!1sen!2sus"
      metaDescription="Mobile loan signing services in Cabarrus County, NC for refinance, purchase, seller, and HELOC appointments in Concord, Kannapolis, and Harrisburg."
    />
  );
}
