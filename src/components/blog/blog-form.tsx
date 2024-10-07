"use client"

import React, { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { IBlogPost } from "@/types"
import { saveBlogPost } from "@/utils/blogApi"
import useLocalStorage from "@/hooks/useLocalStorage"
import { blogPostSchema } from "@/schema"
import StepMetadata from "./step-metadata"
import StepSummaryCategory from "./step-summary-category"
import StepContent from "./step-content"
import StepReview from "./step-review"
import { validateStep } from "./utils"
import { Button } from "../ui/button"

const STEPS = ["Metadata", "Summary & Category", "Content", "Review"]
const INITIAL_FORM_DATA = {
  title: "",
  author: "",
  summary: "",
  category: "",
  content: ""
}

interface BlogFormProps {
  initialStep: number
}

export const BlogForm: React.FC<BlogFormProps> = ({ initialStep }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState(initialStep)
  const [formData, setFormData] = useLocalStorage("blogFormData", INITIAL_FORM_DATA)
  const [errors, setErrors] = useState<Partial<Record<keyof IBlogPost, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Update step based on query parameters
  useEffect(() => {
    const stepFromQuery = searchParams.get("step")
    if (stepFromQuery) {
      setStep(parseInt(stepFromQuery, 10))
    }
  }, [searchParams])

  // Update query parameters on state change
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set("step", step.toString())
    router.replace(`?${newParams.toString()}`, { scroll: false })
  }, [step, router, searchParams])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault()
    if (validateStep(step, formData, setErrors) && step < STEPS.length - 1) setStep(step + 1)
  }

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault()
    if (step > 0) setStep(step - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Final validation before submitting
    const result = blogPostSchema.safeParse(formData)
    if (!result.success) {
      const newErrors: Partial<Record<keyof IBlogPost, string>> = {}
      result.error.errors.forEach((error) => {
        if (error.path.length > 0) {
          const field = error.path[0] as keyof IBlogPost
          newErrors[field] = error.message
        }
      })
      setErrors(newErrors)
      const errorMessages = result.error.errors.map((error) => error.message).join("\n")
      alert(`Please fill in the required fields:\n${errorMessages}`)
      return
    }

    // Confirmation before submitting
    const isConfirmed = window.confirm("Are you sure you want to submit this blog post?")
    if (!isConfirmed) {
      return
    }

    const newPost: IBlogPost = {
      ...formData,
      id: Date.now().toString(),
      date: new Date().toISOString()
    } as IBlogPost

    try {
      await saveBlogPost(newPost)

      // Clear localStorage after successful submission
      localStorage.removeItem("blogFormData")

      // Navigate to the home page
      window.location.href = "/"
    } catch (error) {
      console.error("Failed to save blog post:", error)
      alert("An error occurred while saving the blog post. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return <StepMetadata formData={formData} errors={errors} handleChange={handleChange} />
      case 1:
        return (
          <StepSummaryCategory formData={formData} errors={errors} handleChange={handleChange} />
        )
      case 2:
        return <StepContent formData={formData} errors={errors} handleChange={handleChange} />
      case 3:
        return <StepReview formData={formData} />
      default:
        return null
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold">{STEPS[step]}</h2>
      {renderStep()}
      <div className={`flex ${step === 0 ? "justify-end" : "justify-between"}`}>
        {step > 0 && (
          <Button type="button" variant="outline" onClick={handleBack}>
            Back
          </Button>
        )}
        {step < STEPS.length - 1 ? (
          <Button type="button" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        )}
      </div>
    </form>
  )
}
