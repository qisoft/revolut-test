export const SUPPORTED_CURRENCIES = [
  {
    code: 'EUR',
    symbol: '€'
  },
  {
    code: 'SEK',
    symbol: 'kr',
  },
  {
    code: 'USD',
    symbol: '$',
  },
  {
    code: 'RUB',
    symbol: '₽',
  }].reduce((prev, next) => ({...prev, [next.code]: next}), {});

export const COLORS = {
  brand: '#D52F8A',
  brandDisabled: '#EFC4E2',
  text: '#000000',
  backgroundLight: '#FFFFFFF',
  backgroundDark: '#EEEEEE',
  errorText: '#FF00000',
  errorBackground: '#F2E5E5',
};