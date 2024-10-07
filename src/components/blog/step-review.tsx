"use client"
import React from "react"

const StepReview: React.FC<{ formData: any }> = ({ formData }) => (
  <div className="space-y-2">
    <h2 className="text-xl font-bold">{formData.title}</h2>
    <p>Author: {formData.author}</p>
    <p>Category: {formData.category}</p>
    <p>Summary: {formData.summary}</p>
    <p>Content: {formData.content}</p>
  </div>
)

export default StepReview
