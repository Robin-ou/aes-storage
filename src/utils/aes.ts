import CryptoJS from "crypto-js";

//十六位十六进制数作为密钥
const KEY = CryptoJS.enc.Utf8.parse("1234123412ABCDEF");
//十六位十六进制数作为密钥偏移量
const IV = CryptoJS.enc.Utf8.parse("ABCDEF1234123412");

/**
 * 本地通用的AES解密
 * @param str 解密参数
 * @returns 解密结果
 */
export function commonDecrypt(str: string) {
	const encryptedHexStr = CryptoJS.enc.Hex.parse(str);
	const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
	const decrypt = CryptoJS.AES.decrypt(srcs, KEY, {
		iv: IV,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	});
	const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
	return decryptedStr.toString();
}

/**
 * 本地通用的AES加密
 * @param str 加密参数
 * @returns 加密结果
 */
export function commonEncrypt(str: string) {
	const srcs = CryptoJS.enc.Utf8.parse(str);
	const encrypted = CryptoJS.AES.encrypt(srcs, KEY, {
		iv: IV,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	});
	return encrypted.ciphertext.toString().toUpperCase();
}
