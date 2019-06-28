import React, { Component } from 'react';
import './App.css';
import {Route, HashRouter} from 'react-router-dom';

//<---------below not working, as well as trailing }.......ask help? Do I need this for componentDidMount?
class App extends Component {

  constructor(){
    super();
    this.state = {
        triviaMessage: ''
    }
  }


  // var message = 'first';
  
  //fetches data from API with headers
  async componentDidMount() {
    let results = await fetch("https://numbersapi.p.rapidapi.com/153/trivia?fragment=true&notfound=floor&json=true", {
    headers: {
      "X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
      "X-RapidAPI-Key": "9de36c8109msh4dc64975bcf7843p13ab52jsn921ab8e4043b"
    }
  })
 
  //parses response into JSON
    .then(response => response.json())
    .then(trivia_text =>console.log(trivia_text.text))
  // .then(trivia_text => displayFact(trivia_text.text))
  }

  function displayFact(trivia_text){
    const html = {trivia_text};
    message = html;
  }


    // console.log(this.state.trivia)
    console.log('test')
    return (
      <div className="trivia-fact">
        {message}
      </div>
    );
}
// <--------below is trailing } for export default Class App extends Component
// }

export default App;
