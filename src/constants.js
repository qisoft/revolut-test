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