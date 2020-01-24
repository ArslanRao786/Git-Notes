import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import "./CreateOrEditGist.css";
import { Button } from "@material-ui/core";
import { bindActionCreators } from "redux";
import { createTheGist } from "../../Redux/Actions/UserGistsActions";

const CreateGist = (props: any) => {
  const { userToken, editGist, createTheGist } = props;
  const [description, setdescription] = useState("");
  const [fileName, setfileName] = useState("");
  const [content, setcontent] = useState("");

  const files = {};
  files[`${fileName}`] = {
    content: `${content}`
  };

  const createGist = () => {
    createTheGist(files, description, userToken);
  };

  const onChangeHandler = (e: any) => {
    if (e.target.name === "description") {
      setdescription(e.target.value);
    } else if (e.target.name === "fileName") {
      setfileName(e.target.value);
    } else {
      setcontent(e.target.value);
    }
  };

  return (
    <div className="createGist">
      <div className="descriptionBox">
        <TextField
          className="descriptionTextField"
          name="description"
          onChange={onChangeHandler}
          id="outlined-textarea"
          label="Gist Description"
          placeholder="Gist Description..."
          multiline
          variant="outlined"
          required
        />
      </div>
      <div className="bigContainer">
        <div className="contentContainer">
          <div className="border">
            <TextField
              className="fileNameTextField"
              onChange={onChangeHandler}
              name="fileName"
              id="outlined-textarea"
              label="Filename"
              placeholder="Filename with extension..."
              variant="outlined"
              required
            />
          </div>
          <TextField
            className="contentTextField"
            onChange={onChangeHandler}
            id="outlined-multiline-static"
            label="Cotent"
            placeholder="Content..."
            multiline
            rows="16"
            variant="outlined"
            required
          />
        </div>
      </div>
      <div className="button">
        {editGist === false && (
          <Button
            variant="contained"
            color="primary"
            onClick={createGist}
            disabled={!content}
          >
            Create Gist
          </Button>
        )}
        {editGist === true && <button>Save</button>}
      </div>
    </div>
  );
};

const mapStateToProps = ({ UserGist: { userToken, editGist } }: any) => ({
  userToken,
  editGist
});

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      createTheGist
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateGist);
