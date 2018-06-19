import React, { PropTypes, Component } from 'react';
import Square from '../containers/Square.jsx';
// import Quilt from '../containers/Quilt.jsx';

class Quilt extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleClickOnSquare = this.handleClickOnSquare.bind(this);
    this.HEIGHT = 600;
    this.WIDTH = 800;
  }

  handleClickOnSquare() {

  }

  // Returns rotation list with given size
  generateRotations(size) {
    const tl = `0,0 0,${size} ${size},0`;
    const bl = `${size},${size} 0,${size} ${size},0`;
    const tr = `0,0 ${size},${size} ${size},0`;
    const br = `0,0 ${size},${size} 0,${size}`
    return [
      [tl, bl],
      [tr, br],
      [bl, tl],
      [br, tr],
    ];
  }

  calculateSize(rows, cols) {
    console.log("Calculating size based on rows and cols:", rows, cols, this.HEIGHT);

    return Math.min(this.HEIGHT/rows, this.WIDTH/cols);
  }

  render() {
    const {quilt, fabrics, squares, selectedFabricId} = this.props;
    console.log(quilt);
    const rows = quilt.length;
    const cols = quilt[0] ? quilt[0].length : 0;
    const size = this.calculateSize(rows, cols); // Determine square size
    const rotations = this.generateRotations(size);
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
            rotations={rotations}
            size={size}
          />
        )
      });
      return (
        <div className="quiltRow" style={{height: size}}>
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
