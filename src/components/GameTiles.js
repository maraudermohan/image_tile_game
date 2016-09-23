import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/tileActions';

class GameTiles extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  renderTile(value , index) {
    var position = {
      top : this.props.tiles[value].top,
      left : this.props.tiles[value].left,
      width : this.props.params.tileWidth,
      height : this.props.params.tileHeight
    }
    return <span key={index} data-key={value} className="game-tile" style={position}></span>
  }
  moveLeftEvent() {
    var elm = document.getElementsByClassName("left")[0],
        left = getComputedStyle(elm).getPropertyValue("left");
    this.props.dispatch(actions.moveLeft(parseInt(left,10)+100));
  }
  moveTopEvent() {
    var elm = document.getElementsByClassName("top")[0],
        top = getComputedStyle(elm).getPropertyValue("top");
    this.props.dispatch(actions.moveTop(parseInt(top,10)+100));
  }
  render() {
    return (
      <div>
        { Object.keys(this.props.tiles).map(this.renderTile.bind(this)) }
      </div>
    );
  }
}

GameTiles.propTypes = {
};

function mapStateToProps(state) {
  return {
    params : state.params,
    tiles : state.tiles
  };
}

export default connect(mapStateToProps)(GameTiles);
