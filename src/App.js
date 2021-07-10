import React, { useState, useEffect } from 'react'
import Generator from './components/Generator'
import Trivia from './components/Trivia'
import Competitive from './components/Competitive'
import './App.css'

function App() {
  const [results, setResults] = useState([])
  const [amountOfQuestions, setAmountOfQuestions] = useState(10)
  const [difficulty, setDifficulty] = useState('Any')
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState({category: '', id: 0})
  const [casualMode, setCasualMode] = useState(true)

// Load in categories from API
useEffect(() => {
  fetchCategories()
}, [])

function fetchCategories() {
  const url = 'https://opentdb.com/api_category.php'
  fetch(url)
    .then(res => res.json())
    .then(data => setCategories(data.trivia_categories))
}

// Clean up the strings from the API
function decodeString(str) {
  const textArea = document.createElement('textarea')
  textArea.innerHTML = str
  return textArea.value
}

function handleSelectedCategory(e) {
  categories.forEach(category => {
    if (category.name === e.target.value) {
        setSelectedCategory({
          category: category.name,
          id: category.id
        })
        return
    }
  })
}

function handleQuestionChange(e) {
  setAmountOfQuestions(e.target.value)
}

function handleDifficulty(e) {
  setDifficulty(e.target.value.toLowerCase())
}

function setCasual() {
  if (!casualMode) {
    setCasualMode(true)
    document.querySelector('.cooler').classList.toggle('invisible')
    document.getElementById('comp').classList.toggle('active')
    document.getElementById('casual').classList.toggle('active')
    resetButton()
  }
}

function setCompetitive() {
  if (casualMode) {
    setCasualMode(false)
    resetButton()
    document.querySelector('.cooler').classList.toggle('invisible')
    document.getElementById('comp').classList.toggle('active')
    document.getElementById('casual').classList.toggle('active')
  }
}

// Handle user click -> 'Generate'
function handleSubmit(e) {
  e.preventDefault();
  if (!casualMode) {
    document.querySelector('#start-round').disabled = false
    document.querySelector('#number-of-rounds').style.display = 'none'
  }

  let url = `https://opentdb.com/api.php?amount=${amountOfQuestions}&category=${selectedCategory.id}`
  if (difficulty !== 'Any') {
    url = url + `&difficulty=${difficulty}`
  }

  fetch(url)
    .then(res => res.json())
    .then(data => {
      setResults(data.results.map((question, index) => {
        const answer = decodeString(question.correct_answer)
        const options = [...question.incorrect_answers.map(a => decodeString(a)), answer]
        return {
          id: `${index}`,
          question: decodeString(question.question),
          difficulty: question.difficulty,
          answer,
          options: options.sort(() => Math.random() - .5)
        }
      }))
      resetStyles()
    })
}


function resetStyles() {
  const trivia_questions = document.querySelectorAll('.trivia-card')
  trivia_questions.forEach(trivia => {
    if (casualMode) {
      trivia.classList.add('white-bg')
    }
    else {
      trivia.classList.add('hide-questions')
      trivia.classList.remove('incorrect')
      trivia.classList.remove('correct')
    }
    const r = trivia.getElementsByTagName('input')
    for (const child of r) {
      if (child.checked) {
        child.checked = false
      }
    }
  })
  document.querySelector('.score').innerHTML = ''
}

function resetButton() {
  setAmountOfQuestions(10)
  setDifficulty('Any')
  if (casualMode) {
    document.querySelector('input').value = ''
    document.querySelector('select').value = document.querySelector('select').options[0].value
  }
  resetStyles()
  setResults([])
}

  

  function submitAnswers(e) {
    let count = 0

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
            count++
          }
          else {
            trivia.classList.add('incorrect')
          }
        }
      }
      if (flag === false) {
        trivia.classList.add('incorrect')
      }
    })
    document.querySelector('.score').innerHTML = `${count} / ${trivia_questions.length}`
  }

  return (
    <div className="container">
        <div className="cool-container">
          <h1 className="cool">Jeopardy</h1>
          <span className="cooler invisible">Competitive</span>
        </div>
        <div className="selector">
          <button id="casual" className="active mode-selector" onClick={setCasual}>Casual Mode</button>
          <button id="comp" className="mode-selector" onClick={setCompetitive}>Competitive Mode</button>
        </div>


        { casualMode ? 
        ( 
          <div>
            <Generator 
              casualMode={true}
              handleSubmit={handleSubmit} 
              handleQuestionChange={handleQuestionChange}
              handleDifficulty={handleDifficulty}
              handleSelectedCategory={handleSelectedCategory}
              categories={categories}
              resetStyles={resetButton}>
            </Generator>

            <Trivia 
              casualMode={true}
              results={results}
              submitAnswers={submitAnswers}>
            </Trivia>
          </div>
        ) : 
        (
          <Competitive
            handleSelectedCategory={handleSelectedCategory}
            handleQuestionChange={handleQuestionChange}
            handleSubmit={handleSubmit} 
            categories={categories}
            results={results}
            setResults={setResults}>
          </Competitive>
        ) 
      }
    </div>
  )
}

export default App
