import type { Project } from '../../data/types';

export const ProjectCard = ({ project }: { project: Project }) => (
    <div className="bg-white/5 p-4 md:p-8 border border-white/10 rounded-sm hover:border-blue-500/50 transition-colors">
        <p className="text-white font-black mb-1 uppercase text-xs md:text-base tracking-widest">
            {project.title}
        </p>
        <p className="text-[9px] md:text-xs text-blue-400 font-bold mb-4">
            {project.tech}
        </p>
        <p
            className="text-xs md:text-sm text-white/70"
            dangerouslySetInnerHTML={{ __html: project.description }}
        />
    </div>
);