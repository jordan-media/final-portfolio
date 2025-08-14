import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface ProjectImage { src: string; alt?: string; caption?: string | null }
interface Project {
  id: string;
  name: string;
  shortDescription?: string | null;
  images?: ProjectImage[];
  technologiesUsed?: string[];
}

const tokens = {
  maxW: "max-w-4xl", // Changed from max-w-[1120px] to match About page
  text: {
    kicker: "text-xs tracking-[0.18em] uppercase text-zinc-500",
    h1: "text-[clamp(40px,6vw,84px)] leading-[0.95] font-semibold text-zinc-900",
    h2: "text-[clamp(22px,2.6vw,34px)] leading-tight font-semibold",
    body: "text-[17px] leading-[1.75] text-zinc-700",
  },
  card: "rounded-2xl bg-white shadow-sm ring-1 ring-black/5",
  pad: "p-5 md:p-6 lg:p-8",
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Hover play state ---
  const DEFAULT_PLAYING_ID = "amazon-product-video-advertisement";
  const [activePlayingId, setActivePlayingId] = useState<string>(DEFAULT_PLAYING_ID);

  // Map project IDs to animated GIF preview paths
  const gifMap: Record<string, string> = {
    "amazon-product-video-advertisement": "/images/gif/previews/amazon.gif",
    // add more as you create them, e.g.:
    // "wireframing-prototyping": "/images/gif/previews/wireframing-prototyping.gif",
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("/projects.json")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((data: Project[]) => setProjects(data))
      .catch(() => setError("Failed to load projects."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="min-h-[60vh] grid place-items-center">Loading…</div>;
  if (error) return <div className="min-h-[60vh] grid place-items-center text-red-700">Error: {error}</div>;

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="py-8 px-4 max-w-4xl mx-auto font-space-grotesk text-gray-900 leading-relaxed md:py-16 md:px-8">
        <div>
          <img
            src="/images/pages-projects.svg"
            alt="Decorative header"
            className="w-full h-full object-cover sm:-mb-14 md:-mb-14 lg:-mb-18"
          />
          <div className="relative w-full aspect-video rounded-xl overflow-hidden backdrop-blur-[.3em] bg-white/10">
            <div
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{
                boxShadow:
                  "inset -3px -3px 9.1px 1px rgba(255,255,255,0.22), inset 0px 2px 5.5px 0px rgba(255,255,255,0.08), inset 0px -2px 13.7px rgba(23,13,69,0.54)",
              }}
            />
            <div className="absolute inset-0 grid place-items-center p-6 text-center">
              <div className="mx-auto max-w-[800px] space-y-4"> {/* Reduced from 900px to 800px */}
                <p className={tokens.text.kicker}>Who I Am</p>
                <h2 className={`${tokens.text.h2} bg-gradient-to-r from-cyan-400 to-green-500 bg-clip-text text-transparent mt-2`}>
                  From the field to the office — no stone unturned
                </h2>
                <p className={`${tokens.text.body} max-w-[68ch] mx-auto`}> {/* Reduced from 72ch to 68ch */}
                  <span className="font-semibold text-zinc-900">I take a lot of pride</span> in my work — whether it's a one-day task or a months-long project.
                </p>
                <p className={`${tokens.text.body} max-w-[68ch] mx-auto`}>
                  When I look at something physical or think about something digital, I actively think about all the small little gears — turning and moving — and how they affect each other to make that <span className="italic">clock tick</span>.
                </p>
                <p className={`${tokens.text.body} max-w-[68ch] mx-auto`}>
                  My great-grandfather built the <span className="font-semibold">grand clocks</span> that marked the heart of German town squares.
                </p>
                <p className={`${tokens.text.body} max-w-[68ch] mx-auto`}>
                  My grandfather worked at Panasonic, and in the late '80s began a project with a dentist to deliver voice-based dental training from Canada to remote African communities — <span className="text-zinc-900 font-medium">a rare and forward-thinking idea for the time</span>.
                </p>
                <p className={`${tokens.text.body} max-w-[68ch] mx-auto`}>
                  I've carried that same sense of <span className="font-semibold">precision</span> and <span className="font-semibold">forward-thinking</span> into the way I design and develop today.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects List */}
      <section id="projects-list" className="px-4 md:px-8 py-10 md:py-16">
        <div className="max-w-4xl mx-auto">
          <ul className="m-0 grid grid-cols-1 gap-6">
            {projects.map((p) => {
              const isActive = activePlayingId === p.id;
              const animatedSrc = gifMap[p.id];
              const staticThumb = p.images?.[0]?.src; // fallback poster
              const displaySrc = isActive && animatedSrc ? animatedSrc : staticThumb;

              return (
                <li
                  key={p.id}
                  className={`${tokens.card} overflow-hidden group`}
                  onMouseEnter={() => setActivePlayingId(p.id)}
                  onMouseLeave={() => setActivePlayingId(DEFAULT_PLAYING_ID)}
                >
                  <Link to={`/projects/${p.id}`} className="block">
                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-0"> {/* Reduced image width from 240px to 200px */}
                      <div className="md:border-r md:border-zinc-100">
                        {displaySrc ? (
                          <img
                            src={displaySrc}
                            alt={p.images?.[0]?.alt || p.name}
                            className="h-48 w-full object-cover md:h-full"
                            loading="lazy"
                            onError={(e) => {
                              if (isActive && staticThumb && (e.currentTarget as HTMLImageElement).src !== staticThumb) {
                                (e.currentTarget as HTMLImageElement).src = staticThumb;
                              }
                            }}
                          />
                        ) : (
                          <div className="h-48 w-full md:h-full bg-zinc-100 grid place-items-center">
                            <span className="text-xs text-zinc-500">No image</span>
                          </div>
                        )}
                      </div>
                      <div className="p-4 md:p-5 lg:p-6"> {/* Reduced padding slightly */}
                        <p className={tokens.text.kicker}>Case Study</p>
                        <h3 className={`${tokens.text.h2} mt-2 group-hover:underline underline-offset-4`}>{p.name}</h3>
                        {p.shortDescription && <p className={`${tokens.text.body} mt-3 line-clamp-3`}>{p.shortDescription}</p>}
                        {p.technologiesUsed && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {p.technologiesUsed.slice(0, 6).map((t, i) => (
                              <span key={i} className="inline-flex items-center rounded-full border border-zinc-300 px-3 py-1 text-sm text-zinc-700">{t}</span>
                            ))}
                          </div>
                        )}
                        <div className="mt-5 flex flex-wrap gap-3">
                          <Link to={`/projects/${p.id}`} className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800 transition">View details</Link>
                          <Link to={`/projects/${p.id}/dependencies`} className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-4 py-2 text-zinc-800 hover:bg-zinc-50 transition">Showcase layout</Link>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Projects;