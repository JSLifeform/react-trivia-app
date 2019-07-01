import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import './App.css';
//import {Route, HashRouter} from 'react-router-dom';
import TriviaQ from './TriviaQ.js';
import APICall from './APICall';


class App extends Component {
    constructor(){
        super();
        // this.triviaFacts = this
        //     .triviaFacts
        //     .bind(this);
        this.state = {
            triviaMessage : 'test',
            factType : 'trivia',
            randomNumber : 42
        };
        this.triviaFacts = this.triviaFacts.bind(this);
        this.mathFacts = this.mathFacts.bind(this);
    }

    triviaFacts = () => {
        this.setState({factType: 'trivia' })
        console.log(this.state.factType)
    }

    mathFacts = () => {
        this.setState({factType: 'math'})
        console.log(this.state.factType)
    }
    
  //fetches data from API with headers
  async componentDidMount() {
    //generates random number 0-100 for API fetch
    this.state.randomNumber = Math.floor(Math.random() * 101);
    console.log(this.state.randomNumber)
    let APISite = `https://numbersapi.p.rapidapi.com/${this.state.randomNumber}/${this.state.factType}?fragment=true&notfound=floor&json=true`
    console.log(APISite)
    let results = await fetch(APISite, {
     headers: {
      "X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
      "X-RapidAPI-Key": "9de36c8109msh4dc64975bcf7843p13ab52jsn921ab8e4043b"
    }
    })
    .catch((error) => {
    console.log("Error " + error + " received from server!")
   }) 

   //parses response into JSON
   let triviaFacts = await results.json()
   console.log(triviaFacts.text)
   console.log(triviaFacts)
   this.state.triviaMessage = triviaFacts.text
   let displayStatement = <p>{this.state.triviaMessage}</p>
   ReactDOM.render(displayStatement, document.getElementById('populateText'));
  }
  
    
    render(){
        return (
            <div className="trivia-fact">
                <button onClick={this.triviaFacts}>Trivia Facts</button>
                <button onClick={this.mathFacts}>Math Facts</button>
                <div id="populateText"></div>
            </div>
             
        );
    }
}

export default App;