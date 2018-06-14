import React, { PropTypes } from 'react';

class Square extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  handleClick(index) {
    const {selectedFabric, square} = this.props;
    if (!selectedFabric) {
      return;
    }
    const newFabrics = square.fabrics;
    newFabrics[index] = selectedFabric;
    const updatedSquare = {
      ...this.props.square,
      fabrics: newFabrics,
    }
    this.props.updateSquare(updatedSquare);
  }

  render() {
    const {col, fabrics, square} = this.props;
    const color0 = fabrics.find(fabric => fabric.id == square.fabrics[0]).color;
    const color1 = fabrics.find(fabric => fabric.id == square.fabrics[1]).color;

    return (
      <svg height="100" width="100">
        <polygon
          points="0,0 0,100 100,0"
          style={{fill: color0}}
          onClick={this.handleClick.bind(this, 0)}
        />
        <polygon
          points="100,100 0,100 100,0"
          style={{fill: color1}}
          onClick={this.handleClick.bind(this, 1)}
        />
      </svg>
    );
  }
}

export default Square;
// // {/* <div className="square" style={style} onClick={this.handleClick}>
//   Square {this.props.square.fabrics[0]}
// </div> */}
