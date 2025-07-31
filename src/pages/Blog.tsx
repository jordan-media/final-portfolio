  // src/pages/Blog.tsx
  import React, { useState, useEffect } from 'react'; // Consolidated React import
  import { motion, AnimatePresence } from 'framer-motion';
  import BlogCard from '../sections/BlogCard'; // Assuming this path is correct
  import { BlogPost, ReadTimeResult } from '../types/blog-post'; // Import BlogPost and ReadTimeResult interface

  // Helper function to calculate word count and estimated read time
  // Moved here for demonstration, or could be in a separate utility file if used elsewhere
  const calculateReadTime = (text: string): ReadTimeResult => {
    const wordsPerMinute = 200; // Average reading speed
    // Filter for words with length > 0 to avoid counting empty strings from multiple spaces
    const words = text.split(/\s+/).filter(word => word.length > 0).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return { wordCount: words, readTime: minutes };
  };

  const Blog = () => {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]); // State to hold all blog posts
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

    useEffect(() => {
      const fetchBlogPosts = async () => {
        try {
          setLoading(true);
          setError(null);
          const response = await fetch('/blogPosts.json'); // Fetch from public folder
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data: BlogPost[] = await response.json();

          // Calculate wordCount and readTime for each post after fetching
          const postsWithCalculatedData = data.map(post => {
            const { wordCount, readTime } = calculateReadTime(post.fullContent);
            // Ensure we don't overwrite existing properties, use spread operator carefully
            return { ...post, wordCount, readTime };
          });

          setBlogPosts(postsWithCalculatedData);
        } catch (err) {
          console.error("Failed to fetch blog posts:", err);
          setError("Failed to load blog posts.");
        } finally {
          setLoading(false);
        }
      };

      fetchBlogPosts();
    }, []); // Empty dependency array means this effect runs once on mount

    const openModal = (post: BlogPost) => {
      setSelectedPost(post);
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    };

    const closeModal = () => {
      setSelectedPost(null);
      document.body.style.overflow = 'unset'; // Re-enable scrolling
    };

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen-minus-header-footer bg-gray-50 text-xl md:text-2xl text-gray-600 font-space-grotesk">
          Loading blog posts...
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center min-h-screen-minus-header-footer bg-red-100 text-red-700 p-8 text-xl md:text-2xl font-space-grotesk">
          Error: {error}
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-8 font-space-grotesk">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 font-space-grotesk">My Blog</h1>
          <p className="text-lg text-gray-600 font-space-grotesk">Thoughts, observations, and everything in between.</p>
        </header>

        <main className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            // Ensure BlogCard expects the BlogPost type, which now includes calculated data
            <BlogCard key={post.id} post={post} onClick={openModal} />
          ))}
        </main>

        {/* Blog Post Modal */}
        <AnimatePresence>
          {selectedPost && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeModal} // Close modal when clicking outside content
            >
              <motion.div
                className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative font-space-grotesk"
                initial={{ y: "100vh", opacity: 0 }}
                animate={{ y: "0", opacity: 1 }}
                exit={{ y: "100vh", opacity: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside content
              >
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
                  aria-label="Close"
                >
                  &times;
                </button>
                <h2 className="text-3xl font-bold text-gray-900 mb-4 font-space-grotesk">{selectedPost.title}</h2>
                <p className="text-sm text-gray-500 mb-4 font-space-grotesk">
                  {selectedPost.date} | {selectedPost.theme} | {selectedPost.wordCount} words | ~{selectedPost.readTime} min read
                </p>
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-64 object-cover rounded-md mb-6"
                  // onError handler for broken images
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "https://placehold.co/800x450/CCCCCC/333333?text=Image+Not+Found";
                  }}
                />
                <div className="prose max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap font-space-grotesk">
                  {selectedPost.fullContent}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  export default Blog;