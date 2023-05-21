import { TestQuestions } from "../TestQuestions";

const questions = [
  {
    title:
      "¿Cuál es el objetivo principal del algoritmo de Shamir's Secret Sharing?",
    answers: {
      1: "Encriptar mensajes entre participantes.",
      2: "Compartir secretos entre varios participantes.",
      3: "Descifrar contraseñas de manera segura.",
    },
    correctAnswerKey: "2",
  },
  {
    title:
      "¿Cómo se representan los puntos en el gráfico matemático del algoritmo de Shamir?",
    answers: {
      1: "Como coordenadas (x, y) en un plano cartesiano.",
      2: "Como valores aleatorios en una matriz.",
      3: "Como números primos en una secuencia.",
    },
    correctAnswerKey: "1",
  },
  {
    title:
      "¿Para qué sirve el método de interpolación de Lagrange utilizado en el algoritmo?",
    answers: {
      1: "Calcular líneas tangentes en un gráfico.",
      2: "Encontrar raíces de ecuaciones polinómicas.",
      3: "Construir un polinomio que pase por varios puntos dados.",
    },
    correctAnswerKey: "3",
  },
  {
    title: "¿En qué área de las matemáticas se basa el algoritmo de Shamir?",
    answers: {
      1: "Teoría de grafos",
      2: "Teoría de polinomios",
      3: "Teoría de conjuntos",
    },
    correctAnswerKey: "2",
  },
];

export const Questions = () => <TestQuestions questions={questions} />;
