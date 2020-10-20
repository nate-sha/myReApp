import Axios from 'axios';
import React, { Component } from 'react';

export class Glossary extends Component {
  state = {
    languages: [],
    isLoaded: false,
  };

  componentDidMount() {
    Axios.get('http://localhost:8000/api/languages/')
      .then((res) => {
        this.setState({
          languages: res.data,
          isLoaded: true,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    console.log(this.state);
    return <div></div>;
  }
}

export default Glossary;
