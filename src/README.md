*JOHN LOCKEN'S JS/REACT PROJECT*

Hello, and welcome to my first JavaScript/React project. It is a simple application which pulls numbers-based trivia from a Trivia API. You can choose between 3 different trivia types: random trivia based on the selected number, math-based trivia, or year-based trivia. Currently, Hashroute only changes the heading to show which type of trivia will be fetched. Future functionality may be added to allow users to select a range of numbers based on the type of trivia they want to see. 

If you are viewing this README, you are probably looking at this project through my GitHub repository. The site is currently hosted on Git at https://jslifeform.github.io/trivia-app/. If you would prefer to download the project and run it on your own computer, below is a list of the dependencies:

    bootstrap: 4.3.1,
    react: 16.8.6,
    react-bootstrap: 1.0.0-beta.9,
    react-dom: 16.8.6,
    react-router-dom: 5.0.1,
    react-scripts: 3.0.1


Using the program is quite simple. It will default opening to random trivia for the number 42 (the meaning of life, of course!). You can choose between the 3 different trivia endpoints through the buttons underneath the header. There is also a numeric input box which allows you to choose different numbers to view trivia for. If a non-integer is entered, the application will round down to the nearest integer. Once a different endpoint or "New Fetch" is selected, a different piece of trivia for the selected number will be randomly pulled from the API and displayed on the screen. That's all there is to it! 