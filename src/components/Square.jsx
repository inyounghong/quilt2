import React, { PropTypes } from 'react';

class Square extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const updatedSquare = {
      ...this.props.square,
      fabrics: [this.props.selectedFabric]
    }
    this.props.updateSquare(updatedSquare);
  }

  render() {
    const style = {
      background: this.props.color
    }

    return (
      <div className="square" style={style} onClick={this.handleClick}>
        Square {this.props.square.fabrics[0]}
      </div>
    );
  }
}

export default Square;
