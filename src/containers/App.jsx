import React, { PropTypes } from 'react';
import squaresActions from '../redux/actions/squares';
import quiltActions from '../redux/actions/quilt';
import appActions from '../redux/actions/app';
import fabricActions from '../redux/actions/fabric';
import { connect } from 'react-redux';
import Quilt from '../components/Quilt.jsx';
import Instructions from '../components/Instructions.jsx';
import FabricBar from '../containers/FabricBar.jsx';
import SizeBar from '../containers/SizeBar.jsx';
import QuiltForm from '../containers/QuiltForm.jsx';
import { DropdownButton, MenuItem, Button } from 'react-bootstrap';
import * as squareTypes from '../constants/squareTypes';

class App extends React.Component {

  constructor() {
    super();
    this.setSelectedFabricId = this.setSelectedFabricId.bind(this);
    this.addRow = this.addRow.bind(this);
    this.addCol = this.addCol.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.removeCol = this.removeCol.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.state = {
      selectedFabricId: null,
      rows: 0,
      cols: 0,
      squareSize: 6,
      numColors: 2,
    }

  }

  setSelectedFabricId(fabricId) {
    this.setState({selectedFabricId: fabricId});
  }

  removeRow(index) {
    const i = (index == 0) ? 0 : (this.props.quilt.length - 1);
    this.props.removeRowFromQuilt(i);
  }

  removeCol(index) {
    const i = (index == 0) ? 0 : (this.props.quilt.length - 1);
    this.props.removeColFromQuilt(i);
  }

  // Option: 0 (add row before) or 1 (add row after)
  addRow(option) {
    const newSquareIds = [];
    for (var i = 0; i < this.props.quilt[0].length; i++) {
      const newSquare = this.props.addSquare();
      newSquareIds.push(newSquare.payload.id);
    }
    this.props.addRowToQuilt(newSquareIds, option);
  }

  // Option: 0 (add col before) or 1 (add col after)
  // Returns list of square ids to be added to each row
  addCol(option) {
    const newSquareIds = [];
    for (var i = 0; i < this.props.quilt.length; i++) {
      const newSquare = this.props.addSquare();
      newSquareIds.push(newSquare.payload.id);
    }
    this.props.addColToQuilt(newSquareIds, option);
  }

  generateInitialQuilt() {
    const {rows, cols} = this.state;
    for (var i = 0; i < rows; i++) {
      const newSquareIds = [];
      for (var j = 0; j < cols; j++) {
        const newSquare = this.props.addSquare();
        newSquareIds.push(newSquare.payload.id);
      }
      this.props.addRowToQuilt(newSquareIds, 0);
    }
  }

  // Handling change functions

  handleRowsChange(e) {
    this.setState({rows: parseInt(e.target.value)});
  }

  handleColsChange(e) {
    this.setState({cols: parseInt(e.target.value)});
  }

  handleSizeChange(e) {
    this.setState({squareSize: parseInt(e.target.value)});
  }

  toFeet(inches) {
    const feet = Math.floor(inches/12);
    const inch = inches % 12;
    return `${feet}' ${inch}''`;
  }

  changePattern(pattern) {
    if (pattern == squareTypes.FLYING_GEESE) {
      console.log("Changing to", pattern);
      let rotation = 0;
      const {quilt} = this.props;
      quilt.forEach((row, r) => {
        row.forEach((squareId, c) => {
          rotation = (c % 4 == 0 || c % 4 == 3) ? 1 : 0;
          this.props.rotateSquare(squareId, rotation);
          // Change colors of odd squares
          if (r % 2 == 1) {
            const square = this.props.squares.find(square => square.id == squareId);
            const newColors = square.fabricIds.slice();
            const newSquare = Object.assign({}, square, {fabricIds: newColors.reverse()});
            this.props.updateSquare(newSquare);
          }
        })
      })
    }
  }



  renderQuiltOptions() {
    // this.props.onReset();
    const { quilt } = this.props;

    if (quilt.length > 0) {
      const rows = quilt.length;
      const cols = quilt[0].length;
      const sizeAcross = this.toFeet(this.state.squareSize * rows);
      const sizeDown = this.toFeet(this.state.squareSize * cols);

      return (
        <div className="quiltOptions">
          <p>{rows} Rows x {cols} Columns</p>

          <p>Total Size: {sizeAcross} by  {sizeDown}</p>


          {/* <SizeBar
            addRow={this.addRow}
            addCol={this.addCol}
            removeRow={this.removeRow}
            removeCol={this.removeCol}
            changePattern={this.changePattern.bind(this)}
          /> */}

          <FabricBar
            fabrics={this.props.fabric}
            setSelectedFabricId={this.setSelectedFabricId}
            selectedFabricId={this.state.selectedFabricId}/>
          Selected Fabric Id: {this.state.selectedFabricId}

          <div className="reset-store" onClick={this.props.onReset}>
            Reset persisted store
          </div>
        </div>
      )
    }
  }

  // <label>Rows <input type="text" value={this.state.rows} onChange={this.handleRowsChange.bind(this)} /></label>
  // <label>Cols <input type="text" value={this.state.cols} onChange={this.handleColsChange.bind(this)} /></label>



  render() {
    console.log(this.props);

    return (
      <div>
        <div className="sidebar">
          <QuiltForm
            addSquare={this.props.addSquare}
            updateColorPalette={this.props.updateColorPalette}
            blockSize={this.props.app.blockSize}
          />
          {this.renderQuiltOptions()}

        </div>

        <div className="main">
          <Quilt quilt={this.props.quilt}
            squares={this.props.squares}
            fabrics={this.props.fabric}
            selectedFabricId={this.state.selectedFabricId}/>

          <Instructions
            squares={this.props.squares}
            fabrics={this.props.fabric}
            blockSize={this.props.app.blockSize}
             />
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => (state);

const mapDispatchToProps = (dispatch) => ({
  addSquare(){
    const newSquare = squaresActions.createSquare();
    dispatch(newSquare);
    return newSquare;
  },
  addRowToQuilt(row, option) {
    dispatch(quiltActions.addRow(row, option));
  },
  removeRowFromQuilt(index) {
    dispatch(quiltActions.removeRow(index));
  },
  addColToQuilt(col, option) {
    dispatch(quiltActions.addCol(col, option));
  },
  removeColFromQuilt(index) {
    dispatch(quiltActions.removeCol(index));
  },
  updateColorPalette(palette) {
    dispatch(fabricActions.updateColorPalette(palette));
  },
  updateRows(rows) {
    dispatch(appActions.updateRows(rows));
  },
  rotateSquare(squareId, rotation) {
    dispatch(squaresActions.rotateSquare(squareId, rotation));
  },
  updateSquare(newSquare) {
    dispatch(squaresActions.updateSquare(newSquare));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
