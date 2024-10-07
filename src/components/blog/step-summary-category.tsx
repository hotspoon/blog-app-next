"use client"
import React from "react"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem
} from "@/components/ui/select"

const StepSummaryCategory: React.FC<{
  formData: any
  errors: any
  handleChange: any
}> = ({ formData, errors, handleChange }) => (
  <>
    <div>
      <Label htmlFor="summary" className="block text-sm font-medium text-gray-700">
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
      <Select
        name="category"
        value={formData.category}
        onValueChange={(value) =>
          handleChange({
            target: { name: "category", value }
          } as React.ChangeEvent<HTMLSelectElement>)
        }
        required
        aria-label="Blog Category"
      >
        <SelectTrigger className="w-full p-2 border rounded">
          <SelectValue>{formData.category || "Select a category"}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            <SelectItem value="Tech">Tech</SelectItem>
            <SelectItem value="Lifestyle">Lifestyle</SelectItem>
            <SelectItem value="Business">Business</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
    </div>
  </>
)

export default StepSummaryCategory
