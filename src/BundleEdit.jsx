import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";


export function BundleEdit() {

  const { id } = useParams();
  console.log(id)
  const [cardLists, setCardLists] = useState([])
  const [cards, setCards] = useState([])

  const getCardList = () => {
    axios.get(`http://localhost:3000/bundles/${id}.json`).then(response => {
      console.log(response.data)
      setCardLists(response.data)
    })
  }

  useEffect(getCardList, [id]);

  const createCard = (params, successCallback) => {
    axios.post("http://localhost:3000/cards.json", params).then(response => {
      setCards([...cards, response.data]);
      successCallback();
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    createCard(params, () => event.target.reset());
  };


  return (
    <div>
      <h2>{cardLists.title}</h2>
      <form className="Create Card" onSubmit={handleSubmit}>
        <input type="hidden" name="bundle_id" value={cardLists.id} />
        <p><b>image:</b><input name="image" type="text" /></p>
        <p><b>Q:</b><input name="word" type="text" /></p>
        <p><b>A:</b><input name="description" type="text" /></p>
        <button type="submit">New</button>
      </form>

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