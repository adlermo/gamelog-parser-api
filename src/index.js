const objetoParse = require('./parser/index');
const hash = require('object-hash');
const fs = require('fs')

// Generate JSON game report
let games = objetoParse.map(game => {
    let rank = '{'

    let kills = Object.keys(game.game_data.kills).map(function (key) {
        return [key, game.game_data.kills[key]];
    });

    kills.sort(function (first, second) {
        return second[1] - first[1];
    });

    // Takes each player to sort them
    for (let player in kills) {
        rank += `"${kills[player][0]}": ${kills[player][1]},`
    };

    if (rank[rank.length - 1] != '{') {
        rank = rank.substring(0, rank.length - 1);
    };
    rank += '}'

    rank = JSON.parse(rank)

    return JSON.parse(`{
        "${hash(game.game_id)}": ${JSON.stringify(rank)}
    }`);
});

module.exports = games;