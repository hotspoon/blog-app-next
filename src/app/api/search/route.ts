import { promises as fs } from "fs"
import { join } from "path"
import { IBlogPost } from "@/types"
import { NextRequest } from "next/server"

const getFilePath = () => join(process.cwd(), "src", "data", "blog.json")

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get("query")
    if (!query) {
      return Response.json({ message: "Query parameter is required" }, { status: 400 })
    }

    const data = await fs.readFile(getFilePath(), "utf-8")
    const blogPosts: IBlogPost[] = JSON.parse(data).posts

    // Filter blog posts by title or content
    const filteredPosts = blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase())
    )

    return Response.json(filteredPosts, { status: 200 })
  } catch (error) {
    console.error("Error searching blog posts:", error)
    return Response.json(
      {
        message: "An error occurred while searching the blog posts. Please try again."
      },
      { status: 500 }
    )
  }
}
