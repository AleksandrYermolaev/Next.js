import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Raleway, Lato } from 'next/font/google';
import { appWithTranslation } from 'next-i18next';

export const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: 'normal',
  display: 'swap',
  variable: '--font-raleway',
});

export const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: 'normal',
  display: 'swap',
  variable: '--font-lato',
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div className={`${lato.variable} ${raleway.variable}`}>
      <Component {...pageProps} />
    </div>
  );
};

export default appWithTranslation(App);
