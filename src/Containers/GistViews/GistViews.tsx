import React, { useState, useEffect, Fragment } from "react";
import GridView from "../../Components/GridView/GridView";
import ListView from "../../Components/ListView";
import "./GistViews.css";
import { getFormattedData } from "../../utils";
import { connect } from "react-redux";
import { getPublicGists } from "../../Redux/Actions/PublicGistsActions";
import { Gist } from "../../types";
import { bindActionCreators } from "redux";
import { GridOn, FormatListBulleted } from "@material-ui/icons";
import { Pagination } from "antd";
import "antd/dist/antd.css";

type StoreProps = {
  publicGists: Gist[];
  state?: any;
  getPublicGists?: any;
};

export type ReduxStoreState = {
  PublicGists: {
    publicGists: Gist[];
  };
};

const PAGE_SIZE = 9;

type Props = StoreProps;

type State = { showGrid: boolean };

const GistViews = (props: Props) => {
  const [pageNo, setPageNo] = useState(1);
  const [showGrid, setShowGrid] = useState(false);

  const { publicGists, getPublicGists } = props;

  useEffect(() => {
    getPublicGists();
  }, []);

  if (!publicGists) {
    return null;
  }

  const data = getFormattedData(publicGists);

  const filteredData = data.filter(
    (_, i: number) => i >= PAGE_SIZE * (pageNo - 1) && i < PAGE_SIZE * pageNo
  );

  const handleChange = (page: number) => setPageNo(page);

  return (
    <Fragment>
      <div className="buttonContainer">
        <FormatListBulleted
          className="icons"
          onClick={() => setShowGrid(false)}
        />
        {" | "}
        <GridOn className="icons" onClick={() => setShowGrid(true)} />
      </div>
      {showGrid === true && (
        <div>
          <GridView data={filteredData} />
          <div className="paginationContainer">
            <Pagination
              defaultCurrent={1}
              defaultPageSize={9}
              onChange={handleChange}
              total={data.length}
            />
          </div>
        </div>
      )}
      {showGrid === false && (
        <div>
          <ListView data={filteredData} />
          <div className="paginationContainer">
            <Pagination
              defaultCurrent={1}
              defaultPageSize={9}
              onChange={handleChange}
              total={data.length}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = ({
  PublicGists: { publicGists }
}: ReduxStoreState): StoreProps => ({
  publicGists
});

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getPublicGists
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GistViews);
