import FaqComponent from "./FaqComponent";

function FaqList(props: any) {
  return (
    <div className="p-4 mt-20 lg:mx-20">
      <h1>FAQ (How it works)</h1>
      <div
        className="mt-3 mb-3"
        style={{ borderBottomWidth: "1px", borderBottomColor: "lightgray" }}
      />
      <FaqComponent
        faq="What kind of data can I get with your tool?"
        answer="We unlock a treasure trove of 40+ data points for any IP address you enter, including:
Location: Country, region, city, zip code, latitude/longitude
Time & Currency: Time zone, local currency
Network Details: ISP name, network classification
Technical Data: ASN, organization name, IP type
And more!"
      />
      <FaqComponent
        faq="Is your data accurate and reliable?"
        answer="We prioritize accuracy and rely on reputable sources and frequent updates to ensure the highest quality data possible. However, there might be occasional discrepancies due to dynamic nature of IP geolocation."
      />
      <FaqComponent
        faq="How much does it cost to use your tool?"
        answer="It's completely FREE to utilize our basic IP lookup features with 40+ data points. We also offer affordable paid plans with extra features for high-volume users."
      />
      <FaqComponent
        faq="Are there any limitations to free usage?"
        answer="We encourage responsible use, and for a seamless experience, might occasionally set limits on free daily or monthly queries. Contact us if you have specific needs exceeding these limits."
      />
      <FaqComponent
        faq=" Is my data safe and secure?"
        answer="We take data privacy seriously. Your IP addresses and any personal information are never stored or shared."
      />
      <FaqComponent
        faq="What types of businesses can benefit from your tool?"
        answer="Marketers: Precise audience targeting for advertising and campaigns. E-commerce: Personalized user experiences based on location data. Security & Fraud Prevention: Identify suspicious activity from specific regions. Logistics & Delivery: Optimize delivery routes and improve efficiency."
      />
    </div>
  );
}

export default FaqList;
