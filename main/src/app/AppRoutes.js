import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from "./PrivateRoute"

import Spinner from '../app/shared/Spinner';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));

const DashboardIndex = lazy(() => import('./dashboard/DashboardIndex'));

const Buttons = lazy(() => import('./basic-ui/Buttons'));
const Dropdowns = lazy(() => import('./basic-ui/Dropdowns'));

const BasicElements = lazy(() => import('./form-elements/BasicElements'));

const BasicTable = lazy(() => import('./tables/BasicTable'));

const Mdi = lazy(() => import('./icons/Mdi'));

const ChartJs = lazy(() => import('./charts/ChartJs'));

const Error404 = lazy(() => import('./error-pages/Error404'));
const Error500 = lazy(() => import('./error-pages/Error500'));

const Login = lazy(() => import('./user-pages/Login'));
const Register = lazy(() => import('./user-pages/Register'));
const ReviewPage = lazy(() => import('./user-profile/ReviewPage'));
const PublicProfile = lazy(() => import('./user-profile/PublicProfile'));
const PublicProfileView = lazy(() => import('./user-profile/PublicProfileView'));

const QrCode = lazy(() => import('./user-pages/QrCode'));
const QrReader = lazy(() => import('./user-pages/QrReader'));
const CredentialOffer = lazy(() => import('./user-pages/CredentialOffer'));

const PersonalProfile = lazy(() => import('./user-pages/PersonalProfile'));

class AppRoutes extends Component {

  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <PrivateRoute exact path="/" component={DashboardIndex} />

          <PrivateRoute exact path="/dashboard-index" component={DashboardIndex} />

          <Route path="/basic-ui/buttons" component={Buttons} />
          <Route path="/basic-ui/dropdowns" component={Dropdowns} />

          <Route path="/form-Elements/basic-elements" component={BasicElements} />

          <Route path="/tables/basic-table" component={BasicTable} />

          <Route path="/icons/mdi" component={Mdi} />

          <Route path="/charts/chart-js" component={ChartJs} />


          <Route path="/login" component={Login} />
          <Route path="/signup" component={Register} />
          <Route path="/review-page" component={ReviewPage} />
          <Route path="/public-profile" component={PublicProfile} />
          <Route path="/public-profile-view" component={PublicProfileView} />

          <Route path="/qr-code" component={QrCode} />
          <Route path="/qr-reader" component={QrReader} />

          <Route path="/credential-offer" component={CredentialOffer} />

          <Route path="/error-pages/error-404" component={Error404} />
          <Route path="/error-pages/error-500" component={Error500} />

          <Route path="/personal-profile-edit" component={PersonalProfile} />

          <Route path="/dashboard-index" component={DashboardIndex} />

        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;