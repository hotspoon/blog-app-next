import React from "react";
import Link from "next/link";
import { IBlogPost } from "@/types";

interface BlogListProps {
  posts: IBlogPost[];
}

export const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="border p-4 rounded-md">
          <Link
            href={`/post/${post.id}`}
            className="text-xl font-bold hover:underline"
          >
            {post.title}
          </Link>
          <p className="text-sm text-muted-foreground">
            By {post.author} | {new Date(post.date).toLocaleDateString()} |{" "}
            {post.category}
          </p>
          <p className="mt-2">{post.summary}</p>
        </div>
      ))}
    </div>
  );
};
