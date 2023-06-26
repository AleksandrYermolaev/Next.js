import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

interface LanguageSwitcherProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ ...props }) => {
  const { t, i18n } = useTranslation('common');
  const changeTo = i18n.resolvedLanguage === 'en' ? 'ru' : 'en';
  const router = useRouter();

  return (
    <Link
      href={{
        pathname: router.pathname,
        query: router.query,
      }}
      locale={changeTo}
    >
      <button {...props}>{t('header.change.language', { changeTo })}</button>
    </Link>
  );
};

export default LanguageSwitcher;
