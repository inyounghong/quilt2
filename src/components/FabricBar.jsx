import React, { PropTypes } from 'react';
import Fabric from '../components/Fabric';

class FabricBar extends React.Component {

  constructor(props) {
    super(props);
  }

  handleAddFabric() {
    const color = "purple";
    this.props.addFabric(color);
  }


  render() {
    const {fabrics, selectedFabricId} = this.props;
    const fabricSquares = fabrics.map(fabric => {
      return (
        <Fabric
          fabric={fabric}
          key={fabric.id}
          isSelected={fabric.id == selectedFabricId}
          setSelectedFabricId={this.props.setSelectedFabricId}
          updateFabric={this.props.updateFabric}
        />
      )
    })

    return (
      <div className="fabricBar">
        {fabricSquares}
        <button type="button"
          className="btn btn-primary addFabric"
          onClick={this.handleAddFabric.bind(this)}>addFabric</button>
      </div>
    );
  }
}

export default FabricBar;
