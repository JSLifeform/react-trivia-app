import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import './App.css';
import {Route, HashRouter, Link} from 'react-router-dom';
import TriviaQ from './TriviaQ.js';
import APICall from './APICall';


class App extends Component {
    constructor(){
        super();
        this.state = {
            triviaMessage : 'test',
            factType : 'trivia',
            randomNumber : 42,
            isFetching : true
        };
        this.triviaFacts = this.triviaFacts.bind(this);
        this.mathFacts = this.mathFacts.bind(this);
        this.yearFacts = this.yearFacts.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.callAPIFact = this.callAPIFact.bind(this);
        this.numberSubmit = this.numberSubmit.bind(this);
    }

    // 3 functions below change type of facts called from API
    triviaFacts = () => {
        this.setState({factType: 'trivia' })
        console.log(this.state.factType)
    }

    mathFacts = () => {
        this.setState({factType: 'math'})
        console.log(this.state.factType)
    }

    yearFacts = () => {
        this.setState({factType: 'year'})
        console.log(this.state.factType)
    }

    numberSubmit = event => {
        event.preventDefault();
        let newNumber = document.getElementById('user-submitted-number').value
        this.setState({randomNumber: newNumber})
        console.log(newNumber)
        let displayNumber = <label> Will show fact for number: {newNumber} </label>
        ReactDOM.render(displayNumber, document.getElementById('display-number'));
    }

    // function to access API for facts repeatedly
    async callAPIFact() {
        this.setState({isFetching: true})
        // generates random number 0-100 for API fetch
        // this.state.randomNumber = Math.floor(Math.random() * 101);
        console.log(this.state.randomNumber)
        let APISite = `https://numbersapi.p.rapidapi.com/${this.state.randomNumber}/${this.state.factType}?fragment=true&notfound=floor&json=true`
        console.log(APISite)
        let results = await fetch(APISite, {
        headers: {
        "X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
        "X-RapidAPI-Key": "9de36c8109msh4dc64975bcf7843p13ab52jsn921ab8e4043b"
        }
        })
        // displays error in case fetch error from server
        .catch((error) => {
        console.log("Error " + error + " received from server!")
    }) 

    // parses response into JSON
    let triviaFacts = await results.json()
    this.setState({isFetching: false})
    // saves fact into App state
    this.state.triviaMessage = triviaFacts.text
    // renders trivia fact into DOM
    let displayStatement = <p>{this.state.triviaMessage}</p>
    ReactDOM.render(displayStatement, document.getElementById('populate-text'));
    let displayNumber = <label> Current number showing facts for: {this.state.randomNumber} </label>
    ReactDOM.render(displayNumber, document.getElementById('display-number'));
    }

    
  // fetches data from API with headers
  async componentDidMount() {
      this.callAPIFact()
  }
  
    
    render(){

    if (this.state.isFetching) {
        return (
            <div id="populate-text">Loading...</div>
        )
    } else {
        
        return (
            // display buttons, populate-text div
            <div className="trivia-application">
            <div className="trivia-fact-selectors">
                <HashRouter>
                <Route exact path = "/" ><button onClick={this.triviaFacts}>Numbers Trivia</button></Route>
                <Route path = "/math" ><button onClick={this.mathFacts}>Math Trivia</button></Route>
                <Route path = "/year" ><button onClick={this.yearFacts}>Year Trivia</button></Route>
                </HashRouter>
            </div>
            <div id="populate-text">
            </div>
            <button onClick={this.callAPIFact}>New Fetch</button>
            <form id="number-selector">
                <label>
                    Enter the number you'd like to see random trivia for!
                    <br></br>
                    <input id = "user-submitted-number" type = "text" name = "number-value"/>
                </label>
                <input type = "submit" value = "Submit" onClick={this.numberSubmit}/>
                <div id = "display-number"></div>
                {/* <label>
                    {this.state.randomNumber}
                </label> */}
            </form>
            </div>
             
        );
    }}
}

export default App;