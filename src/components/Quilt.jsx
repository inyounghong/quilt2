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
    const {quilt, fabrics, squares, selectedFabricId} = this.props;
    const cols = quilt[0].length;
    const fullQuilt = quilt.map((arr, i) => {
      const row = arr.map((squareId, j) => {
        const square = squares.find(square => square.id == squareId);
        if (!square) {
          console.log("Cannot find square");
          return;
        }
        return (
          <Square key={i*cols+j}
            col={j}
            square={square}
            onClick={this.handleClickOnSquare(square)}
            fabrics={fabrics}
            selectedFabricId={selectedFabricId}
          />
        )
      });
      return (
        <div>
          {row}
        </div>
      )
    })

    return (
      <div className="quilt">
        {fullQuilt}
      </div>
    );
  }
}

export default Quilt;
