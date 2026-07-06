import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StepsShowcase } from './components/StepsShowcase';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StepsShowcase />
      </main>
    </>
  );
}

export default App;
