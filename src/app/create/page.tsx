// app/create/page.tsx
import { BlogForm } from "@/components/blog/blog-form";

export default function CreatePost() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Create New Blog Post</h1>
      <BlogForm />
    </>
  );
}
