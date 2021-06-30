import React, { Component } from 'react'
import Generator from './Generator'

export class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          minutes: 1,
          seconds: 0
        }
      }

      submitAnswers = () => {
        this.setState({
            minutes: 1,
            seconds: 0
        })
        document.querySelectorAll('button').forEach((btn) => {
            btn.disabled = false;
        })
        this.props.submitAnswers()
        window.alert("Time's up!")
      }
    
      convertToSeconds = ( minutes,seconds) => {
        return seconds + minutes * 60
      }
    
        startTimer = (e) => {
            e.preventDefault()
            const cards = document.querySelectorAll('.trivia-card')
            cards.forEach((card) => {
                card.classList.remove('hide-questions')
            })
            document.querySelectorAll('button').forEach((btn) => {
                btn.disabled = true;
            })
            this.timer = setInterval(this.countDown, 1000);
        }
        
      countDown = () => {
        const  { minutes, seconds } = this.state;
        let c_seconds = this.convertToSeconds( minutes, seconds);
    
        if(c_seconds) {
    
          // seconds change
          seconds ? this.setState({seconds: seconds-1}) : this.setState({seconds: 59});
    
          // minutes change
          if(c_seconds % 60 === 0 && minutes) {
            this.setState({minutes: minutes -1});
          }
        } else {
          clearInterval(this.timer);
          this.submitAnswers()
        }
      }
    
      stopTimer = () => {
        clearInterval(this.timer);
      }
    
      resetTimer = () => {
        this.setState({
          minutes: 0,
          seconds: 0
        });
      }
    
      render() {
        return (
          <div className="timer">
            <div className="timer-header">

              <h1 className="center purple-text">Time left
                  <p style={{display: 'inline-block', marginLeft: '15px'}}></p>
                  {
                      this.state.minutes === 0 ? (
                          <span>00</span>
                      )
                      :
                      (
                          this.state.minutes < 10 ? (
                              <span>0{this.state.minutes}</span> 
                          ):
                          (
                              <span>{this.state.minutes}</span> 
                          )
                      )
                  }
                  :
                  {
                      this.state.seconds === 0 ? (
                          <span>00</span>
                      )
                      :
                      (
                          this.state.seconds < 10 ? (
                              <span>0{this.state.seconds}</span> 
                          ):
                          (
                              <span>{this.state.seconds}</span> 
                          )
                      )
                  }
              </h1>
            </div>
              <Generator
                  handleSubmit={this.props.handleSubmit}
                  startNewRound={this.props.startNewRound}
                  handleRoundChange={this.props.handleRoundChange}
                  handleSelectedCategory={this.props.handleSelectedCategory}
                  startTimer={this.startTimer}
                  categories={this.props.categories}
                  casualMode={this.props.casualMode}>
              </Generator>
              {/* <button onClick={this.stopTimer}  className="stop">Stop</button>
              <button onClick={this.resetTimer}  className="reset">Reset</button> */}
          </div>
        );
      }
}

export default Timer
