import LoanSigningCityLayout from '../../components/LoanSigningCityLayout';

export default function ConcordLoanSigning() {
  return (
    <LoanSigningCityLayout
      location="Concord"
      h1="Concord Loan Signing Agent"
      image="/concord.jpg"
      heroText="Mobile loan signing services in Concord and Cabarrus County. Professional mortgage document facilitation for refinances, purchases, and residential closings."
      overviewText={
        <>
          <p>Securing a dependable <strong>loan signing agent in Concord, NC</strong> is a critical component of any successful real estate transaction. Integrity Closings CLT offers the mobile presence and technical proficiency required to manage your most sensitive mortgage files.</p>
          <p>We serve the entire Concord region, extending from the <strong>Concord Mills</strong> area to the quiet neighborhoods surrounding <strong>Atrium Health Cabarrus</strong>. Whether you are a title company seeking a consistent local partner or a borrower needing a convenient home closing, we provide accurate and punctual service.</p>
        </>
      }
      coverageAreas={[
        "Concord",
        "Concord Mills",
        "Kannapolis",
        "Harrisburg",
        "Mount Pleasant",
        "Midland",
        "Poplar Tent",
        "George W. Liles Pkwy"
      ]}
      nearbyAreas={[
        { name: "Kannapolis", link: "/locations/cabarrus-county-loan-signing-agent" },
        { name: "Harrisburg", link: "/locations/cabarrus-county-loan-signing-agent" },
        { name: "Charlotte", link: "/locations/charlotte" },
        { name: "Salisbury", link: "/locations/salisbury" }
      ]}
      faqs={[
        {
          question: "Can you meet at a borrower's workplace in Concord?",
          answer: "Yes, we often meet borrowers at their offices or workplaces in Concord to make the signing process as convenient as possible during business hours."
        },
        {
          question: "How long does a typical loan signing in Concord take?",
          answer: "A standard purchase or refinance signing usually takes 45 to 60 minutes, depending on the complexity of the loan package and the number of signers."
        }
      ]}
      mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d208532.4014165584!2d-80.579!3d35.408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8854045f2dc85e4d%3A0xedc9d23315a676f!2sConcord%2C%20NC!5e0!3m2!1sen!2sus!4v1712874200000!5m2!1sen!2sus"
      metaDescription="Mobile loan signing agent in Concord, NC for refinance, purchase, seller, and mortgage document appointments throughout Concord and Cabarrus County."
    />
  );
}
