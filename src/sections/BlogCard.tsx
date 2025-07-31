// src/sections/BlogCard.tsx
import React from 'react';
import { BlogPost } from '../types/blog-post';

interface BlogCardProps {
  post: BlogPost;
  onClick: (post: BlogPost) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onClick }) => {
  return (
    <div
      className="flex flex-col md:flex-row h-full bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden transition-shadow duration-300 cursor-pointer"
      onClick={() => onClick(post)}
    >
      {/* Image section */}
      <div className="w-full md:w-1/2 h-48 md:h-auto">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = 'https://placehold.co/600x400/CCCCCC/333333?text=Image+Not+Found';
          }}
        />
      </div>

      {/* Content section */}
      <div className="p-4 md:w-1/2 flex flex-col justify-between h-full">
        <div>

          {/* Title */}
          <h2 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">
            {post.title}
          </h2>

          {/* Category badge */}
          <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mb-2 font-medium uppercase tracking-wide">
            {post.theme}
          </span>

          {/* TLDR summary */}
          <p className="text-sm text-gray-600 line-clamp-3 mb-4">
            {post.tldr}
          </p>
        </div>

        {/* Footer info */}
        <div className="text-xs text-gray-400">
          {post.date} • ~{post.readTime} min read
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
