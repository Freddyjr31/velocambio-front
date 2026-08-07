export type RateTypeKey = 'oficial' | 'promedio' | 'euro' | 'p2p';

export type ArticleCategory = 'Dólar' | 'Euro' | 'Crypto' | 'Guía';

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  category: ArticleCategory;
  readingTimeMinutes: number;
  liveRateType?: RateTypeKey;
  sections: ArticleSection[];
}
