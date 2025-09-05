// LanguagesPage.jsx
import { motion } from 'framer-motion';
import { languagesFrameworks } from './projectsData';
import { 
  SiJavascript, SiPython, SiCplusplus, SiC, 
  SiReact, SiSupabase, SiTailwindcss, SiPandas, 
  SiTensorflow, SiOpencv, SiDiscord, SiVite
} from 'react-icons/si';

const iconMap = {
  JavaScript: <SiJavascript className="text-yellow-400" size={28} />,
  Python: <SiPython className="text-blue-400" size={28} />,
  "C++": <SiCplusplus className="text-indigo-500" size={28} />,
  C: <SiC className="text-gray-300" size={28} />,
  React: <SiReact className="text-cyan-400" size={28} />,
  Supabase: <SiSupabase className="text-green-400" size={28} />,
  Tailwind: <SiTailwindcss className="text-sky-400" size={28} />,
  Pandas: <SiPandas className="text-white" size={28} />,
  TensorFlow: <SiTensorflow className="text-orange-400" size={28} />,
  OpenCV: <SiOpencv className="text-green-300" size={28} />,
  "Discord.py": <SiDiscord className="text-indigo-400" size={28} />,
  Vite: <SiVite className="text-purple-400" size={28} />,
};

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

          {/* Grid with Badges */}
          <div className="flex flex-wrap justify-center gap-6">
            {section.items.map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3 bg-black/40 border border-gray-700 rounded-full px-6 py-3 shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {iconMap[item] || <span className="text-white">⚡</span>}
                <span className="text-lg font-medium text-white">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
