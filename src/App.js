import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import './App.css';
import {Route, HashRouter, Link} from 'react-router-dom';
import triviaQ from './TriviaQ.js';
import APICall from './APICall';
import mathHeader from './math.js'
import triviaHeader from './trivia.js'
import yearHeader from './year.js'


class App extends Component {
    constructor(){
        super();
        this.state = {
            triviaMessage : 'test',
            factType : 'trivia',
            randomNumber : 42,
            isFetching : true,
            userNumberChange : false
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
        if (newNumber == '' || newNumber < 0 ){
            alert("Integer greater than 0 must be entered, please try again!")
        } else {
        //<-----------------------------error checking on entered string
        // let numTest = new RegExp('/^\d+$/')
        // if (numTest.test(newNumber)) {
        //     this.setState({randomNumber: newNumber});
        //     console.log(this.randomNumber)
        // } 
        // else  {alert("This is not a proper number!");
        //     console.log(typeof(newNumber))
        // }
        //<-------------------------------end of string error checking
        this.setState({randomNumber: newNumber})
        this.setState({userNumberChange: true})
        console.log(newNumber)
        console.log(this.state.userNumberChange)
        }
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
    // terminates loading screen
    this.setState({isFetching: false})
    // sets boolean to display label for fetched fact
    this.setState({userNumberChange : false})
    // saves number & fact into App state
    this.setState({RandomNumber : triviaFacts.number})
    this.setState({triviaMessage : triviaFacts.text})
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
            <HashRouter>
            <div className="trivia-fact-selectors">
                
                <Route exact path = "/" component = {triviaHeader}/>
                <Route path = "/math" component = {mathHeader} />
                <Route path = "/year" component = {yearHeader}/>
                <Link to ="/"><button onClick={this.triviaFacts}>Numbers Trivia</button></Link>
                <Link to ="/math"><button onClick={this.mathFacts}>Math Trivia</button></Link>
                <Link to ="/year"><button onClick={this.yearFacts}>Year Trivia</button></Link>
                
            </div>
            </HashRouter>
            <div id="populate-text">
                {triviaQ(this.state.triviaMessage)}
            </div>
            <button onClick={this.callAPIFact}>New Fetch</button>
            <form id="number-selector">
                <label>
                    Enter the number you'd like to see random trivia for!
                    <br></br>
                    <input id = "user-submitted-number" type = "number" name = "number-value"/>
                </label>
                <input type = "submit" value = "Submit" onClick={this.numberSubmit}/>
                <div id = "display-number">
                    {/* label which changes text based on if a new number had been entered by user */}
                    <label>
                        {this.state.userNumberChange ? "Will show" : "Currently showing"} facts for: {this.state.randomNumber}
                    </label>
                </div>
            </form>
            </div>
             
        );
    }}
}

export default App;