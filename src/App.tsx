import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StepsShowcase } from './components/StepsShowcase';
import { FeatureGrid } from './components/FeatureGrid';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StepsShowcase />
        <FeatureGrid />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

export default App;
