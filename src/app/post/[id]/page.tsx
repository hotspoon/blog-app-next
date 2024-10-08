import { notFound } from "next/navigation"
import { BlogPost } from "@/components/blog/blog-post"
import { getBlogPost } from "@/services/blogApi"

export default async function Post({ params }: { params: { id: string } }) {
  const post = await getBlogPost(params.id)

  if (!post) {
    notFound()
  }

  return <BlogPost post={post} />
}
