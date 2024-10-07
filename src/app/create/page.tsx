// app/create/page.tsx
import { BlogForm } from "@/components/blog/blog-form"
import BlogWizardForm from "@/components/blog/blog-wizard"
import { Card, CardContent } from "@/components/ui/card"

export default function CreatePost() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Create New Blog Post</h1>
      <Card>
        <CardContent>
          <BlogForm />
          {/* <BlogWizardForm /> */}
        </CardContent>
      </Card>
    </>
  )
}
