import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../actions/index';

class GameTiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEventAttached: false,
    };
  }

  componentDidMount() {
    this.shuffleManager();
  }

  componentDidUpdate() {
    const {
      gameState,
      moveCounter,
    } = this.props;

    const {
      isEventAttached,
    } = this.state;

    if (!gameState.isGameReady) {
      setTimeout(() => { this.shuffleManager(); }, 250);
    }

    /* eslint-disable */
    if (gameState.isGameReady && moveCounter < 1 && isEventAttached) {
      this.removeClickKeyHandlers();
      this.setState({ isEventAttached: false });
    } else if (gameState.isGameReady && moveCounter > 0 && !isEventAttached) {
      window.addEventListener('keyup', this.keyUpHandler.bind(this));
      this.setState({ isEventAttached: true });
    }
    /* eslint-enable */
  }

  keyUpHandler(e) {
    const {
      moveCounter,
    } = this.props;
    if (moveCounter > 0) {
      if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
      if (e.keyCode === 39 && document.getElementsByClassName('game-tile left').length) {
        this.moveLeftEvent();
      } else if (e.keyCode === 37 && document.getElementsByClassName('game-tile right').length) {
        this.moveRightEvent();
      } else if (e.keyCode === 40 && document.getElementsByClassName('game-tile top').length) {
        this.moveTopEvent();
      } else if (e.keyCode === 38 && document.getElementsByClassName('game-tile bottom').length) {
        this.moveBottomEvent();
      }
    }
  }

  removeClickKeyHandlers() {
    window.removeEventListener('keyup', this.keyUpHandler);
    if (document.getElementsByClassName('game-tile left').length) {
      document.getElementsByClassName('game-tile left')[0]
        .removeEventListener('click', this.moveLeftEvent);
    }
    if (document.getElementsByClassName('game-tile right').length) {
      document.getElementsByClassName('game-tile right')[0]
        .removeEventListener('click', this.moveRightEvent);
    }
    if (document.getElementsByClassName('game-tile top').length) {
      document.getElementsByClassName('game-tile top')[0]
        .removeEventListener('click', this.moveTopEvent);
    }
    if (document.getElementsByClassName('game-tile bottom').length) {
      document.getElementsByClassName('game-tile bottom')[0]
        .removeEventListener('click', this.moveBottomEvent);
    }
  }

  resetGame() {
    const { resetGame } = this.props;
    resetGame();
  }

  gameConditionCheck() {
    const {
      gameState,
      tileOrderList,
      shuffleCounter,
      moveCounter,
    } = this.props;
    const sortedList = Object.keys(tileOrderList)
      .filter((key) => (parseInt(key, 10) !== tileOrderList[key]));

    if (gameState.areTilesCreated && !gameState.isGameReady) {
      /* eslint-disable */
      return (
        <div className="game-banner shuffle flex-container">
          <h1 className="flex-items">
            Shuffling!
            <br />
            <br />
            Ready in {shuffleCounter}...
          </h1>
        </div>
      );
    } else if (gameState.isGameReady && sortedList.length === 0 && moveCounter > 0) {
      return (
        <div className="game-banner win flex-container" onClick={this.resetGame.bind(this)}>
          <h1 className="flex-items">
            Puzzle solved!
            <br />
            <br />
            You Win.
          </h1>
        </div>
      );
    } else if (gameState.isGameReady && moveCounter === 0 && sortedList.length > 0) {
      return (
        <div className="game-banner lose flex-container" onClick={this.resetGame.bind(this)}>
          <h1 className="flex-items">
            Moves up!
            <br />
            <br />
            You Lose.
          </h1>
        </div>
      );
      /* eslint-enable */
    }
    return <div />;
  }

  shuffleManager() {
    const { shuffleCounter, toggleGameReady } = this.props;

    if (shuffleCounter > 0) {
      this.shuffleTile();
    } else if (shuffleCounter === 0) {
      document.getElementsByClassName('game-area')[0].classList.remove('not-ready');
      document.getElementsByClassName('game-area')[0].classList.add('ready');
      toggleGameReady();
    }
  }

  shuffleTile() {
    const clickableTiles = [];
    const min = 0;
    let max = 1;
    let currentTile = () => {};

    if (document.getElementsByClassName('left')[0]) {
      clickableTiles.push(this.moveLeftEvent.bind(this));
    }
    if (document.getElementsByClassName('right')[0]) {
      clickableTiles.push(this.moveRightEvent.bind(this));
    }
    if (document.getElementsByClassName('top')[0]) {
      clickableTiles.push(this.moveTopEvent.bind(this));
    }
    if (document.getElementsByClassName('bottom')[0]) {
      clickableTiles.push(this.moveBottomEvent.bind(this));
    }
    max = clickableTiles.length;
    currentTile = clickableTiles[Math.floor(Math.random() * (max - min)) + min];
    currentTile();
  }

  moveLeftEvent() {
    const {
      tileWidth,
      rowLength,
      colLength,
      moveTile,
    } = this.props;
    const elem = document.getElementsByClassName('left')[0];
    const { key } = elem.dataset;
    let top = getComputedStyle(elem).getPropertyValue('top');
    let left = getComputedStyle(elem).getPropertyValue('left');

    top = parseInt(top, 10);
    left = parseInt(left, 10) - tileWidth;

    moveTile(key, top, left, rowLength * colLength);
  }

  moveRightEvent() {
    const {
      tileWidth,
      rowLength,
      colLength,
      moveTile,
    } = this.props;
    const elem = document.getElementsByClassName('right')[0];
    const { key } = elem.dataset;
    let top = getComputedStyle(elem).getPropertyValue('top');
    let left = getComputedStyle(elem).getPropertyValue('left');

    top = parseInt(top, 10);
    left = parseInt(left, 10) + tileWidth;

    moveTile(key, top, left, rowLength * colLength);
  }

  moveTopEvent() {
    const {
      rowLength,
      colLength,
      tileHeight,
      moveTile,
    } = this.props;
    const elem = document.getElementsByClassName('top')[0];
    const { key } = elem.dataset;
    let top = getComputedStyle(elem).getPropertyValue('top');
    let left = getComputedStyle(elem).getPropertyValue('left');

    left = parseInt(left, 10);
    top = parseInt(top, 10) - tileHeight;

    moveTile(key, top, left, rowLength * colLength);
  }

  moveBottomEvent() {
    const {
      rowLength,
      colLength,
      tileHeight,
      moveTile,
    } = this.props;
    const elem = document.getElementsByClassName('bottom')[0];
    const { key } = elem.dataset;
    let top = getComputedStyle(elem).getPropertyValue('top');
    let left = getComputedStyle(elem).getPropertyValue('left');

    left = parseInt(left, 10);
    top = parseInt(top, 10) + tileHeight;

    moveTile(key, top, left, rowLength * colLength);
  }

  renderTile(key) {
    const {
      imageUrl,
      imageWidth,
      imageHeight,
      tileWidth,
      tileHeight,
      tileCssList,
      tileOrderList,
      rowLength,
      colLength,
    } = this.props;
    const {
      top,
      left,
      topOffset,
      leftOffset,
    } = tileCssList[key];
    const styles = {
      top,
      left,
      width: tileWidth,
      height: tileHeight,
      backgroundPosition: `-${leftOffset}px -${topOffset}px`,
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: `${imageWidth}px ${imageHeight}px`,
    };
    const indexEmptyTile = tileOrderList[rowLength * colLength];
    const indexCurrentTile = tileOrderList[key];
    let className = 'game-tile';
    let onClick;
    if (indexCurrentTile === (indexEmptyTile - 1) && ((indexEmptyTile - 1) % rowLength)) {
      className += ' right';
      onClick = this.moveRightEvent.bind(this);
    } else if (indexCurrentTile === (indexEmptyTile + 1) && (indexEmptyTile % rowLength)) {
      className += ' left';
      onClick = this.moveLeftEvent.bind(this);
    } else if (indexCurrentTile === (Math.floor(indexEmptyTile / rowLength) + 1)
      * rowLength + (indexEmptyTile % rowLength)) {
      className += ' top';
      onClick = this.moveTopEvent.bind(this);
    } else if (indexCurrentTile === (Math.floor(indexEmptyTile / rowLength) - 1)
      * rowLength + (indexEmptyTile % rowLength)) {
      className += ' bottom';
      onClick = this.moveBottomEvent.bind(this);
    }
    /* eslint-disable */
    return <span key={key} data-key={key} className={className} style={styles} onClick={onClick} />;
    /* eslint-enable */
  }

  render() {
    const { tileCssList } = this.props;
    return (
      <div>
        { Object.keys(tileCssList).map(this.renderTile.bind(this)) }
        {
          this.gameConditionCheck()
        }
      </div>
    );
  }
}

GameTiles.propTypes = {
  imageUrl: PropTypes.string,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
  tileWidth: PropTypes.number,
  tileHeight: PropTypes.number,
  rowLength: PropTypes.number,
  colLength: PropTypes.number,
  tileCssList: PropTypes.objectOf(PropTypes.object),
  tileOrderList: PropTypes.objectOf(PropTypes.number),
  gameState: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  shuffleCounter: PropTypes.number,
  moveCounter: PropTypes.number,
  toggleGameReady: PropTypes.func,
  moveTile: PropTypes.func,
  resetGame: PropTypes.func,
};

const mapStateToProps = (state) => ({
  imageUrl: state.imageSelected.url,
  imageWidth: state.imageSelected.width,
  imageHeight: state.imageSelected.height,
  tileWidth: state.imageSelected.tileWidth,
  tileHeight: state.imageSelected.tileHeight,
  rowLength: state.imageSelected.rowLength,
  colLength: state.imageSelected.colLength,
  tileCssList: state.tileCssList,
  tileOrderList: state.tileOrderList,
  gameState: state.gameState,
  shuffleCounter: state.shuffleCounter,
  moveCounter: state.moveCounter,
});

const mapDispatchToProps = {
  toggleGameReady: actions.toggleGameReady,
  moveTile: actions.moveTile,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameTiles);
