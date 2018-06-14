import React, { PropTypes, Component } from 'react';

class Fabric extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleFocus = this.handleFocus.bind(this);
  }


  handleFocus() {
    this.props.setSelectedFabric(this.props.fabric.id);
  }

  render() {
    const fabric = this.props.fabric;
    const style = {
      background: fabric.color,
    }
    const className = "fabric" + (this.props.selectedFabric == fabric.id ? " selected" : "");
    return (
      <div className="fabricWrap">
        <div
          className={className}
          style={style}
          value={fabric.id}
          onClick={this.handleFocus}
        />
        <div className="fabricMenu">
          Change Color
        </div>
      </div>
    );
  }
}

export default Fabric;
