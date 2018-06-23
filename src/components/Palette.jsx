import React, { PropTypes, Component } from 'react';

class Palette extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {palette} = this.props;

    const paletteBlock = palette.map(color => {
      const style = {
        background: color,
        width: 300/palette.length,
      }
      return (
        <div style={style} key={color} className="paletteBlock"></div>
      )
    })

    return (
      <div className="palette">
        {paletteBlock}
      </div>
    )
  }
}

export default Palette;
