import React, { PropTypes, Component } from 'react';

class Block extends Component {

  constructor(props) {
    super(props);
    this.SIZE = 50;
  }

  getPolygon(type, colors) {
    switch(type) {
      case 'SQUARE':
        return (<polygon
          points={`0,0 0,${this.SIZE} ${this.SIZE},${this.SIZE} ${this.SIZE},0 `}
          style={{fill: colors[0]}}
        />)
      case 'TRIANGLE':
        return (<polygon
          points={`0,0 0,${this.SIZE} ${this.SIZE},${this.SIZE}`}
          style={{fill: colors[0]}}
        />)
      case 'HALF_SQUARE':
        return (<React.Fragment>
          <polygon
                points={`0,0 0,${this.SIZE} ${this.SIZE},0`}
                style={{fill: colors[0]}}
              />
              <polygon
                points={`${this.SIZE},${this.SIZE} 0,${this.SIZE} ${this.SIZE},0`}
                style={{fill: colors[1]}} />
            </React.Fragment>)
      default:
        return null;
    }
  }


  render() {
    const {type, colors, count} = this.props;

    const polygon = this.getPolygon(type, colors);


    return (
      <div className="block">
        <svg height={this.SIZE} width={this.SIZE}>
          {polygon}
        </svg>
        <div className="blockCount">{count}</div>
      </div>
    )

    // return (
    //   <div className="block">
    //     <svg height={this.SIZE} width={this.SIZE}>
    //       <polygon
    //         points={`0,0 0,${this.SIZE} ${this.SIZE},0`}
    //         style={{fill: colors[0]}}
    //       />
    //       <polygon
    //         points={`${this.SIZE},${this.SIZE} 0,${this.SIZE} ${this.SIZE},0`}
    //         style={{fill: colors[1]}}
    //       />
    //     </svg>
    //     <div className="count">{count}</div>
    //   </div>
    // );
  }
}

export default Block;
