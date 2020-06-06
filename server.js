const express = require('express');
const app = express();

const games = require('./src/index');
const gamesLog = require('./src/parser/index');

app.listen(process.env.PORT || 3333);

// Default route gives instructions
app.get('/', (req, res) => {
    res.send(`Hello World!

You can see a list of games acessing /games

Or, you can request a game passing /games/:id
(ID is the hash you can take on /games)`);
});

// Retrieve all games
app.get('/games', (req, res) => {
    res.status(200).json(gamesLog);
});

// Retrieve a game by a given id
app.get('/games/:id', (req, res) => {
    let id = (req.params.id);
    let game = games.filter(game => game[id]);
    res.status(200).json(game);
});