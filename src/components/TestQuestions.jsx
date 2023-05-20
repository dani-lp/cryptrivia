import * as React from "react";
import { Button } from "./Button";
import { RadioGroup } from "@headlessui/react";
import { classNames } from "@/utils";
import { Alert } from "./Alert";

const Answers = ({ answers, selected, setSelected }) => {
  return (
    <RadioGroup value={selected} onChange={setSelected}>
      <RadioGroup.Label className="sr-only">Privacy setting</RadioGroup.Label>
      <div className="-space-y-px rounded-md bg-white">
        {Object.values(answers).map((answer, answerIdx) => (
          <RadioGroup.Option
            key={answer}
            value={answer}
            className={({ checked }) =>
              classNames(
                answerIdx === 0 ? "rounded-tl-md rounded-tr-md" : "",
                answerIdx === Object.values(answers).length - 1
                  ? "rounded-bl-md rounded-br-md"
                  : "",
                checked
                  ? "z-10 border-emerald-200 bg-emerald-50"
                  : "border-gray-200",
                "relative flex cursor-pointer border p-4 focus:outline-none"
              )
            }
          >
            {({ active, checked }) => (
              <>
                <span
                  className={classNames(
                    checked
                      ? "border-transparent bg-emerald-600"
                      : "border-gray-300 bg-white",
                    active ? "ring-2 ring-emerald-600 ring-offset-2" : "",
                    "mt-0.5 flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-full border"
                  )}
                  aria-hidden="true"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                <span className="ml-3 flex flex-col">
                  <RadioGroup.Label
                    as="span"
                    className={classNames(
                      checked ? "text-emerald-900" : "text-gray-900",
                      "block text-sm font-medium"
                    )}
                  >
                    {answer}
                  </RadioGroup.Label>
                </span>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

const QuestionContainer = ({ question }) => {
  const [resultCorrect, setResultCorrect] = React.useState(null);
  const [selected, setSelected] = React.useState(null);

  const handleCheck = () => {
    if (question.answers[question.correctAnswerKey] === selected) {
      setResultCorrect(true);
    } else {
      setResultCorrect(false);
    }
  };

  const handleSetSelected = (newValue) => {
    setSelected(newValue);
    setResultCorrect(null);
  }

  const alertContent =
    resultCorrect === true
      ? {
          type: "success",
          title: "¡Respuesta correcta!",
        }
      : {
          type: "error",
          title: "Respuesta incorrecta...",
          errors: [],
        };

  return (
    <div className="relative col-span-1 flex flex-col rounded-lg border border-gray-200 p-4 dark:border-zinc-700">
      <h3 className="m-0 mb-2 border-b border-gray-200 pb-2 min-h-[70px]">
        {question.title}
      </h3>

      <div className="my-4">
        <Answers
          answers={question.answers}
          selected={selected}
          setSelected={handleSetSelected}
        />
      </div>

      <Alert
        shown={resultCorrect !== null && selected !== null}
        content={alertContent}
        className="mb-4"
      />

      <Button
        onClick={handleCheck}
        disabled={selected === null || resultCorrect !== null}
        className="mt-auto w-full"
      >
        Comprobar
      </Button>
    </div>
  );
};

export const TestQuestions = ({ questions }) => {
  return (
    <div className="grid grid-cols-1 gap-4 xl:max-w-none xl:grid-cols-2">
      {questions.map((question) => (
        <QuestionContainer key={question} question={question} />
      ))}
    </div>
  );
};
