import React, { PropTypes } from 'react';
import Fabric from '../components/Fabric';

class FabricBar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const fabrics = this.props.fabrics.map(fabric => {
      return (
        <Fabric
          fabric={fabric}
          setSelectedFabric={this.props.setSelectedFabric}
          selectedFabric={this.props.selectedFabric}
        />
      )
    })

    return (
      <div className="fabricBar">
        {fabrics}
      </div>
    );
  }
}

export default FabricBar;
