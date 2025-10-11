import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BloodRequests from "@/components/BloodRequests";
import DonorInfo from "@/components/DonorInfo";
import Footer from "@/components/Footer";
import AboutUs from "@/components/ui/aboutus";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <BloodRequests />
        <DonorInfo />
        <AboutUs />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
