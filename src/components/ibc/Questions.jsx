import { TestQuestions } from "../TestQuestions";

const questions = [
  {
    title:
      "En la criptografía basada en identidad, ¿qué se utiliza en lugar de una clave pública convencional?",
    answers: {
      1: "Una dirección IP.",
      2: "Un identificador único, como una dirección de correo electrónico.",
      3: "Una contraseña compartida.",
    },
    correctAnswerKey: "2",
  },
  {
    title:
      "¿Qué entidad es responsable de generar las claves públicas en la criptografía basada en identidad?",
    answers: {
      1: "El remitente del mensaje.",
      2: "El destinatario del mensaje.",
      3: "La Autoridad de Certificación (CA).",
    },
    correctAnswerKey: "3",
  },
];

export const Questions = () => <TestQuestions questions={questions} />;
