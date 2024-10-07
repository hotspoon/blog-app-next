import { IBlogPost } from "@/types"
import blogData from "@/data/blog.json"

const STORAGE_KEY = "blog_posts"

// export const saveBlogPost = async (post: IBlogPost): Promise<void> => {
//   const posts = await getBlogPosts();
//   posts.push(post);
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
// };

// export const getBlogPosts = async (): Promise<IBlogPost[]> => {
//   if (typeof window === "undefined") {
//     return [];
//   }
//   const posts = localStorage.getItem(STORAGE_KEY);
//   return posts ? JSON.parse(posts) : [];
// };

export const getBlogPost = async (id: string): Promise<IBlogPost | undefined> => {
  const posts = await getBlogPosts()
  return posts.find((post) => post.id === id)
}
export const saveBlogPost = async (blogPost: IBlogPost) => {
  try {
    const response = await fetch("http://localhost:5000/posts", {
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
    // Simulate an async operation
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(blogData.posts)
    //   }, 1000)
    // })
    const response = await fetch("http://localhost:5000/posts")
    return response.json()
  } catch (error) {
    console.error("Error getting blog posts:", error)
    return []
  }
}

// export const getBlogPost = async (
//   id: string,
// ): Promise<IBlogPost | undefined> => {
//   try {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(blogData.find((post) => post.id === id));
//       }, 1000);
//     });
//   } catch (error) {
//     console.error("Error getting blog post:", error);
//   }
// };
