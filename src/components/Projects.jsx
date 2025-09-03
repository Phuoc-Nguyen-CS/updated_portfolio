import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Projects from './ProjectsPage';
import LanguagesPage from './LanguagesPage';

const pages = [
  { id: 'projects', component: Projects },
  { id: 'languages', component: LanguagesPage },
];

export default function ProjectsWrapper() {
  const [activePage, setActivePage] = useState('projects');
  const currentIndex = pages.findIndex((page) => page.id === activePage);
  const ActiveComponent = pages[currentIndex].component;

  return (
    <section className="relative w-full min-h-screen overflow-hidden">

      {/* Pagination Dots */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex space-x-3 z-9">
        {pages.map((page) => (
          <button
            key={page.id}
            onClick={() => setActivePage(page.id)}
            className={`w-4 h-4 rounded-full ${
              activePage === page.id ? 'bg-white scale-125' : 'bg-gray-400'
            } hover:bg-white transition-all`}
          />
        ))}
      </div>

      {/* Active Page */}
      <AnimatePresence mode="wait">
        <motion.div key={activePage} className="relative z-8">
          <ActiveComponent />
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
