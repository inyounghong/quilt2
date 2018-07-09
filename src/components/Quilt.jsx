import React, { PropTypes, Component } from 'react';
import Square from '../containers/Square.jsx';

class Quilt extends Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.HEIGHT = 500;
    this.WIDTH = 700;
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

  handleAddCol(option) {
    this.props.addCol(option);
  }

  handleRemoveCol(option) {
    this.props.removeCol(option);
  }

  handleAddRow(option) {
    this.props.addRow(option);
  }

  handleRemoveRow(option) {
    this.props.removeRow(option);
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
            key={(i*cols) + j}
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

    const height = size * rows;
    const width = size * (cols+2);
    const colStyle = {
      height: height + 'px',
    }
    const rowStyle = {
      width: width + 'px',
    }

    return (
      <div className="quiltWrap">
        <div className="rowControl control" style={rowStyle}>
          <div className="addRow action" onClick={this.handleAddRow.bind(this, 0)}>+ Add Row</div>
          <div className="removeRow action" onClick={this.handleRemoveRow.bind(this, 0)}>- Delete Row</div>
        </div>

        <div className="colControl control" style={colStyle}>
          <div className="addCol action" onClick={this.handleAddCol.bind(this, 0)}>+ Add Col</div>
          <div className="removeCol action" onClick={this.handleRemoveCol.bind(this, 0)}>- Delete Col</div>
        </div>
        <div className="quilt">
          {fullQuilt}
        </div>
        <div className="colControl control" style={colStyle}>
          <div className="addCol action" onClick={this.handleAddCol.bind(this, 1)}>+ Add Col</div>
          <div className="removeCol action" onClick={this.handleRemoveCol.bind(this, 1)}>- Delete Col</div>
        </div>

        <div className="rowControl control" style={rowStyle}>
          <div className="addRow action" onClick={this.handleAddRow.bind(this, 0)}>+ Add Row</div>
          <div className="removeRow action" onClick={this.handleRemoveRow.bind(this, 0)}>- Delete Row</div>
        </div>
      </div>
    );
  }
}

export default Quilt;
