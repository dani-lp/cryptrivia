import { TestQuestions } from "../TestQuestions";

const questions = [
  {
    title:
      "¿Por qué se utiliza la randomización en el proceso de encriptado en McEliece?",
    answers: {
      1: "Para generar claves aleatorias.",
      2: "Para dificultar los ataques criptoanalíticos.",
      3: "Para aumentar la eficiencia del algoritmo de decodificación.",
    },
    correctAnswerKey: "2",
  },
  {
    title:
      "¿Cuál es la característica principal de McEliece en términos de seguridad?",
    answers: {
      1: "Utiliza algoritmos de encriptación simétrica.",
      2: "Implementa algoritmos de factorización de números enteros.",
      3: "Se basa en problemas de complejidad NP.",
    },
    correctAnswerKey: "3",
  },
  {
    title:
      "¿Cuál es la clave que se mantiene en secreto en el criptosistema McEliece?",
    answers: {
      1: "La clave pública.",
      2: "La matriz generadora G.",
      3: "El algoritmo de decodificación A.",
    },
    correctAnswerKey: "3",
  },
  {
    title:
      "¿Qué tipo de código lineal se utiliza habitualmente en el criptosistema McEliece?",
    answers: {
      1: "Códigos binarios de Goppa.",
      2: "Códigos de Hamming.",
      3: "Códigos Reed-Solomon.",
    },
    correctAnswerKey: "1",
  },
];

export const Questions = () => <TestQuestions questions={questions} />;
