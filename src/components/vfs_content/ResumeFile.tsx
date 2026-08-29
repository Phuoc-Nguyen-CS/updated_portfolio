import { ProjectCard } from "../ui/ProjectCard";
import type { Project } from "../../data/types";

const ALL_PROJECTS: Project[] = [
  {
    title: "LOL Drafting Phase Tool",
    tech: "Python / XGBoost / Supabase / RIOTAPI",
    description: <>A <span className="text-white font-bold">predictive model</span> that analyzes data from the RIOT API to find the best champion on a variety of factors for the given draft</>,
  },
  {
    title: "Automation Tool",
    tech: "Python / OpenCV / BS4 / Tesseract",
    description: <>Boosted speed by <span className="text-white font-bold">92%</span> via async refactoring and automated OCR data extraction.</>,
  },
  {
    title: "Gesture Detection",
    tech: "Python / TensorFlow / MediaPipe",
    description: <>Achieved <span className="text-white font-bold">95% accuracy</span> in real-time hand-tracking and custom model training.</>,
  },
  {
    title: "MIR_OS Portfolio",
    tech: "React / TS / Tailwind / GHA",
    description: <>Engineered a <span className="text-white font-bold">Virtual File System</span> with automated CI/CD pipelines.</>,
  },
];

export const ResumeFile = () => (
  <div className="mt-4 space-y-10 md:space-y-14 text-base md:text-xl max-w-5xl font-mono leading-relaxed antialiased">
    {/* HEADER */}
    <div className="border-b-4 border-hacker-blue/20 pb-6 md:pb-10">
      <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
        Phuoc [Peter] Nguyen
      </h2>
      <div className="flex flex-wrap gap-3 md:gap-6 mt-3 md:mt-4 text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] md:tracking-[0.4em]">
        <span className="text-hacker-blue">Full-Stack Engineer</span>
        <span className="text-white/20">//</span>
        <span className="text-hacker-blue/70">VFS_USER_ROOT</span>
      </div>
    </div>

    {/* 01. EDUCATION */}
    <section>
      <p className="text-hacker-blue font-black text-xs md:text-base tracking-[0.2em] mb-4 md:mb-8 flex items-center gap-4">
        <span className="w-8 md:w-16 h-1 bg-hacker-blue"></span> 01.
        EDUCATION_HISTORY
      </p>
      <div className="pl-4 md:pl-10 border-l-2 md:border-l-4 border-hacker-blue/20 ml-1">
        <p className="text-white font-black text-lg md:text-2xl mb-1">
          California State University, Fullerton
        </p>
        <p className="text-white/80 text-sm md:text-xl font-bold">
          B.S. Computer Science{" "}
          <span className="hidden md:inline text-hacker-blue mx-2">|</span>{" "}
          <br className="md:hidden" /> GPA: 3.60
        </p>
        <p className="text-[10px] md:text-sm text-hacker-blue/40 italic mt-2 md:mt-3 tracking-widest uppercase font-bold">
          Dean’s List 21-23 // Grad May 2023
        </p>
      </div>
      <div className="pl-4 md:pl-10 border-l-2 md:border-l-4 border-hacker-blue/20 ml-1 mt-6">
        <p className="text-white font-black text-lg md:text-2xl mb-1">
          California State University, Long Beach
        </p>
        <p className="text-white/80 text-sm md:text-xl font-bold">
          M.S. Computer Science{" "}
          <span className="hidden md:inline text-hacker-blue mx-2">|</span>{" "}
          <br className="md:hidden" /> GPA: N/A
        </p>
        <p className="text-[10px] md:text-sm text-hacker-blue/40 italic mt-2 md:mt-3 tracking-widest uppercase font-bold">
          Expected Grad May 2028
        </p>
      </div>
    </section>

    {/* 02. WORK EXPERIENCE */}
    <section>
      <p className="text-hacker-blue font-black text-xs md:text-base tracking-[0.2em] mb-4 md:mb-8 flex items-center gap-4">
        <span className="w-8 md:w-16 h-1 bg-hacker-blue"></span> 02.
        WORK_EXPERIENCE_LOG
      </p>
      <div className="space-y-10 md:space-y-16 pl-4 md:pl-10 border-l-2 md:border-l-4 border-hacker-blue/20 ml-1">
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start mb-4 md:mb-6 gap-2">
            <p className="text-white font-black text-lg md:text-2xl underline decoration-hacker-blue/30 underline-offset-4">
              Full-Stack Freelance Developer
            </p>
            <span className="text-[10px] md:text-sm font-bold bg-hacker-blue/20 text-hacker-blue px-3 py-1 rounded-full uppercase">
              2025-2026
            </span>
          </div>
          <ul className="space-y-4 text-white/70 text-sm md:text-lg">
            <li className="flex gap-3">
              <span className="text-hacker-blue font-bold">›</span>
              <span>
                Collaborated with a client to modernize their real-estate
                website using{" "}
                <span className="text-white font-bold">
                  React, Supabase, Swiper.js, and EmailJS
                </span>{" "}
                to increase sales and outreach through improved UI/UX.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-hacker-blue font-bold">›</span>
              <span>
                Designed the website interface using{" "}
                <span className="text-white font-bold">Figma</span>, creating a
                modern, user-friendly experience aligning with the client’s
                brand identity.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-hacker-blue font-bold">›</span>
              <span>
                Optimized web performance for legacy devices
                <span className="text-white font-bold"> by reducing</span> asset
                payload and{" "}
                <span className="text-white font-bold">
                  implementing lazy loading.
                </span>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-hacker-blue font-bold">›</span>
              <span>
                Managed the project using an{" "}
                <span className="text-white font-bold">Agile framework</span> to
                prioritize delivering high-value features to stakeholders.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-hacker-blue font-bold">›</span>
              <span>
                Deployed via{" "}
                <span className="text-white font-bold">Vercel</span>, leveraging
                its global infrastructure to suit the client’s requirements for
                wider geographic reach.
              </span>
            </li>
          </ul>
        </div>
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start mb-4 md:mb-6 gap-2">
            <p className="text-white font-black text-lg md:text-2xl font-bold">
              Audio Visual Solutions
            </p>
            <span className="text-[10px] md:text-sm font-bold bg-hacker-blue/10 text-hacker-blue px-3 py-1 rounded-full uppercase">
              IT Tech // 2024
            </span>
          </div>
          <ul className="space-y-3 text-white/70 text-sm md:text-lg">
            <li className="flex gap-3">
              <span className="text-hacker-blue font-bold">›</span>
              <span>
                Led installation and configuration of mission-critical hardware
                ensuring{" "}
                <span className="text-white font-bold">100% uptime</span>.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-hacker-blue font-bold">›</span>
              <span>
                Managed and organized cables, maintaining a clean and
                professional setup{" "}
                <span className="text-white font-bold">preventing</span>{" "}
                potential hazards ensuring workflow during the event.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-hacker-blue font-bold">›</span>
              <span>
                Learned procedures{" "}
                <span className="text-white font-bold">quickly</span> in a{" "}
                <span className="text-white font-bold">
                  fast-paced environment
                </span>{" "}
                and ensured quality work was done.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    {/* 03. PROJECTS - ALL IN ONE GRID */}
    <section>
      <p className="text-hacker-blue font-black text-xs md:text-base tracking-[0.2em] mb-4 md:mb-8 flex items-center gap-4">
        <span className="w-8 md:w-16 h-1 bg-hacker-blue"></span> 03.
        REPOSITORY_PROJECTS
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8 pl-4 md:pl-10 border-l-2 md:border-l-4 border-hacker-blue/20 ml-1 items-start">
        {ALL_PROJECTS.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>

    {/* 04-07. SKILLS, CERTS & STATS */}
    <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 pt-6">
      <div className="space-y-10">
        <div>
          <p className="text-hacker-blue font-black text-[10px] md:text-sm tracking-widest uppercase underline underline-offset-8 decoration-hacker-blue/20 mb-4">
            04. TECH_STACK
          </p>
          <div className="space-y-3 text-xs md:text-base">
            <p>
              <span className="text-hacker-blue font-black text-[10px] md:text-sm tracking-widest uppercase underline-offset-8 mr-2">
                [LANG]
              </span>{" "}
              Python, C/C++, JS, TS, SQL, Java, R
            </p>
            <p>
              <span className="text-hacker-blue font-black text-[10px] md:text-sm tracking-widest uppercase underline-offset-8 mr-2">
                [FRAME]
              </span>{" "}
              React, Next, OpenCV, TF, Django, Supabase
            </p>
            <p>
              <span className="text-hacker-blue font-black text-[10px] md:text-sm tracking-widest uppercase underline-offset-8 mr-2">
                [SOFT]
              </span>{" "}
              GitHub, Figma, VSCode, Vercel, R Studio
            </p>
          </div>
        </div>
        <div>
          <p className="text-hacker-blue font-black text-[10px] md:text-sm tracking-widest uppercase underline underline-offset-8 decoration-hacker-blue/20 mb-4">
            05. CERTIFICATIONS
          </p>
          <div className="flex items-center gap-4 bg-hacker-blue/5 p-4 border border-hacker-blue/20">
            <span className="text-hacker-blue font-black text-lg md:text-2xl">
              [AWS]
            </span>
            <div className="flex flex-col">
              <span className="text-white font-black text-xs md:text-base uppercase">
                Cloud Practitioner
              </span>
              <span className="text-[8px] md:text-[10px] text-hacker-blue font-bold tracking-tighter uppercase">
                ID: CLF-C02 | CERTIFIED: 01.08.2026
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-10">
        <div>
          <p className="text-hacker-blue font-black text-[10px] md:text-sm tracking-widest uppercase underline underline-offset-8 decoration-hacker-blue/20 mb-4">
            06. TRAITS
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "Adaptability",
              "Quality Assurance",
              "Agile Workflow",
              "Communication",
              "Growth Mindset",
            ].map((skill) => (
              <span
                key={skill}
                className="text-[10px] md:text-xs border border-hacker-blue/20 px-2 py-1 text-hacker-blue font-bold uppercase hover:bg-hacker-blue/10 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-hacker-blue font-black text-[10px] md:text-sm tracking-widest uppercase underline underline-offset-8 decoration-hacker-blue/20 mb-4">
            07. LEETCODE_PROGRESS
          </p>
          <div className="bg-black/40 border border-hacker-blue/10 p-4">
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center py-2 bg-hacker-blue/5">
                <p className="text-[8px] text-hacker-blue font-bold uppercase">
                  Easy
                </p>
                <p className="text-base md:text-2xl text-white font-black">
                  17
                </p>
              </div>
              <div className="text-center py-2 bg-hacker-blue/10">
                <p className="text-[8px] text-hacker-blue font-bold uppercase">
                  Med
                </p>
                <p className="text-base md:text-2xl text-white font-black">
                  43
                </p>
              </div>
              <div className="text-center py-2 bg-hacker-blue/20">
                <p className="text-[8px] text-hacker-blue font-bold uppercase">
                  Hard
                </p>
                <p className="text-base md:text-2xl text-white font-black">
                  11
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div className="pt-8 opacity-20 text-center border-t-2 border-hacker-blue/20 text-[10px] md:text-sm text-hacker-blue font-black tracking-[1em] uppercase">
      --- END OF TRANSMISSION ---
    </div>
  </div>
);
