"use client"
import React from "react"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

const StepSummaryCategory: React.FC<{
  formData: any
  errors: any
  handleChange: any
}> = ({ formData, errors, handleChange }) => (
  <>
    <div>
      <Label htmlFor="" className="block text-sm font-medium text-gray-700">
        Blog Summary
      </Label>
      <Textarea
        name="summary"
        value={formData.summary}
        onChange={handleChange}
        placeholder="Blog Summary"
        required
        className="w-full p-2 border rounded"
        aria-label="Blog Summary"
      />
      {errors.summary && <p className="text-red-500 text-sm">{errors.summary}</p>}
    </div>
    <div className="mt-2">
      <Label htmlFor="" className="block text-sm font-medium text-gray-700">
        Blog Category
      </Label>
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
        aria-label="Blog Category"
      >
        <option value="">Select Category</option>
        <option value="Tech">Tech</option>
        <option value="Lifestyle">Lifestyle</option>
        <option value="Business">Business</option>
      </select>
      {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
    </div>
  </>
)

export default StepSummaryCategory
