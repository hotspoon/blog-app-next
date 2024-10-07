import { promises as fs } from "fs"
import path from "path"
import { IBlogPost } from "@/types"
import { NextRequest, NextResponse } from "next/server"

const getFilePath = () => {
  const dirRelativeToProjectRoot = "src/data"
  const dir = path.resolve("./", dirRelativeToProjectRoot)
  return path.resolve(dir, "blog.json")
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const query = searchParams.get("query")

  if (!query) {
    return NextResponse.json({ message: "Query parameter is required" }, { status: 400 })
  }

  try {
    const data = await fs.readFile(getFilePath(), "utf-8")
    const blogPosts: IBlogPost[] = JSON.parse(data).posts

    // Filter blog posts by title or content
    const filteredPosts = blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase())
    )

    return NextResponse.json(filteredPosts, { status: 200 })
  } catch (error) {
    console.error("Error searching blog posts:", error)
    return NextResponse.json(
      {
        message: "An error occurred while searching the blog posts. Please try again."
      },
      { status: 500 }
    )
  }
}
