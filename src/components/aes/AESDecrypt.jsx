import * as React from "react";
import { InputField } from "../InputField";
import { TextAreaField } from "../TextAreaField";
import { Button } from "../Button";
import { decryptWithAesCbc } from "@/utils/crypto";


export const AESDecrypt = () => {
  const [key, setKey] = React.useState("");
  const [input, setInput] = React.useState("");
  const [iv, setIv] = React.useState("");
  const [output, setOutput] = React.useState("");

  const handleDecrypt = async () => {
    try {
      const decrypted = await decryptWithAesCbc(input, key, iv);
      setOutput(decrypted);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <InputField
        name="aes-decrypt-key"
        id="aes-decrypt-key"
        label="Clave"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        required
      />
      <TextAreaField
        id="aes-decrypt-input"
        name="aes-decrypt-input"
        label="Texto a desencriptar"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
      />
      <TextAreaField
        id="aes-decrypt-iv"
        name="aes-decrypt-iv"
        label="Vector de inicialización (IV)"
        value={iv}
        onChange={(e) => setIv(e.target.value)}
        required
      />
      <TextAreaField
        id="aes-decrypt-output"
        name="aes-decrypt-output"
        label="Texto desencriptado"
        value={output}
        onChange={() => null}
      />
      <Button
        disabled={key.length !== 32 || input.length === 0 || iv.length === 0}
        onClick={handleDecrypt}
      >
        Desencriptar
      </Button>
    </div>
  );
};
