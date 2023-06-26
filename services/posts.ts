import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { PostId, PostData, PostContentData, LocaleTypes } from '@/types';

const getPostsDirectory = (locale: LocaleTypes = 'en') =>
  path.join(process.cwd(), `posts/${locale}`);

export const getSortedPostsData: (locale: LocaleTypes) => PostData[] = (locale) => {
  // Get file names under /posts
  const fileNames = fs.readdirSync(getPostsDirectory(locale));
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(getPostsDirectory(locale), fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as Omit<PostData, 'id'>),
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
};

export const getAllPostIds: (locales: LocaleTypes[]) => PostId[] = (locales) => {
  const fileNames = fs.readdirSync(getPostsDirectory());
  return fileNames.flatMap((fileName) => {
    return locales.map((locale) => {
      return {
        params: {
          id: fileName.replace(/\.md$/, ''),
        },
        locale,
      };
    });
  });
};

export const getPostData: (id: string, locale: LocaleTypes) => Promise<PostContentData> = async (
  id,
  locale
) => {
  const fullPath = path.join(getPostsDirectory(locale), `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...(matterResult.data as Omit<PostData, 'id'>),
    locale,
  };
};
