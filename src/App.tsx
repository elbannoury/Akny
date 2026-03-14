import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Categories from './sections/Categories';
import Offers from './sections/Offers';
import Products from './sections/Products';
import Testimonials from './sections/Testimonials';
import Features from './sections/Features';
import Instagram from './sections/Instagram';
import Footer from './sections/Footer';
import CartDrawer from './sections/CartDrawer';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <div className="min-h-screen bg-white grain-overlay">
          <Navigation />
          <main>
            <section id="hero">
              <Hero />
            </section>
            <Categories />
            <Offers />
            <Products />
            <Testimonials />
            <Features />
            <Instagram />
          </main>
          <Footer />
          <CartDrawer />
        </div>
      </CartProvider>
    </LanguageProvider>
  );
}

export default App;
