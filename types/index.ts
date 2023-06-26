import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

export interface PostData {
  id: string;
  title: string;
  date: string;
}

export interface PostContentData extends PostData {
  contentHtml: string;
  locale: LocaleTypes;
}

export interface PostId {
  params: Params;
}

export type LocaleTypes = 'ru' | 'en';
