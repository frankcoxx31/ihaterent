import LoanSigningCityLayout from '../../components/LoanSigningCityLayout';

export default function MatthewsLoanSigning() {
  return (
    <LoanSigningCityLayout
      location="Matthews"
      h1="Matthews Loan Signing Agent"
      image="/matthews-1.jpg"
      heroText="Reliable mobile loan signing services in Matthews and South Charlotte. Professionals delivering precise mortgage closings at your location."
      overviewText={
        <>
          <p>Integrity Closings CLT is your primary provider for <strong>loan signing agent services in Matthews, NC</strong>. Our mission is to provide a professional, seamless experience for lenders and borrowers as they finalize critical real estate transactions.</p>
          <p>Whether you're located near <strong>Providence High School</strong> or in the heart of <strong>Downtown Matthews</strong>, our mobile team travels to meet you. We are experienced in an array of loan packages, ensuring that from multi-document purchase agreements to simple refinances, every field is correctly initialed and every seal is properly applied.</p>
        </>
      }
      coverageAreas={[
        "Downtown Matthews",
        "Weddington",
        "Stallings",
        "Sardis Forest",
        "Indian Trail",
        "Providence Plantation",
        "Hempstead",
        "Fullwood Station"
      ]}
      nearbyAreas={[
        { name: "Mint Hill", link: "/locations/mint-hill-loan-signing-agent" },
        { name: "Charlotte", link: "/locations/charlotte" },
        { name: "Weddington", link: "/locations/union-county-loan-signing-agent" },
        { name: "Monroe", link: "/locations/monroe" }
      ]}
      faqs={[
        {
          question: "Do you handle out-of-state loan signings in Matthews?",
          answer: "Yes, we regularly facilitate signings for borrowers in Matthews with properties or lenders located in other states, following all necessary North Carolina notary laws."
        },
        {
          question: "Can we schedule a signing at a Matthews business center?",
          answer: "Certainly. We meet clients at various office buildings and business centers throughout Matthews for professional mortgage document appointments."
        }
      ]}
      mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3264.444!2d-80.712!3d35.115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8854238e8e7c10b7%3A0x6b6c0e5a8a65d0!2sMatthews%2C%20NC!5e0!3m2!1sen!2sus!4v1712874200000!5m2!1sen!2sus"
      metaDescription="Mobile loan signing agent in Matthews, NC for purchase, refinance, seller, and HELOC signings. Convenient appointments in Matthews and nearby areas."
    />
  );
}
