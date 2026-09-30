import React, { useState } from 'react';
import { GALLERY_PROJECTS } from '../data/studioData';
import { GalleryProject } from '../types';
import { Eye, X, CheckCircle2, Clock, Tag, ArrowRight } from 'lucide-react';

interface WorkGalleryProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const WorkGallery: React.FC<WorkGalleryProps> = ({ onOpenBooking }) => {
  const [filter, setFilter] = useState<'all' | 'headlights' | 'wash' | 'combo' | 'interior'>('all');
  const [activeModalProject, setActiveModalProject] = useState<GalleryProject | null>(null);

  const filteredProjects =
    filter === 'all'
      ? GALLERY_PROJECTS
      : GALLERY_PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#0A0A0A] border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold tracking-[0.2em] text-[#00D2FF] uppercase mb-2">
              Restoration Demonstrations
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
              OUR WORK
            </h2>
            <p className="mt-2 text-neutral-400 text-sm sm:text-base max-w-xl">
              Inspect real restoration demonstrations and mobile detailing results. Click any example to view the step-by-step breakdown.
            </p>
          </div>

          {/* Functional filter buttons as allowed in frontend-design */}
          <div className="flex items-center gap-1.5 p-1 bg-[#141414] border border-neutral-800 rounded-sm overflow-x-auto max-w-full">
            {[
              { id: 'all', label: 'All Examples' },
              { id: 'headlights', label: 'Headlights' },
              { id: 'wash', label: 'Exterior Wash' },
              { id: 'combo', label: 'Combos' },
              { id: 'interior', label: 'Interiors' },
            ].map((tab) => {
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id as typeof filter)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-sm whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#222222] text-[#00D2FF] border border-[#00D2FF]/50 shadow-sm'
                      : 'text-neutral-400 hover:text-white border border-transparent'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveModalProject(project)}
              className="bg-[#121212] border border-neutral-800/80 hover:border-[#00D2FF]/50 rounded-sm overflow-hidden transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              {/* Media Thumbnail */}
              <div className="relative aspect-[4/3] bg-neutral-900 overflow-hidden">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 bg-black/75 px-2.5 py-1 rounded-sm text-[10px] font-mono uppercase tracking-wider text-[#00D2FF] border border-neutral-800">
                  {project.category}
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="font-bold font-display truncate">{project.vehicle}</span>
                  <span className="text-[11px] text-neutral-400 font-mono-tabular shrink-0">{project.hoursLogged}</span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-sm font-bold text-white font-display line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                    {project.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                  <span className="text-neutral-400 font-mono-tabular">
                    R{project.quoteZAR.toLocaleString()}
                  </span>
                  <span className="text-[#00D2FF] group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-semibold text-[11px] uppercase tracking-wider">
                    View Case <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Detail Modal */}
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
            <div className="bg-[#141414] border border-neutral-800 max-w-3xl w-full rounded-sm max-h-[90vh] overflow-y-auto shadow-2xl relative">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                className="absolute top-4 right-4 z-10 p-2 text-neutral-400 hover:text-white bg-black/60 rounded-full border border-neutral-700 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Media Showcase */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2 bg-black">
                {activeModalProject.beforeImage && (
                  <div className="relative aspect-video sm:aspect-[4/3] rounded-sm overflow-hidden">
                    <img
                      src={activeModalProject.beforeImage}
                      alt="Before restoration"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-neutral-300">
                      BEFORE
                    </div>
                  </div>
                )}
                <div className="relative aspect-video sm:aspect-[4/3] rounded-sm overflow-hidden">
                  <img
                    src={activeModalProject.afterImage || activeModalProject.thumbnail}
                    alt="After restoration"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-[#00D2FF]">
                    RESTORED
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <div className="flex items-center gap-3 text-xs text-[#00D2FF] font-mono mb-1">
                    <span>{activeModalProject.vehicle}</span>
                    <span>·</span>
                    <span>{activeModalProject.area}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {activeModalProject.hoursLogged}
                    </span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-white font-display">
                    {activeModalProject.title}
                  </h3>
                  <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
                    {activeModalProject.summary}
                  </p>
                </div>

                {/* Key Outcomes */}
                <div className="p-4 bg-[#181818] border border-neutral-800 rounded-sm">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#00D2FF] mb-2">
                    Verified Transformation Outcomes
                  </div>
                  <ul className="space-y-1.5 text-xs text-neutral-300">
                    {activeModalProject.keyOutcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00D2FF] shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Services performed chips */}
                <div>
                  <div className="text-xs uppercase font-mono text-neutral-400 mb-2">
                    Procedures Conducted:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProject.servicesCompleted.map((s, i) => (
                      <span
                        key={i}
                        className="text-xs text-neutral-300 bg-neutral-900 border border-neutral-700/80 px-3 py-1 rounded-sm"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer action */}
                <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-neutral-400 block font-mono">Completed Job Value</span>
                    <span className="text-xl font-bold text-[#00D2FF] font-mono-tabular">
                      R{activeModalProject.quoteZAR.toLocaleString()}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const id = activeModalProject.id;
                      setActiveModalProject(null);
                      onOpenBooking(id);
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-[#00D2FF] hover:bg-[#38BDF8] rounded-sm transition-all shadow cursor-pointer text-center"
                  >
                    Request Similar Detail
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
