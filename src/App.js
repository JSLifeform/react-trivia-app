import {ButtonToolbar, Button, InputGroup, Dropdown, DropdownButton} from 'react-bootstrap';
import React, { Component } from 'react';
import './App.css';
import {Route, HashRouter, Link} from 'react-router-dom';
import triviaQ from './TriviaQ.js';
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
    triviaFacts = async () => {
        await this.setState({factType: 'trivia' })
        // giving delayed trivia question once again, showing delayed q in props too
        this.callAPIFact()
    }

     mathFacts = async () => {
        await this.setState({factType: 'math'})
        // giving delayed trivia question once again, showing delayed q in props too
        this.callAPIFact()
    }

    yearFacts = async () => {
        await this.setState({factType: 'year'})
        // giving delayed trivia question once again, showing delayed q in props too
        this.callAPIFact()
    }

    numberSubmit = event => {
        // prevents page reload
        event.preventDefault();
        // collects user submitted value from DOM
        let newNumber = document.getElementById('user-submitted-number').value
        // checks value of submitted number to make sure it's greater than 0
        if (newNumber === '' || newNumber < 0 ){
            alert("Integer greater than -1 must be entered, please try again!")
        } else {
        newNumber = Math.floor(newNumber)
        this.setState({randomNumber: newNumber})
        this.setState({userNumberChange: true})
        }
    }

    // function to access API for facts repeatedly
    async callAPIFact() {
        this.setState({isFetching: true})
        let APISite = `https://numbersapi.p.rapidapi.com/${this.state.randomNumber}/${this.state.factType}?fragment=true&notfound=floor&json=true`
            await fetch(APISite, {
            headers: {
            "X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
            "X-RapidAPI-Key": "9de36c8109msh4dc64975bcf7843p13ab52jsn921ab8e4043b"
            }
        })
        .then( response => {if (!response.ok) {
                throw Error(response.status + ' ' + response.statusText);
            }
            return response;
        })
        .then( results => results.json())
        .then( results => {let triviaFacts = results
        // terminates loading screen
        this.setState({isFetching: false})
        // sets boolean to display label for fetched fact
        this.setState({userNumberChange : false})
        // saves number & fact into App state
        this.setState({RandomNumber : triviaFacts.number})
        this.setState({triviaMessage : triviaFacts.text})})
        // displays error in case fetch error from server
        .catch((error) => {
            alert(error + " received from server. Please reload and try again!")    
        }) 
    }

    
  // fetches data from API with headers
  async componentDidMount() {
      await this.callAPIFact()
  }
  
    
    render(){
    // displays loading text
    if (this.state.isFetching) {
        return (
            <div id="populate-text">Loading...</div>
        )
    } else {
        
        return (
            // display buttons, populate-text div
            <div className="container-fluid">
                <HashRouter>
                <div className="trivia-header">
                    {/* Routing for buttons */}
                    <Route exact path = "/" component = {triviaHeader}/>
                    <Route path = "/math" component = {mathHeader} />
                    <Route path = "/year" component = {yearHeader}/>
                </div>
                <div className="trivia-application trivia-buttons">
                    {/* button links and listen events */}
                    <ButtonToolbar className="trivia-application button-bar">
                    <Link to ="/"><Button variant="primary" onClick={this.triviaFacts}>Numbers Trivia</Button></Link>
                    <Link to ="/math"><Button variant="success" onClick={this.mathFacts}>Math Trivia</Button></Link>
                    <Link to ="/year"><Button variant="info" onClick={this.yearFacts}>Year Trivia</Button></Link>
                    </ButtonToolbar>
                    <DropdownButton id="dropdown-selector" title="Change Trivia Type Here">
                        <Dropdown.Item href="#/" onClick={this.triviaFacts}>Numbers Trivia</Dropdown.Item>
                        <Dropdown.Item href="#/math" onClick={this.mathFacts}>Math Trivia</Dropdown.Item>
                        <Dropdown.Item href="#/year" onClick={this.yearFacts}>Years Trivia</Dropdown.Item>
                    </DropdownButton>
                </div>
                </HashRouter>
                <div className="center-application" id="populate-text">
                    {triviaQ(this.state.triviaMessage)}
                </div>
                <div className ="center-application">
                    <button onClick={this.callAPIFact}>New Fetch</button>
                    <form className="trivia-label" id="number-selector">
                        <InputGroup className="mb-3">
                            Enter a non-negative integer you'd like to see random trivia for!
                            <br></br>
                            <div className ="input-group mb3">
                            <input 
                                placeholder="Enter number here"
                                id = "user-submitted-number" 
                                className = "form-control text-box" 
                                type = "number"/>
                            <InputGroup.Append>
                            <Button 
                                variant="outline-secondary"
                                className="btn btn-outline-dark" 
                                type = "submit" 
                                onClick={this.numberSubmit}>
                            Submit</Button>
                            </InputGroup.Append> 
                            </div>
                        </InputGroup>
                        <div id = "display-number">
                            {/* label which changes text based on if a new number had been entered by user */}
                            <label>
                                {this.state.userNumberChange ? "Will show" : "Currently showing"} facts for: {this.state.randomNumber}
                            </label>
                        </div>
                    </form>
                </div>
            </div>
             
        );
    }}
}

export default App;