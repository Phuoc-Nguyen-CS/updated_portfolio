import mapleImg from '/src/assets/projects/maple.png';
import clsImg from '/src/assets/projects/cls.png';
import opencvImg from '/src/assets/projects/opencv.jpg';

export const projects = [
  {
    title: 'Maple Guild Management Bot',
    image: mapleImg,
    description: "Manages a member's weekly contribution to the guild...",
    link: 'https://github.com/Phuoc-Nguyen-CS/DiscordMapleBot',
    tags: ['Python', 'PyTesseract', 'Discord.py', 'OpenCV', 'Pandas'],
  },
  {
    title: 'Real-Estate Website',
    image: clsImg,
    description: 'Full-stack commissioned Real-estate website using Supabase...',
    link: 'https://github.com/Jameboyyy/CLS-Properties',
    tags: ['React', 'Swiper.js', 'Supabase', 'Vercel', 'Figma'],
  },
  {
    title: 'Computer Vision',
    image: opencvImg,
    description: "A program that utilized OpenCV to detect hand gestures...",
    link: 'https://github.com/Phuoc-Nguyen-CS/Hand-Gesture-Volume-Control-and-Webpage-Launcher',
    tags: ['Python', 'OpenCV', 'Computer Vision', 'TensorFlow'],
  },
];
