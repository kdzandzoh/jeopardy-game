import React from 'react'

function Trivia(props) {
    const { results, casualMode, roundNumber } = props

    const DIFFICULTY_LEVELS = {
        'easy': 100 * roundNumber,
        'medium': 200 * roundNumber,
        'hard': 300 * roundNumber
    }
  
    return (
        <div className="questions">
            {casualMode ? (
                <div className="trivia">
                { results.map((result, index) => {
                    return(
                    <div key={index} className="trivia-card">
                        <h3>{result.question}</h3>
                        <div className="options">
                        { result.options.map((a, index_2) => {
                            return (
                                <div className="option" key={index_2}>
                                    <input className="option-text" type="radio" name={index} value={a}/>
                                    <label>{a}</label>
                                </div>
                            )
                        })}
                        <h3 className="answer">{result.answer}</h3>
                        </div>
                    </div>
                    )
                })} 
                </div>
            ) : (
                <div className="trivia">
                { results.map((result, index) => {
                    return(
                    <div key={index} className="trivia-card hide-questions">
                        <h3>{result.question}</h3>
                        <div className="options">
                        { result.options.map((a, index_2) => {
                            return (
                                <div className="option" key={index_2}>
                                    <input className="option-text" type="radio" name={index} value={a}/>
                                    <label>{a}</label>
                                </div>
                            )
                        })}
                        <p className="prize">${DIFFICULTY_LEVELS[result.difficulty]}</p>
                        <h3 className="answer">{result.answer}</h3>
                        </div>
                    </div>
                    )
                })} 
                </div>
            )}

                {casualMode ? (
                    <div className="output">
                        <button type="submit" onClick={props.submitAnswers}>Submit Answers</button>
                        <h2 className="submit-answer">Score: </h2>
                        <span className="score"></span>
                    </div>
                    ) 
                    : 
                    (
                    <div className="output">
                        <h2 className="submit-answer">Total: </h2>
                        <span className="score"></span>
                    </div> 
                    )
                }
        </div>
    )
}



export default Trivia
