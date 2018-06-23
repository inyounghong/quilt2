import React, { PropTypes } from 'react';
import squaresActions from '../redux/actions/squares';
import quiltActions from '../redux/actions/quilt';
import appActions from '../redux/actions/app';
import fabricActions from '../redux/actions/fabric';
import { connect } from 'react-redux';
import Quilt from '../components/Quilt.jsx';
import PaletteMenu from '../components/PaletteMenu.jsx';
import Instructions from '../components/Instructions.jsx';
import FabricBar from '../containers/FabricBar.jsx';
import SizeBar from '../containers/SizeBar.jsx';
import QuiltForm from '../containers/QuiltForm.jsx';
import { DropdownButton, MenuItem, Button, FormGroup, Checkbox, Col, ControlLabel, Form } from 'react-bootstrap';
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
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      selectedFabricId: null,
      rows: 0,
      cols: 0,
      squareSize: 6,
      numColors: 2,
      allowRotation: false,
    }
  }

  handleChange(e) {
    this.setState({ allowRotation: this.refs.allowRotation.checked });
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
    console.log(this.state);

    if (quilt.length > 0) {
      return (
        <div className="quiltOptions">
          {/* <SizeBar
            addRow={this.addRow}
            addCol={this.addCol}
            removeRow={this.removeRow}
            removeCol={this.removeCol}
            changePattern={this.changePattern.bind(this)}
          /> */}

          <Form horizontal>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={4}>
                Edit Options
              </Col>
              <Col sm={8}>
                <label>
                  <input type="checkbox" ref="allowRotation" onChange={this.handleChange}
                    checked={this.state.allowRotation ? "checked" : ""}/>
                    Allow Rotation
                </label>
              </Col>
            </FormGroup>
          </Form>

          <PaletteMenu
            fabrics={this.props.fabric}
            palettes={this.props.palettes}
            setSelectedFabricId={this.setSelectedFabricId}
            selectedFabricId={this.state.selectedFabricId}
          />

          <FabricBar
            fabrics={this.props.fabric}
            setSelectedFabricId={this.setSelectedFabricId}
            selectedFabricId={this.state.selectedFabricId}
          />
          Selected Fabric Id: {this.state.selectedFabricId}

          <div className="reset-store" onClick={this.props.onReset}>
            Reset persisted store
          </div>
        </div>
      )
    }
  }

  render() {
    console.log(this.props);

    return (
      <React.Fragment>
        <div className="sidebar">
          <QuiltForm
            palettes={this.props.palettes}
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
            selectedFabricId={this.state.selectedFabricId}
            allowRotation={this.state.allowRotation}/>

          <Instructions
            squares={this.props.squares}
            fabrics={this.props.fabric}
            blockSize={this.props.app.blockSize}
            quilt={this.props.quilt}
             />
        </div>
      </React.Fragment>
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
