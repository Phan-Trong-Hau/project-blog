import React from "react";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import CodeSnippet from "@/components/CodeSnippet";
import DivisionGroupsDemo from "@/components/DivisionGroupsDemo";
import CircularColorsDemo from "@/components/CircularColorsDemo";

export async function generateMetadata({ params }) {
  const { postSlug } = params;
  const { frontmatter } = await loadBlogPost(postSlug);

  return {
    title: frontmatter.title,
    description: frontmatter.description,
  };
}

async function BlogPost({ params }) {
  const { postSlug } = params;
  const { frontmatter, content } = await loadBlogPost(postSlug);

  console.log({ frontmatter, content });

  return (
    <article className={styles.wrapper}>
      <BlogHero {...frontmatter} />
      <div className={styles.page}>
        <MDXRemote
          source={content}
          components={{
            pre: CodeSnippet,
            DivisionGroupsDemo,
            CircularColorsDemo,
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
