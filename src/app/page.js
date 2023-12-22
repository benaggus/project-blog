import React from 'react';
import '@/constants';
import BlogSummaryCard from '@/components/BlogSummaryCard';
import '@/helpers/file-helpers';
import styles from './homepage.module.css';
import { getBlogPostList } from '@/helpers/file-helpers';
import { BLOG_DESCRIPTION, BLOG_TITLE } from '@/constants';

export const metadata = {
  title: BLOG_TITLE,
  description: BLOG_DESCRIPTION,
};

async function Home() {
  const posts = await getBlogPostList();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>

      {posts.map((post, key) => (
        <BlogSummaryCard
          key={key}
          slug={post.slug}
          title={post.title}
          abstract={post.abstract}
          publishedOn={post.publishedOn}
        />
      ))}
    </div>
  );
}

export default Home;
