import type { Project } from "../../data/types";

export const ProjectCard = ({ project }: { project: Project }) => (
  <div className="group bg-white/5 p-4 md:p-8 border border-white/10 rounded-sm hover:border-hacker-blue/50 transition-all duration-300 flex flex-col">
    <div className="flex flex-col mb-2">
      <p className="text-white font-black mb-1 uppercase text-xs md:text-base tracking-widest">
        {project.title}
      </p>
      <p className="text-[9px] md:text-xs text-hacker-blue font-bold">
        {project.tech}
      </p>
    </div>

    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
      <div className="overflow-hidden">
        <p
          className="text-xs md:text-sm text-white/70 pt-4 mt-2 border-t border-white/10 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: project.description }}
        />
      </div>
    </div>

    <div className="mt-4 flex items-center gap-2 opacity-30 group-hover:opacity-0 transition-opacity">
      <span className="w-2 h-2 bg-hacker-blue animate-pulse"></span>
      <span className="text-[8px] uppercase tracking-widest text-white font-mono">
        hover_to_expand_logs
      </span>
    </div>
  </div>
);
