import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index.js';
import GameArea from './GameArea.js';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      links : [ 'http://www.moreaboutmohan.com/files/assets/photo22.jpg',
                'http://www.moreaboutmohan.com/files/assets/photo24.jpg',
                'http://www.moreaboutmohan.com/files/assets/photo18.jpg',
                'http://www.moreaboutmohan.com/files/assets/photo13.jpg',
                'http://www.moreaboutmohan.com/files/assets/photo9.jpg',
                'http://www.moreaboutmohan.com/files/assets/photo7.jpg' ],
      isGameAreaReady : false,
      url : '' ,
      imgWidth : 0,
      imgHeight : 0
    }
  }

  resetGame() {
    this.setState({isGameAreaReady : false,
      url : '' ,
      imgWidth : 0,
      imgHeight : 0 
    });
    document.getElementsByClassName("inputURL")[0].value = "";
    document.getElementsByClassName("disappear")[0].style.display = "block";
    document.getElementsByClassName("disappear")[1].style.display = "block";
  }

  disableBtn() {
    return (this.state.url.length)? false : true;
  }

  changeHandler(event) {
    this.setState({url : event.target.value});
  }

  imageOptions(value , index) {
    if(!this.state.isGameAreaReady) {
      var position = {
        backgroundImage : "url("+value+")"
      }
      return <span key={index} data-url={value} className="image-item" style={position} onClick={this.imageClickHandler.bind(this,value)}></span>
    }
  }

  imageClickHandler(url) {
    var setState = this.setState.bind(this),
    img = new Image();
    img.onload = function() {
      setState({isGameAreaReady : true,
        url : url ,
        imgWidth : this.width,
        imgHeight : this.height
      });
    }
    img.src = url;
    document.getElementsByClassName("disappear")[0].style.display = "none";
    document.getElementsByClassName("disappear")[1].style.display = "none";
  }

  renderGameArea() {
    if(this.state.isGameAreaReady) {
      return <GameArea 
              resetGame={this.resetGame.bind(this)} 
              url={this.state.url} 
              imgHeight={this.state.imgHeight} 
              imgWidth={this.state.imgWidth} 
              />;
    }
  }

  render() {
    return (
      <div>
          <h4 className="disappear">Pick an image or enter an external url :</h4>
          <div className="disappear">
              <input
                type="text"
                className="inputURL"
                placeholder="www.location.com"
                onChange={this.changeHandler.bind(this)} />
              <input
                type="submit"
                disabled={this.disableBtn()}
                value="Import"
                className="btn btn-primary"
                onClick={this.imageClickHandler.bind(this,this.state.url)} />
          </div>
          {this.state.links.map(this.imageOptions.bind(this)) }
          {this.renderGameArea()}
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
