import { motion } from 'framer-motion';
import gamingBackground from '/src/assets/gaming/gm-bg.png';

const gamingImages = Object.values(import.meta.glob('/src/assets/gaming/played/*', { eager: true })).map(img => img.default);


const games = [
  {
    title: 'Nier Automata (JRPG)',
    image: gamingImages[1],
    achievements: ['Favorite Game of all time!', 'Breathtaking soundtrack!', 'Great Philisophical story'],
  },
  {
    title: 'Persona 5/4/3 (JRPG)',
    image: gamingImages[3],
    achievements: ['Completed every game on the hardest difficulty', 'Great soundtrack and story'],
  },  
  {
    title: 'MapleStory (MMORPG)',
    image: gamingImages[0],
    achievements: ['Started playing since 2008', 'Retired Top 10 Evan'],
  },
  {
    title: 'Oxygen Not Included (Colony Managing)',
    image: gamingImages[2],
    achievements: ['Great game if you want your head to hurt', 'Manage Oxygen, Power, Food, Plumbing, and so much more'],
  },
];

function Gaming() {
  return (
    <motion.section
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background */}
      <img
        src={gamingBackground}
        alt="Gaming Background"
        className="absolute inset-0 w-full h-full object-cover filter brightness-70"
      />

      {/* Header */}
      <h2 className="text-5xl font-bold text-white drop-shadow-2xl mb-6 z-10 text-center"
      style={{ textShadow: '2px 2px 0 #ff0000ff, 4px 4px 0 #000000ff' }}>
        Gamer At Heart
      </h2>
      <p className="text-2xl text-white mb-12 z-10 text-center max-w-2xl"
      style={{ textShadow: '2px 2px 0 #ff0000ff, 4px 4px 0 #000000ff' }}>
        Some of the games I've played and enjoyed over the years.
      </p>

      {/* Game Cards */}
      <div className="flex flex-wrap justify-center gap-8 z-10 w-full max-w-6xl">
        {games.map((game, index) => (
          <motion.div
            key={index}
            className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer w-full sm:w-[45%] md:w-[30%]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 bg-black/60 text-white backdrop-blur-sm">
              <h3 className="text-3xl font-semibold">{game.title}</h3>
              <ul className="list-disc list-inside mt-2 text-md">
                {game.achievements.map((ach, i) => (
                  <li key={i}>{ach}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default Gaming;
