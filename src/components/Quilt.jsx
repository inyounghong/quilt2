import React, { PropTypes, Component } from 'react';
import Square from '../containers/Square.jsx';

class Quilt extends Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.HEIGHT = 550;
    this.WIDTH = 800;
  }

  // Returns rotation list with given size
  generateRotations(size) {
    const tl = `0,0 0,${size} ${size},0`;
    const br = `${size},${size} 0,${size} ${size},0`;
    const tr = `0,0 ${size},${size} ${size},0`;
    const bl = `0,0 ${size},${size} 0,${size}`
    return [
      [tl, br],
      [tr, bl],
      [br, tl],
      [bl, tr],
    ];
  }

  calculateSize(rows, cols) {
    return Math.min(this.HEIGHT/rows, this.WIDTH/cols);
  }

  render() {
    const {quilt, fabrics, squares, selectedFabricId} = this.props;

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
          <Square
            key={i*cols+j}
            col={j}
            square={square}
            fabrics={fabrics}
            selectedFabricId={selectedFabricId}
            rotations={rotations}
            size={size}
            allowRotation={this.props.allowRotation}
          />
        )
      });
      return (
        <div className="quiltRow" style={{height: size}} key={i}>
          {row}
        </div>
      )
    })

    fullQuilt.reverse();

    return (
      <div className="quilt">
        {fullQuilt}
      </div>
    );
  }
}

export default Quilt;
