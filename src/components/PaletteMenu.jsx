import React, { PropTypes, Component } from 'react';
import Palette from '../components/Palette.jsx';

class PaletteMenu extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {fabrics, palettes} = this.props;

    const paletteList = Object.keys(palettes).map(key => {
      return (
        <Palette key={key} palette={palettes[key]["palette"]}/>
      )
    })

    return (
      <div className="paletteMenu">
        Palette Menu
        {paletteList}
      </div>
    )
  }
}

export default PaletteMenu;
