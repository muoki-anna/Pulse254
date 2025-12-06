import { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import BloodRequests from "../components/BloodRequests";
import DonorInfo from "../components/DonorInfo";
import Footer from "../components/Footer";
import AboutUs from "../components/ui/aboutus";

const Index = () => {
  const [isDonorModalOpen, setIsDonorModalOpen] = useState(false);

  const openDonorModal = () => {
    setIsDonorModalOpen(true);
  };

  const closeDonorModal = () => {
    setIsDonorModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onOpenDonorModal={openDonorModal} />
      <main>
        <Hero />
        <BloodRequests />
        <DonorInfo 
          isModalOpen={isDonorModalOpen}
          onOpenModal={openDonorModal}
          onCloseModal={closeDonorModal}
        />
        <AboutUs />
      </main>
      <Footer />
    </div>
  );
};

export default Index;