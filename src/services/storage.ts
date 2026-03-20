import AsyncStorage from '@react-native-async-storage/async-storage';

const ACTIONS_CACHE_KEY = 'CACHE_ACTIONS';
const PROOFS_CACHE_PREFIX = 'CACHE_PROOFS_';

type CacheEnvelope<T> = {
  data: T;
  fetchedAt: number;
  signature: string;
};

type CacheReadResult<T> = {
  exists: boolean;
  data: T;
  fetchedAt: number;
  signature: string | null;
};

const getSignature = (value: unknown): string => {
  try {
    return JSON.stringify(value) ?? '';
  } catch {
    return '';
  }
};

const readCache = async <T>(
  key: string,
  fallback: T,
): Promise<CacheReadResult<T>> => {
  try {
    const raw = await AsyncStorage.getItem(key);

    if (!raw) {
      return {
        exists: false,
        data: fallback,
        fetchedAt: 0,
        signature: null,
      };
    }

    const parsed = JSON.parse(raw) as Partial<CacheEnvelope<T>>;

    if (
      typeof parsed.fetchedAt === 'number' &&
      typeof parsed.signature === 'string' &&
      Object.prototype.hasOwnProperty.call(parsed, 'data')
    ) {
      return {
        exists: true,
        data: parsed.data as T,
        fetchedAt: parsed.fetchedAt,
        signature: parsed.signature,
      };
    }

    return {
      exists: false,
      data: fallback,
      fetchedAt: 0,
      signature: null,
    };
  } catch (error) {
    console.error('Error reading cache:', error);
    return {
      exists: false,
      data: fallback,
      fetchedAt: 0,
      signature: null,
    };
  }
};

const writeCache = async <T>(key: string, data: T): Promise<void> => {
  try {
    const payload: CacheEnvelope<T> = {
      data,
      fetchedAt: Date.now(),
      signature: getSignature(data),
    };

    await AsyncStorage.setItem(key, JSON.stringify(payload));
  } catch (error) {
    console.error('Error writing cache:', error);
  }
};

const proofsKey = (actionId: string) => `${PROOFS_CACHE_PREFIX}${actionId}`;

export const isStale = (fetchedAt: number, ttlMs = 60_000): boolean => {
  return Date.now() - fetchedAt > ttlMs;
};

export const hasChanged = (
  oldSignature: string | null,
  nextData: unknown,
): boolean => {
  return oldSignature !== getSignature(nextData);
};

export const getActionsCache = async () => {
  return readCache<any[]>(ACTIONS_CACHE_KEY, []);
};

export const setActionsCache = async (actions: any[]) => {
  await writeCache(ACTIONS_CACHE_KEY, actions);
};

export const invalidateActionsCache = async () => {
  try {
    await AsyncStorage.removeItem(ACTIONS_CACHE_KEY);
  } catch (error) {
    console.error('Error invalidating actions cache:', error);
  }
};

export const getProofsCache = async (actionId: string) => {
  return readCache<any[]>(proofsKey(actionId), []);
};

export const setProofsCache = async (actionId: string, proofs: any[]) => {
  await writeCache(proofsKey(actionId), proofs);
};

export const invalidateProofsCache = async (actionId: string) => {
  try {
    await AsyncStorage.removeItem(proofsKey(actionId));
  } catch (error) {
    console.error('Error invalidating proofs cache:', error);
  }
};

export const clearAllAppCache = async () => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const cacheKeys = allKeys.filter(
      key => key === ACTIONS_CACHE_KEY || key.startsWith(PROOFS_CACHE_PREFIX),
    );

    if (cacheKeys.length > 0) {
      await AsyncStorage.multiRemove(cacheKeys);
    }
  } catch (error) {
    console.error('Error clearing app cache:', error);
  }
};

export const saveActions = async (actions: any[]) => {
  await setActionsCache(actions);
};

export const loadActions = async () => {
  const cache = await getActionsCache();
  return cache.data;
};

const PROFILE_CACHE_KEY = 'CACHE_PROFILE';

export const getProfileCache = async () => {
  return readCache<{ name: string; email: string } | null>(
    PROFILE_CACHE_KEY,
    null,
  );
};

export const setProfileCache = async (profile: { name: string; email: string }) => {
  await writeCache(PROFILE_CACHE_KEY, profile);
};

export const invalidateProfileCache = async () => {
  try {
    await AsyncStorage.removeItem(PROFILE_CACHE_KEY);
  } catch (error) {
    console.error('Error invalidating profile cache:', error);
  }
};