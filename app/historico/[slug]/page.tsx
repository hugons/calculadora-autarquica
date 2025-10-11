import { notFound } from "next/navigation"
import fs from "fs"
import path from "path"
import { compileMDX } from "next-mdx-remote/rsc"

interface HistoricoPageProps {
  params: Promise<{
    slug: string
  }>
}

const allowedSlugs = ["autarquicas-2021", "legislativas-2025"]

async function getContent(slug: string) {
  if (!allowedSlugs.includes(slug)) {
    return null
  }

  const contentPath = path.join(process.cwd(), "content", `${slug}.mdx`)

  try {
    const source = fs.readFileSync(contentPath, "utf8")
    const { content } = await compileMDX({
      source,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [],
        },
      },
      components: {
        table: (props: any) => (
          <div className="overflow-x-auto my-6">
            <table className="min-w-full divide-y divide-border" {...props} />
          </div>
        ),
        thead: (props: any) => <thead className="bg-muted" {...props} />,
        tbody: (props: any) => <tbody className="divide-y divide-border bg-card" {...props} />,
        tr: (props: any) => <tr className="hover:bg-muted/50" {...props} />,
        th: (props: any) => <th className="px-4 py-3 text-left text-sm font-semibold" {...props} />,
        td: (props: any) => <td className="px-4 py-3 text-sm" {...props} />,
        h1: (props: any) => <h1 className="text-4xl font-bold mb-6 mt-8" {...props} />,
        h2: (props: any) => <h2 className="text-3xl font-bold mb-4 mt-8" {...props} />,
        h3: (props: any) => <h3 className="text-2xl font-bold mb-3 mt-6" {...props} />,
        p: (props: any) => <p className="mb-4 leading-relaxed" {...props} />,
        a: (props: any) => <a className="text-primary hover:underline" {...props} />,
      },
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
    <div className="container mx-auto max-w-7xl py-8 md:py-12 px-6">
      <article className="max-w-none">{content}</article>
    </div>
  )
}
