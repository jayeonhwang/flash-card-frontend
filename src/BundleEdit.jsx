import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";


export function BundleEdit() {

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
      <h2>{cardLists.title}</h2>
      {cardLists.cards && cardLists.cards.map(card => (
        <div key={card.id}>
          {card.word && <p> <b>Q:</b>{card.word}</p>}
          {card.image && <img src={card.image} width="200" />}
          <b>A:</b>{card.description}
          <hr />
        </div>
      ))}
    </div>
  )
}