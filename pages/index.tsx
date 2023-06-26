import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getSortedPostsData } from '@/services/posts';
import { LocaleTypes, PostData } from '@/types';
import Layout from '@/components/Layout';
import Date from '@/components/Date';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const allPostsData = getSortedPostsData(locale as LocaleTypes);
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'home'])),
      allPostsData,
    },
  };
};

interface HomeProps {
  allPostsData: PostData[];
}

export default function Home({ allPostsData }: HomeProps) {
  const { t, i18n } = useTranslation('home');
  const locale = (i18n.resolvedLanguage ?? 'en') as LocaleTypes;

  return (
    <Layout home>
      <section>
        <h2 className="font-title">{t('about-title')}</h2>
        <p className="mt-2">{t('about-text')}</p>
      </section>
      <section>
        <h2 className="mt-5">{t('h2')}</h2>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li className="mx-0" key={id}>
              <Link href={`/posts/${id}`} className="text-orange hover:underline">
                {title}
              </Link>
              <br />
              <small className="text-gray">
                <Date dateString={date} locale={locale} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
