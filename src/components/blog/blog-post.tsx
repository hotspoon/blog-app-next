// components/BlogPost.tsx
import React from "react";
import { IBlogPost as BlogPostType } from "@/types";

interface BlogPostProps {
  post: BlogPostType;
}

export const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  return (
    <article className="space-y-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-sm text-muted-foreground">
        By {post.author} | {new Date(post.date).toLocaleDateString()} |{" "}
        {post.category}
      </p>
      <p className="font-bold">{post.summary}</p>
      <div className="prose max-w-none">{post.content}</div>
    </article>
  );
};
