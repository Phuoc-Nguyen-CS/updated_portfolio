import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Hiking from './Hiking';
import Festival from './Festival';
import Gaming from './Gaming';

const pages = [
  { id: 'hiking', component: Hiking },
  { id: 'gaming', component: Gaming },
  { id: 'festival', component: Festival },
];

export default function About() {
  const [activePage, setActivePage] = useState('hiking');

  const currentIndex = pages.findIndex(page => page.id === activePage);
  const ActiveComponent = pages[currentIndex].component;

  return (
    <section id='about'>
      <div className="relative w-full min-h-screen overflow-hidden">

        {/* Pagination Dots */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex space-x-3 z-50">
          {pages.map((page, index) => (
            <button
              key={page.id}
              onClick={() => setActivePage(page.id)}
              className={`w-4 h-4 rounded-full ${activePage === page.id ? 'bg-white scale-125' : 'bg-gray-400'} hover:bg-white transition-colors`}
            />
          ))}
        </div>
        <AnimatePresence mode="wait">
          <ActiveComponent key={activePage} />
        </AnimatePresence>
      </div>
    </section>
  );
}
