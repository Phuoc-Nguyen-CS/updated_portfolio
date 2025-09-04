// projectsData.js

// Dynamically import all project images from src/assets/projects
const projectImages = Object.values(import.meta.glob('/src/assets/projects/*', { eager: true }))
  .reduce((acc, img) => {
    const name = img.default.split('/').pop().split('.')[0]; // filename without extension
    acc[name] = img.default;
    return acc;
  }, {});

export const projects = [
  {
    title: 'Maple Guild Management Bot',
    image: projectImages['maple'], // use the imported image
    description: "Manages a member's weekly contribution to the guild. Reduced Junior's workload by 99% every week",
    link: 'https://github.com/Phuoc-Nguyen-CS/DiscordMapleBot',
    tags: ['Python', 'PyTesseract', 'Discord.py', 'OpenCV', 'Pandas'],
  },
  {
    title: 'Real-Estate Website',
    image: projectImages['cls'],
    description: 'Full-stack commissioned Real-estate website using Supabase, hosted on Vercel, and modern carousels made using Swiper.js',
    link: 'https://github.com/Jameboyyy/CLS-Properties',
    tags: ['React', 'Swiper.js', 'Supabase', 'Vercel', 'Figma'],
  },
  {
    title: 'Computer Vision',
    image: projectImages['opencv'],
    description: "A program that utilized OpenCV to detect hand gestures I've trained which then outputs certain effects on the computer",
    link: 'https://github.com/Phuoc-Nguyen-CS/Hand-Gesture-Volume-Control-and-Webpage-Launcher',
    tags: ['Python', 'OpenCV', 'Computer Vision', 'TensorFlow'],
  },
];

export const languagesFrameworks = [
  { category: 'Languages', items: ['JavaScript', 'Python', 'Java', 'C++', 'C'] },
  { category: 'Frameworks', items: ['React', 'Supabase', 'Tailwind', 'Pandas', 'TensorFlow', 'OpenCV', 'Discord.py', 'PyTesseract'] },
];
