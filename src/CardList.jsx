import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";

export function CardList() {

  const { id } = useParams();
  console.log(id)

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


  return (
    <div>
      <p>Card list</p>
      <h1>{cardLists.title}</h1>
      {cardLists.cards && currentCard.map(card => (
        <div className="card" key={card.id}>
          <img src={card.image} width="200" />
          <p>{card.word}</p>
          <p>{card.description}</p>
        </div>

      ))}
      <button onClick={handlePreviousPage}>Previous</button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  )
}