import React, { useState } from 'react'
import Timer from './Timer'
import Trivia from './Trivia'

function Competitive(props) {
    const {results, setResults } = props

    const [roundNumber, setRoundNumber] = useState(1)
    const [roundFlag, setRoundFlag] = useState(false)

    const [currentRound, setCurrentRound] = useState(1)
    const [targetRound, setTargetRound] = useState(3)

    const [team1Turn, setTeam1Turn] = useState(true)
    const [team1, setTeam1] = useState(0)
    const [team2, setTeam2] = useState(0)

    let total = 1

    function handleRoundChange(e) {
      setTargetRound(parseInt(e.target.value))
    }

    function startNewRound(e) {
      e.preventDefault()
      document.querySelector('#winner-text').remove()
      document.querySelector('#new-round').classList.add('invisible')
      

      document.querySelectorAll('button').forEach(btn => {
        btn.disabled = false
      })

      document.querySelector('.score').innerHTML = ""

      setTeam1(0)
      setTeam2(0)
      setCurrentRound(1)
      setRoundNumber(1)
      setRoundFlag(false)
      setTeam1Turn(true)
      setResults([])
    }

    function endGame() {
      let winner;
      let text;

      if (team1 === team2+total) {
        text = document.createTextNode(`It was a tie! Play again!`)
      }
      else if (team1 > team2+total) {
        winner = 1
        text = document.createTextNode(`Team ${winner} won! Congratulations!`)
      }
      else if (team1 < team2+total) {
        winner = 2
        text = document.createTextNode(`Team ${winner} won! Congratulations!`)
      }

      const header = document.createElement('h1')
      header.classList.add('center')
      header.id='winner-text'
      header.appendChild(text)
      document.querySelector('.timer-header').appendChild(header)
      document.querySelector('#generate').disabled = true
      
      document.querySelector('#new-round').classList.remove('invisible')
      document.querySelector('#number-of-rounds').style.display = 'block'
    }

    function submitAnswers(e) {
        total = 0

        document.querySelector('#start-round').disabled = true
    
        const trivia_questions = document.querySelectorAll('.trivia-card')
        trivia_questions.forEach(trivia => {
          let answer = ''
          let flag = false
          const r = trivia.getElementsByTagName('input')
          trivia.classList.remove('white-bg')
          for (const child of r) {
            if (child.checked) {
              flag = true
              answer = child.value
              if (answer === trivia.getElementsByTagName('h3')[1].textContent) {
                trivia.classList.add('correct')
                total += parseInt(trivia.getElementsByClassName('prize')[0].innerHTML.substring(1))
              }
              else {
                trivia.classList.add('incorrect')
                total -= parseInt(trivia.getElementsByClassName('prize')[0].innerHTML.substring(1))
              }
            }
          }
          if (flag === false) {
            trivia.classList.add('incorrect')
            total -= parseInt(trivia.getElementsByClassName('prize')[0].innerHTML.substring(1))
          }
        })

        document.querySelector('.score').innerHTML = "$" + total
        if (total < 0) {
            document.querySelector('.score').style.color = 'red'
        }
        else if (total > 0) {
            document.querySelector('.score').style.color = 'green'
        }

        if (team1Turn) {
            // Team 1 just played
            setTeam1Turn(false)
            setTeam1(team1+total)
            document.querySelector('#team1').classList.toggle('active-team')
            document.querySelector('#team2').classList.toggle('active-team')
        }
        else {
            // Team 2 just played
            setTeam1Turn(true)
            setTeam2(team2+total)
            document.querySelector('#team1').classList.toggle('active-team')
            document.querySelector('#team2').classList.toggle('active-team')
        }

        if (currentRound === targetRound+0.5) {
          endGame()
        }
        else {
          setCurrentRound(currentRound + 0.5)
          if (!roundFlag) {
              setRoundFlag(true)
          }
          else {
              setRoundFlag(false)
              setRoundNumber(roundNumber + 1)
          }
        }

      }

    return (
        <div>
            <Timer
                startNewRound={startNewRound}
                casualMode={false}
                handleSubmit={props.handleSubmit}
                handleRoundChange={handleRoundChange}
                handleSelectedCategory={props.handleSelectedCategory}
                categories={props.categories}
                submitAnswers={submitAnswers}>
            </Timer>

            <div className="scoreboard purple-text">
                <h3 id="team1" className="active-team">Team 1: ${team1} </h3>
                <h3>Round: {roundNumber}/{targetRound}</h3>
                <h3 id="team2">Team 2: ${team2} </h3>
            </div>

            <Trivia 
                results={results}
                roundNumber={roundNumber}>
            </Trivia>
        </div>
    )
}

export default Competitive