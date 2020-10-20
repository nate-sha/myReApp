import React, { Component } from 'react';
import TableItem from './TableItem';
import axios from 'axios';

class Tables extends Component {
  state = {
    requests: [],
  };
  componentDidMount() {
    axios
      .get('http://localhost:8000/api/agencyReqs/')
      .then((res) => {
        this.setState({
          requests: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const tableData = {
      columns: [
        {
          label: 'Agency',
          field: 'agency',
        },
        {
          label: 'Status',
          field: 'status',
        },
        {
          label: 'Language',
          field: 'language',
        },
        {
          label: 'Location',
          field: 'location',
        },
      ],
      rows: this.state.requests,
      tableTitle: 'Agency Requests',
      tableId: 1,
    };
    const { requests } = this.state;
    return <TableItem key={requests.tableId} data={tableData} />;
  }
}

export default Tables;
