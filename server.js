const express = require('express');
const app = express();

const games = require('./src/index');

app.listen(3333);

// Default route gives instructions
app.get('/', (req, res) => {
    res.send(`You can see a game  passing /games/:id
Also by requesting /games you will retrieve all games`);
});

// Retrieve all games
app.get('/games', (req, res) => {
    res.status(200).json(games);
});

// Retrieve a game by a given id
app.get('/games/:id', (req, res) => {
    let id = (req.params.id);
    let game = games.filter(game => game[id]);
    res.status(200).json(game);
});