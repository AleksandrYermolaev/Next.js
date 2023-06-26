import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import ThemeSwitcher from './ThemeSwitcher';
import LanguageSwitcher from './LanguageSwitcher';

interface LayoutProps {
  children: React.ReactNode;
  home: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, home }) => {
  const { t } = useTranslation('common');

  return (
    <div className="flex flex-col min-h-screen dark:bg-darkblue">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Learn how to build a personal website using Next.js" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            t('title')
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={t('title') ?? ''} />
        <meta name="twitter:card" content="summary_large_image" />
        <title>{t('title')}</title>
      </Head>
      <header className="p-2 pl-5 flex items-center gap-4 bg-orange dark:bg-deepgray dark:text-white">
        <Image
          priority
          src="/images/avatar.jpg"
          className="rounded-full"
          height={100}
          width={100}
          alt={t('header.image')}
        />
        <Link href="/" className="hover:no-underline">
          <h1 className="font-title-xl">{t('header.name')}</h1>
        </Link>
        <div className="px-4 flex-grow flex justify-end gap-4">
          <ThemeSwitcher className="px-2 rounded-md text-white bg-red dark:bg-blue" />
          <LanguageSwitcher className="w-8 h-8 pb-1 rounded-full text-white bg-red dark:bg-blue" />
        </div>
      </header>
      <main className="mt-4 flex-grow max-w-xl mx-auto font-main text-darkblue dark:text-white">
        {children}{' '}
        {!home && (
          <div className="my-10 font-secondary text-orange hover:underline">
            <Link href="/">← {t('link')}</Link>
          </div>
        )}
      </main>
      <footer className="p-4 bg-darkblue dark:bg-deepgray text-white">
        <p className="font-secondary text-center">({t('footer.main')})</p>
      </footer>
    </div>
  );
};

export default Layout;
