import React, { PropTypes, Component } from 'react';

class Palette extends Component {

  constructor(props) {
    super(props);
  }


  handleClick(k) {
    this.props.setSelectedPaletteId(k);
  }

  render() {
    const {palette, k} = this.props;

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
      <div className="palette" onClick={this.handleClick.bind(this, k)}>
        {paletteBlock}
      </div>
    )
  }
}

export default Palette;
