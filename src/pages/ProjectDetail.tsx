import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";

// Types match your existing schema
interface ProjectImage {
  src: string;
  alt: string;
  caption?: string | null;
  type?: 'image' | 'video'; // Added type field
}
interface ProjectChallenge {
  description: string;
  solution: string;
}
interface Project {
  id: string;
  name: string;
  isFeatured?: boolean;
  shortDescription?: string | null;
  longDescription?: string | null;
  images?: ProjectImage[];
  technologiesUsed: string[];
  toolsUsed: string[];
  liveUrl?: string | null;
  githubUrl?: string | null;
  caseStudyUrl?: string | null;
  rolePlayed?: string | null;
  challenges?: ProjectChallenge[];
  outcome?: string | null;
}

// --------- Minimal tokens ---------
const tokens = {
  maxW: "max-w-[1120px]",
  text: {
    body: "text-[17px] leading-[1.75] text-zinc-700",
    kicker: "text-xs tracking-[0.18em] uppercase text-zinc-500",
    h1: "text-[clamp(40px,6vw,84px)] leading-[0.95] font-semibold text-zinc-900",
    h2: "text-[clamp(24px,3.2vw,40px)] leading-tight font-semibold text-zinc-900",
    h3: "text-[clamp(18px,2.2vw,24px)] leading-tight font-semibold text-zinc-900",
    meta: "text-sm text-zinc-600",
  },
  card: "rounded-2xl bg-white shadow-sm ring-1 ring-black/5",
  pad: "p-5 md:p-6 lg:p-8",
};

// --------- Media Component (handles both images and videos) ---------
const MediaComponent: React.FC<{ 
  item: ProjectImage; 
  className?: string; 
  aspectRatio?: string;
}> = ({ item, className = "", aspectRatio }) => {
  const isVideo = item.type === 'video' || item.src.endsWith('.mov') || item.src.endsWith('.mp4');
  
  if (isVideo) {
    return (
      <div className={`w-full max-w-[225px] mx-auto ${aspectRatio || 'aspect-[9/16]'}`}>
        <video 
          autoPlay
          muted
          loop
          playsInline
          controls 
          className={`w-full h-full rounded-2xl object-contain ${className}`}
          poster={item.src.replace(/\.(mov|mp4)$/, '.jpg')} // Try to find a poster image
        >
          <source src={item.src} type="video/mp4" />
          <source src={item.src} type="video/quicktime" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
  
  return (
    <img 
      src={item.src} 
      alt={item.alt} 
      className={`w-full rounded-2xl object-contain ${aspectRatio || ''} ${className}`} 
    />
  );
};

// --------- Media Placeholder ---------
const MediaPlaceholder: React.FC<{ label?: string; aspect?: string; className?: string }> = ({ 
  label = "Media", 
  aspect = "aspect-[16/9]", 
  className = "" 
}) => (
  <div className={`${aspect} w-full overflow-hidden rounded-2xl bg-zinc-100 ${className}`}>
    <div className="h-full w-full grid place-items-center">
      <div className="text-center">
        <div className="mx-auto mb-2 h-12 w-12 rounded-xl bg-zinc-200" />
        <p className="text-xs text-zinc-500">{label} placeholder</p>
      </div>
    </div>
  </div>
);

// --------- Chip ---------
const Chip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-zinc-300 px-3 py-1 text-sm text-zinc-700">
    {children}
  </span>
);

// --------- External Link Button ---------
const LinkBtn: React.FC<{ href: string; variant?: "primary" | "ghost"; children: React.ReactNode }> = ({ 
  href, 
  variant = "primary", 
  children 
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={
      variant === "primary"
        ? "inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-2.5 text-white hover:bg-zinc-800 transition"
        : "inline-flex items-center justify-center rounded-full border border-zinc-300 px-5 py-2.5 text-zinc-800 hover:bg-zinc-50 transition"
    }
  >
    {children}
  </a>
);

// --------- Section Wrapper ---------
const Section: React.FC<{ children: React.ReactNode; id?: string; className?: string }> = ({ 
  children, 
  id, 
  className = "" 
}) => (
  <section id={id} className={`px-5 md:px-8 ${className}`}>
    <div className={`${tokens.maxW} mx-auto`}>{children}</div>
  </section>
);

const Divider: React.FC = () => (
  <hr className="my-16 md:my-24 border-t border-zinc-200" />
);

const ProjectDependenciesPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    if (!projectId) return;
    setLoading(true);
    setError(null);
    fetch("/projects.json")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((list: Project[]) => {
        const found = list.find((p) => p.id === projectId);
        if (!found) return setError("Project not found."), setProject(null);
        setProject(found);
      })
      .catch((e) => {
        console.error(e);
        setError("Failed to load project details.");
      })
      .finally(() => setLoading(false));
  }, [projectId]);

  useEffect(() => setReadMore(false), [projectId]);

  const allImages = useMemo(() => project?.images ?? [], [project]);
  const videoItems = useMemo(() => allImages.filter(item => 
    item.type === 'video' || item.src.endsWith('.mov') || item.src.endsWith('.mp4')
  ), [allImages]);

  if (loading) {
    return (
      <div className="min-h-[70vh] grid place-items-center text-zinc-600">Loading…</div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] grid place-items-center text-red-700">Error: {error}</div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-[70vh] grid place-items-center text-zinc-600">No project found.</div>
    );
  }

  return (
    <main className="bg-white">
      {/* HERO (full-bleed) */}
      <div className="relative">
        {allImages[0]?.src ? (
          <div className="w-full">
            <MediaComponent 
              item={allImages[0]} 
              aspectRatio="h-[44vh] md:h-[60vh]"
            />
          </div>
        ) : (
          <MediaPlaceholder label="Hero Media" aspect="aspect-[3/1]" />
        )}
      </div>

      {/* Title & Meta */}
      <Section className="pt-10 md:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-16">
          <div>
            <p className={tokens.text.kicker}>Case Study</p>
            <h1 className={`${tokens.text.h1} mt-3`}>{project.name}</h1>

            {project.shortDescription && (
              <p className={`${tokens.text.body} mt-6 max-w-[68ch]`}>{project.shortDescription}</p>
            )}

            {project.longDescription && project.longDescription !== project.shortDescription && (
              <div className="mt-6">
                <div className={`${tokens.text.body} max-w-[72ch] whitespace-pre-line ${readMore ? "" : "line-clamp-6"}`}>
                  {project.longDescription}
                </div>
                <button
                  onClick={() => setReadMore((s) => !s)}
                  className="mt-3 text-sm font-medium text-zinc-700 underline decoration-zinc-300 underline-offset-4 hover:text-zinc-900"
                >
                  {readMore ? "Show less" : "Read more"}
                </button>
              </div>
            )}
          </div>

          {/* Sticky Meta (desktop) */}
          <aside className="lg:sticky lg:top-24 self-start">
            <div className={`${tokens.card} ${tokens.pad}`}>
              <div className="space-y-6">
                {project.rolePlayed && (
                  <div>
                    <p className={tokens.text.kicker}>Role</p>
                    <p className="mt-2 text-[15px] leading-7 text-zinc-800">{project.rolePlayed}</p>
                  </div>
                )}

                {(project.technologiesUsed?.length || 0) > 0 && (
                  <div>
                    <p className={tokens.text.kicker}>Technologies</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.technologiesUsed.map((t, i) => (
                        <Chip key={i}>{t}</Chip>
                      ))}
                    </div>
                  </div>
                )}

                {(project.toolsUsed?.length || 0) > 0 && (
                  <div>
                    <p className={tokens.text.kicker}>Tools</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.toolsUsed.map((t, i) => (
                        <Chip key={i}>{t}</Chip>
                      ))}
                    </div>
                  </div>
                )}

                {(project.liveUrl || project.githubUrl || project.caseStudyUrl) && (
                  <div className="pt-2 flex flex-wrap gap-2">
                    {project.liveUrl && <LinkBtn href={project.liveUrl}>Live Demo</LinkBtn>}
                    {project.githubUrl && <LinkBtn variant="ghost" href={project.githubUrl}>GitHub</LinkBtn>}
                    {project.caseStudyUrl && <LinkBtn variant="ghost" href={project.caseStudyUrl}>Case Study</LinkBtn>}
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Divider />

      {/* MEDIA STRIP (wide, alternating) */}
      <Section>
        <div className="space-y-12 md:space-y-16">
          {/* First wide media */}
          <div>
            {allImages[1]?.src ? (
              <div>
                <MediaComponent item={allImages[1]} />
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-semibold text-zinc-900 mb-2">Core Interface Design</h3>
                  <p className="text-sm text-zinc-600 max-w-[60ch] mx-auto">
                    {allImages[1]?.caption || "An intuitive system that applies to all different player types - from amateur to professional - allowing anyone to customize what they see on their card."}
                  </p>
                </div>
              </div>
            ) : (
              <MediaPlaceholder label="Wide Image" aspect="aspect-[21/9]" />
            )}
          </div>

          {/* Two-column media row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              {allImages[2]?.src ? (
                <MediaComponent item={allImages[2]} aspectRatio="aspect-[4/3]" />
              ) : (
                <MediaPlaceholder label="Left (4:3)" aspect="aspect-[4/3]" />
              )}
              <div className="mt-3">
                <h4 className="text-base font-semibold text-zinc-900">User Research & Personas</h4>
                <p className="text-sm text-zinc-600 mt-1">
                  {allImages[2]?.caption || "Real user research was conducted, including journey mapping and personas, to understand what parents of kids playing sports actually want."}
                </p>
              </div>
            </div>
            
            <div>
              {allImages[3]?.src ? (
                <MediaComponent item={allImages[3]} aspectRatio="aspect-[9/16]" />
              ) : (
                <MediaPlaceholder label="Right (9:16)" aspect="aspect-[9/16]" />
              )}
              <div className="mt-3">
                <h4 className="text-base font-semibold text-zinc-900">Mobile-First Design</h4>
                <p className="text-sm text-zinc-600 mt-1">
                  {allImages[3]?.caption || "The app easily lays out sport-specific stats — goals and assists for hockey, home runs for baseball, and so on for various sports."}
                </p>
              </div>
            </div>
          </div>

          {/* Video section - show first video if available */}
          {videoItems[0] && (
            <div className="flex justify-center">
              <div className="w-auto text-center">
                <MediaComponent item={videoItems[0]} aspectRatio="aspect-[9/16]" />
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-zinc-900 mb-2">Interactive Prototype</h3>
                  <p className="text-sm text-zinc-600 max-w-[40ch] mx-auto">
                    {videoItems[0].caption || "A functional prototype demonstrating the core user flow - from photo upload to customized trading card creation."}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 text-xs text-zinc-500 bg-zinc-50 px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Live Demo
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Section>

      <Divider />

      {/* CHALLENGES & SOLUTIONS */}
      {(project.challenges?.length || 0) > 0 && (
        <Section id="challenges">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-16">
            <div>
              <h2 className={tokens.text.h2}>Challenges & Solutions</h2>
              <div className="mt-6 space-y-10">
                {project.challenges!.map((c, i) => (
                  <div key={i}>
                    <p className={`${tokens.text.kicker}`}>Challenge {i + 1}</p>
                    <h3 className={`${tokens.text.h3} mt-2`}>{c.description}</h3>
                    <div className={`${tokens.text.body} mt-3`}>
                      <span className="font-medium text-zinc-900">Solution:</span> {c.solution}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="lg:sticky lg:top-24 self-start">
              <div className={`${tokens.card} ${tokens.pad}`}>
                <p className={tokens.text.kicker}>Key Insight</p>
                <p className="mt-3 text-[17px] leading-7 text-zinc-800">
                  "Having one app that manages all sports is a novel concept not currently available. In today's competitive world, tracking data is something even children enjoy."
                </p>
                <div className="mt-4 pt-4 border-t border-zinc-100">
                  <p className="text-sm text-zinc-600">
                    <span className="font-medium text-zinc-900">Market Gap:</span> No existing solution provides multi-sport data tracking in a customizable, card-format interface.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </Section>
      )}

      {/* OUTCOME */}
      {(project.outcome || "").length > 0 && (
        <>
          <Divider />
          <Section id="outcome" className="pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-16">
              <div>
                <h2 className={tokens.text.h2}>Outcome</h2>
                <p className={`${tokens.text.body} mt-4 whitespace-pre-line max-w-[72ch]`}>
                  {project.outcome}
                </p>
              </div>

              <aside className="lg:sticky lg:top-24 self-start">
                <div className={`${tokens.card} ${tokens.pad} space-y-4`}>
                  <p className={tokens.text.kicker}>Explore</p>
                  <div className="flex flex-wrap gap-2">
                    {project.liveUrl && <LinkBtn href={project.liveUrl}>See it live</LinkBtn>}
                    {project.githubUrl && <LinkBtn variant="ghost" href={project.githubUrl}>View code</LinkBtn>}
                  </div>
                  <Link to="/projects" className="inline-block text-sm text-zinc-600 underline underline-offset-4">Back to all projects</Link>
                </div>
              </aside>
            </div>
          </Section>
        </>
      )}

      <Divider />

      {/* GALLERY GRID */}
      <Section className="pb-24">
        <div className="text-center mb-12">
          <h2 className={`${tokens.text.h2} mb-4`}>Project Gallery</h2>
          <p className="text-zinc-600 max-w-[60ch] mx-auto">
            A comprehensive look at the design process, from initial wireframes to final prototype screens.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allImages.slice(0, 9).map((item, i) => {
            // Enhanced captions for gallery items
            const enhancedCaptions = [
              "Multi-sport interface showing card customization options across different sports and skill levels.",
              "User onboarding flow demonstrating the intuitive photo-to-card transformation process.",
              "Stats input interface with sport-specific data fields and validation.",
              "Card template selection showing various design options and layouts available.",
              "Interactive prototype demo showcasing the complete user journey.",
              "Export and sharing functionality with multiple format options.",
              "Advanced customization panel with typography and color controls.",
              "Final card output examples across multiple sports and player types."
            ];
            
            return (
              <figure key={i} className="space-y-3 group">
                {item.type === 'video' || item.src.endsWith('.mov') || item.src.endsWith('.mp4') ? (
                  <video 
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls 
                    className="w-full aspect-[4/3] rounded-2xl object-contain bg-zinc-50 group-hover:shadow-lg transition-shadow duration-300"
                  >
                    <source src={item.src} type="video/mp4" />
                    <source src={item.src} type="video/quicktime" />
                  </video>
                ) : (
                  <img 
                    src={item.src} 
                    alt={item.alt} 
                    className="w-full aspect-[4/3] rounded-2xl object-contain bg-zinc-50 group-hover:shadow-lg transition-shadow duration-300" 
                  />
                )}
                <figcaption className="text-xs text-zinc-500 leading-relaxed">
                  {item.caption || enhancedCaptions[i] || `Design iteration ${i + 1} showing key interface elements and user interaction patterns.`}
                </figcaption>
              </figure>
            );
          })}

          {/* Fill remaining with placeholders up to 9 */}
          {Array.from({ length: Math.max(0, 9 - Math.min(allImages.length, 9)) }).map((_, i) => (
            <MediaPlaceholder key={`ph-${i}`} label="Gallery" aspect="aspect-[4/3]" />
          ))}
        </div>
      </Section>
    </main>
  );
};

export default ProjectDependenciesPage;