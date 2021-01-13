const express = require("express");
const app = express();

const fetch = require("node-fetch");
const redis = require("redis");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;
const REDIS_PORT = 6379;

const client = redis.createClient(REDIS_PORT);

const setResponse = (username, repo) => {
  return `<h2>User ${username} has ${repo} repo</h2>`;
};

const getRepos = async (req, res, next) => {
  try {
    const username = req.params.username;
    console.log(username);
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    client.setex(username, 3600, data.public_repos);
    res.status(200).send(setResponse(username, data.public_repos));
    res.send(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* cache middleware */
const cache = (req, res, next) => {
  client.get(req.params.username, (err, data) => {
    if (err) throw err;
    if (data != null) {
      res.send(setResponse(req.params.username, data));
    } else {
      next();
    }
  });
};

app.use("/repos/:username", cache, getRepos);

app.listen(PORT, () => {
  console.log("server running on PORT");
});
