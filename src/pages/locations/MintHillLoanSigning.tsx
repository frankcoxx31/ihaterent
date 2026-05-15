import LoanSigningCityLayout from '../../components/LoanSigningCityLayout';

export default function MintHillLoanSigning() {
  return (
    <LoanSigningCityLayout
      location="Mint Hill"
      h1="Mint Hill Loan Signing Agent"
      image="/matthews-1.jpg"
      heroText="Mobile loan signing services in Mint Hill and East Charlotte. Professional mortgage document facilitation for refinances, purchases, and HELOCs."
      overviewText={
        <>
          <p>Integrity Closings CLT operates as a dedicated <strong>loan signing agent in Mint Hill, NC</strong>, specializing in high-stakes mortgage document appointments. We understand that local residents and lenders require a mobile partner who is both reliable and well-versed in loan packages.</p>
          <p>Our service brings the closing table to your preferred location—whether that's your residence near <strong>Fairview Rd</strong>, a professional setting in <strong>Brighton Park</strong>, or a public meeting point on <strong>Matthews-Mint Hill Rd</strong>. We prioritize accuracy in every signature to prevent delays in your transaction.</p>
        </>
      }
      coverageAreas={[
        "Mint Hill",
        "Brighton Park",
        "Farmwood",
        "Olde Sycamore",
        "Summerwood",
        "Mint Hill Village",
        "Downtown Mint Hill",
        "Fairview Road Corridor"
      ]}
      nearbyAreas={[
        { name: "Matthews", link: "/locations/matthews-loan-signing-agent" },
        { name: "Charlotte", link: "/locations/charlotte" },
        { name: "Concord", link: "/locations/concord-loan-signing-agent" }
      ]}
      faqs={[
        {
          question: "Can you facilitate a home purchase signing in Mint Hill?",
          answer: "Yes. We frequently handle purchase closings for buyers in Mint Hill, ensuring all mortgage documents and deeds are executed correctly."
        },
        {
          question: "Are you available for evening loan signings in Mint Hill?",
          answer: "We offer flexible scheduling, including limited evening appointments, to accommodate borrowers' work schedules in Mint Hill and surrounding areas."
        }
      ]}
      mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d208751.24838637774!2d-80.730!3d35.177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885418b760a5e845%3A0x7067d530062b9f0!2sMint%20Hill%2C%20NC!5e0!3m2!1sen!2sus!4v1712874200000!5m2!1sen!2sus"
      metaDescription="Mobile loan signing agent in Mint Hill, NC for refinance, purchase, seller, and HELOC documents. Serving Mint Hill and nearby East Charlotte areas."
    />
  );
}
