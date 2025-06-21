import { useState } from 'react'
import './App.css'
import { Riddles} from './Riddles.jsx'

function App() {
  const [card, setCard] = useState(0)
  const [frontColor, setFrontColor] = useState("#696969")
  const [backColor, setBackColor] = useState("#343434")
  const [frontTextColor, setFrontTextColor] = useState("white")
  const [backTextColor, setBackTextColor] = useState("white")
  const [flipped, setFlipped] = useState(false)
  const [rotation, setRotation] = useState("rotateX(0deg)")
  const [correct_answer, setCorrectAnswer] = useState({})
  const [prevFunc, setPrevFunc] = useState("disabled")
  const [nextFunc, setNextFunc] = useState("enabled")
  const [random, setRandom] = useState(false)
  const [currScore, setCurrScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [skippedCards, setSkippedCards] = useState(new Set());

  const skipCurrentCard = () => {
    setSkippedCards(prev => new Set(prev).add(card));
    nextCard();
  };

  const checkAnswer = (e) => {
    e.preventDefault()
    const userAnswer = document.getElementById(correct_answer).value.trim().toLowerCase().replace(/^(a |an |your )/, '').replace(/[^a-z0-9]/gi, '');
    const correctAnswer = Riddles[card].answer.trim().toLowerCase().replace(/^(a |an |your )/, '').replace(/[^a-z0-9]/gi, '');
    if (userAnswer === correctAnswer) {
      setCorrectAnswer("correct");
      setCurrScore(currScore+1)
    } else {
      if (currScore > highScore) {
        setHighScore(currScore)
      }
      setCorrectAnswer("wrong");
      setCurrScore(0)
    }
  }

  const noAnswer = (e) => {
    e.preventDefault();
    setCorrectAnswer("blank");
  }

  const nextCard = () => {
    if (nextFunc === "disabled") {
      return;
    }
    setFlipped(false)
    setRotation(flipped)
    setCorrectAnswer("blank");
    document.getElementById(correct_answer).value = "";
    
    setTimeout(() => {

      let next = 0

      if (random === false) {
        let tempNext = card;
        let initialCard = card;

        do {
          tempNext++;
          if (tempNext >= Riddles.length) {
            tempNext = 1;
          }
          if (tempNext === initialCard) {
            next = initialCard;
            break;
          }
        } while (skippedCards.has(tempNext));

        next = tempNext;
        setNextFunc(next === Riddles.length - 1 ? "disabled" : "enabled");
        setPrevFunc(next !== 1 ? "enabled" : "disabled");

      } else {
        do {
          next = Math.floor(Math.random() * (Riddles.length - 1)) + 1;
        } while (
          (next === card || skippedCards.has(next)) &&
          skippedCards.size < Riddles.length - 2
        );

        setPrevFunc("enabled");
      }
      
      setCard(next)

      const difficulty = Riddles[next].difficulty

      setFrontColor(
        difficulty === "easy" ? "#8BCBA1" :
        difficulty === "medium" ? "#F5DE85" :
        difficulty === "hard" ? "#F4A8A8" :
        "grey"
      )

      setFrontTextColor(
        difficulty === "easy" ? "#1C3F2B" :
        difficulty === "medium" ? "#4A3A00" :
        difficulty === "hard" ? "#5C1C1C" :
        "black"
      )

      setBackColor(
        difficulty === "easy" ? "#2B8A3E" :
        difficulty === "medium" ? "#A07900" :
        difficulty === "hard" ? "#C92A2A" :
        "#333"
      )

      setBackTextColor("#FFFFFF")
    }, 250)
  }

  const prevCard = () => {
    if (prevFunc === "disabled") {
      return;
    }
    setFlipped(false)
    setRotation(flipped)
    setCorrectAnswer("blank");
    document.getElementById(correct_answer).value = "";
    
    setTimeout(() => {

      let prev = 0

      if (random === false) {
        let tempPrev = card;      
        let initialCard = card;

        do {
          tempPrev--;
          if (tempPrev <= 0) {
            tempPrev = Riddles.length - 1;
          }
          
          if (tempPrev === initialCard) {
              prev = initialCard;
              break;
          }
        } while (skippedCards.has(tempPrev));

        prev = tempPrev;
        setPrevFunc(prev === 1 ? "disabled" : "enabled");
        setNextFunc("enabled");
      } else {
        do {
          prev = Math.floor(Math.random() * (Riddles.length - 1)) + 1;
        } while (
          (prev === card || skippedCards.has(prev)) &&
          skippedCards.size < Riddles.length - 2
        );

        setNextFunc("enabled");
      }

      setNextFunc("enabled");

      setCard(prev)

      const difficulty = Riddles[prev].difficulty

      setFrontColor(
        difficulty === "easy" ? "#8BCBA1" :
        difficulty === "medium" ? "#F5DE85" :
        difficulty === "hard" ? "#F4A8A8" :
        "grey"
      )

      setFrontTextColor(
        difficulty === "easy" ? "#1C3F2B" :
        difficulty === "medium" ? "#4A3A00" :
        difficulty === "hard" ? "#5C1C1C" :
        "black"
      )

      setBackColor(
        difficulty === "easy" ? "#2B8A3E" :
        difficulty === "medium" ? "#A07900" :
        difficulty === "hard" ? "#C92A2A" :
        "#333"
      )

      setBackTextColor("#FFFFFF")
    }, 250)
  }

  const flipCard = () => {
    if (flipped) {
      setRotation("rotateX(0deg)")
      setFlipped(false)
    } else {
      setRotation("rotateX(-180deg)")
      setFlipped(true)
    }
  }

  return (
    <div className="App">
      <div className="text">
        <h1>Riddle Me This!</h1>
        <h3>Could be fun! Could be frustrating! You will never know until you try!</h3>
        <div className='numbers'>
          <h4>🗒️ {card}/{Riddles.length-skippedCards.size-1}</h4>
          <h4>✅ {currScore}</h4>
          <h4>👑 {highScore}</h4>
        </div>
      </div>
      <div class="flip-card" onClick={flipCard}>
        <div class="flip-card-inner" style={{ transform: rotation}} >
          <div class="flip-card-front" style={{ backgroundColor: frontColor, color: frontTextColor }}>
            <h3 style={{ padding: "3rem", lineHeight: "2.5" }}>{Riddles[card].question}</h3>
          </div>
          <div class="flip-card-back" style={{ backgroundColor: backColor, color: backTextColor }}>
            <img src={Riddles[card].image} style={{maxWidth: "200px", maxHeight: "200px", padding: "1rem"}}/>
            <h3 style={{ padding: "3rem", lineHeight: "2.5" }}>{Riddles[card].answer}</h3>
          </div>
        </div>
      </div>
      <div className="answer-space">
        <h3>Guess the answer here: </h3>
        <form className="answer-form" onSubmit={checkAnswer}>
          <input type="text" className="answer-input" id={correct_answer} placeholder='Place your answer here...' onChange={noAnswer}/>
          <button className="submit-button" >Submit</button>
        </form>
      </div>
      <div className="button-container">
        <button onClick={prevCard} id={prevFunc}>Previous</button>
        <button onClick={nextCard} id={nextFunc}>Next</button>
        <button onClick={skipCurrentCard}>Master</button>
        <button onClick={() => {if (random == false) nextCard(); setRandom(!random);}} id={random ? "shuffle-on" : "shuffle-off"}>Shuffle Cards</button>
      </div>
    </div>
  )
}

export default App
