import React from "react";
import Header from "./components/Header";
import ImageCard from "./components/ImageCard";
import Wrapper from "./components/Wrapper";
import squares from "./squares.json";
import "./App.css";

console.log(squares);


class App extends React.Component {
  state = {
    squares: squares,
    clickMessage: "Click a pic to start!",
    clickCount: 0,
    highScore: 0,
    notClicked: squares
  };

  shufflePics = array => {
    for (let i=0; i<array.length; i++) {
      let j = Math.floor(Math.random()*(i+1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    this.setState({ squares: array })
  }


  clickPic = picId => {
    const nextClick = this.state.notClicked.find(square => picId === square.id);

    if (nextClick === undefined) {
      this.setState ({
        clickCount: 0,
        highScore: this.state.clickCount<this.state.highScore? this.state.highScore : this.state.clickCount,
        squares : squares,
        notClicked: squares,
        clickMessage: "Oops!! That was clicked twice."
      })
    } 
    else {
      const thatPic = this.state.notClicked.filter(square => square.id !== picId);
      this.setState({
        clickCount: this.state.clickCount +1,
        squares: squares,
        notClicked: thatPic,
        clickMessage: "Good!! Click again!"
      });
    }
    this.shufflePics(this.state.squares);
  }


  render() {
    return (
      <Wrapper>
        <Header>
          <div id="titlebox">
              <h2>The Clicky Game</h2>
              <h2> ...Don't Click Me Twice!</h2>
          </div>
          <div id="instructionsbox">
              <p>Test your memory!!</p>
              <p>Each time you click, all the pics will shuffle.</p>
              <p>Can you click them ALL ...just once?</p>
          </div>
          <div id="scorebox">            
              <h3>{this.state.clickMessage}</h3>
              <h3>Your score: {this.state.clickCount}</h3>
              <h3>High score: {this.state.highScore}</h3>
          </div>
        </Header>

        <div id="cardbox">
          {this.state.squares.map(square => (
          <ImageCard
            key={square.id}
            id={square.id}
            name={square.name}
            img={square.image}
            clickPic={this.clickPic}
          />))}
          </div>
      </Wrapper>
    );
  }
}
export default App;
