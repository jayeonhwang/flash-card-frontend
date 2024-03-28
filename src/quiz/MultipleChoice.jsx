import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export function MultipleChoice() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [choices, setChoices] = useState([]);
  const [userAnswer, setUserAnswer] = useState("")
  const [message, setMessage] = useState("")
  const [correctCount, setCorrectCount] = useState(0)

  useEffect(() => {
    axios.get(`http://localhost:3000/bundles/${id}.json`)
      .then(response => {
        console.log(response.data);
        setQuestions(response.data);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  }, [id]);

  useEffect(() => {
    if (questions.cards && questions.cards.length > 0) {
      getMultipleChoice();
    }
  }, [activeQuestion, questions.cards]);

  const handleNextQuestion = () => {
    if (activeQuestion < questions.cards.length - 1) {
      setActiveQuestion(prevQuestion => prevQuestion + 1);
      setUserAnswer(" ");
      setMessage("")
    } else {
      setShowResult(true);
    }
  }

  const getMultipleChoice = () => {
    const currentCard = questions.cards[activeQuestion];
    const correctAnswer = currentCard.answer;
    const options = [correctAnswer];

    while (options.length < 4) {
      const randomIndex = Math.floor(Math.random() * questions.cards.length);
      const randomCard = questions.cards[randomIndex];
      const randomAnswer = randomCard.answer;

      if (options.indexOf(randomAnswer) === -1 && randomAnswer !== correctAnswer) {
        options.push(randomAnswer);
      }
    }

    // Shuffle options
    options.sort(() => Math.random() - 0.5);

    setChoices(options);
  }

  const handleNextandCheck = () => {
    const currentCard = questions.cards[activeQuestion];
    const correctAnswer = currentCard.answer;

    if (userAnswer === correctAnswer) {
      setMessage("Correct!")
      setCorrectCount((prev) => prev + 1)
    } else {
      setMessage("Wrong")
    }
    setTimeout(() => {
      handleNextQuestion();
    }, 1000)
  }


  if (!questions || questions.length === 0 || !questions.cards || questions.cards.length === 0 || choices.length === 0) {
    return <div>Loading...</div>;
  }

  const { cards } = questions;
  const { question, image } = cards[activeQuestion]
  const percentage = (correctCount / cards.length) * 100;


  return (
    <div>
      {!showResult ? (
        <div className="quiz-page">
          <div className="message-box">

            <div className={message === "Correct!" ? "message correct" : "message wrong"} >{message}</div>

          </div>
          <p>{correctCount}/{cards.length}</p>
          <div className="card-board">
            {question && <h2>{question}</h2>}
            {image && <p><img src={image} width="200" alt="Question" /></p>}
          </div>
          <div className="options">
            {choices.map((choice, index) => (
              <div key={index}>
                <input
                  key={activeQuestion}
                  type="radio"
                  id={`option${index}`}
                  name="choices" value={choice}
                  onChange={(event) => setUserAnswer(event.target.value)}
                />
                <label htmlFor={`option${index}`}>{choice}</label>
              </div>
            ))}
          </div>
          <button onClick={handleNextandCheck} className="next-button">
            {activeQuestion === cards.length - 1 ? 'Finish!' : 'Next'}
          </button>
        </div>
      ) : (
        <div className="result">
          <div className="result-page">
            <h3>Result</h3>
            <p>
              Total Question: {cards.length}
            </p>
            <p>
              Correct Answers:<span> {correctCount}</span>
            </p>
            <p>Percentage: {percentage.toFixed(2)}%</p>
          </div>
        </div>
      )}

    </div>
  );
}
