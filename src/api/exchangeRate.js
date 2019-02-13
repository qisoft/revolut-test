import http from 'axios';
import config from '../config';

const ENDPOINT = 'https://openexchangerates.org/api/latest.json';

export async function getExchangeRates() {
  const result = await http.get(ENDPOINT, {
    params: {
      app_id: config.exchangeAppId,
    }
  });
  return result.data.rates;
}