// Hiking.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import 'swiper/css';

import hikingBackground from '/assets/hiking/dsc01274.jpg'; 

const slowImages = Array.from({ length: 6 }).map((_, i) => `/assets/hiking/slow/slow${i + 1}.jpg`);
const sequoiaImages = Array.from({ length: 8 }).map((_, i) => `/assets/hiking/sequoia/sequoia${i + 1}.jpg`);
const yosemiteImages = Array.from({ length: 9 }).map((_, i) => `/assets/hiking/yosemite/yosemite${i + 1}.jpg`);
const crystalCoveImages = Array.from({ length: 6 }).map((_, i) => `/assets/hiking/crystalcove/cc${i + 1}.jpg`);
const totwImages = Array.from({ length: 6 }).map((_, i) => `/assets/hiking/totw/totw${i + 1}.jpg`);
const temescalImages = Array.from({ length: 7 }).map((_, i) => `/assets/hiking/temescal/temescal${i + 1}.jpg`);
const blackstarImages = Array.from({ length: 3 }).map((_, i) => `/assets/hiking/blackstar/blackstar${i + 1}.jpg`);
const zionImages = Array.from({ length: 6 }).map((_, i) => `/assets/hiking/zion/zion${i + 1}.jpg`);
const bryceImages = Array.from({ length: 4 }).map((_, i) => `/assets/hiking/bryce/bryce${i + 1}.jpg`);

const hiking = [
  { title: 'Sequoia', image: sequoiaImages[0], images: sequoiaImages },
  { title: 'Yosemite', image: yosemiteImages[0], images: yosemiteImages },
  { title: 'Crystal Cove', image: crystalCoveImages[0], images: crystalCoveImages },
  { title: 'Top of the World', image: totwImages[0], images: totwImages },
  { title: 'Slow N\' Steady', image: slowImages[0], images: slowImages },
  { title: 'Temescal Canyon', image: temescalImages[0], images: temescalImages },
  { title: 'Blackstar Canyon', image: blackstarImages[0], images: blackstarImages },
  { title: 'Zion National Park', image: zionImages[0], images: zionImages },
  { title: 'Bryce National Park', image: bryceImages[0], images: bryceImages }
];

function Hiking({ setActivePage }) {
  const [activePassion, setActivePassion] = useState(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  return (
    <motion.section
      className="relative w-full flex flex-col items-center justify-start pt-32 pb-32 overflow-visible min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background */}
      <div className="absolute inset-0 w-full h-[140vh]">
        <img src={hikingBackground} alt="Hiking Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Header */}
      <h2 className="text-5xl font-bold text-white drop-shadow-2xl mb-6 z-9 text-center">
        Occasional Grass Toucher
      </h2>

      {/* Card Grid */}
      <div className="flex justify-center w-full z-9 p-10">
        <div className="flex flex-wrap justify-center gap-6 px-8 sm:px-12 lg:px-24">
          {hiking.map((passion, index) => (
            <motion.div
              key={index}
              className="group relative rounded-md shadow-lg overflow-hidden cursor-pointer hover:scale-105 w-full sm:w-[30%] md:w-[16%]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 70, damping: 15, delay: index * 0.1 }}
              onClick={() => setActivePassion(passion)}
            >
              <img src={passion.image} alt={passion.title} className="w-full h-100 object-cover rounded-t-xl" />

              <div className="p-6 text-center backdrop-blur-sm bg-white/1 rounded-b-xl">
                <h3 className="text-2xl font-semibold mb-2 text-white">{passion.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {activePassion && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative w-11/12 max-w-3xl p-6 rounded-xl backdrop-blur-md bg-white/20">
            <button onClick={() => setActivePassion(null)} className="absolute top-4 right-6 text-white text-xl hover:text-gray-200">
              ×
            </button>

            <h3 className="text-2xl font-semibold mb-4 text-white text-center">{activePassion.title}</h3>

            <div className="flex justify-center mb-4">
              <img
                src={fullscreenImage || activePassion.images[0]}
                alt={`${activePassion.title} main`}
                className="w-full max-h-[60vh] object-contain rounded-lg cursor-pointer"
                onClick={() => setFullscreenImage(fullscreenImage || activePassion.images[0])}
              />
            </div>

            <div className="flex justify-center gap-3 mt-10 mb-5 overflow-x-auto px-2 py-4">
              {activePassion.images.map((thumb, idx) => (
                <div
                  key={idx}
                  className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer shadow-lg transition-transform ${
                    thumb === (fullscreenImage || activePassion.images[0])
                      ? 'ring-4 ring-emerald-400 scale-110'
                      : 'hover:scale-105'
                  }`}
                  onClick={() => setFullscreenImage(thumb)}
                >
                  <img src={thumb} alt={`${activePassion.title} thumb ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.section>
  );
}

export default Hiking;
