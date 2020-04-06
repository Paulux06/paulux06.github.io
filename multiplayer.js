var express = require('express');
var app = express();
var serv = require('http').Server(app);
var io = require('socket.io')(serv, {});
var fs = require('fs')

mapFile = fs.readFileSync('./ressources/map.txt', 'utf-8')
var mapHeight = mapFile.split('\n').length
var mapData = mapFile.split(',')
var mapWidth = Math.round(mapData.length/mapHeight)
for (let i = 0; i < mapData.length; i++) {
    var blocType = Number(mapData[i].replace(' ', '').replace('\n', ''))
    if (isNaN(blocType)) {mapData[i] = mapData[i].substring(1);}
    else {mapData[i] = blocType;}

    //ARRIVE PAS A VOIR UNE CHAINE DE CARACTERES
}

/*
0: void
1: Foreground Block
2: Background Block
3: coin
4: text
5: pierre
6: back pierre
7: lave
*/

var lastPosSent = 0;
var lastVerifDone = 0;
var players = [];

Player = {
    name: "",
    x: 0,
    y: 0,
    animationID: 0,
    id: 0,
    sentTime: 0,
    init: function(id, name) {
        this.id = id;
        this.name = name;
        this.sentTime = new Date();
        this.x = 0;
        this.y = 0;
        this.animationID = 0;
        return this;
    }
};

app.get('/', function(req, res) {
    res.sendFile(__dirname+'/index.html')
})
app.get('/script.js', function(req, res) {
    res.sendFile(__dirname+'/script.js')
})
app.get('/style.css', function(req, res) {
    res.sendFile(__dirname+'/style.css')
})
app.get('/favicon.ico', function(req, res) {
    res.sendFile(__dirname+'/ressources/favicon.ico')
})
app.get('/ressources/coin.png', function(req, res) {
    res.sendFile(__dirname+'/ressources/coin.png')
})
app.get('/ressources/grass.png', function(req, res) {
    res.sendFile(__dirname+'/ressources/grass.png')
})
app.get('/ressources/gras_back.png', function(req, res) {
    res.sendFile(__dirname+'/ressources/grass_back.png')
})
app.get('/ressources/player.png', function(req, res) {
    res.sendFile(__dirname+'/ressources/player.png')
})
app.get('/ressources/parchemin.png', function(req, res) {
    res.sendFile(__dirname+'/ressources/parchemin.png')
})
app.get('/ressources/flower.png', function(req, res) {
    res.sendFile(__dirname+'/ressources/flower.png')
})
app.get('/ressources/stone.png', function(req, res) {
    res.sendFile(__dirname+'/ressources/stone.png')
})
app.use('/', express.static('./'))

serv.listen(80);

console.clear()
console.log('Serveur démarré')

io.sockets.on('connection', function(socket) {
    var idPlayer = 0;
    var IDfound = false
    while(!IDfound) {
        IDfound = true;
        for (let i = 0; i < players.length; i++) {
            if(players[i].id == idPlayer) {
                IDfound = false;
            }
        }
        if(!IDfound) {idPlayer++;}
    }
    socket.emit('newPlayer', {
        playerID: idPlayer,
        map: mapData,
        mapWidth: mapWidth,
        mapHeight: mapHeight
    })

    socket.on('playerName', function(data) {
        players.push(Object.create(Player).init(players.length, data.name));
    })

    socket.on('coinPicked', function(data) {
        mapData[data.index] = 0;
    })

    socket.on('position', function(data) {
        var time = new Date()
        try {
            pl = players[data.playerID];
            pl.x = data.x;
            pl.y = data.y;
            pl.animationID = data.animationID;
            pl.id = data.playerID;
            pl.sentTime = time;
        }
        catch (e) {
            //console.log(e)
            socket.emit('resetPlayer', {
                playerID: data.playerID,
                newID: data.playerID-1
            })
        }

        if (time-lastPosSent > 1/30) {
            socket.emit('playersUpdate', {
                playersList: players
            })
            lastPosSent = time;
        }
        
        if (time-lastVerifDone > 500) {
            for (let i = 0; i < players.length; i++) {
                const pl = players[i];
                if(time-pl.sentTime > 3000) {
                    players.splice(i, 1);
                    for (let e = i; e < players.length; e++) {
                        const p = players[e];
                        p.id -= 1;
                        socket.emit('resetPlayer', {
                            playerID: p.id +1,
                            newID: p.id
                        })
                    }
                }
            }
            lastVerifDone = time;
        }

        var msg = "";
        for (let i = 0; i < players.length; i++) {
            msg += 'p'+players[i].id+' at ['+Math.round(players[i].x)+' | '+Math.round(players[i].y)+'] '
        }
        //console.log(msg);
    })
})