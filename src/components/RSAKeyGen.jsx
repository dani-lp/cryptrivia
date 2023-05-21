import * as React from "react";
import * as keypair from "keypair";
import { TextAreaField } from "./TextAreaField";
import { Button } from "./Button";

export const RSAKeyGen = () => {
  const [loading, setLoading] = React.useState(false);
  const [publicKey, setPublicKey] = React.useState("");
  const [privateKey, setPrivateKey] = React.useState("");

  const generateKeypair = React.useCallback(async () => {
    return new Promise((resolve, reject) => {
      const pair = keypair({ bits: 512 });
      resolve(pair);

      if (pair.publicKey === null || pair.privateKey === null) {
        reject("Error generating keypair");
      }
    });
  }, []);

  const handleGenerateKeypair = React.useCallback(async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 200));

    try {
      const pair = await generateKeypair();
      setPublicKey(pair.public);
      setPrivateKey(pair.private);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div>
      <Button
        onClick={handleGenerateKeypair}
        disabled={loading}
        className="mb-4"
      >
        {loading ? "Generando..." : "Generar par de claves"}
      </Button>
      <div className="grid grid-cols-1 items-start gap-x-16 gap-y-10 xl:max-w-none xl:grid-cols-2">
        <TextAreaField
          label="Clave pública"
          value={publicKey}
          onChange={setPublicKey}
          rows={10}
          withCopy
          disabled={loading}
        />
        <TextAreaField
          label="Clave privada"
          value={privateKey}
          onChange={setPrivateKey}
          rows={10}
          withCopy
          disabled={loading}
        />
      </div>
    </div>
  );
};
