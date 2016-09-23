import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index.js';
import GameTiles from './GameTiles.js';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    var elm = document.getElementsByClassName("game-area")[0],
        width = getComputedStyle(elm).getPropertyValue("width"),
        height = getComputedStyle(elm).getPropertyValue("height"),
        rowLength, colLength, tileWidth, tileHeight, topCounter = 0, leftCounter = 0, arr= [];
    width = parseInt(width,10);
    height = parseInt(height,10);
    var temp = height/width*6;
    if((temp - Math.floor(temp)) < 0.4) {
      rowLength = 6;
    } else {
      temp = height/width*7;
      rowLength = 7;
    }
    colLength = Math.floor(temp);
    tileWidth = Math.floor(width/rowLength);
    tileHeight = Math.floor(height/colLength);
    this.props.dispatch(actions.updateRowCol(rowLength, colLength, tileWidth, tileHeight));
    for(var counter = 1; counter < (rowLength*colLength); counter++) {
        this.props.dispatch(actions.updateTileParams(counter,topCounter,leftCounter));
        arr.push(counter);
        if ((counter%rowLength) == 0) {
          topCounter += tileHeight;
          leftCounter = 0;
        }
        else {
          leftCounter += tileWidth;
        }
    }
    arr.push(0);
    this.props.dispatch(actions.update_list(arr));

  }

  render() {
    return (
      <div className="flex-container game-area-container">
        <div className="well game-area flex-item">
              <GameTiles />
        </div>
      </div>
    );
  }
}

App.propTypes = {
};

function mapStateToProps(state) {
  return {
    params : state.params
  };
}

export default connect(mapStateToProps)(App);
