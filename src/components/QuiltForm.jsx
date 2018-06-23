import React, { PropTypes, Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Form, Col, Button } from 'react-bootstrap';

class QuiltForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quiltSize: 'TWIN',
      blockSize: this.props.blockSize,
      pattern: 'NONE',
      numColors: '4',
      coloring: 'NO_BLOCKS',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

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
      ['#490A3D', '#BD1550', '#E97F02', '#F8CA00', '#8A9B0F'],
    ]
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name == "blockSize") {
      const blockSize = parseInt(e.target.value);
      if (blockSize < 5) return;
      this.props.setBlockSize(blockSize);
    }
    this.generateQuilt({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.generateQuilt({});
  }

  getRandomTransition(state, row, col, n) {
    const c = row/(state.rows-1) + (col/(state.cols-1));
    const t = (c/2 * n);
    let avg = Math.floor(t + (Math.random()*1.5) - (Math.random()*1.5));
    avg = (avg >= n) ? n-1 : avg;
    avg = (avg < 0) ? 0: avg;
    return avg;
  }

  // Return color array for square at [row, col]
  getColors(state, row, col) {
    const {coloring, numColors} = state;
    let n = parseInt(numColors);

    if (coloring == 'STANDARD') {
      return [0,1];
    }
    if (coloring == 'TRANSITION') {
      let n1 = this.getRandomTransition(state, row, col, n);
      let n2 = this.getRandomTransition(state, row, col, n);
      if (n1 == n2 && n1 < n-1) {
        n2 = (n2 + 1) % n;
      }
      return [n1, n2];
    }
    // Random color
    let n1 = Math.floor(Math.random() * n);
    let n2 = Math.floor(Math.random() * n);
    const r = (coloring == 'NO_BLOCKS') ? 0 : 0.3;
    if (n1 == n2 && Math.random() > r) {
      n2 = (n2 + 1) % (n);
    }
    return [n1, n2];
  }

  generateSquares(state) {
    // Calculate quilt size
    const {quiltSize, blockSize, coloring, numColors} = state;
    state.rows = Math.round(this.quiltSizes[quiltSize][0]/blockSize);
    state.cols = Math.round(this.quiltSizes[quiltSize][1]/blockSize);

    // Get pattern
    const pattern = this.patterns[state.pattern];

    // Generate squares
    for (var i = 0; i < state.rows; i++) {
      const newSquareIds = [];
      for (var j = 0; j < state.cols; j++) {
        const rotation = pattern[i%pattern.length][j%pattern[0].length]; // Get rotation
        const fabrics = this.getColors(state, i, j);
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
              <option value="5">Five Colors</option>
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
              <option value="TRANSITION">Transition</option>
            </FormControl>
          </Col>
        </FormGroup>
        <Button type="submit" onClick={this.handleSubmit} >ReRun</Button>
      </Form>
    )
  }
}

export default QuiltForm;
