import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from './Quiz.module.css';

export function Quiz() {
  const { id } = useParams();

  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [correctCount, setCorrectCount] = useState(0)
  const [showResult, setShowResult] = useState(false)


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

  const handleNextQuestion = () => {
    if (activeQuestion < questions.cards.length - 1) {
      setActiveQuestion(prevQuestion => prevQuestion + 1);
      setUserAnswer("");
      setMessage("");
    } else {
      setShowResult(true)
    }
  };

  const handleNextQuestionAndCheck = () => {
    if (userAnswer.trim().toLowerCase() === questions.cards[activeQuestion].answer.trim().toLowerCase()) {
      setMessage("Correct!");
      setCorrectCount((prev) => prev + 1)
    } else {
      setMessage("Nope");
    }
    setTimeout(() => {
      handleNextQuestion();
    }, 1000)
  };



  if (!questions || questions.length === 0) {
    return <div>Loading...</div>;
  }

  const { cards } = questions;
  const { question, image, answer } = cards[activeQuestion];
  const percentage = (correctCount / cards.length) * 100;


  return (
    <div>
      {!showResult ? (
        <div className="quiz-container">
          <p>Quiz page</p>
          <p>{correctCount}/{cards.length}</p>
          {question && <h1>{question}</h1>}
          {image && <p><img src={image} width="200" /></p>}
          <input type="text" value={userAnswer} onChange={(event) => setUserAnswer(event.target.value)} />
          <div>{message}</div>
          <div>
            <button onClick={handleNextQuestionAndCheck}>
              {activeQuestion === cards.length - 1 ? 'Finish !' : 'Next'}
            </button>
          </div>
        </div>
      ) : (
        <div className="result">
          <h3>Result</h3>
          <p>
            Total Question: {cards.length}
          </p>
          <p>
            Correct Answers:<span> {correctCount}</span>
          </p>
          <p>Percentage: {percentage.toFixed(2)}%</p>

        </div>

      )}
    </div>
  )
}


