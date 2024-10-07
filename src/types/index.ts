export interface IBlogPost {
  id: string
  title: string
  author: string
  date: string
  category: string
  summary: string
  content: string
}

export type SearchParams = {
  [key: string]: string | string[] | undefined
}
