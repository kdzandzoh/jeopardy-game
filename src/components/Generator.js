import React, { Component } from 'react'

export class Generator extends Component {
    render() {
        return (
            <div className="generator">
                <form id="form">
                    {this.props.casualMode ? (
                        <div>
                            <p>Difficulty: </p>
                            <select onChange={ this.props.handleDifficulty } name="difficulty">
                                <option value="Any">Any</option>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>
                    ) : null}
                    <div id="number-of-rounds">
                        {this.props.casualMode ? 
                        (
                        <>
                            <p>Number of questions: </p>
                            <input type="number" onChange={ this.props.handleQuestionChange }/>
                        </>
                        )
                        :
                        (
                        <div>
                            <p>Number of rounds: </p>
                            <input type="number" onChange={ this.props.handleRoundChange }/>
                        </div>
                        )
                        }
                    </div>
                    <div>
                        <p>Category: </p>
                        <select selected="selected" onChange= { this.props.handleSelectedCategory } >
                            {this.props.categories.map((c) => {
                                return (
                                    <option value={c.name} key={c.id}>{c.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div>
                        {this.props.casualMode ? 
                            <>
                                <button name="Reset" onClick={ this.props.resetStyles }>Reset</button>
                                <button onClick={ this.props.handleSubmit } type="submit">Generate</button>
                            </>
                            :
                            <>
                                <button id="start-round" onClick={this.props.startTimer}>Start</button>
                                <button onClick={ this.props.handleSubmit } id="generate" type="submit">Generate</button>
                                <button onClick={ this.props.startNewRound } id="new-round" className="invisible">New round</button>
                            </>
                        }
                    </div>
                </form>
            </div>
        )
    }
}

export default Generator
