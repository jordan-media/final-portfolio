import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";

/**
 * ProjectDependenciesPage
 * A refined, whitespace-forward case-study layout modeled after boutique studio sites.
 * - Sticky meta sidebar (desktop)
 * - Full-bleed hero
 * - Generous whitespace, large type, restrained color
 * - Media placeholders that you can replace with images/videos later (sizes matched via aspect ratios)
 * - Works with your existing /projects.json structure (Project, ProjectImage, ProjectChallenge)
 * - Graceful handling for projects with more text than media
 */

// Types match your existing schema
interface ProjectImage {
  src: string;
  alt: string;
  caption?: string | null;
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

// --------- Minimal tokens (adjust to your brand later) ---------
const tokens = {
  maxW: "max-w-[1120px]", // a touch wider than your current 4xl container
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

// --------- Media Placeholder ---------
const MediaPlaceholder: React.FC<{ label?: string; aspect?: string; className?: string }>= ({ label = "Media", aspect = "aspect-[16/9]", className = "" }) => (
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
const LinkBtn: React.FC<{ href: string; variant?: "primary" | "ghost"; children: React.ReactNode }>= ({ href, variant = "primary", children }) => (
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
const Section: React.FC<{ children: React.ReactNode; id?: string; className?: string }> = ({ children, id, className = "" }) => (
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
        {/* Hero media: show first image if present, else a tall placeholder */}
        {allImages[0]?.src ? (
          <div className="w-full">
            <img
              src={allImages[0].src}
              alt={allImages[0].alt || project.name}
              className="h-[44vh] md:h-[60vh] w-full object-cover"
            />
          </div>
        ) : (
          <MediaPlaceholder label="Hero Media" aspect="aspect-[3/1]" />
        )}

        {/* Title overlay (optional). Keeping separate to preserve whitespace-forward look */}
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

            {/* Read more section for long text-heavy projects */}
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
              <img src={allImages[1].src} alt={allImages[1].alt || "Project media"} className="w-full rounded-2xl object-cover" />
            ) : (
              <MediaPlaceholder label="Wide Image" aspect="aspect-[21/9]" />
            )}
            {allImages[1]?.caption && (
              <p className="mt-2 text-sm text-zinc-500">{allImages[1].caption}</p>
            )}
          </div>

          {/* Two-column media row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allImages[2]?.src ? (
              <img src={allImages[2].src} alt={allImages[2].alt || "Project media"} className="w-full rounded-2xl object-cover" />
            ) : (
              <MediaPlaceholder label="Left (4:3)" aspect="aspect-[4/3]" />
            )}
            {allImages[3]?.src ? (
              <img src={allImages[3].src} alt={allImages[3].alt || "Project media"} className="w-full rounded-2xl object-cover" />
            ) : (
              <MediaPlaceholder label="Right (9:16)" aspect="aspect-[9/16]" />
            )}
          </div>

          {/* Video slot */}
          <div>
            {/* Replace with <video controls poster=...> */}
            <MediaPlaceholder label="Video (16:9)" aspect="aspect-video" />
          </div>
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

            {/* Pull-quote / insight card */}
            <aside className="lg:sticky lg:top-24 self-start">
              <div className={`${tokens.card} ${tokens.pad}`}>
                <p className={tokens.text.kicker}>Insight</p>
                <p className="mt-3 text-[17px] leading-7 text-zinc-800">
                  Each obstacle informed the next iteration. The process favored clarity, speed, and a calm, collaborative tone with stakeholders.
                </p>
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

              {/* CTA Card */}
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

      {/* GALLERY GRID (more placeholders so you can match the studio’s density) */}
      <Section className="pb-24">
        <h2 className={`${tokens.text.h2} mb-8`}>Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Render existing images first */}
          {allImages.slice(0, 6).map((img, i) => (
            <figure key={i} className="space-y-2">
              <img src={img.src} alt={img.alt || `Gallery ${i+1}`} className="w-full rounded-2xl object-cover" />
              {img.caption && <figcaption className="text-xs text-zinc-500">{img.caption}</figcaption>}
            </figure>
          ))}

          {/* Then fill remaining with placeholders up to 9 */}
          {Array.from({ length: Math.max(0, 9 - Math.min(allImages.length, 6)) }).map((_, i) => (
            <MediaPlaceholder key={`ph-${i}`} label="Gallery" aspect="aspect-[4/3]" />
          ))}
        </div>
      </Section>
    </main>
  );
};

export default ProjectDependenciesPage;
