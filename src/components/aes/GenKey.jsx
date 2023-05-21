import * as React from "react";
import { Button } from "../Button";
import { TextAreaField } from "../TextAreaField";
import { generateAesKey } from "@/utils/crypto";

export const GenKey = () => {
  const [key, setKey] = React.useState("");

  const handleGenerateKey = async () => {
    try {
      const key = await generateAesKey();
      setKey(key);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <TextAreaField
        label="Clave generada"
        id="aes-gen-key"
        name="aes-gen-key"
        value={key}
        onChange={() => null}
        withCopy
        required
      />
      <Button className="mt-4 w-full" onClick={handleGenerateKey}>
        Generar clave
      </Button>
    </div>
  );
};
