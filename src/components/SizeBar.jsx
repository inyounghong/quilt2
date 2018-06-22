import squaresActions from '../redux/actions/squares';
import * as squareTypes from '../constants/squareTypes';
import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

class SizeBar extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="sizebar">
        <DropdownButton title="Increase Size" id="increaseSize">
          <MenuItem onClick={this.props.addRow.bind(this, 0)}>Add Row Before</MenuItem>
          <MenuItem onClick={this.props.addRow.bind(this, 1)}>Add Row After</MenuItem>
          <MenuItem onClick={this.props.addCol.bind(this, 0)}>Add Column Before</MenuItem>
          <MenuItem onClick={this.props.addCol.bind(this, 1)}>Add Column After</MenuItem>
        </DropdownButton>

        <DropdownButton title="Decrease Size" id="decreaseSize">
          <MenuItem onClick={this.props.removeRow.bind(this, 0)}>Remove Row Before</MenuItem>
          <MenuItem onClick={this.props.removeRow.bind(this, 1)}>Remove Row After</MenuItem>
          <MenuItem onClick={this.props.removeCol.bind(this, 0)}>Remove Column Before</MenuItem>
          <MenuItem onClick={this.props.removeCol.bind(this, 1)}>Remove Column After</MenuItem>
        </DropdownButton>

        <DropdownButton title="Quilt Pattern" id="quiltPattern">
          <MenuItem onClick={this.props.changePattern.bind(this, squareTypes.FLYING_GEESE)}>Flying Geese</MenuItem>
        </DropdownButton>
      </div>
    );
  }
}


export default SizeBar;
