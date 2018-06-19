import React, { PropTypes, Component } from 'react';

class Block extends Component {

  constructor(props) {
    super(props);
    this.SIZE = 50;
  }


  render() {
    const {colors, count} = this.props;

    return (
      <div className="block">
        <svg height={this.SIZE} width={this.SIZE}>
          <polygon
            points={`0,0 0,${this.SIZE} ${this.SIZE},0`}
            style={{fill: colors[0]}}
          />
          <polygon
            points={`${this.SIZE},${this.SIZE} 0,${this.SIZE} ${this.SIZE},0`}
            style={{fill: colors[1]}}
          />
        </svg>
        <div className="count">{count}</div>
      </div>
    );
  }
}

export default Block;
