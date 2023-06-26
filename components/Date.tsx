import { parseISO, format } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import ru from 'date-fns/locale/ru';
import { LocaleTypes } from '@/types';

interface DateProps {
  dateString: string;
  locale: LocaleTypes;
}

const Date: React.FC<DateProps> = ({ dateString, locale }) => {
  const date = parseISO(dateString);
  const localeFormat = locale === 'en' ? enUS : ru;
  return (
    <time dateTime={dateString}>{format(date, 'LLLL d, yyyy', { locale: localeFormat })}</time>
  );
};

export default Date;
