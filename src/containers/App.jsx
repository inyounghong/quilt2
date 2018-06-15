import React, { PropTypes } from 'react';
import squaresActions from '../redux/actions/squares';
import quiltActions from '../redux/actions/quilt';
import appActions from '../redux/actions/app';
import { connect } from 'react-redux';
import Quilt from '../containers/Quilt.jsx';
import FabricBar from '../containers/FabricBar.jsx';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

class App extends React.Component {

  constructor() {
    super();
    this.handleToggleView = this.handleToggleView.bind(this);
    this.setSelectedFabricId = this.setSelectedFabricId.bind(this);
    this.state = {
      selectedFabricIdId: null,
    }
  }

  handleToggleView() {
    this.props.handleToggleView(!this.props.app.isColumnView);
  }

  setSelectedFabricId(fabricId) {
    this.setState({selectedFabricId: fabricId});
  }

  // Option: 0 (add row before) or 1 (add row after)
  handleAddRow(option) {
    const cols = this.props.quilt[0].length;
    const newSquareIds = [];
    for (var i = 0; i < cols; i++) {
      const newSquare = this.props.addSquare();
      newSquareIds.push(newSquare.payload.id);
    }
    this.props.addRowToQuilt(newSquareIds, option);
  }


  render() {
    console.log(this.props);
    const columnClass = (this.props.app.isColumnView) ? "tab active" : "tab";
    const storyClass = (!this.props.app.isColumnView) ? "tab active" : "tab";
    const cols = this.props.quilt[0].length;
    return (

      <div>
        <div className="sidebar">
          <DropdownButton title="Change Size">
            <MenuItem onClick={this.handleAddRow.bind(this, 0)}>Add Row Before</MenuItem>
            <MenuItem onClick={this.handleAddRow.bind(this, 1)}>Add Row After</MenuItem>
          </DropdownButton>

          <FabricBar
            fabrics={this.props.fabric}
            setSelectedFabricId={this.setSelectedFabricId}
            selectedFabricId={this.state.selectedFabricId}/>
          Selected Fabric Id: {this.state.selectedFabricId}

          <div className="reset-store" onClick={this.props.onReset}>
            Reset persisted store
          </div>
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
  handleToggleView(isColumnView) {
    dispatch(appActions.setIsColumnView(isColumnView));
  },
  addSquare(){
    const newSquare = squaresActions.createSquare();
    dispatch(newSquare);
    return newSquare;
  },
  addRowToQuilt(row, option) {
    // console.log("adding row", row, option);
    dispatch(quiltActions.addRow(row, option));
  },
});

export default DragDropContext(HTML5Backend)(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
