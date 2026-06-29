import Banner from "@/components/Banner";
import CustomerReviews from "@/components/CustomerReviews";
import FAQSection from "@/components/FAQSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import RentalStatistics from "@/components/RentalStatistics";
import TopLocations from "@/components/TopLocations";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function HomePage() {
  
  return (
    <div>
      <Banner/>

      <FeaturedProperties/>
      {/* akhane sob homepage er mal dibo */}
      <WhyChooseUs/>
      <RentalStatistics/>
      <TopLocations/>
      <CustomerReviews/>
      <FAQSection/>
    </div>
  );
}
