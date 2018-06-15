import React, { PropTypes, Component } from 'react';

class Fabric extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  handleFocus(fabricId) {
    this.props.setSelectedFabricId(fabricId);
  }

  render() {
    const {fabric, isSelected} = this.props;
    const style = {
      background: fabric.color,
    }

    return (
      <div className="fabricWrap">
        <div
          className={"fabric" + (isSelected ? " selected" : "")}
          style={style}
          value={fabric.id}
          onClick={this.handleFocus.bind(this, fabric.id)}
        />
        <div className="fabricMenu">
          Change Color
        </div>
      </div>
    );
  }
}

export default Fabric;
