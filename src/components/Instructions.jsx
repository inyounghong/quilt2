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

  getMaterials(colorCounts, fabrics, blockSize) {
    const squareList = Object.keys(colorCounts).map(k => {
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
      <div>
        {squareList}
        {triangleList}
      </div>
    )
  }

//<svg height={this.SIZE} width={this.SIZE}>
//   <polygon
//     points={`0,0 0,${this.SIZE} ${this.SIZE},${this.SIZE}  `}
//     style={{fill: fabrics[k].color}}
//   />
// </svg>{triangleCount} 2x2 triangles

  render() {
    const {squares, fabrics, blockSize} = this.props;
    const uniqueBlocks = this.getUniqueBlocks(squares);
    const colorCounts = this.getColorCounts(squares);
    console.log(colorCounts);


    const blocks = [];
    for (var k in uniqueBlocks) {
      const fabricIds = k.split(",");
      const colors = fabricIds.map(id => {
        const fabric = fabrics.find(fabric => fabric.id == id);
        if (!fabric) {
          return 0;
        }
        return fabric.color;
      });
      blocks.push(<Block type="HALF_SQUARE" key={k} colors={colors} count={uniqueBlocks[k]}/>);
    }

    const materials = this.getMaterials(colorCounts, fabrics, blockSize);
    const size1 = blockSize + 1 + 7/8;
    const size2 = blockSize + 1;

    return (
      <div className="blockCounts">
        <h1>Instructions</h1>
        <p>1. Cut the following {size1}-inch squares and triangles.</p>
        {materials}

        <p>2. Sew into {size2}-inch half-square triangle blocks.</p>
        {blocks}
      </div>
    )
  }
}

export default Instructions;
