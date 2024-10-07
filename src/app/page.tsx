import { BlogList } from "@/components/blog/blog-list"
import { getBlogPosts } from "@/utils/blogApi"

type SearchParams = {
  [key: string]: string | string[] | undefined
}

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const posts = await getBlogPosts()
  const initialPage = typeof searchParams.page === "string" ? Number(searchParams.page) : 1

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Latest Blog Posts</h1>
      <BlogList posts={posts} initialPage={initialPage} />
    </div>
  )
}
