import React from 'react';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
  MDBIcon,
} from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import AgencyReq from './Form-agnecyReq';
import Tables from './Tables';
import Todos from './Todos';
class FixedNavbarExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
    };
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  render() {
    const bgPink = { backgroundColor: '#e91e63' };
    return (
      <Router>
        <header>
          <MDBNavbar style={bgPink} dark expand='md'>
            <MDBNavbarBrand href='/'>
              <strong>myBCH</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.onClick} />
            <MDBCollapse isOpen={this.state.collapse} navbar>
              <MDBNavbarNav left>
                <MDBNavItem>
                  <MDBNavLink to='/'>New Request</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to='/tracker'>Tracker</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to='/tasks'>Tasks</MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
              <MDBNavbarNav right>
                <MDBNavItem>
                  <MDBNavLink
                    to='www.linkedin.com/in/naser-shaar
                    '
                  >
                    <MDBIcon fab icon='linkedin' />
                  </MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>
        </header>
        <Switch>
          <Route exact path='/' component={AgencyReq} />
          <Route path='/tracker' component={Tables} />
        </Switch>
        ),
      </Router>
    );
  }
}

export default FixedNavbarExample;
