import { BlogList } from "@/components/blog/blog-list"
import { getBlogPosts } from "@/services/blogApi"
import { SearchParams } from "@/types"
import SearchBlogList from "@/components/blog/search-blog-list"

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const posts = await getBlogPosts()
  const initialPage = typeof searchParams.page === "string" ? Number(searchParams.page) : 1

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Latest Blog Posts</h1>
      <SearchBlogList initialPosts={posts} initialPage={initialPage} />
    </div>
  )
}
