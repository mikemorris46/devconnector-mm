import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import './App.css';

import PrivateRoute from '../src/components/commons/PrivateRoute';

import Navbar from '../src/components/layout/Navbar';
import Landing from '../src/components/layout/Landing';
import Footer from '../src/components/layout/Footer';
import Register from '../src/components/auth/Register';
import Login from '../src/components/auth/Login';
import Dashboard from '../src/components/dashboard/Dashboard';
import CreateProfile from '../src/components/create-profile/CreateProfile';
import EditProfile from '../src/components/edit-profile/EditProfile';
import AddExperience from '../src/components/add-credentials/AddExperience';
import AddEducation from '../src/components/add-credentials/AddEducation';
import Profiles from '../src/components/profiles/Profiles';
import Profile from '../src/components/profile/Profile';
import NotFound from '../src/components/not-found/NotFound';

import setAuthToken from '../src/utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import store from './store';

// Check for token
if (localStorage.jwtToken) {
  // Set auth header
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Log out user
    store.dispatch(logoutUser());
    // Clear current profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profiles" component={Profiles} />
                <Route exact path="/profile/:handle" component={Profile} />
                <Route exact path="/not-found" component={NotFound} />
                <Route component={NotFound} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
