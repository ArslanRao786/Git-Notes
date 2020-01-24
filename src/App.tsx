import React from "react";
import { BrowserRouter, Redirect } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import NavigationBar from "./Containers/NavigationBar";
import GistViews from "./Containers/GistViews";
import PublicGistsDetails from "./Containers/PublicGistsDetails";
import ProfileView from "./Containers/ProfileView";
import { connect } from "react-redux";
import CreateOrEditGist from "./Containers/CreateOrEditGist";
import UserGistDetails from "./Containers/UserGistDetails";

const App = ({ userToken }) => {
  const loggedIn = userToken || localStorage.getItem("GitNotesUser");

  return (
    <BrowserRouter>
      <NavigationBar />
      <Switch>
        <Route path="/gistviews" exact component={GistViews} />
        <Route
          path="/gistviews/publicgistsdetails/:id"
          component={PublicGistsDetails}
        />
        {loggedIn && (
          <Switch>
            <Route path="/profile" exact component={ProfileView} />
            <Route path="/create-gist" exact component={CreateOrEditGist} />
            <Route path="/edit-gist" exact component={CreateOrEditGist} />
            <Route
              path="/profile/user-gist-details/:id"
              exact
              component={UserGistDetails}
            />
            <Redirect to="/gistviews" />
          </Switch>
        )}
        <Redirect to="/gistviews" />
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = ({ UserGist: { userToken } }: any) => ({
  userToken
});

export default connect(mapStateToProps)(App);
