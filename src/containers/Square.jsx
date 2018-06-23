import squaresActions from '../redux/actions/squares';
import { connect } from 'react-redux';
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
    const newFabricIds = square.fabricIds.slice(0);
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

  renderRotationOptions(allowRotation, r, size) {
    if (allowRotation) {
      return (
        <React.Fragment>
          <div className="rotation">{r}</div>
            <div className="rotateWrap" style={{width: size}}>
              <div className="rotateLeft" onClick={this.rotateSquare.bind(this, -1)}>
                <i className="fa fa-chevron-left"></i>
              </div>
              <div className="rotateRight" onClick={this.rotateSquare.bind(this, 1)}>
                <i className="fa fa-chevron-right"></i>
              </div>
            </div>
          </React.Fragment>
        )
    }
  }

  render() {

    const {col, fabrics, square, rotations, size} = this.props;
    const color0 = fabrics[square.fabricIds[0]].color;
    const color1 = fabrics[square.fabricIds[1]].color;

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

        {this.renderRotationOptions(this.props.allowRotation, r, size)}
      </div>

    );
  }
}


const mapStateToProps = (state) => ({
  // selectedFabric: state.selectedFabric
});

const mapDispatchToProps = (dispatch) => ({
  // // Stories
  updateSquare(square) {
    dispatch(squaresActions.updateSquare(square));
  },
  rotateSquare(squareId, rotation) {
    dispatch(squaresActions.rotateSquare(squareId, rotation));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  (Square)
);
