import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AnswerButton } from "../../MuiStyles/MuiStyles";
import background from "../../../public/background.jpg";
import logo from "../../../public/logo.png";
import fiftyFifty from "../../../public/joker1.webp";
import audience from "../../../public/joker2.webp";
import lifeLine from "../../../public/joker3.webp";

const GameScreen = () => {
  const gameResults = useSelector((state: any) => state.gameResults);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null,
  );
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [showCorrectAnswerPopup, setShowCorrectAnswerPopup] = useState(false);
  const [fromLifeline, setFromLifeline] = useState(false);
  const [fiftyFiftyUsed, setFiftyFiftyUsed] = useState(false);
  const [audienceUsed, setAudienceUsed] = useState(false);
  const [lifelineUsed, setLifelineUsed] = useState(false);
  const navigate = useNavigate();
  const currentQuestion = gameResults[currentQuestionIndex];

  useEffect(() => {
    if (currentQuestionIndex < gameResults.length) {
      const currentQuestion = gameResults[currentQuestionIndex];
      const allAnswers = [
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer,
      ];
      const shuffled = shuffleArray(allAnswers);
      setShuffledAnswers(shuffled);
      setSelectedAnswerIndex(null);
      setShowCorrectAnswer(false);
    }
  }, [currentQuestionIndex, gameResults]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!showCorrectAnswer && timeRemaining > 0) {
        setTimeRemaining((prevTime) => prevTime - 1);
      } else if (timeRemaining === 0) {
        navigate("/");
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [showCorrectAnswer, timeRemaining]);

  useEffect(() => {
    setTimeRemaining(60);
  }, [currentQuestionIndex]);

  const shuffleArray = (array: any) => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const handleAnswerClick = (index: number) => {
    if (showCorrectAnswer) return;
    setSelectedAnswerIndex(index);
    setTimeout(() => {
      if (shuffledAnswers[index] === currentQuestion.correct_answer) {
        setShowCorrectAnswer(true);
        setTimeout(() => {
          handleNextQuestion();
        }, 1500);
      } else {
        setShowCorrectAnswer(true);
        setTimeout(() => {
          navigate("/");
        }, 3500);
      }
    }, 5000);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < gameResults.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleFiftyFifty = () => {
    setFiftyFiftyUsed(true);
    const currentQuestion = gameResults[currentQuestionIndex];
    const correctAnswer = currentQuestion.correct_answer;
    const incorrectAnswers = currentQuestion.incorrect_answers;
    let indicesToRemove: number[] = [];
    while (indicesToRemove.length < 2) {
      const randomIndex = Math.floor(Math.random() * incorrectAnswers.length);
      if (!indicesToRemove.includes(randomIndex)) {
        indicesToRemove.push(randomIndex);
      }
    }
    const newShuffledAnswers = incorrectAnswers
      .filter((_: any, index: number) => !indicesToRemove.includes(index))
      .concat(correctAnswer);
    setShuffledAnswers(newShuffledAnswers);
  };

  const handleAudience = () => {
    setAudienceUsed(true);
    setShowCorrectAnswerPopup(true);
  };

  const handleLifeline = () => {
    setLifelineUsed(true);
    setShowCorrectAnswerPopup(true);
    setFromLifeline(true);
  };

  return (
    <>
      <div className="relative h-screen">
        {showCorrectAnswerPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-20">
            <div className="bg-white p-4 rounded-md shadow-md">
              <p className="text-xl">
                {fromLifeline
                  ? "Your friend thinks the correct answer is:"
                  : "The audience thinks the correct answer is:"}{" "}
              </p>
              <p className="text-2xl font-bold">
                {currentQuestion.correct_answer}
              </p>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={() => setShowCorrectAnswerPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
        <img
          src={fiftyFifty}
          alt="fiftyFifty"
          className={`sm:w-2/12 lg:w-20 w-1/12 absolute top-0 right-40 m-4 cursor-pointer z-10 ${
            fiftyFiftyUsed ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={fiftyFiftyUsed ? undefined : handleFiftyFifty}
        />
        <img
          src={audience}
          alt="audience"
          className={`sm:w-2/12 lg:w-20 w-1/12 absolute top-0 right-20 m-4 cursor-pointer z-10 ${
            audienceUsed ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={audienceUsed ? undefined : handleAudience}
        />
        <img
          src={lifeLine}
          alt="lifeLine"
          className={`sm:w-2/12 w-1/12 lg:w-20 absolute top-0 right-0 m-4 cursor-pointer z-10 ${
            lifelineUsed ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={lifelineUsed ? undefined : handleLifeline}
        />
        <img
          src={background}
          alt="background"
          className="w-full z-0 h-screen"
        />
        <div className="flex flex-col absolute inset-0 justify-center items-center">
          <img
            src={logo}
            alt="logo"
            className="w-2/3 h-full object-contain z-10 sm:w-1/2 sm:h-auto md:w-1/3 lg:w-1/4 lg:h-auto"
          />
          <div className="absolute top-0 left-0 m-4 text-white-custom">
            <div className="w-16 h-16 rounded-full border-4 border-white-custom flex items-center justify-center">
              <p className="text-center">{timeRemaining}</p>
            </div>
          </div>
          <div className="mt-8 w-4/5 sm:w-3/5 md:w-2/3 lg:w-1/2">
            {currentQuestion && (
              <div className="bg-blue-950 p-2 text-center rounded-lg shadow-md mb-4">
                <h2 className="text-white-custom text-2xl text-center">
                  {currentQuestion.question
                    .replace(/&quot;/g, '"')
                    .replace(/&#039;/g, "'")}
                </h2>
              </div>
            )}
            <div className="flex flex-col">
              <div className="grid grid-cols-2 gap-2">
                {shuffledAnswers.map((answer, index) => (
                  <AnswerButton
                    key={index}
                    className="mb-2"
                    onClick={() => handleAnswerClick(index)}
                    style={{
                      backgroundColor:
                        showCorrectAnswer &&
                        answer === currentQuestion.correct_answer
                          ? "#34D399"
                          : index === selectedAnswerIndex && showCorrectAnswer
                          ? answer === currentQuestion.correct_answer
                            ? "#34D399"
                            : "#EF4444"
                          : index === selectedAnswerIndex
                          ? "#F97316"
                          : "",
                    }}
                  >
                    {answer}
                  </AnswerButton>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameScreen;
