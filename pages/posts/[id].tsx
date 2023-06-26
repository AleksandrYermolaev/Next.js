import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { getAllPostIds, getPostData } from '@/services/posts';
import { LocaleTypes, PostContentData } from '@/types';
import Date from '@/components/Date';
import Layout from '@/components/Layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  let postData: PostContentData = {
    id: '0',
    title: 'Invalid post',
    date: '0',
    contentHtml: '',
    locale: 'en',
  };
  if (params) {
    postData = await getPostData(params.id as string, locale as LocaleTypes);
  }
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
      postData,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths = getAllPostIds(locales as LocaleTypes[]);
  return {
    paths,
    fallback: false,
  };
};

interface PostProps {
  postData: PostContentData;
}

export default function Post({ postData }: PostProps) {
  return (
    <Layout home={false}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className="font-title-xl">{postData.title}</h1>
        <div className="text-gray">
          <Date dateString={postData.date} locale={postData.locale} />
        </div>
        <div className="mt-5" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
