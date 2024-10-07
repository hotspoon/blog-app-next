import { BlogForm } from "@/components/blog/blog-form"
import { Card, CardContent } from "@/components/ui/card"
import { SearchParams } from "@/types"

export default function CreatePost({ searchParams }: { searchParams: SearchParams }) {
  const initialStep = typeof searchParams.step === "string" ? parseInt(searchParams.step, 10) : 0

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Create New Blog Post</h1>
      <Card>
        <CardContent>
          <BlogForm initialStep={initialStep} />
        </CardContent>
      </Card>
    </>
  )
}
