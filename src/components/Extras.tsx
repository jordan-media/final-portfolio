
// ==============================
// src/components/Extras.tsx
// Titles link to /blog and pass state so BlogIndex opens the modal
// ==============================
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type BlogPostLite = { id: string; title: string };

function Extras() {
  const artifacts: string[] = ['Pokedex','CSS Animation','AI Mockup Tutorial','Garden Planner Prototype','Parallax Effects'];
  const [posts, setPosts] = useState<BlogPostLite[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        const res = await fetch('blogPosts.json', { cache: 'no-store', signal: ctrl.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as BlogPostLite[];
        setPosts(data);
      } catch (e: any) {
        if (e?.name !== 'AbortError') setError('Failed to load blog.');
      }
    })();
    return () => ctrl.abort();
  }, []);

  const totalExtras = artifacts.length + posts.length;

  return (
    <section className="w-full bg-white flex flex-col font-space-grotesk">
      <div className="flex items-baseline gap-4 text-4xl sm:text-5xl lg:text-6xl font-normal text-gray-900 justify-between pl-4 pr-4 py-4 md:pl-8 md:pr-8 md:py-6">
        <h2 className="m-0">Vault</h2>
        <span className="text-xl sm:text-2xl md:text-3xl text-gray-600 italic">({totalExtras} items)</span>
      </div>

      {/* Artifacts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-8 items-start border-t border-gray-300 pt-8 text-left pb-4 px-4 md:px-8">
        <div className="text-lg font-medium text-gray-800 pl-4 md:pl-0">Artifacts</div>
        <div className="flex flex-col w-full">
          {artifacts.map((item, i) => (
            <div className="flex flex-col" key={`artifact-${i}`}>
              <a href="#" className="no-underline text-gray-800 text-base hover:text-gray-600 transition-colors">{item}</a>
              <div className="h-px bg-gray-300 w-full my-2" />
            </div>
          ))}
        </div>
      </div>

      {/* Blog */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-8 items-start border-t border-gray-300 pt-8 text-left pb-4 px-4 md:px-8">
        <div className="text-lg font-medium text-gray-800 pl-4 md:pl-0">
          <Link to="/blog" className="underline decoration-gray-300 underline-offset-4 hover:text-gray-600">Blog</Link>
        </div>
        <div className="flex flex-col w-full">
          {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
          {!error && posts.length === 0 && <div className="text-sm text-gray-500 mb-2">No posts yet.</div>}
          {posts.map((post) => (
            <div className="flex flex-col" key={post.id}>
              <Link
                to="/blog"
                state={{ post: post.id }}
                className="no-underline text-gray-800 text-base hover:text-gray-600 transition-colors"
              >
                {post.title}
              </Link>
              <div className="h-px bg-gray-300 w-full my-2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Extras;
