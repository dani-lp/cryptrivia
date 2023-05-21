export const generateAesKey = async () => {
  const key = await crypto.subtle.generateKey(
    {
      name: "AES-CBC",
      length: 128,
    },
    true,
    ["encrypt", "decrypt"]
  );

  const keyData = await crypto.subtle.exportKey("raw", key);
  const keyHex = arrayBufferToHexString(keyData);

  return keyHex;
};

export const encryptWithAesCbc = async (message, key) => {
  const iv = crypto.getRandomValues(new Uint8Array(16));

  const encoder = new TextEncoder();
  const messageData = new TextEncoder().encode(message);
  const keyData = hexStringToUint8Array(key);

  const importedKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    "AES-CBC",
    false,
    ["encrypt"]
  );

  const encryptedData = await crypto.subtle.encrypt(
    {
      name: "AES-CBC",
      iv: iv,
    },
    importedKey,
    messageData
  );

  const encryptedHex = arrayBufferToHexString(encryptedData);

  return {
    encryptedMessage: encryptedHex,
    iv: arrayBufferToHexString(iv.buffer),
  };
};

export const decryptWithAesCbc = async (encryptedMessage, key, ivHexString) => {
  const encryptedBytes = hexStringToUint8Array(encryptedMessage);
  const keyData = hexStringToUint8Array(key);

  const importedKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    "AES-CBC",
    false,
    ["decrypt"]
  );

  const iv = new Uint8Array(hexStringToArrayBuffer(ivHexString));

  const decryptedData = await crypto.subtle.decrypt(
    {
      name: "AES-CBC",
      iv: iv,
    },
    importedKey,
    encryptedBytes
  );

  const decryptedMessage = new TextDecoder().decode(decryptedData);

  return decryptedMessage;
};

// helper methods
const hexStringToUint8Array = (hexString) => {
  const hexArray = hexString.match(/[\da-f]{2}/gi);
  return new Uint8Array(hexArray.map((byte) => parseInt(byte, 16)));
};

const arrayBufferToHexString = (buffer) => {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

const hexStringToArrayBuffer = (hexString) => {
  const hexArray = hexString.match(/[\da-f]{2}/gi);
  const buffer = new ArrayBuffer(hexArray.length);
  const uint8Array = new Uint8Array(buffer);
  hexArray.forEach((byte, index) => {
    uint8Array[index] = parseInt(byte, 16);
  });
  return buffer;
};
