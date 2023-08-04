import config from "../config.json";
import { fetchWrapper } from "./fetchWrapper.tsx";

interface Question {
  response_code: number;
  results: [
    {
      category: string;
      correct_answer: string;
      difficulty: string;
      incorrect_answers: string[];
      question: string;
      type: string;
    },
  ];
}

export const authService = {
  question: async (category: string | number, difficulty: string) => {
    difficulty = difficulty.toLowerCase();
    try {
      switch (category) {
        case "Sports":
          category = 21;
          break;
        case "Music":
          category = 12;
          break;
        case "History":
          category = 23;
          break;
        case "Geography":
          category = 22;
          break;
        case "Politics":
          category = 24;
          break;
      }
      const url = `${config.baseUrl}api.php?amount=15&category=${category}&difficulty=${difficulty}&type=multiple`;
      const response = await fetchWrapper.get(url);
      return (response.data as { results: Question[] }).results;
    } catch (error) {
      console.log(error);
    }
  },
};
