import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../actions';
import GameTiles from './GameTiles';

class GameArea extends Component {
  componentDidMount() {
    // Calculate the best possible tile-width, tile-height
    // number of tiles, based on the given properties
    const {
      imageWidth,
      imageHeight,
      rowLength,
      colLength,
      tileWidth,
      tileHeight,
      createTileLists,
    } = this.props;
    const element = document.getElementsByClassName('game-area')[0];
    const tileCssList = {};
    const tileOrderList = {};
    let topCounter = 0;
    let leftCounter = 0;

    element.style.width = `${imageWidth}px`;
    element.style.height = `${imageHeight}px`;
    for (let counter = 1; counter < (rowLength * colLength); counter += 1) {
      tileCssList[counter] = {
        top: topCounter,
        left: leftCounter,
        topOffset: topCounter,
        leftOffset: leftCounter,
      };
      tileOrderList[counter] = counter;
      if ((counter % rowLength) === 0) {
        topCounter += tileHeight;
        leftCounter = 0;
      } else {
        leftCounter += tileWidth;
      }
    }
    tileOrderList[rowLength * colLength] = rowLength * colLength;
    createTileLists(tileCssList, tileOrderList);
  }

  render() {
    const { resetGame, areTilesCreated } = this.props;
    return (
      <div className="well game-area not-ready flex-item">
        {
          areTilesCreated && (
            <GameTiles resetGame={resetGame} />
          )
        }
      </div>
    );
  }
}

GameArea.propTypes = {
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
  rowLength: PropTypes.number,
  colLength: PropTypes.number,
  tileWidth: PropTypes.number,
  tileHeight: PropTypes.number,
  areTilesCreated: PropTypes.bool,
  createTileLists: PropTypes.func,
  resetGame: PropTypes.func,
};

const mapStateToProps = (state) => ({
  imageWidth: state.imageSelected.width,
  imageHeight: state.imageSelected.height,
  rowLength: state.imageSelected.rowLength,
  colLength: state.imageSelected.colLength,
  tileWidth: state.imageSelected.tileWidth,
  tileHeight: state.imageSelected.tileHeight,
  areTilesCreated: state.gameState.areTilesCreated,
});

const mapDispatchToProps = {
  createTileLists: actions.createTileLists,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameArea);
