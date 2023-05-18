import { classNames } from "@/utils";

export const InputField = (props) => {
  const { name, id, label, placeholder, inputClassName } = props;

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          type="text"
          name={name}
          id={id}
          className={classNames(
            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-zinc-600 placeholder:text-gray-400 dark:text-white dark:bg-zinc-900 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6",
            inputClassName
          )}
          placeholder={placeholder}
          {...props}
        />
      </div>
    </div>
  );
};
