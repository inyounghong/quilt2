import React, { PropTypes, Component } from 'react';
import Square from '../containers/Square.jsx';
// import Quilt from '../containers/Quilt.jsx';

class Quilt extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleClickOnSquare = this.handleClickOnSquare.bind(this);
  }

  handleClickOnSquare() {

  }

  render() {
    console.log(this.props.selectedFabric);
    const {quilt, fabrics, squares} = this.props;
    const cols = quilt[0].length;
    const fullQuilt = quilt.map((arr, i) => {
      const row = arr.map((squareId, j) => {
        const square = squares.find(square => square.id == squareId);
        if (!square) { return; }
        const fabric = fabrics.find(fabric => fabric.id == square.fabrics[0]);
        if (!fabric) { return; }
        return (
          <Square key={i*cols+j}
            square={square}
            color={fabric.color}
            onClick={this.handleClickOnSquare(square)}
            selectedFabric={this.props.selectedFabric}
          />
        )
      });
      return (
        <div>
          {row}
        </div>
      )
    })

    // return (<div></div>)
    return (
      <div className="quilt">
        {fullQuilt}
      </div>
    );
  }
}

export default Quilt;
