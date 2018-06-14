import React, { PropTypes } from 'react';
import squaresActions from '../redux/actions/squares';
import quiltActions from '../redux/actions/quilt';
import appActions from '../redux/actions/app';
import { connect } from 'react-redux';
import List from '../components/List.jsx';
import Quilt from '../containers/Quilt.jsx';
import FabricBar from '../components/FabricBar.jsx';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

class App extends React.Component {

  constructor() {
    super();
    this.handleToggleView = this.handleToggleView.bind(this);
    this.setSelectedFabric = this.setSelectedFabric.bind(this);
    this.handleAddRow = this.handleAddRow.bind(this);
    this.state = {
      selectedFabric: null,
    }
  }

  handleToggleView() {
    this.props.handleToggleView(!this.props.app.isColumnView);
  }

  setSelectedFabric(fabricId) {
    this.setState({selectedFabric: fabricId});
  }

  handleAddRow() {
    const cols = this.props.quilt[0].length;
    const newSquareIds = [];
    for (var i = 0; i < cols; i++) {
      const newSquare = this.props.addSquare();
      newSquareIds.push(newSquare.payload.id);
    }
    this.props.addRowToQuilt(newSquareIds);
  }


  render() {
    console.log(this.props);
    const columnClass = (this.props.app.isColumnView) ? "tab active" : "tab";
    const storyClass = (!this.props.app.isColumnView) ? "tab active" : "tab";
    const cols = this.props.quilt[0].length;
    return (

      <div className="container">

        <DropdownButton title="Change Size">
          <MenuItem onClick={this.handleAddRow}>Add Row Before</MenuItem>
          <MenuItem eventKey="2">Add Row After</MenuItem>
        </DropdownButton>

        <FabricBar
          fabrics={this.props.fabric}
          setSelectedFabric={this.setSelectedFabric}
          selectedFabric={this.state.selectedFabric}/>
        Selected Fabric: {this.state.selectedFabric}

        <Quilt quilt={this.props.quilt}
          squares={this.props.squares}
          fabrics={this.props.fabric}
          selectedFabric={this.state.selectedFabric}/>



        <br/><br/><br/>

        <div className="reset-store" onClick={this.props.onReset}>
          Reset persisted store
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
  addRowToQuilt(row) {
    dispatch(quiltActions.addRowBefore(row));
  },
});

export default DragDropContext(HTML5Backend)(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
