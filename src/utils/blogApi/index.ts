import { IBlogPost } from "@/types"

let fs: typeof import("fs").promises
let path: typeof import("path")

if (typeof window === "undefined") {
  // We are on the server
  import("fs").then((fsModule) => {
    fs = fsModule.promises
  })
  import("path").then((pathModule) => {
    path = pathModule
  })
}

const getFilePath = () => {
  if (!path) {
    throw new Error("Path module is not loaded")
  }
  return path.join(process.cwd(), "src", "data", "blog.json")
}

export const saveBlogPost = async (blogPost: IBlogPost) => {
  try {
    const response = await fetch("/api/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(blogPost)
    })
    return response.json()
  } catch (error) {
    console.error("Error saving blog post:", error)
  }
}

export const getBlogPosts = async (): Promise<IBlogPost[]> => {
  try {
    if (!fs) {
      throw new Error("FS module is not loaded")
    }

    const data = await fs.readFile(getFilePath(), "utf-8")
    const blogPosts = JSON.parse(data)
    return blogPosts.posts
  } catch (error) {
    console.error("Error getting blog posts from server:", error)
    return []
  }
}

export const getBlogPost = async (id: string): Promise<IBlogPost | undefined> => {
  try {
    if (!fs) {
      throw new Error("FS module is not loaded")
    }

    const data = await fs.readFile(getFilePath(), "utf-8")
    const blogPosts = JSON.parse(data)
    const post = blogPosts.posts.find((post: IBlogPost) => post.id === id)
    return post
  } catch (error) {
    console.error("Error getting blog post from server:", error)
    return undefined
  }
}
