import fs from 'fs'
import path from 'path'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

type Metadata = {
  title: string
  publishedAt: string
  summary: string
  image?: string
}

type Post = {
  metadata: Metadata
  slug: string
  content: MDXRemoteSerializeResult
}

function parseFrontmatter(source: string): { frontmatter: Metadata; content: string } {
  const regex = /---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)/;
  const match = source.match(regex);
  
  if (!match) {
    throw new Error('Invalid frontmatter');
  }
  
  const frontmatterString = match[1];
  const content = match[2];
  
  const frontmatter: Record<string, string> = {};
  const lines = frontmatterString.split('\n');
  for (const line of lines) {
    if (line.trim() !== '') {
      const colonIndex = line.indexOf(':');
      if (colonIndex !== -1) {
        const key = line.slice(0, colonIndex).trim();
        const value = line.slice(colonIndex + 1).trim();
        frontmatter[key] = value;
      }
    }
  }
  
  return {
    frontmatter: frontmatter as unknown as Metadata,
    content
  };
}

function getMDXFiles(dir: string): string[] {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

async function readMDXFile(filePath: string): Promise<{ metadata: Metadata; content: MDXRemoteSerializeResult }> {
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  const { frontmatter, content } = parseFrontmatter(rawContent)
  const mdxSource = await serialize(content, { 
    parseFrontmatter: false,
    mdxOptions: {
      development: process.env.NODE_ENV === 'development'
    }
  })
  
  return {
    metadata: frontmatter as Metadata,
    content: mdxSource
  }
}

async function getMDXData(dir: string): Promise<Post[]> {
  let mdxFiles = getMDXFiles(dir)
  const posts: Post[] = []
  
  for (const file of mdxFiles) {
    const { metadata, content } = await readMDXFile(path.join(dir, file))
    const slug = path.basename(file, path.extname(file))
    
    posts.push({
      metadata,
      slug,
      content,
    })
  }
  
  return posts
}

export async function getBlogPosts(): Promise<Post[]> {
  return getMDXData(path.join(process.cwd(), 'app', 'blog', 'posts'))
}

export function formatDate(date: string, includeTime = true): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  if (includeTime) {
    options.hour = 'numeric'
    options.minute = 'numeric'
  }

  return new Date(date).toLocaleDateString('en-US', options)
}
