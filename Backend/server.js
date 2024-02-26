const express = require('express');
const app = express();
const port = 3000 || 8080;

app.get('/ping', (req, res) => {
    res.send('pong');
})

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
