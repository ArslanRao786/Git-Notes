import React, { useEffect, useState } from "react";
import "./GistsDisplay.css";
import { Paper } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { bindActionCreators } from "redux";
import { getGist } from "../../Redux/Actions/PublicGistsActions";
import { connect } from "react-redux";
import { getContent, getFormattedData } from "../../utils";
import { useHistory } from "react-router-dom";
import ActionIcons from "../ActionIcons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
      marginBottom: "30px"
    }
  })
);

type gists = {
  name: string;
  description: string;
  firstFileName: string;
  timeElapsed: string;
  avatar_url: string;
  id: string;
};

let arr = [];
const GistsDisplay = (props: { gists: gists[] }) => {
  const history = useHistory();
  const classes = useStyles("");
  //@ts-ignore
  const { gists, getGist, gistData } = props;

  useEffect(() => {
    gists.map(item =>
      fetch(
        `https://api.github.com/gists/${item.id}?client_id=55f00926ad144400f091&client_secret=2f41825b1fdfe2458b4f46a24a887ca6fffdf16a`
      )
        .then(response => response.json())
        .then(json => arr.push(json))
        .catch(err => err)
    );
  }, [gists]);

  const content = getContent(arr);
  console.log(content);

  if (!content) {
    return null;
  }

  return gists.map((item: gists) => {
    const {
      name,
      description,
      firstFileName,
      timeElapsed,
      avatar_url,
      id
    } = item;

    return (
      <div className="gistFormatter">
        <div className="descriptionContainer">
          <div className="infoContainer">
            <img src={avatar_url} />
            <div>
              <h5
                onClick={() =>
                  history.push(`/gistviews/publicgistsdetails/${id}`)
                }
              >
                {name} / {firstFileName}
              </h5>
              <p>{timeElapsed}</p>
              <p>{description}</p>
            </div>
          </div>
          <div className="actionIcons">
            <ActionIcons id={id} />
          </div>
        </div>
        <Paper className={classes.paper}>
          {content.map(item => item.content)}
        </Paper>
      </div>
    );
  });
};

const mapStateToProps = ({ PublicGists: { gistData } }: any): any => ({
  gistData
});

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getGist
    },
    dispatch
  );
};

//@ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(GistsDisplay);
