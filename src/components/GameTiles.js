import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/tileActions';

class GameTiles extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  renderTile(value , index) {
    var clickhandler, clickClassName = "game-tile", position = {
      top : this.props.tiles[value].top,
      left : this.props.tiles[value].left,
      width : this.props.params.tileWidth,
      height : this.props.params.tileHeight
    },
    index0 = this.props.list.indexOf(0),
    indexV = this.props.list.indexOf(parseInt(value,10)),
    row = this.props.params.rowLength;
    if((indexV == index0-1)&&(index0%this.props.params.rowLength)) {
      return <span key={index} data-key={value} className="game-tile right" style={position} onClick={this.moveRightEvent.bind(this)}></span>
    }
    else if((indexV == index0+1)&&((index0+1)%this.props.params.rowLength)) {
      return <span key={index} data-key={value} className="game-tile left" style={position} onClick={this.moveLeftEvent.bind(this)}></span>
    }
    else if(indexV == (Math.floor(index0/row)+1)*row + (index0%row)) {
      return <span key={index} data-key={value} className="game-tile top" style={position} onClick={this.moveTopEvent.bind(this)}></span>
    }
    else if(indexV == (Math.floor(index0/row)-1)*row + (index0%row)) {
      return <span key={index} data-key={value} className="game-tile bottom" style={position} onClick={this.moveBottomEvent.bind(this)}></span>
    }
    else {
      return <span key={index} data-key={value} className="game-tile" style={position}></span>
    }
    
  }
  moveLeftEvent() {
    var elm = document.getElementsByClassName("left")[0],
        id = elm.dataset.key,
        top = getComputedStyle(elm).getPropertyValue("top"),
        left = getComputedStyle(elm).getPropertyValue("left"),
        arr = [...this.props.list],temp;
    left = parseInt(left,10) - this.props.params.tileWidth;
    this.props.dispatch(actions.moveTile(id,top,left));
    id = this.props.list.indexOf(parseInt(id,10));
    temp = arr[id];
    arr[id] = arr[id-1];
    arr[id-1] = temp;
    this.props.dispatch(actions.update_list(arr));
  }
  
  moveRightEvent() {
    var elm = document.getElementsByClassName("right")[0],
        id = elm.dataset.key,
        top = getComputedStyle(elm).getPropertyValue("top"),
        left = getComputedStyle(elm).getPropertyValue("left"),
        arr = [...this.props.list],temp;
    left = parseInt(left,10) + this.props.params.tileWidth;
    this.props.dispatch(actions.moveTile(id,top,left));
    id = this.props.list.indexOf(parseInt(id,10));
    temp = arr[id];
    arr[id] = arr[id+1];
    arr[id+1] = temp;
    this.props.dispatch(actions.update_list(arr));
  }

  moveTopEvent() {
    var elm = document.getElementsByClassName("top")[0],
        id = elm.dataset.key,
        top = getComputedStyle(elm).getPropertyValue("top"),
        left = getComputedStyle(elm).getPropertyValue("left"),
        arr = [...this.props.list],temp,id2,
        row = this.props.params.rowLength;
    top = parseInt(top,10) - this.props.params.tileHeight;
    this.props.dispatch(actions.moveTile(id,top,left));
    id = this.props.list.indexOf(parseInt(id,10));
    id2 = (Math.floor(id/row)-1)*row + (id%row);
    temp = arr[id];
    arr[id] = arr[id2];
    arr[id2] = temp;
    this.props.dispatch(actions.update_list(arr));
  }

  moveBottomEvent() {
    var elm = document.getElementsByClassName("bottom")[0],
        id = elm.dataset.key,
        top = getComputedStyle(elm).getPropertyValue("top"),
        left = getComputedStyle(elm).getPropertyValue("left"),
        arr = [...this.props.list],temp,id2,
        row = this.props.params.rowLength;
    top = parseInt(top,10) + this.props.params.tileHeight;
    this.props.dispatch(actions.moveTile(id,top,left));
    id = this.props.list.indexOf(parseInt(id,10));
    id2 = (Math.floor(id/row)+1)*row + (id%row);
    console.log(id + "" + id2);
    temp = arr[id];
    arr[id] = arr[id2];
    arr[id2] = temp;
    this.props.dispatch(actions.update_list(arr));
  }

  render() {
    console.log(this.props.list);
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
    tiles : state.tiles,
    list : state.list
  };
}

export default connect(mapStateToProps)(GameTiles);
