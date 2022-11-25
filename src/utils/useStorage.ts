import { commonEncrypt, commonDecrypt } from "./aes";
/**
 * 加密缓存
 * @param isEncrypt 是否加密 默认加密
 * @param globalStorageType 缓存类型 默认sessionStorage
 */
export default function useStorage(isEncrypt = true, globalStorageType: StorageType = "sessionStorage") {
  /**
   * 获取当前缓存类型
   * @param storageType 缓存类型
   * @returns 缓存类型
   */
  const getStorageType = (storageType?: StorageType) => {
    if (storageType) return storageType;
    if (globalStorageType) return globalStorageType;
    return "sessionStorage";
  };

  /**
   * 设置加密缓存数据
   * @param key 加密的key
   * @param str 加密的内容
   * @param storageType 缓存类型 默认sessionStorage
   */
  const setItem = (key: string, str: string, storageType?: StorageType) => {
    window[getStorageType(storageType)].setItem(isEncrypt ? commonEncrypt(key) : key, isEncrypt ? commonEncrypt(str) : str);
  };

  /**
   * 获取加密缓存数据
   * @param key 加密key
   * @param storageType 缓存类型 默认清除sessionStorage
   * @returns 解密结果
   */
  const getItem = (key: string, storageType?: StorageType) => {
    const val = window[getStorageType(storageType)].getItem(isEncrypt ? commonEncrypt(key) : key);
    if (!isEncrypt) return val;
    return val ? commonDecrypt(val) : null;
  };

  /**
   * 转化缓存中的json数据
   * @param key 缓存中的key
   * @param storageType 缓存类型 默认清除sessionStorage
   * @returns
   */
  function jsonParse<T>(key: string, storageType?: StorageType): T {
    const val = getItem(key, storageType);
    return val ? JSON.parse(val) : null;
  }

  /**
   * 删除对应的缓存
   * @param key 需要的删除的key
   * @param storageType 缓存类型 默认清除sessionStorage
   */
  const removeItem = (key: string, storageType?: StorageType) => {
    window[getStorageType(storageType)].removeItem(isEncrypt ? commonEncrypt(key) : key);
  };

  /**
   * 清除缓存
   * @param storageType 缓存类型 默认清除sessionStorage
   */
  const clear = (storageType?: StorageType) => {
    window[getStorageType(storageType)].clear();
  };

  return { setItem, getItem, removeItem, clear, jsonParse };
}

type StorageType = "sessionStorage" | "localStorage";
