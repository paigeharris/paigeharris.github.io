import aesjs from 'aes-js';
import randomBytes from 'randombytes';
import base64url from 'base64url';

export default class Crypto {
  static genRandomBytes(len) {
    return randomBytes(len);
  };

  static genCnonce() {
    return base64url(this.genRandomBytes(16));
  };

  static padVal(x) {
    x = x.length % 16 === 0 ? `${x}` : `${x}${'\x00'.repeat(16 - (x.length % 16))}`;
    return aesjs.utils.utf8.toBytes(x);
  };

  static hashPassword(pw, nonce, cnonce) {
    pw = this.padVal(pw);
    nonce = new Buffer(nonce, 'base64');
    cnonce = new Buffer(cnonce, 'base64');

    const iv = this.genRandomBytes(16);
    const key = [nonce, cnonce];
    const _key = Buffer.concat(key);
    const CBC = new aesjs.ModeOfOperation.cbc(_key, iv);
    const encryptedBytes = CBC.encrypt(pw);
    const _hashed = [iv, new Buffer(encryptedBytes)];
    const hashedPasswordBytes = Buffer.concat(_hashed);

    return base64url(new Buffer(hashedPasswordBytes));
  };
}