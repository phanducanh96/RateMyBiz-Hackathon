import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { Trans } from 'react-i18next';

class Sidebar extends Component {
  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: '/apps', state: 'appsMenuOpen' },
      { path: '/basic-ui', state: 'basicUiMenuOpen' },
      { path: '/form-elements', state: 'formElementsMenuOpen' },
      { path: '/tables', state: 'tablesMenuOpen' },
      { path: '/icons', state: 'iconsMenuOpen' },
      { path: '/charts', state: 'chartsMenuOpen' },
      { path: '/user-pages', state: 'userPagesMenuOpen' },
      { path: '/error-pages', state: 'errorPagesMenuOpen' },
      { path: '/profiles', state: 'profilesMenuOpen' },
      { path: '/profiles', state: 'profilesMenuOpen' },
      { path: '/credential-offers', state: 'credentialOffersMenuOpen' },
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true })
      }
    }));

  }
  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">

          <li className={this.isPathActive('/dashboard-index') ? 'nav-item active' : 'nav-item'}>
            <Link className="nav-link" to="/dashboard-index">
              <i className="mdi mdi-television menu-icon"></i>
              <span className="menu-title"><Trans>Dashboard</Trans></span>
            </Link>
          </li>
          <li className={this.isPathActive('/profiles') ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.profilesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('profilesMenuOpen')} data-toggle="collapse">
              <i className="mdi mdi-table-large menu-icon"></i>
              <span className="menu-title"><Trans>Profile</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.profilesMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={this.isPathActive('/public-profile') ? 'nav-link active' : 'nav-link'} to="/public-profile"><Trans>Your Public Profile</Trans></Link></li>
                <li className="nav-item"> <Link className={this.isPathActive('/review-page') ? 'nav-link active' : 'nav-link'} to="/review-page"><Trans>Leave/Update Reviews</Trans></Link></li>
                <li className="nav-item"> <Link className={this.isPathActive('/personal-profile-edit') ? 'nav-link active' : 'nav-link'} to="/personal-profile-edit"><Trans>Edit Your Personal Info</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={this.isPathActive('/credentialOffers') ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.credentialOffersMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('credentialOffersMenuOpen')} data-toggle="collapse">
              <i className="mdi mdi-table-large menu-icon"></i>
              <span className="menu-title"><Trans>Verification</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.credentialOffersMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={this.isPathActive('/credential-offer') ? 'nav-link active' : 'nav-link'} to="/credential-offer"><Trans>Get Credential Offer From Issuer</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add className 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {

      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);