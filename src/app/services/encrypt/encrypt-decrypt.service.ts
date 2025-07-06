import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/app.config';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptService {

  constructor() { }
  async encryptString(plainText: string): Promise<string> {
    const encryptionKey = AppConfig.encryptionKey;
    const keyBytes = Uint8Array.from(atob(encryptionKey), (c) =>
      c.charCodeAt(0),
    );
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await crypto.subtle.importKey(
      'raw',
      keyBytes,
      { name: 'AES-GCM' },
      false,
      ['encrypt'],
    );
    const encodedText = new TextEncoder().encode(plainText);
    const cipherBuffer = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      encodedText,
    );
    const combined = new Uint8Array(iv.byteLength + cipherBuffer.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(cipherBuffer), iv.byteLength);
    return btoa(String.fromCharCode(...combined));
  }

  getEncryptedData(data: any) {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), AppConfig.encryptionKey).toString();
   // console.log(encrypted);
    localStorage.setItem('encrypted', encrypted);
  }

  getDecryptedData(encrypted: any) {
    const decrypted = CryptoJS.AES.decrypt(encrypted,AppConfig.encryptionKey,).toString(CryptoJS.enc.Utf8);
    if (decrypted) {
      return JSON.parse(decrypted);
    }
    return null;
  }
}

