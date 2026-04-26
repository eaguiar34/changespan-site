import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const tutorialsDir = path.join(process.cwd(), "src", "content", "tutorials");

export type TutorialFrontmatter = {
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  tags?: string[];
  level?: "Beginner" | "Intermediate" | "Advanced";
  videoUrl?: string;
};

export type Tutorial = {
  slug: string;
  frontmatter: TutorialFrontmatter;
  content: string;
  readingTimeText: string;
};

export function getTutorialSlugs(): string[] {
  return fs
    .readdirSync(tutorialsDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getTutorialBySlug(slug: string): Tutorial {
  const fullPath = path.join(tutorialsDir, `${slug}.mdx`);
  const file = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(file);

  const fm = data as TutorialFrontmatter;
  if (!fm.title || !fm.description || !fm.date) {
    throw new Error(`Missing required frontmatter in ${slug}.mdx`);
  }

  return {
    slug,
    frontmatter: fm,
    content,
    readingTimeText: readingTime(content).text,
  };
}

export function getAllTutorials(): Tutorial[] {
  return getTutorialSlugs()
    .map(getTutorialBySlug)
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}