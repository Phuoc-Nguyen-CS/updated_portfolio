import { motion } from 'framer-motion';
import projectsBackground from '/src/assets/projects/bg.jpg';
import { projects } from './projectsData';

export default function ProjectsPage() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-start pt-32 pb-32 overflow-visible">
      
      {/* Background */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={projectsBackground}
          alt="Projects Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" /> {/* overlay for readability */}
      </div>

      {/* Title */}
      <h2 className="text-6xl font-bold text-white drop-shadow-2xl mb-12 z-9 text-center">
        My Projects
      </h2>

      {/* Project Cards */}
      <div className="flex flex-wrap justify-center gap-8 w-full z-9 px-4 sm:px-6 lg:px-10">
        {projects.map((proj, index) => (
          <motion.div
            key={index}
            className="relative rounded-xl shadow-md overflow-hidden cursor-pointer w-full sm:w-[45%] md:w-[30%] bg-black/40 flex flex-col"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 70, damping: 15, delay: index * 0.1 }}
          >
            <img
              src={proj.image}
              alt={proj.title}
              className="w-full h-140 object-cover object-top rounded-t-xl"
            />
            <div className="p-6 text-center flex flex-col flex-1">
              <h3 className="text-2xl font-semibold mb-2 text-white">{proj.title}</h3>
              <p className="mb-4 text-white text-lg flex-1">{proj.description}</p>
              
              {/* Tags */}
              {proj.tags && (
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {proj.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm rounded-full bg-blue-500/80 text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              {proj.link && (
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full h-12 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-white font-medium"
                >
                  Visit Project
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
