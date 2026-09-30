import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { useNavigation } from '../context/NavigationContext';
import { GALLERY_PROJECTS } from '../data/studioData';
import { GalleryProject } from '../types';
import {
  Clock,
  CheckCircle2,
  X,
  ArrowRight,
  Filter,
  Sparkles,
  Camera,
  MapPin,
  Check,
} from 'lucide-react';

export const WorkGalleryPage: React.FC = () => {
  const { openBooking, openCoupon } = useNavigation();
  const [filter, setFilter] = useState<'all' | 'headlights' | 'wash' | 'combo' | 'interior'>('all');
  const [activeModalProject, setActiveModalProject] = useState<GalleryProject | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = GALLERY_PROJECTS.filter((project) => {
    const matchesCategory = filter === 'all' || project.category === filter;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.area.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#080808] text-[#F0EFEA] min-h-screen">
      <PageHeader
        badge="Restoration Demonstrations · West Coast"
        title="OUR WORK & DEMONSTRATION ARCHIVE"
        subtitle="Explore demonstrations of our mobile headlight restoration and detailing services. See before-and-after results and learn what our mobile team achieves at your location."
        breadcrumbs={[{ label: 'Our Work' }]}
        primaryAction={{
          label: 'Book Mobile Service',
          onClick: () => openBooking(),
        }}
        secondaryAction={{
          label: 'WhatsApp: 073 859 5637',
          onClick: () => {
            window.location.href = `https://wa.me/27738595637?text=${encodeURIComponent(
              "Hi, I'd like to book a headlight restoration or mobile detail."
            )}`;
          },
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-12">
        
        {/* Filter Bar & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#121212] border border-neutral-800 rounded-sm">
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
                      ? 'bg-[#222222] text-[#D4AF37] border border-[#D4AF37]/50 shadow-sm'
                      : 'text-neutral-400 hover:text-white border border-transparent'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Search by area or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121212] border border-neutral-800 rounded-sm px-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveModalProject(project)}
              className="bg-[#121212] border border-neutral-800 rounded-sm overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-300 group cursor-pointer flex flex-col justify-between shadow-xl"
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
                <div className="absolute top-3 left-3 bg-black/75 px-2.5 py-1 rounded-sm text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] border border-neutral-800">
                  {project.category}
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="font-bold font-display truncate">{project.vehicle}</span>
                  <span className="text-[11px] text-[#E5C07B] font-mono-tabular shrink-0 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {project.area}
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex flex-col justify-between flex-1">
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
                  <span className="text-[#D4AF37] group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-semibold text-[11px] uppercase tracking-wider">
                    View Details <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Local Community Note */}
        <div className="p-8 bg-[#111111] border border-neutral-800 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-white font-display">
              Want to see your vehicle restored next?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400">
              We travel directly to your location across Vredenburg, Saldanha, Langebaan, and Jacobsbaai.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openBooking()}
            className="w-full md:w-auto px-6 py-3 text-xs font-bold uppercase tracking-wider text-black bg-[#D4AF37] hover:bg-[#E5C07B] rounded-sm transition-all shadow-md cursor-pointer shrink-0"
          >
            Book Mobile Service
          </button>
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
                {activeModalProject.afterImage && (
                  <div className="relative aspect-video sm:aspect-[4/3] rounded-sm overflow-hidden">
                    <img
                      src={activeModalProject.afterImage}
                      alt="After restoration"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 bg-[#D4AF37] px-2 py-0.5 rounded text-[10px] font-mono font-bold text-black">
                      AFTER
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Content Details */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] mb-1">
                    <span>{activeModalProject.vehicle}</span>
                    <span>·</span>
                    <span>{activeModalProject.area}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-display">
                    {activeModalProject.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
                    {activeModalProject.summary}
                  </p>
                </div>

                {/* Procedures Conducted */}
                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase text-neutral-400">
                    Procedures Conducted:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                    {activeModalProject.servicesCompleted.map((s, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Outcomes */}
                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase text-neutral-400">
                    Key Outcomes:
                  </div>
                  <div className="space-y-1.5 text-xs text-neutral-300">
                    {activeModalProject.keyOutcomes.map((k, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                        <span>{k}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-mono text-neutral-500 block">
                      Price:
                    </span>
                    <span className="text-xl font-bold font-mono text-[#D4AF37]">
                      R{activeModalProject.quoteZAR.toLocaleString()}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveModalProject(null);
                      openBooking(activeModalProject.id);
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-[#D4AF37] hover:bg-[#E5C07B] rounded-sm transition-all cursor-pointer shadow-md text-center"
                  >
                    Book Similar Service
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
