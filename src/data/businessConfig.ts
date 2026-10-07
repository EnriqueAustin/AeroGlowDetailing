const phoneInternational = '27738595637';

export const BUSINESS = Object.freeze({
  phoneInternational,
  phoneDisplay: '073 859 5637',
  whatsAppBase: `https://wa.me/${phoneInternational}`,
  homeBase: 'Vredenburg',
  serviceAreas: ['Vredenburg', 'Saldanha', 'Langebaan', 'Jacobsbaai'],
  hours: 'Mon – Sat: 08:00 – 17:00',
  headlightPriceZAR: 650,
} as const);

export const whatsAppLink = (message: string): string =>
  `${BUSINESS.whatsAppBase}?text=${encodeURIComponent(message)}`;
