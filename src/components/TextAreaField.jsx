import { classNames } from "@/utils";
import { CopyButton } from "./CopyButton";

export const TextAreaField = (props) => {
  const { id, label, inputClassName, required } = props;
  const { withCopy, ...otherProps } = props;

  return (
    <div>
      <label
        htmlFor={id}
        className="flex items-center justify-between text-sm font-medium leading-6 text-gray-900 dark:text-white"
      >
        <div>
          {label} {required && <span className="text-red-500">*</span>}
        </div>
        {withCopy && props.value && props.value.length > 0 && (
          <CopyButton code={props.value} />
        )}
      </label>
      <div className="mt-2">
        <textarea
          className={classNames(
            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm",
            "ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-500",
            "dark:bg-zinc-900 dark:text-white dark:ring-zinc-600 sm:text-sm sm:leading-6",
            "disabled:cursor-not-allowed disabled:opacity-50",
            inputClassName
          )}
          {...otherProps}
        />
      </div>
    </div>
  );
};
