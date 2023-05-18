import * as React from "react";
import { Button } from "@/components/Button";
import { SelectField } from "@/components/SelectField";
import { InputField } from "@/components/InputField";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

    const res = await fetch(`${API_URL}/api/shamir/generate`, {
      method: "POST",
      body: JSON.stringify({
        secret: secret,
        share_amount: nSelected.id,
        threshold: kSelected.id,
      }),
    });

    const { shares } = await res.json();

    console.log(shares);
  };

  return (
    <div className="rounded-lg border border-gray-200 p-4 dark:border-zinc-700 ">
      <h3 className="m-0 mb-2 border-b border-gray-200 pb-2">
        Dividir secreto
      </h3>

      <form onSubmit={handleSubmit}>
        <InputField
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          label="Secreto"
          placeholder="Escribe tu secreto..."
          inputClassName="mb-4"
        />

        <div className="mb-4">
          <SelectField
            label="Número total de participantes (n)"
            selected={nSelected}
            setSelected={setNSelected}
            values={nValues.slice(1, nValues.length)}
          />
        </div>

        <div className="mb-4">
          <SelectField
            label="Mínimo de participantes para descifrar (k)"
            selected={kSelected}
            setSelected={setKSelected}
            values={nValues.slice(0, nSelected.id - 1)}
          />
        </div>

        <Button variant="filled" className="w-full">
          Dividir
        </Button>
      </form>
    </div>
  );
};
