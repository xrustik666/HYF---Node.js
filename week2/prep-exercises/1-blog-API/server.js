const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World');
});

// CREATE POSTS
app.post('/blogs', function (req, res) {
  const { title, content } = req.body;

  fs.writeFileSync(title, content);
  res.end('ok');
});

// UPDATE POSTS
app.put("/blogs/:title", (req, res) => {
  const { title } = req.params;
  const { content } = req.body;

  if (fs.existsSync(title)) {
    fs.writeFileSync(title, content);
    res.end('ok');
  } else {
    res.status(404).send("There is no such a blog here");
  }
});

// DELETING POSTS
app.delete('/blogs/:title', (req, res) => {
  if (fs.existsSync(req.params.title)) {
    fs.unlinkSync(req.params.title);
    res.end('ok');
  } else {
    res.status(404).send('There is no such a blog here');
  }
});

// READING POSTS
app.get('/blogs/:title', (req, res) => {
  const { title } = req.params;

  if (fs.existsSync(title)) {
    const post = fs.readFileSync(title, "UTF-8");
    res.send(post);
  } else {
    res.status(404).send('There is no such a blog here');
  }
});

app.listen(3000);