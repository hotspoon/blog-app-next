import { IBlogPost } from "@/types"
import { promises as fs } from "fs"
import { NextRequest } from "next/server"
import path from "path"

const filePath = path.join(process.cwd(), "src", "data", "blog.json")

interface IGETRequest {
  params: {
    id: string
  }
}

export async function GET({ params }: IGETRequest) {
  try {
    const { id } = params

    // Read the existing data from the JSON file
    const data = await fs.readFile(filePath, "utf-8")
    const blogPosts = JSON.parse(data)

    // Find the post with the given ID
    const post = blogPosts.posts.find((post: any) => post.id === id)

    if (!post) {
      return Response.json({ message: "Post not found" }, { status: 404 })
    }

    // Respond with the found post
    return Response.json(post, { status: 200 })
  } catch (error) {
    console.error("Error retrieving blog post:", error)
    return Response.json(
      {
        message: "An error occurred while retrieving the blog post. Please try again."
      },
      { status: 500 }
    )
  }
}
