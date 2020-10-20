import React from 'react';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Footer from './components/Footer';

class App extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <Footer />
      </>
    );
  }
}
export default App;
