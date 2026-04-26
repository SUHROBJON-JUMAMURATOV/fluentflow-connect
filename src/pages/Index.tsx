import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Advantages } from "@/components/Advantages";
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
        <OrderForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
