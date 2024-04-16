import Footer from "@/layout/Footer";

import CarouselContainer from "../../components/CarouselContainer";
import ProductList from "../../layout/Product";

const LandingPage = () => {
  return (
    <div className="flex flex-col max-w-screen-xl mx-auto">
      <CarouselContainer />
      <ProductList />
      <Footer />
    </div>
  );
};

export default LandingPage;
