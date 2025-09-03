import { motion } from 'framer-motion';
import background from '../assets/hero-bg.jpg';
import profileImage from '../assets/profile.jpg';

function Hero() {
  return (
    <section id='hero' className="relative w-full min-h-screen flex items-center justify-center">
      {/* Background */}
      <img
        src={background}
        alt="Portfolio background"
        className="absolute inset-0 w-full h-full object-cover filter brightness-50"
      />
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Content Wrapper */}
      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-8 text-white">
        
        {/* Profile Image */}
        <motion.img
          src={profileImage}
          alt="Profile"
          className="w-150 h-150 rounded-full mb-6 md:mb-0 md:mr-30 border-4 border-white object-cover hover:scale-105 transition-transform"
        />


        {/* Text */}
        <motion.div
          className="flex flex-col items-center text-center md:text-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 md:mb-6">
            Hello, my name is Phuoc!
          </h1>
          <a
            href="#about"
            className="text-lg inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#about').scrollIntoView({behavior:'smooth'});
            }}
          >
            Here's a preview of me!
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
