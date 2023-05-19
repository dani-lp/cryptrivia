import clsx from "clsx";
import * as React from "react";
import { ClipboardIcon } from "./icons/ClipboardIcon";

export function CopyButton({ code }) {
  let [copyCount, setCopyCount] = React.useState(0);
  let copied = copyCount > 0;

  React.useEffect(() => {
    if (copyCount > 0) {
      let timeout = setTimeout(() => setCopyCount(0), 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [copyCount]);

  return (
    <button
      type="button"
      className={clsx(
        "group/button right-4 top-3.5 overflow-hidden rounded-full py-1 pl-2 pr-3 text-2xs font-medium border border-gray-300 backdrop-blur transition",
        copied
          ? "bg-emerald-400/10 ring-1 ring-inset ring-emerald-400/20"
          : "bg-white/5 hover:bg-white/7.5 dark:bg-white/2.5 dark:hover:bg-white/5"
      )}
      onClick={() => {
        window.navigator.clipboard.writeText(code).then(() => {
          setCopyCount((count) => count + 1);
        });
      }}
    >
      <span
        aria-hidden={copied}
        className={clsx(
          "pointer-events-none flex items-center gap-0.5 text-zinc-600 transition duration-300",
          copied && "-translate-y-1.5 opacity-0"
        )}
      >
        <ClipboardIcon className="h-5 w-5 fill-zinc-500/60 stroke-zinc-500 transition-colors group-hover/button:stroke-zinc-400" />
        Copiar
      </span>
      <span
        aria-hidden={!copied}
        className={clsx(
          "pointer-events-none absolute inset-0 flex items-center justify-center text-emerald-600 transition duration-300",
          !copied && "translate-y-1.5 opacity-0"
        )}
      >
        Copiado!
      </span>
    </button>
  );
}
