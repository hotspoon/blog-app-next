import Link from "next/link"
import "./globals.css"
import { Toaster } from "react-hot-toast"

export const metadata = {
  title: "Multi-Step Blog Creation Wizard",
  description: "Create and manage blog posts with a multi-step wizard"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-4xl mx-auto p-4">
          <header className="flex justify-between items-center mb-8">
            <Link href="/" className="text-2xl font-bold">
              My Blog
            </Link>
            <Link
              href="/post/create"
              className="px-4 py-2 bg-primary text-primary-foreground rounded"
            >
              Create Post
            </Link>
          </header>
          <main>{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  )
}
