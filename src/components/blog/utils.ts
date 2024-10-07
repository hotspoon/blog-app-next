import { z } from "zod";
import { blogPostSchema } from "@/schema";
import { IBlogPost } from "@/types";

export const validateStep = (step: number, formData: any, setErrors: any) => {
  const stepSchemas = [
    blogPostSchema.pick({ title: true, author: true }),
    blogPostSchema.pick({ summary: true, category: true }),
    blogPostSchema.pick({ content: true }),
    z.object({}),
  ];

  const result = stepSchemas[step].safeParse(formData);
  if (result.success) {
    setErrors({});
    return true;
  }

  const newErrors: Partial<Record<keyof IBlogPost, string>> = {};
  result.error.errors.forEach((error) => {
    if (error.path.length > 0) {
      const field = error.path[0] as keyof IBlogPost;
      newErrors[field] = error.message;
    }
  });
  setErrors(newErrors);
  return false;
};
