import React, { PropTypes, Component } from 'react';
import Block from '../components/Block.jsx';

class Instructions extends Component {

  constructor(props) {
    super(props);
    this.SIZE = 50;
  }

  getUniqueBlocks(squares) {
    const uniqueBlocks = {};
    let key = "";
    squares.forEach(square => {
      const fabrics = square.fabricIds.slice();
      fabrics.sort();
      key = fabrics[0] + "," + fabrics[1];
      uniqueBlocks[key] = uniqueBlocks[key] + 1 || 1;
    })
    return uniqueBlocks;
  }

  getColorCounts(squares) {
    const counts = {};
    squares.forEach(square => {
      counts[square.fabricIds[0]] = counts[square.fabricIds[0]] + 1 || 1;
      counts[square.fabricIds[1]] = counts[square.fabricIds[1]] + 1 || 1;
    });
    return counts;
  }

  getMaterials(squares, fabrics, blockSize) {
    const colorCounts = this.getColorCounts(squares);
    const squareList = Object.keys(colorCounts).map(k => {
      if (!fabrics[k]) return(<div key={k}>Color Error</div>);
      const squareCount = Math.floor(colorCounts[k]/2);
      if (squareCount == 0) return;
      return (
        <Block type="SQUARE" key={k} colors={[fabrics[k].color]} count={squareCount}/>
      )
    })

    const triangleList = Object.keys(colorCounts).map(k => {
      const triangleCount = colorCounts[k]%2;
      if (triangleCount == 0) return;
      return (
        <Block type="TRIANGLE" key={k} colors={[fabrics[k].color]} count={triangleCount}/>
      )
    })

    return (
      <React.Fragment>
        <div className="blockList">{squareList}</div>
        <div className="blockList">{triangleList}</div>
      </React.Fragment>
    )
  }

  getBlocks(squares, fabrics) {
    const uniqueBlocks = this.getUniqueBlocks(squares);
    const blocks = [];
    for (var k in uniqueBlocks) {
      const fabricIds = k.split(",");
      const colors = fabricIds.map(id => {
        const fabric = fabrics.find(fabric => fabric.id == id);
        return (fabric) ? fabric.color : 0;
      });
      blocks.push(<Block type="HALF_SQUARE" key={k} colors={colors} count={uniqueBlocks[k]}/>);
    }
    return blocks;
  }

  toFeet(inches) {
    const feet = Math.floor(inches/12);
    const inch = inches % 12;
    return `${feet}'${inch}''`;
  }

  render() {
    const {squares, fabrics, blockSize, quilt} = this.props;

    const materials = this.getMaterials(squares, fabrics, blockSize);
    const blocks = this.getBlocks(squares, fabrics);

    const size1 = blockSize + 1 + 7/8;
    const size2 = blockSize + 1;

    // Calculate quilt sizes
    const rows = quilt.length;
    if (rows == 0) return null;
    const cols = quilt[0].length;
    const sizeAcross = blockSize * cols;
    const sizeDown = blockSize * rows;

    return (
      <div className="instructions">
        <h1>Instructions</h1>
        <p>1. Cut the following <b>{size1}-inch</b> squares and triangles.</p>
        {materials}

        <p>2. Sew into <b>{size2}-inch</b> half-square triangle blocks ({rows*cols} total).</p>
        <div className="blockList">{blocks}</div>

        <p>3. Sew into <b>{rows}</b> rows of <b>{cols}</b> blocks each. Each row should be <b>{sizeAcross} inches</b>,
          for a total quilt size of <b>{sizeAcross} by {sizeDown} inches </b>
           ({this.toFeet(sizeAcross)} by {this.toFeet(sizeDown)}).</p>
      </div>
    )
  }
}

export default Instructions;
