import { ButtonHTMLAttributes, DetailedHTMLProps, useState } from 'react';
import { useTranslation } from 'next-i18next';

interface ThemeSwitcherProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ ...props }) => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const { t } = useTranslation('common');

  const handleClick = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  return (
    <button onClick={handleClick} {...props}>
      {isDark ? t('header.change.theme.light') : t('header.change.theme.dark')}
    </button>
  );
};

export default ThemeSwitcher;
