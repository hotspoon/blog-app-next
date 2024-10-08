import { promises as fs } from "fs"
import path from "path"

const dirRelativeToProjectRoot = "src/data"
const dir = path.resolve("./", dirRelativeToProjectRoot)
const filePath = path.resolve(dir, "blog.json")

export async function GET(request: Request, { params }: { params: { id: string } }) {
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
