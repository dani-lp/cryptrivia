import { decryptWithAesCbc, encryptWithAesCbc, generateAesKey } from "@/utils/crypto";

export const Test = () => {
  const handleRun = () => {
    const message = "Hello, World!";
    generateAesKey()
      .then((key) => {
        console.log("Generated AES key:", key);

        encryptWithAesCbc({ key, data: message })
          .then((encrypted) => {
            const [encryptedData, iv] = encrypted;
            console.log("Encrypted message:", encryptedData);

            decryptWithAesCbc({ key, data: encryptedData, iv })
              .then((decrypted) => console.log("Decrypted message:", decrypted))
              .catch((error) => console.error("Decryption error:", error));
          })
          .catch((error) => console.error("Encryption error:", error));
      })
      .catch((error) => console.error("Key generation error:", error));
  };

  return <button onClick={handleRun}>Test</button>;
};
