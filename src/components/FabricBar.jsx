import React, { PropTypes } from 'react';
import Fabric from '../components/Fabric';

export default class FabricBar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const fabrics = this.props.fabrics.map(fabric => {
      return (
        <Fabric fabric={fabric} />
      )
    })

    return (
      <div className="fabricBar">
        {fabrics}
      </div>
    );
  }
}
