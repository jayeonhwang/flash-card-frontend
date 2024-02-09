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
      // Optionally, handle end of quiz
      console.log("End of quiz");
    }
  };

  const handleNextQuestionAndCheck = () => {
    if (userAnswer.trim().toLowerCase() === questions.cards[activeQuestion].answer.trim().toLowerCase()) {
      setMessage("Correct!");
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



  return (
    <main>
      <p>Quiz page</p>
      <h2>{question}</h2>
      {question && <p>{question}</p>}
      {image && <p><img src={image} width="200" /></p>}
      <p>{answer}</p>
      <input type="text" value={userAnswer} onChange={(event) => setUserAnswer(event.target.value)} />
      <div>{message}</div>
      <div>
        <button onClick={handleNextQuestionAndCheck} disabled={activeQuestion === cards.length - 1}>Next</button>
      </div>
    </main>
  );
}
