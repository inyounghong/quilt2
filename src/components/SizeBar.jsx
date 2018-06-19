import squaresActions from '../redux/actions/squares';
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
        <DropdownButton title="Increase Size">
          <MenuItem onClick={this.props.addRow.bind(this, 0)}>Add Row Before</MenuItem>
          <MenuItem onClick={this.props.addRow.bind(this, 1)}>Add Row After</MenuItem>
          <MenuItem onClick={this.props.addCol.bind(this, 0)}>Add Column Before</MenuItem>
          <MenuItem onClick={this.props.addCol.bind(this, 1)}>Add Column After</MenuItem>
        </DropdownButton>

        <DropdownButton title="Decrease Size">
          <MenuItem onClick={this.props.removeRow.bind(this, 0)}>Remove Row Before</MenuItem>
          <MenuItem onClick={this.props.removeRow.bind(this, 1)}>Remove Row After</MenuItem>
          <MenuItem onClick={this.props.removeCol.bind(this, 0)}>Remove Column Before</MenuItem>
          <MenuItem onClick={this.props.removeCol.bind(this, 1)}>Remove Column After</MenuItem>
        </DropdownButton>
      </div>
    );
  }
}


export default SizeBar;
