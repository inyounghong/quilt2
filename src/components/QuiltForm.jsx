import React, { PropTypes, Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Form, Col, Button } from 'react-bootstrap';

class QuiltForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quiltSize: 'TWIN',
      blockSize: '12',
      pattern: 'NONE',
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

    }
    // this.calculateQuilt();
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    // Calculate width and height
    const {quiltSize, blockSize} = this.state;
    if (blockSize == 0) return;
    const rows = Math.round(this.quiltSizes[quiltSize][0]/blockSize);
    const cols = Math.round(this.quiltSizes[quiltSize][1]/blockSize);
    const totalSize = [rows*blockSize, cols*blockSize];

    console.log(this.state.pattern);
    this.generateInitialQuilt(rows, cols);
  }

  generateInitialQuilt(rows, cols) {
    this.props.clearQuilt();
    console.log("generating quilt with ", rows, cols);
    for (var i = 0; i < rows; i++) {
      const newSquareIds = [];
      for (var j = 0; j < cols; j++) {
        const pattern = this.patterns[this.state.pattern];
        const rotation = pattern[i%pattern.length][j%pattern[0].length];
        const newSquare = this.props.addSquare(rotation);
        newSquareIds.push(newSquare.payload.id);
      }
      this.props.addRowToQuilt(newSquareIds, 0);
    }
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
            <FormControl componentClass="select" placeholder="select" name="quiltSize" onChange={this.handleChange}>
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
            <FormControl componentClass="select" placeholder="select" name="pattern" onChange={this.handleChange}>
              <option value="NONE">None</option>
              <option value="ALTERNATING">Alternating Blocks</option>
              <option value="FLYING_GEESE">Flying Geese</option>
              <option value="ARROWS">Arrows</option>
              <option value="ALTERNATING_ARROWS">Alternating Arrows</option>
            </FormControl>
          </Col>
        </FormGroup>

        <Button type="submit" onClick={this.handleSubmit}>Submit</Button>
      </Form>


    )
  }
}

export default QuiltForm;
