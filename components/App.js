import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from 'components/Header';
import Footer from 'components/Footer';
import { StyledH1, StyledParagraph } from 'components/Typography';
import photo22 from 'images/photo22.jpg';
import photo24 from 'images/photo24.jpg';
import photo18 from 'images/photo18.jpg';
import photo13 from 'images/photo13.jpg';
import photo9 from 'images/photo9.jpg';
import photo7 from 'images/photo7.jpg';
import actions from '../actions';
import GameArea from './GameArea';

const imageOptions = [
  photo22,
  photo24,
  photo18,
  photo13,
  photo9,
  photo7,
];

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      url: '',
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.imageClickHandler = this.imageClickHandler.bind(this);
    this.imageOptions = this.imageOptions.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  componentDidUpdate() {
    const { gameState } = this.props;

    if (gameState.isGameReady) {
      document.getElementsByClassName('disappear')[0].style.display = 'none';
      document.getElementsByClassName('appear')[0].style.display = 'block';
      document.getElementsByClassName('appear')[1].style.display = 'block';
    }
  }

  resetGame() {
    // Resets the state values for a new game
    const { logOut } = this.props;
    logOut();
    document.getElementsByClassName('inputURL')[0].value = '';
    document.getElementsByClassName('disappear')[0].style.display = 'block';
    document.getElementsByClassName('appear')[0].style.display = 'none';
    document.getElementsByClassName('appear')[1].style.display = 'none';
  }

  disableBtn() {
    const { url } = this.state;
    return !(url.length > 0);
  }

  changeHandler(event) {
    this.setState({ url: event.target.value });
  }

  imageOptions(value, index) {
    // returns an array of spans-with-images as choices for the puzzle
    const { isImageSelected } = this.props;
    if (!isImageSelected) {
      const position = { backgroundImage: `url(${value})` };
      return (
        /* eslint-disable */
        <span
          key={index}
          data-url={value}
          className="image-item"
          style={position}
          onClick={() => this.imageClickHandler(value)}
        />
        /* eslint-enable */
      );
    }
    return null;
  }

  imageClickHandler(url) {
    // Once an image choice is picked, updates the state and renders the GameArea
    const { selectImage } = this.props;
    const img = new Image();
    img.onload = function () {
      // Calculate the number of tiles, tileHeight, tileWidth based on image selected
      const winWidth = window.innerWidth;
      const ratio = this.width / this.height;
      let width = 810;
      if (winWidth < 809) {
        width = winWidth > 639 ? 640 : 320;
      }
      const height = Math.floor(width / ratio);
      let rowLength = 0;
      let temp = 6 / ratio;

      if ((temp - Math.floor(temp)) < 0.4) {
        rowLength = 6;
      } else {
        temp = 7 / ratio;
        rowLength = 7;
      }
      const colLength = Math.floor(temp);
      const tileWidth = Math.floor(width / rowLength);
      const tileHeight = Math.floor(height / colLength);
      selectImage({
        url,
        width,
        height,
        rowLength,
        colLength,
        tileWidth,
        tileHeight,
      });
    };
    img.src = url;
    document.getElementsByClassName('disappear')[0].style.display = 'none';
    document.getElementsByClassName('reset-btn')[0].style.display = 'inline-block';
  }

  render() {
    const { url } = this.state;
    const { isImageSelected, moveCounter } = this.props;
    return (
      <main>
        <Header />
        <StyledH1 className="game-title">Image tile game</StyledH1>
        <StyledParagraph className="game-subtitle">React + Redux + Bootstrap. Built in 2016</StyledParagraph>
        <div className="flex-container game-area-container">
          <div className="appContainer">
            <h4 style={{ color: '#F7F4E9', padding: '120px 0 0 0' }}>
              Solve the shuffled image in under 100 moves  |
              <a href="https://github.com/maraudermohan/image_tile_game">  Github Repo</a>
            </h4>
            <div className="disappear">
              <p style={{ color: '#F7F4E9' }}>
                <br />
                Pick an image below or import one with url :
              </p>
              <input
                type="text"
                className="inputURL"
                placeholder="http://www.image.url"
                onChange={this.changeHandler}
              />
              <input
                type="submit"
                disabled={this.disableBtn()}
                value="Import"
                className="btn btn-primary"
                onClick={() => this.imageClickHandler(url)}
              />
              <h4 style={{ color: '#F7F4E9' }}>
                <br />
                OR
              </h4>
            </div>
            <div className="appear flex-container">
              <input
                type="submit"
                value="Back"
                className="btn btn-primary reset-btn"
                onClick={this.resetGame}
              />
              <p style={{ display: 'inline' }}>Click on the Red-highlighted tiles or use arrow keys to start solving.</p>
            </div>
            <div className="appear flex-container">
              <h1 className="moves-counter">{moveCounter}</h1>
              <p>moves left</p>
            </div>
            <div className="list-of-images">
              { imageOptions.map(this.imageOptions) }
            </div>
            {
              isImageSelected && (
                <GameArea resetGame={this.resetGame} />
              )
            }
          </div>
        </div>
        <Footer hoverColor="#3399FF" backgroundColor="#051622" />
      </main>
    );
  }
}

App.propTypes = {
  isImageSelected: PropTypes.bool,
  moveCounter: PropTypes.number,
  gameState: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  selectImage: PropTypes.func,
  logOut: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isImageSelected: state.gameState.isImageSelected,
  moveCounter: state.moveCounter,
  gameState: state.gameState,
});

const mapDispatchToProps = {
  selectImage: actions.selectImage,
  logOut: actions.logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
