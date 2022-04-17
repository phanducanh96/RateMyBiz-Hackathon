import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './App.scss';
import AppRoutes from './AppRoutes';
import Navbar from './shared/Navbar';
import Sidebar from './shared/Sidebar';
import SettingsPanel from './shared/SettingsPanel';
// import Footer from './shared/Footer';
import { withTranslation } from "react-i18next";
import Web3 from 'web3';
import { alphaNumerate } from 'chartist';
import { PROFILE_DETAIL_ABI, PROFILE_DETAIL_ADDRESS } from '../contracts-config'

class App extends Component {
  state = {}
  componentDidMount() {
    this.onRouteChanged();
    this.loadBlockchainData();
  }
  render() {
    let navbarComponent = !this.state.isFullPageLayout ? <Navbar /> : '';
    let sidebarComponent = !this.state.isFullPageLayout ? <Sidebar /> : '';
    let SettingsPanelComponent = !this.state.isFullPageLayout ? <SettingsPanel /> : '';
    // let footerComponent = !this.state.isFullPageLayout ? <Footer/> : '';
    return (
      <div className="container-scroller">
        {navbarComponent}
        <div className="container-fluid page-body-wrapper">
          {sidebarComponent}
          <div className="main-panel">
            <div className="content-wrapper">
              <AppRoutes />
              {SettingsPanelComponent}
            </div>
            {/* { footerComponent } */}
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    console.log("ROUTE CHANGED");
    const { i18n } = this.props;
    const body = document.querySelector('body');
    if (this.props.location.pathname === '/layout/RtlLayout') {
      body.classList.add('rtl');
      i18n.changeLanguage('ar');
    }
    else {
      body.classList.remove('rtl')
      i18n.changeLanguage('en');
    }
    window.scrollTo(0, 0);
    const fullPageLayoutRoutes = ['/login', '/signup', '/user-pages/lockscreen', '/error-pages/error-404', '/error-pages/error-500', '/general-pages/landing-page'];
    for (let i = 0; i < fullPageLayoutRoutes.length; i++) {
      if (this.props.location.pathname === fullPageLayoutRoutes[i]) {
        this.setState({
          isFullPageLayout: true
        })
        document.querySelector('.page-body-wrapper').classList.add('full-page-wrapper');
        break;
      } else {
        this.setState({
          isFullPageLayout: false
        })
        document.querySelector('.page-body-wrapper').classList.remove('full-page-wrapper');
      }
    }
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts });
    const profileDetail = new web3.eth.Contract(PROFILE_DETAIL_ABI, PROFILE_DETAIL_ADDRESS)
    this.setState({ profileDetail })
    const reviewReceivedCount = await profileDetail.methods.reviewReceivedCount().call()
    const reviewGivenCount = await profileDetail.methods.reviewGivenCount().call()

    this.setState({ reviewGivenCount })
    for (var i = 1; i <= reviewGivenCount; i++) {
      const reviewGiven = await profileDetail.methods.reviewGivens(i).call()
      this.setState({
        reviewGivens: [...this.state.reviewGivens, reviewGiven]
      })
    }

    this.setState({ reviewReceivedCount })
    for (var i = 1; i <= reviewReceivedCount; i++) {
      const receivedReview = await profileDetail.methods.receivedReviews(i).call()
      this.setState({
        receivedReviews: [...this.state.receivedReviews, receivedReview]
      })
    }

  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      reviewGivenCount: 0,
      reviewReceivedCount: 0,
      reviewGivens: [],
      receivedReviews: [],
    }
  }

}

export default withTranslation()(withRouter(App));
