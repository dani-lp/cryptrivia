import * as React from "react";
import { mceliece } from "mceliece";
import { Button } from "../Button";

export const KeyGen = () => {
  const [loading, setLoading] = React.useState(false);
  const [hasConfirmed, setHasConfirmed] = React.useState(false);

  const handleClick = () => {
    if (hasConfirmed) {
      handleGenerate();
    } else {
      setHasConfirmed(true);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 1.- Alice computes the keypair
    const { publicKey: public_key, privateKey: private_key } =
      await mceliece.keyPair(); // probabilistic, ALICE
    // Alice sends 'publicKey' to Bob

    // 2.- Bob computes a shared secret ('secret') and a ciphertext ('cyphertext')
    const { cyphertext, secret: secret_bob } = await mceliece.encrypt(
      public_key
    ); // probabilistic, BOB
    // Bob sends 'cyphertext' to Alice

    // 3.- Alice decapsulates the ciphertext
    const secret_alice = await mceliece.decrypt(cyphertext, private_key); // deterministic, ALICE

    // 4.- secret_bob === secret_alice

    setLoading(false);
    setHasConfirmed(false);
    console.log("Secreto compartido: es el mismo", {
      secret_bob,
      secret_alice,
    });
    console.log("Claves iniciales", { public_key, private_key });
    console.log("Ciphertext enviado por Bob", { cyphertext });
  };

  const buttonContent = loading
    ? "Generando..."
    : hasConfirmed
    ? "¿Estás seguro?"
    : "Generar secretos";

  return (
    <div>
      <span className="mr-4">Abre la consola del navegador y pulsa aquí:</span>
      <Button
        variant={hasConfirmed ? "outline" : "primary"}
        disabled={loading}
        onClick={handleClick}
      >
        {buttonContent}
      </Button>
    </div>
  );
};
