import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import styles from './Quiz.module.css'
export function Quiz() {
  const { id } = useParams();

  const [questions, setQuestions] = useState([])

  const getQuestions = () => {
    axios.get(`http://localhost:3000/bundles/${id}.json`).then(response => {
      setQuestions(response.data)
    })
  }

  useEffect(getQuestions, [id]);

  //One question per page

  const [currentPage, setCurrentPage] = useState(1)
  const cardPerPage = 1;

  const startIndex = (currentPage - 1) * cardPerPage
  const endIndex = startIndex + cardPerPage
  const currentItem = Array.isArray(questions.cards) ? questions.cards.slice(startIndex, endIndex) : [];

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
    console.log('currentPage:', currentPage)
  }

  const handleNextPage = () => {
    const totalPages = Math.ceil(questions.cards.length / cardPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      console.log('currentPage:', currentPage);
    }
  };

  // check answer

  const [userAnswer, setUserAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const checkAnswer = () => {
    if (userAnswer === correctAnswer) {
      setMessage("Correct!");
    } else {
      setMessage("Nope");
    }
  };

  const handleCardChange = (card) => {
    setUserAnswer("");
    setCorrectAnswer(card.answer);
    console.log(correctAnswer)
  };


  return (
    <main>
      <p>Quiz page</p>

      <div>
        {questions.cards && currentItem.map(card =>
          <div className={styles.testCard} key={card.id} onClick={() => handleCardChange(card)}>
            {card.question && <p>{card.question}</p>}
            {card.image && <img src={card.image} width="200" />}
          </div>
        )}
      </div>
      <div>
        <button onClick={handlePreviousPage}>Previous</button>
        <button onClick={handleNextPage}>Next</button>
      </div>
      <div>
        <input type="text" value={userAnswer} onChange={event => setUserAnswer(event.target.value)} />
        <button onClick={checkAnswer}>Enter</button>
        <div>{message}</div>
      </div>
    </main>

  )
}