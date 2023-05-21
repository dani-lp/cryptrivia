import * as React from "react";
import { TextAreaField } from "../TextAreaField";

const ROW_COUNT = 10;

export const HashComparer = () => {
  const [input, setInput] = React.useState("");
  const [sha1, setSha1] = React.useState("");
  
  const sha1Hash = async (str) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest("SHA-1", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    if (value.length > 10000) {
      return;
    }

    const hash = await sha1Hash(value);

    setInput(value);
    setSha1(hash);
  };

  return (
    <div className="grid grid-cols-1 items-start gap-x-16 gap-y-10 xl:max-w-none xl:grid-cols-2">
      <TextAreaField
        label="Tu texto"
        value={input}
        onChange={handleInputChange}
        rows={ROW_COUNT}
      />
      <TextAreaField
        label="SHA-1"
        value={sha1}
        onChange={() => null}
        rows={ROW_COUNT}
      />
    </div>
  );
};
