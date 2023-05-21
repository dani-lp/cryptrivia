import * as React from "react";
import { Button } from "../Button";
import { TextAreaField } from "../TextAreaField";
import { InputField } from "../InputField";
import { encryptWithAesCbc } from "@/utils/crypto";

export const AESEncrypt = () => {
  const [key, setKey] = React.useState("");
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [iv, setIv] = React.useState("");

  const handleEncrypt = async () => {
    try {
      const { encryptedMessage, iv: newIv } = await encryptWithAesCbc(
        input,
        key
      );
      setOutput(encryptedMessage);
      setIv(newIv);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <InputField
        name="aes-encrypt-key"
        id="aes-encrypt-key"
        label="Clave"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        required
      />
      <TextAreaField
        id="aes-encrypt-input"
        name="aes-encrypt-input"
        label="Texto a encriptar"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
      />
      <TextAreaField
        id="aes-encrypt-output"
        name="aes-encrypt-output"
        label="Texto encriptado"
        value={output}
        onChange={() => null}
        withCopy
      />
      <TextAreaField
        id="aes-encrypt-iv"
        name="aes-encrypt-iv"
        label="Vector de Inicialización (IV)"
        value={iv}
        onChange={() => null}
        withCopy
      />
      <Button
        disabled={key.length !== 32 || input.length === 0}
        onClick={handleEncrypt}
      >
        Encriptar
      </Button>
    </div>
  );
};
