import LoanSigningCityLayout from '../../components/LoanSigningCityLayout';

export default function UnionCountyLoanSigning() {
  return (
    <LoanSigningCityLayout
      location="Union County"
      h1="Union County Loan Signing Agent"
      image="/monroe-1.jpg"
      heroText="Mobile loan signing services serving Union County. Punctual mortgage closings in Monroe, Waxhaw, Indian Trail, and across the region."
      overviewText={
        <>
          <p>Integrity Closings CLT provides specialized <strong>loan signing agent services throughout Union County, NC</strong>. Our mobile document facilitation is a core service, assisting lenders and homeowners in finalizing transactions with complete confidence.</p>
          <p>Our service region spans from the expanding residential developments in <strong>Indian Trail and Stallings</strong> to the historic center of <strong>Monroe</strong> and the upscale communities of <strong>Waxhaw and Weddington</strong>. We are committed to upholding professional standards and technical accuracy for every signing we facilitate.</p>
        </>
      }
      coverageAreas={[
        "Monroe",
        "Waxhaw",
        "Indian Trail",
        "Weddington",
        "Stallings",
        "Wesley Chapel",
        "Marvin",
        "Marshville",
        "Wingate",
        "Mineral Springs"
      ]}
      nearbyAreas={[
        { name: "Monroe", link: "/locations/monroe" },
        { name: "Waxhaw", link: "/locations/union-county-loan-signing-agent" },
        { name: "Matthews", link: "/locations/matthews-loan-signing-agent" },
        { name: "Mint Hill", link: "/locations/mint-hill-loan-signing-agent" }
      ]}
      faqs={[
        {
          question: "Can you facilitate a purchase closing in Waxhaw?",
          answer: "Yes, we frequently support purchase closings in Waxhaw and across Union County, providing a convenient mobile solution for homebuyers."
        },
        {
          question: "Do you handle specialized lender forms in Union County?",
          answer: "Absolutely. We are familiar with a wide variety of lender-specific forms and ensure all requirements are met for a successful loan package execution."
        }
      ]}
      mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d418012.0!2d-80.5!3d34.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8854378f4b5a8e45%3A0x6b6c0e5a8a65d0!2sUnion%20County%2C%20NC!5e0!3m2!1sen!2sus!4v1712874200000!5m2!1sen!2sus"
      metaDescription="Mobile loan signing agent in Union County, NC serving Monroe, Waxhaw, Indian Trail, and nearby communities for mortgage document appointments."
    />
  );
}
