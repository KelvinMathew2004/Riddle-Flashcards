import { useState } from 'react'
import './App.css'
import { Riddles} from './Riddles.jsx'

function App() {
  const [card, setCard] = useState(0)

  return (
    <div>
      <h2>Riddle Me This!</h2>
      <h4>Could be fun! Could be frustrating! You will never until you try!</h4>
      <h5> Number of cards: {riddles.length-1}</h5>
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img src="img_avatar.png" alt="Avatar" style="width:300px;height:300px;"/>
          </div>
          <div class="flip-card-back">
            <h1>John Doe</h1>
            <p>Architect & Engineer</p>
            <p>We love that guy</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
