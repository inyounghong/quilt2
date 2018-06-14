import React, { PropTypes } from 'react';

export default class Fabric extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const fabric = this.props.fabric;
    const style = {
      background: fabric.color,
    }
    return (
      <div className="fabricWrap">
        <div className="fabric" style={style}>
          {fabric.id}: {fabric.color}
        </div>
        <div className="fabricMenu">
          Change Color
        </div>
      </div>
    );
  }
}
