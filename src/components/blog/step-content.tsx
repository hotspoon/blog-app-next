"use client"
import React from "react"

const StepContent: React.FC<{
  formData: any
  errors: any
  handleChange: any
}> = ({ formData, errors, handleChange }) => (
  <div>
    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
      Blog Content
    </label>
    <textarea
      id="content"
      name="content"
      value={formData.content}
      onChange={handleChange}
      placeholder="Blog Content"
      required
      className="w-full p-2 border rounded h-64"
      aria-label="Blog Content"
    />
    {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
  </div>
)

export default StepContent
