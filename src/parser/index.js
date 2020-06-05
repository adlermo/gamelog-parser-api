const fs = require('fs');

const retornaObjetoKills = () => {
    let logFile = fs.readFileSync('./log/games.log').toString();
    logFile = logFile.split('\n');

    let gameData = [];
    let gameId = 0;
    let deaths = 0;
    let kills = 0;

    for (var line of logFile) {
        if (line.includes("ShutdownGame:")) {
            gameId++;
        };

        if (line.includes("InitGame:")) {
            let parser = `{
                "game_id": ${gameId},
                "game_data":{
                    "total_kills": 0,
                    "players": [],
                    "kills": {}
                }}`;
            gameData.push(JSON.parse(parser));
        };

        // Adds data from the log file to the array 
        if (line.includes("Kill:")) {
            let regExp = /:\s(\D.*)/gm;
            let killDescription = regExp.exec(line)[1];

            let killer = killDescription.slice(0, killDescription.indexOf('killed')).trim();
            let killed = killDescription.slice(killDescription.indexOf('killed') + 7, killDescription.indexOf(' by ')).trim();

            if (killer === "<world>") {
                deaths = gameData[gameId].game_data.kills[`${killed}`] ? gameData[gameId].game_data.kills[`${killed}`] - 1 : -1;

                gameData[gameId].game_data.kills[`${killed}`] = deaths;

                console.log(gameData[gameId].game_data.kills[`${killed}`])
            } else {
                kills = gameData[gameId].game_data.kills[`${killer}`] ? gameData[gameId].game_data.kills[`${killer}`] + 1 : 1;


                gameData[gameId].game_data.kills[`${killer}`] = kills;

                console.log(gameData[gameId].game_data.kills[`${killer}`])
            };

            gameData[gameId].game_data.total_kills += 1;
        };
    };

    for (let game of gameData) {
        for (let player in game.game_data.kills) {
            game.game_data.players.push(player);
        };
    }


    fs.writeFileSync("./src/game_data.json", JSON.stringify(gameData));

    return "There was " + gameData.length + " games";
};


console.log(retornaObjetoKills());