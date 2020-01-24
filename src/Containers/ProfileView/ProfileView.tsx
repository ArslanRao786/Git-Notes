import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  getUserProfile,
  getUserGists,
  getStarredGists
} from "../../Redux/Actions/UserGistsActions";
import "./ProfileView.css";
import { getFormattedData } from "../../utils";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import GistsDisplay from "../../Components/GistsDisplay";

const ProfileView = (props: any) => {
  const {
    userProfile,
    getUserProfile,
    userToken,
    userGists,
    getUserGists,
    getStarredGists,
    starredGists
  } = props;

  useEffect(() => {
    getUserProfile(userToken || localStorage.getItem("GitNotesUser"));
    getStarredGists(userToken || localStorage.getItem("GitNotesUser"));
  }, []);

  const { login, avatar_url, gists_url } = userProfile;

  const gistsUrl = `${gists_url}`.slice(0, -10);

  useEffect(() => {
    getUserGists(gistsUrl);
  }, [gistsUrl]);

  const userFormattedGists = getFormattedData(userGists);
  const userStarredGists = getFormattedData(starredGists);

  return (
    <div className="container">
      <div className="profileContainer">
        <div>
          <img src={avatar_url} />
          <h2 style={{ textAlign: "center" }}>{login}</h2>
        </div>
      </div>
      <div className="gistsContainer">
        <Tabs>
          <TabList>
            <Tab>All gists {userGists.length}</Tab>
            <Tab>Starred gists {userStarredGists.length}</Tab>
          </TabList>

          <TabPanel>
            <GistsDisplay gists={userFormattedGists} />
          </TabPanel>
          <TabPanel>
            <GistsDisplay gists={userStarredGists} />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  UserGist: { userProfile, userToken, userGists, starredGists }
}: any): any => ({
  userProfile,
  userToken,
  userGists,
  starredGists
});

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getUserProfile,
      getUserGists,
      getStarredGists
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
