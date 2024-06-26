import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { Modal } from "./Modal"
import axios from "axios";


export function CardEdit() {

  const { id } = useParams();
  const [cardLists, setCardLists] = useState([])
  const [cards, setCards] = useState([])
  const [isCardShowVisible, setIsCardShowVisible] = useState(false)
  const [currentCard, setCurrentCard] = useState({})

  const getCardList = () => {
    axios.get(`/bundles/${id}.json`).then(response => {
      console.log(response.data)
      setCardLists(response.data)
    })
  }

  useEffect(getCardList, [id]);

  const createCard = (params, successCallback) => {
    axios.post("/cards.json", params).then(response => {
      setCards([...cards, response.data]);
      successCallback();
      getCardList();
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    createCard(params, () => event.target.reset());
  };

  const destroyCard = (card) => {
    axios.delete(`/cards/${card.id}.json`).then(response => {
      setCards(cards.filter((c) => c.id !== card.id))
      getCardList();
    })
  }

  const handleShowCard = (card) => {
    setIsCardShowVisible(true)
    setCurrentCard(card)
  }

  const handleClose = () => {
    setIsCardShowVisible(false)
  }

  const handleUpdateCard = (id, params, successCallback) => {
    axios.patch(`/cards/${id}.json`, params).then(response => {
      setCards(
        cards.map(card => {
          if (card.id === response.data.id) {
            return response.data
          } else {
            return cards
          }
        })
      )
      successCallback()
      handleClose()
      getCardList()
    }
    )
  }

  const updateSubmit = (event, card) => {
    event.preventDefault();
    const params = new FormData(event.target)
    handleUpdateCard(card.id, params, () => event.target.reset())
  }

  return (
    <div className="card-edit-box">
      <h2>{cardLists.title}</h2>

      <form className="create-card" onSubmit={handleSubmit}>
        <input type="hidden" name="bundle_id" value={cardLists.id} />
        <p><b>Image:</b><input name="image" type="text" /></p>
        <p><b>Question:</b><input name="question" type="text" /></p>
        <p><b>Answer:</b><input name="answer" type="text" /></p>
        <button type="submit">New</button>
      </form>
      {cardLists.cards && cardLists.cards.map(card => (

        <div className="card-show">
          <div key={card.id} className="card-info">
            {card.question && <p> <b>Q:</b>{card.question}</p>}
            {card.image && <p><img src={card.image} width="200" /></p>}
            <b>A:</b>{card.answer}
            <Modal show={isCardShowVisible && currentCard.id === card.id} onClose={handleClose}>
              <form onSubmit={(event) => updateSubmit(event, card)}>
                <p>Q: <input defaultValue={card.question} name="question" type="text" /></p>
                <p>url: <input defaultValue={card.image} name="image" type="text" /></p>
                <p>A: <input defaultValue={card.answer} name="answer" type="text" /></p>
                <button type="submit">Update</button>

              </form>
              <button onClick={() => destroyCard(card)}>Delete</button>
            </Modal>
          </div>

          <div className="modal-button">
            <button onClick={() => handleShowCard(card)}>Uptate</button>
          </div>

        </div>

      ))}
    </div>
  )
}