import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";

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

  const [correctAnswer, setCorrectAnswer] = useState("")
  const [userAnswer, setUserAnswer] = useState()
  const [message, setMessage] = useState([])

  const checkAnswer = () => {
    if (userAnswer === correctAnswer) {
      setMessage("Correct!")
    } else {
      setMessage("Nope")
    }
  }

  const handleCardChange = (card) => {
    setUserAnswer("");
    setCorrectAnswer(card.description);
  };


  return (
    <div>
      <p>Quiz page</p>

      {questions.cards && currentItem.map(card =>
        <div key={card.id} onClick={() => handleCardChange(card)}>
          {card.word && <p>{card.word}</p>}
          {card.image && <img src={card.image} width="200" />}
        </div>
      )}

      <div>
        <button onClick={handlePreviousPage}>Previous</button>
        <button onClick={handleNextPage}>Next</button>
      </div>

      <div>
        <input type="text" value={userAnswer} onChange={event => setUserAnswer(event.target.value)} />
        <button onClick={checkAnswer}>Enter</button>
        <div>{message}</div>
      </div>

    </div>
  )
}