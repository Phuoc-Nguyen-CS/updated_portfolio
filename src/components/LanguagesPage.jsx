import { motion } from 'framer-motion';
import { languagesFrameworks } from './projectsData';

export default function LanguagesPage() {
  return (
    <motion.div
      className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-32 bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {languagesFrameworks.map((section, idx) => (
        <div 
          key={idx} 
          className="w-full max-w-6xl mb-20 flex flex-col items-center"
        >
          {/* Section Title */}
          <h3 className="text-3xl font-semibold text-white mb-8 text-center">
            {section.category}
          </h3>

          {/* Grid Centered */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-items-center">
            {section.items.map((item, i) => (
              <motion.div
                key={i}
                className="bg-black/40 border border-gray-700 rounded-xl p-6 flex items-center justify-center shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 w-40 h-20"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <span className="text-xl font-medium text-white">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
