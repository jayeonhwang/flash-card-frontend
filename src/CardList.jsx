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

  return (
    <div>
      <p>Card list</p>
      <h1>{cardLists.title}</h1>
      {cardLists.cards && cardLists.cards.map(card => (
        <div key={card.id}>
          <p>{card.word}</p>
          <p>{card.description}</p>
        </div>
      ))}
    </div>
  )
}