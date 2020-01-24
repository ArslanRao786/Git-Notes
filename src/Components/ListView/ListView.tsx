import React, { Fragment } from "react";
import "./ListView.css";
import { Checkbox, Divider } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ActioIcons from "../ActionIcons";
import { CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";

type OwnProps = {
  data: any;
  loading?: any;
};

type Props = OwnProps;

const ListView = (props: Props) => {
  const { data, loading } = props;
  const history = useHistory();

  return (
    <div className="listBigContainer">
      <div className="listContainer">
        <div className="header">
          <Checkbox />
          <div className="list">
            <img />
            <h3>Name</h3>
            <h3>Date</h3>
            <h3>Time</h3>
            <h3>Keyword</h3>
            <h3>Notebook Name</h3>
          </div>
        </div>
        {loading === true && (
          <div style={{ textAlign: "center", marginTop: "100px" }}>
            <CircularProgress />
          </div>
        )}
        {data.map((item: any) => {
          const { time, name, date, id, avatar_url } = item;
          return (
            <Fragment>
              <div className="grid">
                <Checkbox />
                <div
                  onClick={() => {
                    history.push(`/gistviews/publicgistsdetails/${id}`);
                  }}
                  className="list"
                >
                  <img src={avatar_url} />
                  <p>{name}</p>
                  <p>{date}</p>
                  <p>{time}</p>
                  <p>{date}</p>
                  <p>{date}</p>
                </div>

                <div className="actionIcons">
                  <ActioIcons id={id} />
                </div>
              </div>
              <Divider style={{ marginBlockEnd: "1%" }} />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = ({ PublicGists: { loading } }: any): any => ({
  loading
});

export default connect(mapStateToProps)(ListView);
