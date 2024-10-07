// app/page.tsx
import { BlogList } from "@/components/blog/blog-list";
import { getBlogPosts } from "../utils/blogApi";

export default async function Home() {
  const posts = await getBlogPosts();

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Latest Blog Posts</h1>
      <BlogList posts={posts} />
    </>
  );
}
