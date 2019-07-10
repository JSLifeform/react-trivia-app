import React, { Component } from 'react';

const triviaQ = (props)=>{
    // testing line, delete below
    console.log("reading TriviaQ");
    // capitalizes first letter of string
    let capitalizedLetter = props.charAt(0).toUpperCase();
    // adds capitalized letter to rest of string
    let capitalizedString = capitalizedLetter + props.slice(1);
    // dynamically displays string as it changes through API calls
    
    return <p>{capitalizedString}</p>;
}

export default triviaQ;