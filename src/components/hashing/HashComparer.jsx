import * as React from "react";
import { TextAreaField } from "../TextAreaField";
import SparkMD5 from "spark-md5";

const ROW_COUNT = 10;
const MAX_INPUT_LENGTH = 10000;

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

const md5Hash = (str) => {
  const hashHex = SparkMD5.hash(str);
  return hashHex;
};

const computeHash = async (value, algorithm) => {
  let hash;
  switch (algorithm) {
    case "SHA-1":
      hash = await sha1Hash(value);
      break;
    case "MD5":
      hash = md5Hash(value);
      break;
  }

  return hash;
};

export const HashComparer = ({ algorithm = "SHA-1" }) => {
  const [input, setInput] = React.useState("");
  const [hash, setHash] = React.useState("");

  React.useEffect(() => {
    const loadInitialHash = async () => {
      const hash = await computeHash(input, algorithm);
      setHash(hash);
    };
    loadInitialHash();
  }, [algorithm]);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    if (value.length > MAX_INPUT_LENGTH) {
      return;
    }

    let hash;
    switch (algorithm) {
      case "SHA-1":
        hash = await sha1Hash(value);
        break;
      case "MD5":
        hash = await md5Hash(value);
        break;
    }

    if (!hash) {
      return;
    }

    setInput(value);
    setHash(hash);
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
        value={hash}
        onChange={() => null}
        rows={ROW_COUNT}
      />
    </div>
  );
};
