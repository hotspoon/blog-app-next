"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IBlogPost } from "@/types";
import { saveBlogPost } from "@/utils/blogApi";

const STEPS = ["Metadata", "Summary & Category", "Content", "Review"];

export const BlogForm: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Partial<IBlogPost>>({
    title: "",
    author: "",
    summary: "",
    category: "",
    content: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPost: IBlogPost = {
      ...formData,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    } as IBlogPost;
    await saveBlogPost(newPost);
    router.push("/");
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Blog Title"
              required
              className="w-full p-2 border rounded"
              aria-label="Blog Title"
            />
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Author Name"
              required
              className="w-full p-2 border rounded mt-2"
              aria-label="Author Name"
            />
          </>
        );
      case 1:
        return (
          <>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Blog Summary"
              required
              className="w-full p-2 border rounded"
              aria-label="Blog Summary"
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded mt-2"
              aria-label="Blog Category"
            >
              <option value="">Select Category</option>
              <option value="Tech">Tech</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Business">Business</option>
            </select>
          </>
        );
      case 2:
        return (
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Blog Content"
            required
            className="w-full p-2 border rounded h-64"
            aria-label="Blog Content"
          />
        );
      case 3:
        return (
          <div className="space-y-2">
            <h2 className="text-xl font-bold">{formData.title}</h2>
            <p>Author: {formData.author}</p>
            <p>Category: {formData.category}</p>
            <p>Summary: {formData.summary}</p>
            <p>Content: {formData.content}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold">{STEPS[step]}</h2>
      {renderStep()}
      <div className="flex justify-between">
        {step > 0 && (
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded"
          >
            Back
          </button>
        )}
        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-4 py-2 bg-primary text-primary-foreground rounded"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
};
