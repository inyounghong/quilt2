import React, { PropTypes } from 'react';
import Square from '../components/Square.jsx';

export default class Quilt extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
    // this.handleMove = this.handleMove.bind(this);
  }

  render() {
    const quilt = this.props.quilt;
    const fabrics = this.props.fabrics;
    const cols = quilt[0].length;
    const squares = quilt.map((r, i) => {
      const row = r.map((square, j) => {
        const fabric = fabrics.find(fabric => fabric.id == square.fabrics[0], 1);
        return (
          <Square key={i*cols+j} square={square} color={fabric.color}/>
        )
      });
      return (
        <div>
          {row}
        </div>
      )
    })


    return (
      <div className="quilt">
        {squares}
      </div>
    );
  }
}
