import * as React from "react";
import { Button } from "@/components/Button";
import { Spinner } from "@/components/Spinner";
import { TextAreaField } from "@/components/TextAreaField";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const ShamirOutputCalculator = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [shares, setShares] = React.useState([]);
  const [secret, setSecret] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSecret("");
    setError(false);

    const parsedShares = shares
      .split(";")
      .map((share) => share.split(",").map((coord) => parseInt(coord)));

    const res = await fetch(`${API_URL}/api/shamir/reconstruct`, {
      method: "POST",
      body: JSON.stringify({
        shares: parsedShares,
      }),
    });
    setLoading(false);

    if (res.status !== 200) {
      setError(true);
      return;
    }

    const result = await res.json();
    if (result.secret) {
      setSecret(result.secret);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setShares(value);
  };

  return (
    <div className="relative overflow-hidden rounded-lg border border-gray-200 dark:border-zinc-700">
      {loading && (
        <div className="absolute z-40 flex h-full w-full items-center justify-center bg-white bg-opacity-80 dark:bg-zinc-800/80">
          <Spinner size="lg" />
        </div>
      )}

      <div className="p-4">
        <h3 className="m-0 mb-2 border-b border-gray-200 pb-2">
          Reconstruir secreto
        </h3>

        <form onSubmit={handleSubmit}>
          <TextAreaField
            value={shares}
            onChange={handleInputChange}
            id="coordenadas"
            name="coordenadas"
            label="Coordenadas"
            placeholder="Escribe tus coordenadas..."
            inputClassName="mb-4"
            disabled={loading}
            rows={5}
            required
          />

          {!loading && secret.length > 0 && (
            <div className="mb-4 flex items-center justify-center">
              <span className="mr-2">¡Resultado recuperado!</span>"{secret}"
            </div>
          )}

          {!loading && error && (
            <div className="mb-4 flex items-center justify-center">
              <span className="mr-2">
                Ha habido un error... Asegúrate de que el formato de las
                coordenadas es correcto.
              </span>
            </div>
          )}

          <Button disabled={loading} variant="filled" className="w-full">
            Recuperar
          </Button>
        </form>
      </div>
    </div>
  );
};
