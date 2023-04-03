import React, { Component } from 'react';

class AutoSum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num1: 0,
      num2: 0,
      sum: 0,
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: Number(value),
      sum: Number(value) + this.state.num2,
    });
  };

  render() {
    return (
      <div>
        <input
          type="number"
          name="num1"
          value={this.state.num1}
          onChange={this.handleInputChange}
        />
        <input
          type="number"
          name="num2"
          value={this.state.num2}
          onChange={this.handleInputChange}
        />
        <input type="number" name="sum" value={this.state.sum} readOnly />
      </div>
    );
  }
}

export default AutoSum;
