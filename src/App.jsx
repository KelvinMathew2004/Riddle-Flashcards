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

  const nextCard = () => {
    setFlipped(false)
    setRotation(flipped)
    
    setTimeout(() => {
      const next = card < Riddles.length - 1 ? card + 1 : 1
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
        <h4> Number of cards: {Riddles.length-1}</h4>
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
      <button className="next-button" onClick={nextCard}>Next</button>
    </div>
  )
}

export default App
