import React, { PropTypes, Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Form, Col, Button } from 'react-bootstrap';

class QuiltForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quiltSize: 'TWIN',
      blockSize: '12',
      pattern: 'NONE',
      numColors: '4',
      coloring: 'RANDOM',
    }

    this.handleChange = this.handleChange.bind(this);

    this.quiltSizes = {
      'TWIN': [90,70],
    }
    this.patterns = {
      'NONE': [
        [0]
      ],
      'ALTERNATING': [
        [0,3]
      ],
      'FLYING_GEESE': [
        [1,0]
      ],
      'ARROWS': [
        [1,0,3,2],
        [3,2,1,0]
      ],
      'ALTERNATING_ARROWS': [
        [1,0,0,1],
        [3,2,2,3]
      ],
      'FLYING_GEESE_SQUARE': [
        [0,0,0,1],
        [3,3,0,1],
        [3,2,1,1],
        [3,2,2,2],
      ]
    }
    this.colorPalette = [
      ['#556270', '#4ECDC4', '#C7F464', '#FF6B6B', '#C44D58'],
    ]
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });

    this.generateQuilt({ [e.target.name]: e.target.value });

  }


  getRandomColors(numColors) {
    let n1 = Math.floor(Math.random() * numColors);
    let n2 = Math.floor(Math.random() * numColors);
    const r = (this.state.coloring == 'NO_BLOCKS') ? 0 : 0.3;
    if (n1 == n2 && Math.random() > r) {
      n2 = (n2 + 1) % (numColors);
    }
    return [n1, n2];
  }

  generateSquares(state) {
    // Calculate quilt size
    const {quiltSize, blockSize, coloring, numColors} = state;
    const rows = Math.round(this.quiltSizes[quiltSize][0]/blockSize);
    const cols = Math.round(this.quiltSizes[quiltSize][1]/blockSize);

    // Get pattern
    const pattern = this.patterns[state.pattern];

    // Generate squares
    for (var i = 0; i < rows; i++) {
      const newSquareIds = [];
      for (var j = 0; j < cols; j++) {
        const rotation = pattern[i%pattern.length][j%pattern[0].length]; // Get rotation
        let fabrics = [0,1];
        if (coloring != "STANDARD") {
          fabrics = this.getRandomColors(parseInt(numColors)); // Get random color
        }
        const newSquare = this.props.addSquare(rotation, fabrics);
        newSquareIds.push(newSquare.payload.id);
      }
      this.props.addRowToQuilt(newSquareIds, 0);
    }
  }

  generateQuilt(updatedState) {
    const state = Object.assign({}, this.state, updatedState);
    if (state.blockSize == 0) return; // Quit if blocksize is invalid (0)

    // Generate squares
    this.props.clearQuilt();
    this.generateSquares(state);

    // Set random color palette
    const p = Math.floor(Math.random() * this.colorPalette.length);
    this.props.updateColorPalette(this.colorPalette[p]);
  }

  render() {
    const {blockSize} = this.state;
    console.log(this.state);

    return (
      <Form horizontal>
        <FormGroup controlId="formControlsSelect">
          <Col componentClass={ControlLabel} sm={4}>
            Quilt Size
          </Col>
          <Col sm={8}>
            <FormControl componentClass="select" placeholder="select" name="quiltSize" defaultValue={this.state.quiltSize}
              onChange={this.handleChange}>
              <option value="TWIN">Twin 70"x90"</option>
            </FormControl>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col componentClass={ControlLabel} sm={4}>
            Block Size
          </Col>
          <Col sm={8}>
            <FormControl type="text" name="blockSize" value={blockSize} onChange={this.handleChange}>
            </FormControl>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col componentClass={ControlLabel} sm={4}>
            Pattern
          </Col>
          <Col sm={8}>
            <FormControl componentClass="select" placeholder="select" name="pattern" defaultValue={this.state.pattern}
              onChange={this.handleChange}>
              <option value="NONE">None</option>
              <option value="ALTERNATING">Alternating Blocks</option>
              <option value="FLYING_GEESE">Flying Geese</option>
              <option value="FLYING_GEESE_SQUARE">Flying Geese Square</option>
              <option value="ARROWS">Arrows</option>
              <option value="ALTERNATING_ARROWS">Alternating Arrows</option>
            </FormControl>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col componentClass={ControlLabel} sm={4}>
            Colors
          </Col>
          <Col sm={8}>
            <FormControl componentClass="select" placeholder="select" name="numColors" defaultValue={this.state.numColors}
              onChange={this.handleChange}>
              <option value="2">Two Colors</option>
              <option value="3">Three Colors</option>
              <option value="4">Four Colors</option>
            </FormControl>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col componentClass={ControlLabel} sm={4}>
            Coloring
          </Col>
          <Col sm={8}>
            <FormControl componentClass="select" placeholder="select" name="coloring" defaultValue={this.state.coloring}
              onChange={this.handleChange}>
              <option value="STANDARD">Standard</option>
              <option value="RANDOM">Random</option>
              <option value="NO_BLOCKS">Random with no solid blocks</option>
            </FormControl>
          </Col>
        </FormGroup>

      </Form>
    )
  }
}

export default QuiltForm;
