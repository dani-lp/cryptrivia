import * as React from "react";

export const ShaFetch = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("https://cryptrivia-api.vercel.app/api/handler")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return <div>{JSON.stringify(data)}</div>;
};
