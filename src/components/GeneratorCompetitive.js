import React, { Component } from 'react'

export class Generator extends Component {

    render() {
        return (
            <div className="generator">
                <form id="form">
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
                        <button onClick={this.props.startTimer}>Start</button>
                        <button onClick={ this.props.handleSubmit } type="submit">Generate</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Generator
