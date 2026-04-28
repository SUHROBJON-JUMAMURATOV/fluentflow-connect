import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Advantages } from "@/components/Advantages";
import { Gallery } from "@/components/Gallery";
import { OrderForm } from "@/components/OrderForm";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <Advantages />
        <Gallery />
        <OrderForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
