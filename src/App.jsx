import { useState } from 'react'
import './App.css'
import { Riddles} from './Riddles.jsx'

function App() {
  const [card, setCard] = useState(0)
  const [frontColor, setFrontColor] = useState("transparent")
  const [backColor, setBackColor] = useState("transparent")
  const [frontTextColor, setFrontTextColor] = useState("white")
  const [backTextColor, setBackTextColor] = useState("white")

  const nextCard = () => {
    const next = card < Riddles.length - 1 ? card + 1 : 1
    setCard(next)

    let difficulty = Riddles[next].difficulty
    
    setFrontColor(difficulty === "easy" ? "#8BCBA1" : difficulty === "medium" ? "#F5DE85" : difficulty === "hard" ? "#F4A8A8" : "transparent")

    setFrontTextColor(difficulty === "easy" ? "#1C3F2B" : difficulty === "medium" ? "#4A3A00" : difficulty === "hard" ? "#5C1C1C" : "black")

    setBackColor(difficulty === "easy" ? "#2B8A3E" : difficulty === "medium" ? "#A07900" : difficulty === "hard" ? "#C92A2A" : "#333")

    setBackTextColor("#FFFFFF")
  }

  return (
    <div className="App">
      <div className="text">
        <h2>Riddle Me This!</h2>
        <h4>Could be fun! Could be frustrating! You will never until you try!</h4>
        <h5> Number of cards: {Riddles.length-1}</h5>
      </div>
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front" style={{ backgroundColor: frontColor, color: frontTextColor }}>
            {/* <img src="img_avatar.png" alt="Avatar" style="width:300px;height:300px;"/> */}
            <p>{Riddles[card].question}</p>
          </div>
          <div class="flip-card-back" style={{ backgroundColor: backColor, color: backTextColor }}>
            <p>{Riddles[card].answer}</p>
          </div>
        </div>
      </div>
      <button className="next-button" onClick={nextCard}>Next</button>
    </div>
  )
}

export default App
