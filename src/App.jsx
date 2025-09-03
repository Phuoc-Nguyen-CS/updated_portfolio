import './App.css';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';

function App() {
  return (
    <>
      <div>
        <Navbar />
        <main className="pt-16">
          <Hero />
          <About />
          <Projects/>
        </main>
      </div>
    </>
  )
}

export default App;
