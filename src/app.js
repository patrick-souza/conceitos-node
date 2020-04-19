const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = { id: uuid(), title, url, techs, likes: 0 };
  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).send();
  }

  let repository = repositories.find((repo) => repo.id === id);

  repository = {
    ...repository,
    title,
    url,
    techs,
  };

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).send();
  }

  const repositoryIndex = repositories.findIndex((repo) => response.id === id);

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).send();
  }

  const repository = repositories.find((repo) => repo.id === id);

  if (!repository) {
    return response.status(400).send();
  }

  repository.likes = Number(repository.likes) + 1;

  return response.json(repository);
});

module.exports = app;
