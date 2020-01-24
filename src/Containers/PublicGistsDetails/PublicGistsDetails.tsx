import React, { Fragment, useEffect } from "react";
import { Gist } from "../../types";
import { bindActionCreators } from "redux";
import { getGist } from "../../Redux/Actions/PublicGistsActions";
import { connect } from "react-redux";
import "./PublicGistsDetails.css";
import Paper from "@material-ui/core/Paper";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { CircularProgress } from "@material-ui/core";
import { getFormattedData } from "../../utils";
import ActionIcons from "../../Components/ActionIcons";

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

type StoreProps = {
  gistData: any;
  getGist: any;
  loading: any;
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

const PublicGistsDetails = (props: any) => {
  const classes = useStyles("");
  const {
    gistData,
    getGist,
    loading,
    match: {
      params: { id }
    }
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
          <div className="biggContainer">
            <div style={{ width: "60%" }}>
              <div className="gistFormatter">
                <div className="descriptionContainer">
                  <div className="infoContainer">
                    <img src={avatar_url} />
                    <div>
                      <h5>
                        {name} / {firstFileName}
                      </h5>
                      <p>{timeElapsed}</p>
                      <p>{description}</p>
                    </div>
                  </div>
                  <div className="actionIcons">
                    <ActionIcons id={id} />
                  </div>
                  {loading === true && (
                    <div style={{ textAlign: "center", marginTop: "100px" }}>
                      <CircularProgress />
                    </div>
                  )}
                </div>
                {Object.values(item.files).map((file: any) => (
                  <div className="largeContainer">
                    <Paper className={classes.paper}>
                      <h3>{file.filename}</h3>
                      <Divider />
                      {file.content}
                    </Paper>
                  </div>
                ))}
              </div>
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
      getGist
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PublicGistsDetails);
