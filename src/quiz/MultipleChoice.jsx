import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export function MultipleChoice() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [choices, setChoices] = useState([]);

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

  useEffect(() => {
    if (questions.cards && questions.cards.length > 0) {
      getMultipleChoice();
    }
  }, [activeQuestion, questions.cards]);

  const handleNextQuestion = () => {
    if (activeQuestion < questions.cards.length - 1) {
      setActiveQuestion(prevQuestion => prevQuestion + 1);
    } else {
      setShowResult(true);
    }
  }

  const getMultipleChoice = () => {
    const currentCard = questions.cards[activeQuestion];
    const correctAnswer = currentCard.answer;
    const options = [correctAnswer];

    while (options.length < 4) {
      const randomIndex = Math.floor(Math.random() * questions.cards.length);
      const randomCard = questions.cards[randomIndex];
      const randomAnswer = randomCard.answer;

      if (options.indexOf(randomAnswer) === -1 && randomAnswer !== correctAnswer) {
        options.push(randomAnswer);
      }
    }

    // Shuffle options
    options.sort(() => Math.random() - 0.5);

    setChoices(options);
  }

  if (!questions || questions.length === 0 || !questions.cards || questions.cards.length === 0 || choices.length === 0) {
    return <div>Loading...</div>;
  }

  const { cards } = questions;
  const { question, image, answer } = cards[activeQuestion];

  return (
    <div>
      <h1>Multiple Choice</h1>
      <h1>{question}</h1>
      {image && <p><img src={image} width="200" alt="Question" /></p>}
      {choices.map((choice, index) => (
        <div key={index}>
          <input type="radio" id={`option${index}`} name="choices" value={choice} />
          <label htmlFor={`option${index}`}>{choice}</label>
        </div>
      ))}
      <button onClick={handleNextQuestion}>
        {activeQuestion === cards.length - 1 ? 'Finish!' : 'Next'}
      </button>
    </div>
  );
}