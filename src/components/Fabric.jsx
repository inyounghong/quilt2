import React, { PropTypes, Component } from 'react';
// import { TwitterPicker } from 'react-color';


class Fabric extends Component {

  constructor(props) {
    super(props);
    this.state = {
      background: this.props.fabric.color,
      displayColorPicker: false,
    };
    this.handleChangeComplete = this.handleChangeComplete.bind(this);
  }

  handleFocus(fabricId) {
    this.props.setSelectedFabricId(fabricId);
    this.setState({ displayColorPicker: true });
  }

  handleChangeComplete(color) {
    this.setState({ background: color.hex });
    this.setState({ displayColorPicker: false });
    this.props.updateFabric(this.props.fabric.id, color.hex.slice(1));
  };

  render() {
    const {fabric, isSelected} = this.props;
    const { background, displayColorPicker } = this.state;
    const style = {
      background: background,
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
        {background}
        {/* { displayColorPicker ? <TwitterPicker
          color={ this.state.background }
          onChangeComplete={ this.handleChangeComplete } */}
        /> : null }

      </div>
    );
  }
}

export default Fabric;
