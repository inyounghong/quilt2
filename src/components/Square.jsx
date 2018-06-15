import React, { PropTypes } from 'react';

class Square extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  handleClick(index) {
    const {selectedFabricId, square} = this.props;
    if (selectedFabricId == null) {
      return;
    }
    const newFabricIds = square.fabricIds.slice();
    newFabricIds[index] = selectedFabricId;
    const updatedSquare = {
      ...this.props.square,
      fabricIds: newFabricIds,
    }
    this.props.updateSquare(updatedSquare);
  }

  rotateSquare(r) {
    const square = this.props.square;
    let rotation = (square.rotation + r) % 4;
    rotation = rotation < 0 ? 3 : rotation;
    this.props.rotateSquare(square.id, rotation);
  }

  getColorFromFabricId(fabricId){
    const fabric = this.props.fabrics.find(fabric => fabric.id == fabricId);
    return fabric.color;
  }



  render() {
    const {col, fabrics, square, rotations, size} = this.props;
    const color0 = this.getColorFromFabricId(square.fabricIds[0])
    const color1 = this.getColorFromFabricId(square.fabricIds[1])

    const r = square.rotation;
    if (!rotations[r]) return null;

    return (
      <div className="square">
        <svg height={size} width={size}>
          <polygon
            points={rotations[r][0]}
            style={{fill: color0}}
            onClick={this.handleClick.bind(this, 0)}
          />
          <polygon
            points={rotations[r][1]}
            style={{fill: color1}}
            onClick={this.handleClick.bind(this, 1)}
          />
        </svg>
        <div className="rotateWrap" style={{width: size}}>
          <div className="rotateLeft" onClick={this.rotateSquare.bind(this, -1)}>
            <i className="fa fa-chevron-left"></i>
          </div>
          <div className="rotateRight" onClick={this.rotateSquare.bind(this, 1)}>
            <i className="fa fa-chevron-right"></i>
          </div>
        </div>
      </div>

    );
  }
}

export default Square;
