import { classNames } from "@/utils";
import { AcademicCapIcon } from "@heroicons/react/24/solid";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: "700" });

export function Logo(props) {
  return (
    <div className="flex items-center gap-2">
      <AcademicCapIcon className="h-6 w-6 text-emerald-400" />
      <h1
        className={classNames("font-bold text-zinc-900 dark:text-white", montserrat.className)}
      >
        Cryptrivia
      </h1>
    </div>
  );
}
