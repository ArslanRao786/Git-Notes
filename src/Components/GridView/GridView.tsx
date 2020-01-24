import React from "react";
import { Gist } from "../../types";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "./GridView.css";
import { useHistory } from "react-router-dom";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary
    }
  })
);

type OwnProps = {
  data: Gist[];
};

type Props = OwnProps;

type State = {};

const GridView = (props: Props) => {
  const classes = useStyles("");
  const history = useHistory();
  const { data } = props;

  return (
    <div className="containerGrid">
      <div className="root">
        <Grid container spacing={3}>
          {data.map(item => {
            const { name, date, Keyword, notebookname, id } = item;
            return (
              <Grid
                onClick={() =>
                  history.push(`/gistviews/publicgistsdetails/${id}`)
                }
                item
                xs={4}
                className="gridHover"
              >
                <Paper className={classes.paper}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                  <Divider />
                  <footer className="footer">
                    <h5 style={{ margin: 0 }}>
                      {name} / {notebookname}
                    </h5>
                    <h6 style={{ margin: 0 }}>{date}</h6>
                    <p style={{ margin: 0 }}>{Keyword}</p>
                  </footer>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default GridView;
