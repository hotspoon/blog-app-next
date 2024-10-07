"use client"
import React from "react"

const StepMetadata: React.FC<{
  formData: any
  errors: any
  handleChange: any
}> = ({ formData, errors, handleChange }) => (
  <>
    <div>
      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
        Blog Title
      </label>
      <input
        id="title"
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Blog Title"
        required
        className="w-full p-2 border rounded"
        aria-label="Blog Title"
      />
      {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
    </div>
    <div className="mt-2">
      <label htmlFor="author" className="block text-sm font-medium text-gray-700">
        Author Name
      </label>
      <input
        id="author"
        type="text"
        name="author"
        value={formData.author}
        onChange={handleChange}
        placeholder="Author Name"
        required
        className="w-full p-2 border rounded"
        aria-label="Author Name"
      />
      {errors.author && <p className="text-red-500 text-sm">{errors.author}</p>}
    </div>
  </>
)

export default StepMetadata
