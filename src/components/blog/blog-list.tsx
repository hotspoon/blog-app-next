"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { IBlogPost } from "@/types"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface BlogListProps {
  posts: IBlogPost[]
  initialPage: number
}

export const BlogList: React.FC<BlogListProps> = ({ posts, initialPage }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentPage, setCurrentPage] = useState(initialPage)
  const postsPerPage = 10
  const totalPages = Math.ceil(posts.length / postsPerPage)

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1
    setCurrentPage(page)
  }, [searchParams])

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber: number) => {
    router.push(`?page=${pageNumber}`)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {currentPosts.map((post) => (
          <div key={post.id} className="border p-4 rounded-md">
            <Link href={`/post/${post.id}`} className="text-xl font-bold hover:underline">
              {post.title}
            </Link>
            <p className="text-sm text-muted-foreground">
              By {post.author} | {new Date(post.date).toLocaleDateString()} | {post.category}
            </p>
            <p className="mt-2">{post.summary}</p>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <Button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            variant="outline"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="outline"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  )
}
