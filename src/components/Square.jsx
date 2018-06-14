import React, { PropTypes } from 'react';

export default class Square extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
    // this.handleMove = this.handleMove.bind(this);
  }

  render() {
    const style = {
      background: this.props.color
    }

    return (
      <div className="square" style={style}>
        Square {this.props.square.fabrics[0]}
      </div>
    );
  }
}
