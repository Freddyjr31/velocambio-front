export interface AdZone {
  key: string;
  width: number;
  height: number;
}

export const ADS_ZONES = {
  breakpoint: 768,
  desktop: { key: '7b0101ea08154a95d0a309d94c31525f', width: 728, height: 90 },
  mobile: { key: 'db966743544318fa00d4392e196ee482', width: 320, height: 50 },
} as const;

export const SOCIAL_BAR_SCRIPT = 'https://progressmagnify.com/eb/72/16/eb7216ce89b6567538a8eb9b2b960615.js';
