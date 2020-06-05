const express = require('express');
const app = express();

const games = require('./src/game_data.json');

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

// Retrieve a game by passed id
app.get('/games/:id', (req, res) => {
    res.status(200).json(games[req.params.id]);
});