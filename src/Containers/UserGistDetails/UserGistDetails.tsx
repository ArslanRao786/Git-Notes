import React, { Fragment, useEffect } from "react";
import { Gist } from "../../types";
import { bindActionCreators } from "redux";
import { getGist } from "../../Redux/Actions/PublicGistsActions";
import { editGist } from "../../Redux/Actions/UserGistsActions";
import { connect } from "react-redux";
import "./UserGistDetails.css";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router-dom";
import { getFormattedData } from "../../utils";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary
    }
  })
);

type StoreProps = {
  gistData: any;
  getGist: any;
};

type Match = {
  match: any;
};

export type ReduxStoreState = {
  PublicGists: {
    publicGistsData: Gist[];
  };
};

type Props = StoreProps & Match;

const UserGistDetails = (props: any) => {
  const history = useHistory();
  const classes = useStyles("");
  const {
    gistData,
    editGist,
    getGist,
    match: {
      params: { id }
    },
    loading
  } = props;

  useEffect(() => {
    getGist(id);
  }, []);

  const data = getFormattedData(gistData);

  if (!gistData) {
    return null;
  }

  return (
    <Fragment>
      {data.map((item: any) => {
        const {
          name,
          timeElapsed,
          firstFileName,
          avatar_url,
          description
        } = item;

        return (
          <div>
            <div className="largeContainer">
              <div className="nameContainer">
                <h3 style={{ margin: 0 }}>
                  {name} / {firstFileName}
                </h3>
                <p style={{ margin: 0 }}>{timeElapsed}</p>
                <p style={{ margin: 0 }}>{description}</p>
              </div>
            </div>
            {loading === true && (
              <div style={{ textAlign: "center", marginTop: "100px" }}>
                <CircularProgress />
              </div>
            )}
            <div>
              {Object.values(item.files).map((file: any) => (
                <div className="largeContainer">
                  <Grid item xs={9}>
                    <Paper className={classes.paper}>
                      <h3>{file.filename}</h3>
                      <Divider />
                      {file.content}
                    </Paper>
                  </Grid>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

const mapStateToProps = ({ PublicGists: { gistData, loading } }: any): any => ({
  gistData,
  loading
});

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getGist,
      editGist
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UserGistDetails);
