import React, { Fragment } from "react";
import "./NavigationBar.css";
import UserIcon from "../../Components/UserIcon";
import GitHubLogin from "react-github-login";
import { useDispatch, connect } from "react-redux";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { useHistory } from "react-router-dom";

type State = {};

const NavigationBar = (props: any) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onSuccess = React.useCallback((response: any) => {
    fetch(`http://localhost:9999/authenticate/${response.code}`).then(
      response => {
        response.json().then(result => {
          localStorage.setItem("GitNotesUser", result.token);
          dispatch({ type: "UPDATE_USER", payload: result.token });
        });
      }
    );
  }, []);

  const { userToken } = props;
  const loggedIn = userToken || localStorage.getItem("GitNotesUser");
  return (
    <Fragment>
      <div className="NavBar">
        <div className="namePosition">
          <h1>EMUMBA</h1>
        </div>
        <div className="formatting">
          {(!loggedIn && (
            <GitHubLogin
              clientId="55f00926ad144400f091"
              onSuccess={onSuccess}
              valid={true}
              buttonText="Login"
              redirectUri="http://localhost:3000/gistviews"
              scope="gist"
              className="loginButton"
            />
          )) || (
            <div>
              <div
                onClick={() => history.push("./create-gist")}
                className="onHover"
              >
                <AddRoundedIcon />
              </div>
              <UserIcon />
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ UserGist: { userToken } }: any): any => ({
  userToken
});

export default connect(mapStateToProps, null)(NavigationBar);
