import React, { useState, Fragment } from "react";
import {
  starTheGist,
  unStarTheGist,
  forkTheGist
} from "../../Redux/Actions/UserGistsActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  StarBorderRounded,
  StarRounded,
  AccountTreeOutlined,
  AccountTreeRounded
} from "@material-ui/icons";

import ActionItem from "../ActionItem";

const ActionIcons = (props: any) => {
  const [isStarred, setisStarred] = useState(false);
  const [isForked, setisForked] = useState(false);
  const { starTheGist, unStarTheGist, id, userToken, forkTheGist } = props;

  const starActions = () => {
    if (isStarred === false) {
      setisStarred(true);
      starTheGist(id, userToken);
    } else {
      setisStarred(false);
      unStarTheGist(id, userToken);
    }
  };

  const forkActions = () => {
    if (isForked === false) {
      setisForked(true);
      forkTheGist(id, userToken);
    } else {
      setisForked(false);
      unStarTheGist(id, userToken);
    }
  };

  return (
    <Fragment>
      <ActionItem
        icon={isStarred ? <StarRounded /> : <StarBorderRounded />}
        handleClick={starActions}
      />
      <ActionItem
        icon={isForked ? <AccountTreeRounded /> : <AccountTreeOutlined />}
        handleClick={forkActions}
      />
    </Fragment>
  );
};

const mapStateToProps = ({ UserGist: { userToken } }: any) => ({
  userToken
});

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      starTheGist,
      unStarTheGist,
      forkTheGist
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionIcons);
