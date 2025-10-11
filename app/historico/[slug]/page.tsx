import { notFound } from "next/navigation"
import fs from "fs"
import path from "path"
import { compileMDX } from "next-mdx-remote/rsc"

interface HistoricoPageProps {
  params: Promise<{
    slug: string
  }>
}

const allowedSlugs = ["autarquicas-2021", "legislativas-2024"]

async function getContent(slug: string) {
  if (!allowedSlugs.includes(slug)) {
    return null
  }

  const contentPath = path.join(process.cwd(), "content", `${slug}.mdx`)

  try {
    const source = fs.readFileSync(contentPath, "utf8")
    const { content } = await compileMDX({
      source,
      options: { parseFrontmatter: true },
    })
    return content
  } catch (error) {
    return null
  }
}

export async function generateStaticParams() {
  return allowedSlugs.map((slug) => ({
    slug,
  }))
}

export default async function HistoricoPage({ params }: HistoricoPageProps) {
  const { slug } = await params
  const content = await getContent(slug)

  if (!content) {
    notFound()
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        <article className="prose prose-slate lg:prose-lg max-w-none">{content}</article>
      </div>
    </div>
  )
}
