import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import './App.css';
//import {Route, HashRouter} from 'react-router-dom';
import TriviaQ from './TriviaQ.js';

class App extends Component {
    constructor(){
        super();
        this.state = {
            triviaMessage : 'test'
        };
    }
  //fetches data from API with headers
  async componentDidMount() {
    let trivia_text ='';
    let results = await fetch("https://numbersapi.p.rapidapi.com/153/trivia?fragment=true&notfound=floor&json=true", {
     headers: {
      "X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
      "X-RapidAPI-Key": "9de36c8109msh4dc64975bcf7843p13ab52jsn921ab8e4043b"
    }
   }) 

   //parses response into JSON
   let triviaFacts = await results.json()
   console.log(triviaFacts.text)
   console.log(triviaFacts)
   this.state.triviaMessage = triviaFacts.text
   let tstatement = <p>{triviaFacts.text}</p>
   ReactDOM.render(tstatement, document.getElementById('root'));
  }
  
    
    render(){
        return (
            <div className="trivia-fact">
                
            </div>
        );
    }
}

// let triviaQuestion = React.createElement('p', {id: 'trivia-question'}, '{triviaFacts.text}');
// let triviaQuestion = (<p text>Hello world</p>)
let triviaQuestion = 'Hello world'

//<------------test case for reactDOM render, refactor for trivia message. Try after mount?

export default App;