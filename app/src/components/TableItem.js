import React, { Component } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import { Container, Table, thead, tbody } from 'react-bootstrap';
import PropTypes from 'prop-types';

class TableItem extends Component {
  render() {
    let tableD = this.props.data;
    console.log(tableD);
    return (
      <Container className=' card align-items-center justify-content-arround'>
        <h2>Request Tracker</h2>
        <MDBDataTableV5
          hover
          entriesOptions={[5, 20, 25]}
          entries={5}
          pagesAmount={4}
          data={tableD}
        />
      </Container>
    );
  }
}

TableItem.propTypes = {
  data: PropTypes.object,
};
export default TableItem;
