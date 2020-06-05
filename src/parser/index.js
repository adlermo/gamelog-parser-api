module.exports = retornaObjetoKills = (() => {
    const fs = require('fs');

    // Reads the gamelog file
    let logFile = fs.readFileSync('./log/games.log').toString();
    logFile = logFile.split('\n');

    // Global vars to be used during all object array creation
    let gameData = [];
    let gameId = -1;
    let deaths = 0;
    let kills = 0;

    // Iterates over all file lines to retrieve data about kills
    for (var line of logFile) {
        // Creates new object when detects a new game is started
        if (line.includes("InitGame:")) {
            gameId++;
            let parser = `{
                "game_id": ${gameId},
                "game_data":{
                    "total_kills": 0,
                    "players": [],
                    "kills": {}
                }}`;
            gameData.push(JSON.parse(parser));
        };

        // Adds kills data from the line file to the object created previously
        if (line.includes("Kill:")) {
            let regExp = /:\s(\D.*)/gm;
            let killDescription = regExp.exec(line)[1];

            let killer = killDescription.slice(0, killDescription.indexOf('killed')).trim();
            let killed = killDescription.slice(killDescription.indexOf('killed') + 7, killDescription.indexOf(' by ')).trim();

            if (killer === "<world>") {
                deaths = gameData[gameId].game_data.kills[`${killed}`] ? gameData[gameId].game_data.kills[`${killed}`] - 1 : -1;

                gameData[gameId].game_data.kills[`${killed}`] = deaths;
            } else {
                kills = gameData[gameId].game_data.kills[`${killer}`] ? gameData[gameId].game_data.kills[`${killer}`] + 1 : 1;


                gameData[gameId].game_data.kills[`${killer}`] = kills;
            };

            gameData[gameId].game_data.total_kills++;
        };
    };

    // Pushes all players retrieved in dictionary to the list PLAYERS
    for (let game of gameData) {
        for (let player in game.game_data.kills) {
            game.game_data.players.push(player);
        };
    };

    // Returns total of games created
    return gameData;
})();