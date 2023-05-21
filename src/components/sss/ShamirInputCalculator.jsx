import * as React from "react";
import { Button } from "@/components/Button";
import { SelectField } from "@/components/SelectField";
import { InputField } from "@/components/InputField";
import { Spinner } from "@/components/Spinner";
import { CopyButton } from "@/components/CopyButton";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const MAX_SECRET_LENGTH = 100;

const nValues = [
  { id: 2, name: "2 participantes" },
  { id: 3, name: "3 participantes" },
  { id: 4, name: "4 participantes" },
  { id: 5, name: "5 participantes" },
  { id: 6, name: "6 participantes" },
  { id: 7, name: "7 participantes" },
  { id: 8, name: "8 participantes" },
  { id: 9, name: "9 participantes" },
  { id: 10, name: "10 participantes" },
];

export const ShamirInputCalculator = () => {
  const [loading, setLoading] = React.useState(false);
  const [shares, setShares] = React.useState([]);
  const [secret, setSecret] = React.useState("");
  const [nSelected, setNSelected] = React.useState(nValues[0]);
  const [kSelected, setKSelected] = React.useState(nValues[0]);

  React.useEffect(() => {
    if (kSelected.id > nSelected.id) {
      setKSelected(nSelected);
    }
  }, [nSelected, kSelected]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(nSelected, kSelected);

    setLoading(true);
    const res = await fetch(`${API_URL}/api/shamir/generate`, {
      method: "POST",
      body: JSON.stringify({
        secret: secret,
        share_amount: nSelected.id,
        threshold: kSelected.id,
      }),
    });
    setLoading(false);

    const { shares } = await res.json();
    setShares(shares);

    console.log(shares);
    console.log(shares.map((share) => share.join(",")).join(";"));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length > MAX_SECRET_LENGTH) {
      return;
    }
    setSecret(value);
  };

  const stringShares = shares.map((share) => share.join(",")).join(";");

  return (
    <div className="relative rounded-lg border border-gray-200 dark:border-zinc-700">
      {loading && (
        <div className="absolute z-40 flex h-full w-full items-center justify-center rounded-lg bg-white bg-opacity-80 dark:bg-zinc-800/80">
          <Spinner size="lg" />
        </div>
      )}

      <div className="p-4">
        <h3 className="m-0 mb-2 border-b border-gray-200 pb-2">
          Dividir secreto
        </h3>

        <form onSubmit={handleSubmit}>
          <InputField
            value={secret}
            onChange={handleInputChange}
            id="secreto"
            name="secreto"
            label="Secreto"
            placeholder="Escribe tu secreto..."
            className="mb-4"
            disabled={loading}
            required
          />

          <div className="mb-4">
            <SelectField
              label="Número total de participantes (n)"
              selected={nSelected}
              setSelected={setNSelected}
              values={nValues.slice(1, nValues.length)}
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <SelectField
              label="Mínimo de participantes para descifrar (k)"
              selected={kSelected}
              setSelected={setKSelected}
              values={nValues.slice(0, nSelected.id - 1)}
              disabled={loading}
            />
          </div>

          {!loading && shares.length > 0 && (
            <div className="mb-4 flex items-center justify-center">
              <span className="mr-2">¡Resultado obtenido!</span>
              <CopyButton code={stringShares} />
            </div>
          )}

          <Button
            disabled={loading || secret.length === 0}
            variant="filled"
            className="w-full"
          >
            Dividir
          </Button>
        </form>
      </div>
    </div>
  );
};
