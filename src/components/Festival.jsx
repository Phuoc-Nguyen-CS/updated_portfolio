import { motion } from 'framer-motion';
import festivalBackground from '/src/assets/festival/bg-festival.jpg';

const festivalImages = Object.values(import.meta.glob('/src/assets/festival/events/*', { eager: true })).map(img => img.default);

const festivals = [
  {
    name: 'Beyond Wonderland',
    date: 'March 28-29, 2025',
    location: 'San Bernardino, California',
    image: festivalImages[1],
  },
  {
    name: 'Lost In Dreams',
    date: 'July 11-12, 2025',
    location: 'LA State Historic Park',
    image: festivalImages[4],
  },
  {
    name: 'Apocalypse',
    date: 'November 28-29, 2025',
    location: 'Long Beach, California',
    image: festivalImages[0],
  },
  {
    name: 'Decandance',
    date: 'December 30-31, 2025',
    location: 'Denver, Colorado',
    image: festivalImages[2],
  },
  {
    name: 'EDC',
    date: 'May 15-17, 2026',
    location: 'Las Vegas, Nevada',
    image: festivalImages[3],
  },
];

export default function Festival({ setActivePage }) {
  return (
    <motion.section
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background */}
      <img
        src={festivalBackground}
        alt="Festival Background"
        className="absolute inset-0 w-full h-full object-cover filter brightness-70"
        style={{ imageRendering: 'auto' }}
      />

      {/* Header */}
      <h2 className="text-5xl font-bold text-white mb-30 z-10 [text-shadow:_2px_2px_0_#ff00ff,_4px_4px_0_#00ffff]">
        Itchy Scratchy Music Enjoyer
      </h2>

      {/* Cards */}
      <div className="flex justify-center w-full z-10">
        <div className="flex flex-wrap justify-center gap-8 px-4 sm:px-3 lg:px-4 max-w-7xl">
          {festivals.map((fest, index) => (
            <motion.div
              key={index}
              className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer w-full sm:w-[45%] md:w-[30%] lg:w-[30%]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <img
                src={fest.image}
                alt={fest.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                <h3 className="text-2xl font-semibold">{fest.name}</h3>
                <p className="text-sm">{fest.date}</p>
                <p className="text-sm">{fest.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </motion.section>
  );
}
