import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {

    return (
      <div>
        <h1>Main App</h1>
      </div>
    );
  }
}

App.propTypes = {
};

function mapStateToProps(state, ownProps) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
