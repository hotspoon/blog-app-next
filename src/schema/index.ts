import { z } from "zod"

export const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  summary: z.string().min(1, "Summary is required"),
  category: z.string().min(1, "Category is required"),
  content: z.string().min(1, "Content is required")
})
