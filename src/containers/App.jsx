import React, { PropTypes } from 'react';
import squaresActions from '../redux/actions/squares';
import quiltActions from '../redux/actions/quilt';
import appActions from '../redux/actions/app';
import { connect } from 'react-redux';
import Quilt from '../containers/Quilt.jsx';
import FabricBar from '../containers/FabricBar.jsx';
import SizeBar from '../containers/SizeBar.jsx';
import { MenuItem, Button } from 'react-bootstrap';

class App extends React.Component {

  constructor() {
    super();
    this.setSelectedFabricId = this.setSelectedFabricId.bind(this);
    this.addRow = this.addRow.bind(this);
    this.addCol = this.addCol.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.removeCol = this.removeCol.bind(this);
    this.state = {
      selectedFabricId: null,
      rows: 0,
      cols: 0,
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
    console.log("adding row ", newSquareIds);
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
    console.log("Generating quilt with rows and cols", rows, cols);
    for (var i = 0; i < rows; i++) {
      const newSquareIds = [];
      for (var j = 0; j < cols; j++) {
        const newSquare = this.props.addSquare();
        newSquareIds.push(newSquare.payload.id);
      }
      this.props.addRowToQuilt(newSquareIds, 0);
    }
  }

  handleRowsChange(e) {
    this.setState({rows: parseInt(e.target.value)});
  }

  handleColsChange(e) {
    this.setState({cols: parseInt(e.target.value)});
  }

  renderQuiltOptions() {
    // this.props.onReset();
    console.log(this.state);
    if (this.props.quilt.length > 0) {
      const rows = this.props.quilt.length;
      const cols = this.props.quilt[0].length;

      return (
        <div className="quiltOptions">
          <p>{rows} Rows x {cols} Columns</p>

          <SizeBar
            addRow={this.addRow}
            addCol={this.addCol}
            removeRow={this.removeRow}
            removeCol={this.removeCol}
          />

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

  renderGenerateQuiltForm() {
    if (this.props.quilt.length == 0) {
      return (
        <div>
          Quilt Size:
          <label>Rows <input type="text" value={this.state.rows} onChange={this.handleRowsChange.bind(this)} /></label>
          <label>Cols <input type="text" value={this.state.cols} onChange={this.handleColsChange.bind(this)} /></label>
          <Button onClick={this.generateInitialQuilt.bind(this)}>Generate Quilt</Button>
        </div>
      )
    }
  }


  render() {
    console.log(this.props);

    return (
      <div>
        <div className="sidebar">
          {this.renderGenerateQuiltForm()}
          {this.renderQuiltOptions()}
        </div>

        <div className="main">
          <Quilt quilt={this.props.quilt}
            squares={this.props.squares}
            fabrics={this.props.fabric}
            selectedFabricId={this.state.selectedFabricId}/>
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
  updateRows(rows) {
    dispatch(appActions.updateRows(rows));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
