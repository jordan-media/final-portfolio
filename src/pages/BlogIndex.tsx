// ==============================
// src/pages/BlogIndex.tsx
// Modal blog with deep-linking, backdrop click, Back button, Next/Prev nav, Related posts, and Share row
// ==============================
import React, { useEffect, useMemo, useState, useRef } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";

export type BlogPost = {
  id: string;
  title: string;
  image?: string;
  tldr?: string;
  fullContent?: string;
  theme?: string;
  date?: string;
};

const tokens = {
  maxW: "max-w-[1120px]",
  text: {
    h1: "text-[clamp(28px,5vw,56px)] leading-tight font-semibold text-zinc-900",
    h2: "text-[clamp(18px,2.4vw,28px)] leading-tight font-semibold text-zinc-900",
    body: "text-[16px] leading-[1.8] text-zinc-700",
    meta: "text-sm text-zinc-500",
    kicker: "text-xs tracking-[0.18em] uppercase text-zinc-500",
  },
  card: "rounded-2xl bg-white shadow-sm ring-1 ring-black/5",
  pad: "p-5 md:p-6 lg:p-8",
};

const BlogIndex: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [params, setParams] = useSearchParams();

  const selectedId = params.get("post") || "";

  // Ref to the scrollable modal content container
  const modalRef = useRef<HTMLElement | null>(null);

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch posts from /public/blogPosts.json
  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("blogPosts.json", { cache: "no-store", signal: ctrl.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: BlogPost[] = await res.json();
        setPosts(data);
      } catch (e: any) {
        if (e?.name !== "AbortError") setError("Failed to load blog posts.");
      } finally {
        setLoading(false);
      }
    })();
    return () => ctrl.abort();
  }, []);

  const byId = useMemo(() => new Map(posts.map((p) => [p.id, p])), [posts]);
  const ids = useMemo(() => posts.map((p) => p.id), [posts]);
  const active = selectedId ? byId.get(selectedId) : undefined;
  const activeIndex = selectedId ? ids.indexOf(selectedId) : -1;

  // Related posts (same theme preferred, otherwise recent others)
  const related = useMemo(() => {
    if (!active) return [];
    const sameTheme = posts.filter((p) => p.id !== active.id && (!!active.theme ? p.theme === active.theme : true));
    const list = sameTheme.length > 0 ? sameTheme : posts.filter((p) => p.id !== active.id);
    return list.slice(0, 3);
  }, [active, posts]);

  // If we arrive with navigation state (from Extras), open the modal by pushing ?post=
  useEffect(() => {
    const st = location.state as { post?: string } | null;
    if (st?.post && !params.get("post")) {
      setParams({ post: st.post }, { replace: false });
      // Do NOT replace here — we want Back to close the modal.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  const openPost = (id: string) => setParams({ post: id }, { replace: false });

  const closePost = () => {
    // Always clear the query param in-place so backdrop/Close exits the modal immediately
    setParams({}, { replace: true });
  };

  const getPrevId = () => {
    if (activeIndex < 0 || ids.length === 0) return undefined;
    const prev = (activeIndex - 1 + ids.length) % ids.length;
    return ids[prev];
  };
  const getNextId = () => {
    if (activeIndex < 0 || ids.length === 0) return undefined;
    const next = (activeIndex + 1) % ids.length;
    return ids[next];
  };

  const gotoPrev = () => {
    const pid = getPrevId();
    if (pid) openPost(pid);
  };
  const gotoNext = () => {
    const nid = getNextId();
    if (nid) openPost(nid);
  };

  // Keys: Esc = close, ← = prev, → = next
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!active) return;
      if (e.key === "Escape") closePost();
      if (e.key === "ArrowLeft") gotoPrev();
      if (e.key === "ArrowRight") gotoNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  // Share links (X/Twitter, LinkedIn, Email)
  const share = useMemo(() => {
    if (!active) return null;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(active.title || "");
    return {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      email: `mailto:?subject=${text}&body=${url}`
    };
  }, [active, selectedId]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      /* no-op */
    }
  }; 

  // Scroll modal to top whenever the selected post changes (next/prev/related/direct)
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  }, [selectedId]);

  return (
    <main className="bg-white min-h-screen">
      <section className="px-5 md:px-8 pt-10 md:pt-14">
        <div className={`${tokens.maxW} mx-auto`}>
          <h1 className={`${tokens.text.h1}`}>Blog</h1>
          <p className={`${tokens.text.meta} mt-2`}>Stories, notes, and little observations.</p>
        </div>
      </section>

      <section className="px-5 md:px-8 py-8 md:py-12">
        <div className={`${tokens.maxW} mx-auto`}>
          {loading ? (
            <div className="text-zinc-600">Loading…</div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : posts.length === 0 ? (
            <div className="text-zinc-600">No posts yet.</div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((p) => (
                <li key={p.id} className={`${tokens.card} overflow-hidden hover:shadow-md transition`}>
                  <button type="button" onClick={() => openPost(p.id)} className="block text-left w-full focus:outline-none">
                    {p.image ? (
                      <img src={p.image} alt={p.title} className="h-44 w-full object-cover" loading="lazy" />
                    ) : (
                      <div className="h-44 w-full bg-zinc-100 grid place-items-center">
                        <span className="text-xs text-zinc-500">No image</span>
                      </div>
                    )}
                    <div className={`${tokens.pad}`}>
                      {p.theme && <div className={`${tokens.text.kicker}`}>{p.theme}</div>}
                      <h2 className={`${tokens.text.h2} mt-2 line-clamp-2`}>{p.title}</h2>
                      {p.tldr && <p className={`${tokens.text.body} mt-2 line-clamp-3`}>{p.tldr}</p>}
                      {p.date && <div className={`${tokens.text.meta} mt-3`}>{p.date}</div>}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-10">
            <Link to="/" className="text-sm text-zinc-600 underline underline-offset-4">Back to home</Link>
          </div>
        </div>
      </section>

      {/* Modal */}
      {active && (
        <div className="fixed inset-0 z-50" aria-modal="true" role="dialog">
          {/* Backdrop closes on click */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" onClick={closePost} />

          {/* Content (stop propagation so clicks inside don't close) */}
          <div className="absolute inset-0 flex items-start md:items-center justify-center p-4 md:p-8 pointer-events-none">
            <article ref={modalRef} onClick={(e) => e.stopPropagation()} className={`${tokens.card} w-full max-w-3xl max-h-[90vh] overflow-auto pointer-events-auto`}>
              {active.image && <img src={active.image} alt={active.title} className="w-full h-56 object-cover" />}
              <div className={`${tokens.pad}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    {active.theme && <div className={`${tokens.text.kicker}`}>{active.theme}</div>}
                    <h2 className={`${tokens.text.h2} mt-2`}>{active.title}</h2>
                    {active.date && <div className={`${tokens.text.meta} mt-1`}>{active.date}</div>}
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={gotoPrev} aria-label="Previous post" className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-3 py-2 text-zinc-800 hover:bg-zinc-50 transition">← Prev</button>
                    <button onClick={gotoNext} aria-label="Next post" className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-3 py-2 text-zinc-800 hover:bg-zinc-50 transition">Next →</button>
                  </div>
                </div>

                {active.tldr && <p className={`${tokens.text.body} mt-4 italic text-zinc-600`}>{active.tldr}</p>}
                {active.fullContent && <div className={`${tokens.text.body} mt-4 whitespace-pre-wrap`}>{active.fullContent}</div>}

                {/* Share row */}
                {share && (
                  <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-zinc-100 pt-4">
                    <span className="text-sm text-zinc-500">Share:</span>
                    <a href={share.twitter} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-3 py-1.5 text-sm text-zinc-800 hover:bg-zinc-50 transition">X / Twitter</a>
                    <a href={share.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-3 py-1.5 text-sm text-zinc-800 hover:bg-zinc-50 transition">LinkedIn</a>
                    <a href={share.email} className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-3 py-1.5 text-sm text-zinc-800 hover:bg-zinc-50 transition">Email</a>
                    <button onClick={copyLink} className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-3 py-1.5 text-sm text-zinc-800 hover:bg-zinc-50 transition">Copy link</button>
                  </div>
                )}

                {/* Related posts */}
                {related.length > 0 && (
                  <div className="mt-6 border-t border-zinc-100 pt-4">
                    <div className={`${tokens.text.kicker}`}>Related</div>
                    <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {related.map((rp) => (
                        <li key={rp.id}>
                          <button
                            type="button"
                            onClick={() => openPost(rp.id)}
                            className="w-full text-left underline underline-offset-4 decoration-zinc-300 hover:text-zinc-800 text-sm"
                          >
                            {rp.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-6 flex flex-wrap justify-end gap-3">
                  <button onClick={gotoPrev} className="hidden sm:inline-flex items-center justify-center rounded-full border border-zinc-300 px-4 py-2 text-zinc-800 hover:bg-zinc-50 transition">← Previous</button>
                  <button onClick={gotoNext} className="hidden sm:inline-flex items-center justify-center rounded-full border border-zinc-300 px-4 py-2 text-zinc-800 hover:bg-zinc-50 transition">Next →</button>
                  <button onClick={closePost} className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-4 py-2 text-zinc-800 hover:bg-zinc-50 transition">Close</button>
                </div>
              </div>
            </article>
          </div>
        </div>
      )}
    </main>
  );
};

export default BlogIndex;