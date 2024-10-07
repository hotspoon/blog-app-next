import { promises as fs } from "fs"
import path from "path"

const filePath = path.join(process.cwd(), "src", "data", "blog.json")

export async function POST(request: Request) {
  try {
    const newPost = await request.json()

    // Read the existing data from the JSON file
    const data = await fs.readFile(filePath, "utf-8")
    const blogPosts = JSON.parse(data)

    // Append the new post to the existing data
    blogPosts.posts.push(newPost)

    // Write the updated data back to the JSON file
    await fs.writeFile(filePath, JSON.stringify(blogPosts, null, 2))

    // Respond with the updated blog posts
    return Response.json({ message: "Blog post saved successfully", blogPosts }, { status: 200 })
  } catch (error) {
    console.error("Error saving blog post:", error)
    return Response.json(
      {
        message: "An error occurred while saving the blog post. Please try again."
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Read the existing data from the JSON file
    const data = await fs.readFile(filePath, "utf-8")
    const blogPosts = JSON.parse(data)

    // Respond with the blog posts
    return Response.json(blogPosts, { status: 200 })
  } catch (error) {
    console.error("Error retrieving blog posts:", error)
    return Response.json(
      {
        message: "An error occurred while retrieving the blog posts. Please try again."
      },
      { status: 500 }
    )
  }
}
