const express = require("express");

require("isomorphic-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

// publicGists
app.get("/public-gists", (req, res) => {
  fetch(
    "https://api.github.com/gists/public?client_id=55f00926ad144400f091&client_secret=2f41825b1fdfe2458b4f46a24a887ca6fffdf16a"
  )
    .then(response => response.json())
    .then(json => {
      return res.json(json);
    });
});

// userGistData
app.get("/user-gist/:token", (req, res) => {
  const token = req.params.token;
  fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(json => {
      return res.json(json);
    });
});

// getSingleGist
app.get("/single-gist/:id", (req, res) => {
  const gistId = req.params.id;
  fetch(
    `https://api.github.com/gists/${gistId}?client_id=55f00926ad144400f091&client_secret=2f41825b1fdfe2458b4f46a24a887ca6fffdf16a`
  )
    .then(response => response.json())
    .then(json => {
      return res.json(json);
    });
});

// StarredGists
app.get("/starred-gists/:token", (req, res) => {
  const token = req.params.token;
  fetch(
    "https://api.github.com/gists/starred?client_id=55f00926ad144400f091&client_secret=2f41825b1fdfe2458b4f46a24a887ca6fffdf16a",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
    .then(response => response.json())
    .then(json => {
      return res.json(json);
    });
});

// edit a gist
app.patch("/edit-gist", (req, res) => {
  fetch(
    `https://api.github.com/gists/${gistId}?client_id=55f00926ad144400f091&client_secret=2f41825b1fdfe2458b4f46a24a887ca6fffdf16a`
  )
    .then(response => response.json())
    .then(json => {
      return res.json(json);
    });
});

// star a gist
app.put("/star-a-gist/:id/:token", (req, res) => {
  const gistId = req.params.id;
  const token = req.params.token;
  fetch(
    `https://api.github.com/gists/${gistId}/star?client_id=55f00926ad144400f091&client_secret=2f41825b1fdfe2458b4f46a24a887ca6fffdf16a`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
    .then(response => response.json())
    .then(json => {
      return res.json(json);
    })
    .catch(err => {
      return res.send(err);
    });
});

// unstar a gist
app.delete("/unstar-a-gist/:id/:token", (req, res) => {
  const gistId = req.params.id;
  const token = req.params.token;
  fetch(
    `https://api.github.com/gists/${gistId}/star?client_id=55f00926ad144400f091&client_secret=2f41825b1fdfe2458b4f46a24a887ca6fffdf16a`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
    .then(response => response.json())
    .then(json => {
      return res.json(json);
    })
    .catch(err => {
      return res.send(err);
    });
});

// fork a gist
app.post("/fork-a-gist/:id/:token", (req, res) => {
  const gistId = req.params.id;
  const token = req.params.token;
  fetch(
    `https://api.github.com/gists/${gistId}/forks?client_id=55f00926ad144400f091&client_secret=2f41825b1fdfe2458b4f46a24a887ca6fffdf16a`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
    .then(response => response.json())
    .then(json => {
      return res.json(json);
    })
    .catch(err => {
      return res.send(err);
    });
});

// delete a gist
app.delete("/delete-a-gist", (req, res) => {
  fetch(
    `https://api.github.com/gists/${gistId}?client_id=55f00926ad144400f091&client_secret=2f41825b1fdfe2458b4f46a24a887ca6fffdf16a`
  )
    .then(response => response.json())
    .then(json => {
      return res.json(json);
    });
});

const port = 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
