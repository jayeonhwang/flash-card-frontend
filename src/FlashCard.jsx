import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { useSpring, a } from '@react-spring/web'
import { Link } from "react-router-dom";
import styles from './FlashCard.module.css'
import axios from "axios";

export function CardList() {

  const { id } = useParams();


  const [cardLists, setCardLists] = useState([])

  const getCardList = () => {
    axios.get(`/bundles/${id}.json`).then(response => {
      console.log(response.data)
      setCardLists(response.data)
    })
  }

  useEffect(getCardList, [id]);

  // pagenations for card slider
  const [currentPage, setCurrentPage] = useState(1)
  const cardPerPage = 1;

  const startIndex = (currentPage - 1) * cardPerPage
  const endIndex = startIndex + cardPerPage
  const currentCard = Array.isArray(cardLists.cards) ? cardLists.cards.slice(startIndex, endIndex) : [];

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
    console.log('currentPage:', currentPage)
  }

  const handleNextPage = () => {
    const totalPages = Math.ceil(cardLists.cards.length / cardPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      console.log('currentPage:', currentPage);
    }
  };

  // flip card

  const [flipped, set] = useState(false)

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  })

  return (
    <div>
      <div className="flash-card-box">
        <div className="card-title">
          <h1>{cardLists.title}</h1>
        </div>
        <div className="flash-card">
          <button className="next-buttons" onClick={handlePreviousPage}>{'<'}</button>
          {cardLists.cards && currentCard.map(card => (
            <div key={card.id} className={styles.container} onClick={() => set(state => !state)}>
              <a.div className={`${styles.c} ${styles.back}`} style={{ opacity: opacity.to(o => 1 - o), transform }}>
                {card.question && <p>{card.question}</p>}
                {card.image && <img src={card.image} width="200" />}
              </a.div>

              <a.div className={`${styles.c} ${styles.front}`} style={{ opacity, transform, rotateX: '180deg' }}>
                <p>{card.answer}</p>
              </a.div>
            </div>
          ))}
          <button className="next-buttons" onClick={handleNextPage}>{'>'}</button>
        </div>
      </div>
      <div className="quiz-box">
        <h2>Quiz</h2>
        <div className="quiz-button">
          <Link className="objective" to={`/quiz/${cardLists.id}`}>Objective</Link>
          <Link className="multiple" to={`/multiple/${cardLists.id}`}>Multiple</Link>
        </div>
      </div>
    </div>
  )
}