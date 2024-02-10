import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { useSpring, a } from '@react-spring/web'
import styles from './FlashCard.module.css'
import axios from "axios";

export function CardList() {

  const { id } = useParams();


  const [cardLists, setCardLists] = useState([])

  const getCardList = () => {
    axios.get(`http://localhost:3000/bundles/${id}.json`).then(response => {
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
    <div className="main-content">
      <h1>{cardLists.title}</h1>

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

      <div className={styles.pagination}>
        <button onClick={handlePreviousPage}>Previous</button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  )
}