import React, { PropTypes, Component } from 'react';
import onClickOutside from 'react-onclickoutside';

class Fabric extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
    };
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleClickInside = this.handleClickInside.bind(this);
  }

  handleClickOutside() {
    this.setState({isSelected: false});
    this.props.setSelectedFabric(null);
  }

  handleClickInside() {
    if (this.state.isSelected){
      this.props.setSelectedFabric(null); // Deselect
    } else {
      this.props.setSelectedFabric(this.props.fabric.id);
    }
    this.setState({isSelected: !this.state.isSelected});
  }

  render() {
    const fabric = this.props.fabric;
    const style = {
      background: fabric.color,
    }
    const className = "fabric" + (this.state.isSelected ? " selected" : "");
    return (
      <div className="fabricWrap" onClick={this.handleClickInside}>
        <div className={className} style={style}>
          {fabric.id}: {fabric.color}
        </div>
        <div className="fabricMenu">
          Change Color
        </div>
      </div>
    );
  }
}

export default onClickOutside(Fabric);
