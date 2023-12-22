import React, { Suspense } from 'react';
import { loadBlogPost } from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import '@/constants';
import { Code } from 'bright';
import BlogHero from '@/components/BlogHero';
import Spinner from '@/components/Spinner';

const DivisionGroupsDemo = React.lazy(() =>
  import('@/components/DivisionGroupsDemo')
);
const CircularColorsDemo = React.lazy(() =>
  import('@/components/CircularColorsDemo')
);

import styles from './postSlug.module.css';
import { BLOG_TITLE } from '@/constants';

export async function generateMetadata({ params }) {
  // read route params
  const post = await loadBlogPost(params.postSlug);
  const title = post.frontmatter.title + ' • ' + BLOG_TITLE;
  return {
    title: title,
    description: post.frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  const post = await loadBlogPost(params.postSlug);
  const components = { DivisionGroupsDemo, CircularColorsDemo, pre: Code };
  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={post.frontmatter.title}
        publishedOn={post.frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <Suspense fallback={<Spinner />}>
          <MDXRemote source={post.content} components={components} />
        </Suspense>
      </div>
    </article>
  );
}

export default BlogPost;
