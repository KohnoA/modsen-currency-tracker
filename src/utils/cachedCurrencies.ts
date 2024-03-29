import { getCurrenciesRate } from '@/services';
import { CurrenciesResponseType } from '@/types';

import { areArraysEqual } from './areArraysEqual';
import { getDiffHours } from './date';

const LOCAL_STORAGE_CURRENCIES_RATE_KEY = 'currencies-rate';
const CACHE_TIME_IN_HOURS = 12;

export async function getCurrenciesRateCached(currencies: string[]) {
  const dataInLocalStorage = localStorage.getItem(LOCAL_STORAGE_CURRENCIES_RATE_KEY);

  const getAndSaveCurrenciesRate = async () => {
    const newData = await getCurrenciesRate(currencies);

    localStorage.setItem(LOCAL_STORAGE_CURRENCIES_RATE_KEY, JSON.stringify(newData));

    return newData;
  };

  if (dataInLocalStorage) {
    const cacheData = JSON.parse(dataInLocalStorage) as CurrenciesResponseType;

    const dateNow = new Date(Date.now());
    const dateCache = new Date(cacheData.meta.last_updated_at);

    const isValidDate = getDiffHours(dateCache, dateNow) > CACHE_TIME_IN_HOURS;
    const areCacheEqualToRequested = areArraysEqual(Object.keys(cacheData.data), currencies);

    if (!isValidDate) {
      localStorage.removeItem(LOCAL_STORAGE_CURRENCIES_RATE_KEY);
    }

    return isValidDate && areCacheEqualToRequested ? cacheData : getAndSaveCurrenciesRate();
  }

  return getAndSaveCurrenciesRate();
}

export async function getCurrencyRateCached(currency: string, base: string) {
  const sessionStorageKey = `${currency}/${base}`;
  const cachedRate = sessionStorage.getItem(sessionStorageKey);

  if (cachedRate) {
    return JSON.parse(cachedRate);
  }

  const response = await getCurrenciesRate(currency, base);
  const rate = response.data[currency].value;

  sessionStorage.setItem(sessionStorageKey, JSON.stringify(rate));

  return rate;
}
