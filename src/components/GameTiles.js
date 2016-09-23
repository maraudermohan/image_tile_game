import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/tileActions';

class GameTiles extends React.Component {
  constructor(props, context) {
    super(props, context);
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
    var position = {
      top:this.props.top,
      left:this.props.left
    };
    return (
      <div className="well game-area">
            <span className="game-tile left" style={position} onClick={this.moveLeftEvent.bind(this,event)}></span>
            <span className="game-tile top" style={position} onClick={this.moveTopEvent.bind(this,event)}></span>
            <span className="game-tile top" style={position} onClick={this.moveTopEvent.bind(this,event)}></span>
            <span className="game-tile top" style={position} onClick={this.moveTopEvent.bind(this,event)}></span>
            <span className="game-tile top" style={position} onClick={this.moveTopEvent.bind(this,event)}></span>
            <span className="game-tile top" style={position} onClick={this.moveTopEvent.bind(this,event)}></span>
            <span className="game-tile top" style={position} onClick={this.moveTopEvent.bind(this,event)}></span>
            <span className="game-tile top" style={position} onClick={this.moveTopEvent.bind(this,event)}></span>
            <span className="game-tile top" style={position} onClick={this.moveTopEvent.bind(this,event)}></span>
            <span className="game-tile top" style={position} onClick={this.moveTopEvent.bind(this,event)}></span>
            <span className="game-tile top" style={position} onClick={this.moveTopEvent.bind(this,event)}></span>
            <span className="game-tile top" style={position} onClick={this.moveTopEvent.bind(this,event)}></span>
            <span className="game-tile top" style={position} onClick={this.moveTopEvent.bind(this,event)}></span>
            <span className="game-tile top" style={position} onClick={this.moveTopEvent.bind(this,event)}></span>
            <span className="game-tile top" style={position} onClick={this.moveTopEvent.bind(this,event)}></span>
            <span className="game-tile top" style={position} onClick={this.moveTopEvent.bind(this,event)}></span>
            <span className="game-tile top" style={position} onClick={this.moveTopEvent.bind(this,event)}></span>
            <span className="game-tile top" style={position} onClick={this.moveTopEvent.bind(this,event)}></span>
            <span className="game-tile top" style={position} onClick={this.moveTopEvent.bind(this,event)}></span>
            <span className="game-tile top" style={position} onClick={this.moveTopEvent.bind(this,event)}></span>
            <span className="game-tile top" style={position} onClick={this.moveTopEvent.bind(this,event)}></span>
            <span className="game-tile top" style={position} onClick={this.moveTopEvent.bind(this,event)}></span>
            <span className="game-tile top" style={position} onClick={this.moveTopEvent.bind(this,event)}></span>
            <span className="game-tile top" style={position} onClick={this.moveTopEvent.bind(this,event)}></span>
      </div>
    );
  }
}

GameTiles.propTypes = {
};

function mapStateToProps(state) {
  return {
    top : state.top,
    left : state.left
  };
}

export default connect(mapStateToProps)(GameTiles);
