"use client"

import { useState, useEffect } from "react"
import { BlogList } from "@/components/blog/blog-list"
import { IBlogPost } from "@/types"
import { useDebounce } from "@/hooks/useDebounce"

interface SearchBlogListProps {
  initialPosts: IBlogPost[]
  initialPage: number
}

const SearchBlogList: React.FC<SearchBlogListProps> = ({ initialPosts, initialPage }) => {
  const [posts, setPosts] = useState<IBlogPost[]>(initialPosts)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  useEffect(() => {
    const fetchPosts = async () => {
      if (debouncedSearchQuery) {
        const response = await fetch(`/api/search?query=${debouncedSearchQuery}`)
        const filteredPosts = await response.json()
        setPosts(filteredPosts)
      } else {
        setPosts(initialPosts)
      }
    }

    fetchPosts()
  }, [debouncedSearchQuery, initialPosts])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search blog posts..."
        className="w-full p-2 mb-4 border rounded"
      />
      <BlogList posts={posts} initialPage={initialPage} />
    </div>
  )
}

export default SearchBlogList
