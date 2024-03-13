// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const comments = require('./comments.json');
const fs = require('fs');

app.use(bodyParser.json());
app.use(express.static('public'));

// Get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Add a new comment
app.post('/comments', (req, res) => {
    const newComment = req.body;
    newComment.id = comments.length;
    comments.push(newComment);
    fs.writeFileSync('comments.json', JSON.stringify(comments));
    res.json(newComment);
});

// Start server
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
```

- Run the server with `node comments.js` and test it out in your browser or using Postman.

### Add a new comment

- Create a form in `index.html` to add a new comment.

```html
<!DOCTYPE html>
<html>
<head>
    <title>Comments</title>
</head>
<body>
    <h1>Comments</h1>
    <form id="comment-form">
        <input type="text" name="name" placeholder="Name">
        <input type="text" name="comment" placeholder="Comment">
        <button type="submit">Submit</button>
    </form>
    <ul id="comments"></ul>
    <script src="app.js"></script>
</body>
</html>
```

- Add an event listener to the form in `app.js`.

```javascript
document.getElementById('comment-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const comment = event.target.comment.value;
    fetch('/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, comment })
    })
    .then(response => response.json())
    .then(data => console.log(data));
});
```

- Open `index.html` in your browser and submit a new comment. Check the console to see the response from the server.

### Display comments

- Fetch the comments from the server and display them on the page.

```javascript
document.getElementById('comment-form').addEventListener('submit', (event) => {
    event