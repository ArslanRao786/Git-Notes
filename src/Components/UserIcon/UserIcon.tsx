import React, { useEffect } from "react";
import Popover from "@material-ui/core/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getUserProfile } from "../../Redux/Actions/UserGistsActions";
import "./UserIcon.css";
import { Divider } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

type StoreProps = {
  userToken: string;
  userGist: any;
  updateUserGist?: any;
};

export type ReduxStoreState = {
  UserGist: {
    userToken: string;
    userGist: any;
    user: null | string;
  };
};

type Props = StoreProps;

const UserIcon = (props: any) => {
  const { userProfile, getUserProfile, userToken } = props;
  const history = useHistory();

  useEffect(() => {
    getUserProfile(userToken || localStorage.getItem("GitNotesUser"));
  }, []);

  const dispatch = useDispatch();
  const { login, avatar_url } = userProfile;

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState: any) => (
        <div>
          <img {...bindTrigger(popupState)} src={avatar_url} />
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
          >
            <div className="popover">
              <p style={{ marginBottom: 0, marginLeft: "10px" }}>
                Signed In as
              </p>
              <h4
                onClick={() => history.push("/profile")}
                style={{ marginLeft: "10px" }}
              >
                {login}
              </h4>
              <Divider />

              <div
                onClick={() => history.push("./gistviews")}
                style={{ marginLeft: "10px", marginBottom: "10px" }}
              >
                Public Gists
              </div>
              <Divider />
              <div
                onClick={() => (
                  localStorage.removeItem("GitNotesUser"),
                  dispatch({
                    type: "UPDATE_USER",
                    payload: null
                  })
                )}
                style={{ marginLeft: "10px" }}
              >
                Sign Out
              </div>
            </div>
          </Popover>
        </div>
      )}
    </PopupState>
  );
};

const mapStateToProps = ({
  UserGist: { userProfile, userToken }
}: any): any => ({
  userProfile,
  userToken
});

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getUserProfile
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UserIcon);
