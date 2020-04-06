var name = "Player";

var coinSprite = new Image();
coinSprite.src = './ressources/coin.png';
var grassSprite = new Image();
grassSprite.src = './ressources/grass.png'; //1:nothing 2:top 3:right 4:left 5:topright 6:topleft 7:leftright 8:all
var grassBackSprite = new Image();
grassBackSprite.src = './ressources/grass_back.png';
var flowerSprite = new Image();
flowerSprite.src = './ressources/flower.png';
var textSprite = new Image();
textSprite.src = './ressources/parchemin.png';
var stoneSprite = new Image();
stoneSprite.src = './ressources/stone.png';
var stoneBackSprite = new Image();
stoneBackSprite.src = './ressources/stone_back.png';

function setup() {
    document.getElementById('screen').style.display = 'none';
    document.getElementById('interface').style.display = 'block';
    window.addEventListener("keydown", eventManager);
    function eventManager(event) {
        if (event.keyCode == 13) {
            window.removeEventListener("keydown", eventManager);
            start();
        }
    }
}

function start() {
    const gravity = 8.5;
    var time = new Date();
    var lastTime = time.getTime()/1000;
    var deltaTime = 0;
    var fps = 60;
    var mapH = 0;
    var mapW = 0;

    var map = [];
    var playersList = []
    
    var screenWidth = screen.width;
    var screenHeight = screen.height;

    name = document.getElementById('nameValue').value;
    document.getElementById('screen').style.display = 'block';
    document.getElementById('interface').style.display = 'none';
    var context = document.getElementById('screen').getContext("2d");
    context.canvas.height = screenHeight;
    context.canvas.width = screenWidth;

    var gradient = context.createLinearGradient(0, 0, 0, screenHeight);
    gradient.addColorStop(1, '#002d50');
    gradient.addColorStop(0, '#006dff');
    
    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;
    
    var socket = io();
    console.log('connection initialisée')
    var setup = false;

    socket.on('newPlayer', function(data) {
        if(!setup) {
            player.id = data.playerID;
            setup = true;
            map = data.map;
            mapW = data.mapWidth;
            mapH = data.mapHeight;
            drawMap()
            socket.emit('playerName', {
                playerID: player.id,
                name: name
            })
        }
    })

    socket.on('resetPlayer', function(data) {
        if(player.id == data.playerID) {
            player.id = data.newID;
        }
    })

    socket.on('playersUpdate', function(data) {
        while (playersList.length > data.playersList.length) {
            playersList.pop()
        }
        while (playersList.length < data.playersList.length) {
            playersList.push(Object.create(fakePlayer).init(playersList.length))
        }
        for (let i = 0; i < data.playersList.length; i++) {
            const dtpl = data.playersList[i];
            const pl = playersList[i];
            pl.x = dtpl.x;
            pl.y = dtpl.y;
            pl.animationID = dtpl.animationID;
            pl.name = dtpl.name;
        }
    })

    var camera = {
        x: 0,
        y: 0,
        z: 0,
        zTarget: 1,
        target: {x:0, y:0},
        render: function(dt) {
            this.x += (this.target.x - this.x)*dt*3;
            this.y += (this.target.y - this.y)*dt*3;
            this.z += (this.zTarget - this.z)*dt*6;
        },
        changeZto: function(zValue) {
            this.zTarget = (zValue/screenWidth)*1280;
        },
        setTargetTo: function(target) {
            this.target = target;
        }
    };

    var fakePlayer = {
        name: "Anonyme",
        x: 0,
        y: 0,
        xRender: 0,
        yRender: 0,
        animationID: 0,
        id: 0,
        animationState: 1,
        currentAnimation: {nmbrOfSprites: 0, ySpriteShift: 0, animSpeed: 0},
        spriteIndex: 0,
        lastPicChange: 0,
        render: function(dt) {
            switch (this.animationID) {
                case 0: this.currentAnimation = player.rightIdleAnimation; break;
                case 1: this.currentAnimation = player.rightWalkAnimation; break;
                case 2: this.currentAnimation = player.rightJumpAnimation; break;
                case 3: this.currentAnimation = player.leftIdleAnimation; break;
                case 4: this.currentAnimation = player.leftWalkAnimation; break;
                case 5: this.currentAnimation = player.leftJumpAnimation; break;
            }
            this.lastPicChange += dt
            if (this.lastPicChange > 1/this.currentAnimation.animSpeed) {
                this.lastPicChange = 0;
                this.spriteIndex = (this.spriteIndex > this.currentAnimation.nmbrOfSprites-2)? 0: this.spriteIndex+1;
            }
            this.xRender += (this.x - this.xRender)/2
            this.yRender += (this.y - this.yRender)/2
            var XspritePos = this.spriteIndex * player.spriteXsize;
            var YspritePos = this.currentAnimation.ySpriteShift * player.spriteYsize;
            scene.renderImage(player.sprite, XspritePos, YspritePos, player.spriteXsize, player.spriteYsize, this.xRender, this.yRender, player.xSize, player.ySize);
            scene.renderText(this.name, this.xRender, this.yRender);
        },
        init: function(id) {
            this.id = id;
            return this;
        }
    }

    var player = {
        x: 0,
        y: -200,
        id: 0,
        xVelo: 0,
        yVelo: 0,
        xSize: 50,
        ySize: 100,
        weight: 100,
        isGrounded: false,
        sprite: new Image(),
        spriteXsize: 16,
        spriteYsize: 32,
        spriteIndex: 0,
        waitTime: 0,
        canAirJump: true,
        doubleJumped: false,
        lastPosSent: 0,
        animationID: 0,
        currentAnimation: {nmbrOfSprites: 0, ySpriteShift: 0, animSpeed: 0},

        rightIdleAnimation: {nmbrOfSprites: 5, ySpriteShift: 0, animSpeed: 4},
        rightWalkAnimation: {nmbrOfSprites: 5, ySpriteShift: 1, animSpeed: 15},
        rightJumpAnimation: {nmbrOfSprites: 5, ySpriteShift: 2, animSpeed: 10},
        leftIdleAnimation: {nmbrOfSprites: 5, ySpriteShift: 4, animSpeed: 4},
        leftWalkAnimation: {nmbrOfSprites: 5, ySpriteShift: 5, animSpeed: 15},
        leftJumpAnimation: {nmbrOfSprites: 5, ySpriteShift: 6, animSpeed: 10},

        init: function() {
            this.sprite.src = './ressources/player.png';
            this.currentAnimation = this.rightIdleAnimation;
        },

        walkRight: function() {
            this.xVelo += 8;
            if (this.currentAnimation != this.rightWalkAnimation) {
                this.currentAnimation = this.rightWalkAnimation;
                this.animationID = 1;
                this.spriteIndex = 0;
            }
        },
        walkLeft: function() {
            this.xVelo += -8;
            if (this.currentAnimation != this.leftWalkAnimation) {
                this.currentAnimation = this.leftWalkAnimation;
                this.animationID = 4;
                this.spriteIndex = 0;
            }
        },
        idle: function() {
            if (this.currentAnimation != this.rightIdleAnimation && this.currentAnimation != this.leftIdleAnimation) {
                if (this.currentAnimation == this.rightWalkAnimation) {
                    this.currentAnimation = this.rightIdleAnimation;
                    this.animationID = 0;
                }
                if (this.currentAnimation == this.leftWalkAnimation) {
                    this.currentAnimation = this.leftIdleAnimation;
                    this.animationID = 3;
                }
                if (this.currentAnimation == this.rightJumpAnimation) {
                    this.currentAnimation = this.rightIdleAnimation;
                    this.animationID = 0;
                }
                if (this.currentAnimation == this.leftJumpAnimation) {
                    this.currentAnimation = this.leftIdleAnimation;
                    this.animationID = 3;
                }
                this.spriteIndex = 0;
            }
        },
        jump: function() {
            if (this.currentAnimation != this.rightJumpAnimation && this.currentAnimation != this.leftJumpAnimation || this.spriteIndex == this.currentAnimation.nmbrOfSprites-1) {
                this.yVelo = -40
                this.isGrounded = false
                this.spriteIndex = 0;
                if (this.currentAnimation == this.rightWalkAnimation || this.currentAnimation == this.rightIdleAnimation) {
                    this.currentAnimation = this.rightJumpAnimation;
                    this.animationID = 2;
                };
                if (this.currentAnimation == this.leftWalkAnimation || this.currentAnimation == this.leftIdleAnimation) {
                    this.currentAnimation = this.leftJumpAnimation;
                    this.animationID = 5;
                };
            };
        },

        airJump: function() {
            this.yVelo = -30;
            this.spriteIndex = 0;
            this.canAirJump = false;
            this.jumpReleased = false;
        },

        kill: function() {
            this.x = 0;
            this.y = -200;
            HUD.lifeBar.level = 6;
        },

        setGrounded: function(height) {
            this.isGrounded = true;
            this.canAirJump = false;
            this.doubleJumped = false;
            this.y = height;
            this.yVelo = 0;
        },

        isBottomBloc: function() {
            this.isGrounded = false;
            var checkerPos = {x: this.x, y: this.y}
            var mapChecker = {x: Math.round((checkerPos.x+10)/50), y: mapH+Math.round(checkerPos.y/50)}
            var mapIndex = mapChecker.x+mapChecker.y*mapW
            if (mapIndex > 0 && mapIndex < map.length-1) {
                if (map[mapIndex] == 1 || map[mapIndex] == 5) {
                    this.setGrounded(Math.round(this.y/50)*50);
                }
                else {
                    var mapChecker = {x: Math.round((checkerPos.x-10)/50), y: mapH+Math.round(checkerPos.y/50)}
                    var mapIndex = mapChecker.x+mapChecker.y*mapW
                    if (mapIndex > 0 && mapIndex < map.length-1) {
                        if (map[mapIndex] == 1 || map[mapIndex] == 5) {
                            this.setGrounded(Math.round(this.y/50)*50);
                        }
                    }
                }
            }
        },

        isTopBloc: function() {
            this.isGrounded = false;
            var checkerPos = {x: this.x, y: this.y}
            var mapChecker = {x: Math.round((checkerPos.x+10)/50), y: mapH+Math.round((checkerPos.y-120)/50)}
            var mapIndex = mapChecker.x+mapChecker.y*mapW
            if (mapIndex > 0 && mapIndex < map.length-1) {
                if (map[mapIndex] == 1 || map[mapIndex] == 5) {
                    this.yVelo = 0;
                    this.y += 5;
                }
                else {
                    var mapChecker = {x: Math.round((checkerPos.x-10)/50), y: mapH+Math.round((checkerPos.y-120)/50)}
                    var mapIndex = mapChecker.x+mapChecker.y*mapW
                    if (mapIndex > 0 && mapIndex < map.length-1) {
                        if (map[mapIndex] == 1 || map[mapIndex] == 5) {
                            this.yVelo = 0;
                            this.y += 5;
                        }
                    }
                }
            }
        },

        isRightBloc: function() {
            this.isGrounded = false;
            var mapChecker = {x: Math.round((this.x+30)/50), y: mapH+Math.round((this.y-30)/50)}
            var mapIndex = mapChecker.x+mapChecker.y*mapW
            if (mapIndex > 0 && mapIndex < map.length-1) {
                if (map[mapIndex] == 1 || map[mapIndex] == 5) {
                    this.xVelo = 0;
                    this.x -= 1;
                    this.blocTouched = true;
                }
                else {
                    var mapChecker = {x: Math.round((this.x+30)/50), y: mapH+Math.round((this.y-85)/50)}
                    var mapIndex = mapChecker.x+mapChecker.y*mapW
                    if (mapIndex > 0 && mapIndex < map.length-1) {
                        if (map[mapIndex] == 1 || map[mapIndex] == 5) {
                            this.xVelo = 0;
                            this.x -= 1;
                        }
                    }
                }
            }
        },

        isLeftBloc: function() {
            this.isGrounded = false;
            var mapChecker = {x: Math.round((this.x-30)/50), y: mapH+Math.round((this.y-30)/50)}
            var mapIndex = mapChecker.x+mapChecker.y*mapW
            if (mapIndex > 0 && mapIndex < map.length-1) {
                if (map[mapIndex] == 1 || map[mapIndex] == 5) {
                    this.xVelo = 0;
                    this.x += 1;
                    this.blocTouched = true;
                }
                else {
                    var mapChecker = {x: Math.round((this.x-30)/50), y: mapH+Math.round((this.y-85)/50)}
                    var mapIndex = mapChecker.x+mapChecker.y*mapW
                    if (mapIndex > 0 && mapIndex < map.length-1) {
                        if (map[mapIndex] == 1 || map[mapIndex] == 5) {
                            this.xVelo = 0;
                            this.x += 1;
                        }
                    }
                }
            }
        },

        render: function(dt) {
            this.blocTouched = false;

            this.isRightBloc();
            this.isLeftBloc();
            this.isTopBloc();

            if(this.yVelo > 50) {
                this.yVelo = 50;
            }
            if(this.yVelo < -50) {
                this.yVelo = -50;
            }
            if(this.xVelo > 50) {
                this.xVelo = 50;
            }
            if(this.xVelo < -50) {
                this.xVelo = -50;
            }

            this.x += this.xVelo;
            this.y += this.yVelo;
            
            this.isBottomBloc();
            
            if (!this.isGrounded) {
                this.yVelo += this.weight*gravity/250;
            }
            
            this.xVelo *= 0.5
            
            if(this.y > 500) {
                this.kill();
            }

            this.waitTime += dt;
            if (this.waitTime > 1/this.currentAnimation.animSpeed) {
                this.waitTime = 0;
                this.spriteIndex = (this.spriteIndex > this.currentAnimation.nmbrOfSprites-2)? 0: this.spriteIndex+1;
            };

            this.lastPosSent += dt;
            if (this.lastPosSent > 1/30) {
                socket.emit('position', {
                    x: this.x,
                    y: this.y,
                    playerID: this.id,
                    animationID: this.animationID
                });
                this.lastPosSent = 0;
            }

            var XspritePos = this.spriteIndex * this.spriteXsize;
            var YspritePos = this.currentAnimation.ySpriteShift * this.spriteYsize;
            scene.renderImage(this.sprite, XspritePos, YspritePos, this.spriteXsize, this.spriteYsize, this.x, this.y, this.xSize, this.ySize);
            scene.renderText(name, this.x, this.y);
        }
    };
    player.init()
    camera.setTargetTo(player);

    var HUD = {
        lifeBar: {
            level: 6,
            intLevel: 0,
            spriteXsize: 61,
            spriteYsize: 8,
            sprite: new Image(),
            Xsize: 183,
            Ysize: 24,
            Xpos: screenWidth - 193,
            Ypos: 10,
            time: 0,
            init: function() {
                this.sprite.src = './ressources/lifeBar.png'
            },
            render: function(dt) {
                this.time += dt;
                this.intLevel = Math.round(this.level);
                if(this.level < 1) {player.kill();}
                context.drawImage(
                    this.sprite, 0, this.spriteYsize*(6-this.intLevel), this.spriteXsize, this.spriteYsize, this.Xpos, this.Ypos, this.Xsize, this.Ysize
                );
            },
            decrease: function() {
                if (this.time > 1) {
                    this.time = 0;
                    this.level--;
                }
                if (this.level < 1) {
                    player.kill();
                }
            }
        }
    }
    HUD.lifeBar.init()

    var mapBox = {
        x: 0,
        y: 0,
        xSize: 0,
        ySize: 0,
        num: 0,
        time: 0,
        sprite: new Image(),
        spriteShift: 0,
        spriteSize: 1,
        animLength: 1,
        show: true,
        index: 0,
        data: undefined, //infos sur le bloc (orientation, texte, etc)
        render: function(dt) {
            this.time += dt;
            if(this.num == 0) {
                scene.renderImage(this.sprite, this.spriteShift, 0, this.spriteSize, this.spriteSize, this.x, this.y, this.xSize, this.ySize);
            }
            if(this.num == 1) {
                scene.renderImage(this.sprite, this.spriteShift, 0, this.spriteSize, this.spriteSize, this.x, this.y, this.xSize, this.ySize);
            }
            if(this.num == 2) {
                scene.renderImage(this.sprite, this.spriteShift, 0, this.spriteSize, this.spriteSize, this.x, this.y, this.xSize, this.ySize);
            }
            if(this.num == 3) {
                if(this.show) {
                if(this.time > 0.05) {this.time = 0; if(this.spriteShift < (this.animLength-1)*this.spriteSize) {this.spriteShift += this.spriteSize;} else {this.spriteShift = 0;}}
                scene.renderImage(this.sprite, this.spriteShift, 0, this.spriteSize, this.spriteSize, this.x, this.y, this.xSize, this.ySize);
                }
            }
            if(this.num == 4) {
                if(!this.show) {
                    scene.renderText(this.data, this.x, this.y-100)
                }
                else {
                    scene.renderImage(this.sprite, 0, 0, this.spriteSize, this.spriteSize, this.x, this.y, this.xSize, this.ySize)
                }
            }
            if(this.num == 5) {
                scene.renderImage(this.sprite, 0, 0, this.spriteSize, this.spriteSize, this.x, this.y, this.xSize, this.ySize);
            }
            if(this.num == 6) {
                scene.renderImage(this.sprite, 0, 0, this.spriteSize, this.spriteSize, this.x, this.y, this.xSize, this.ySize);
            }
        },
        init: function(x, y, xSize, ySize, num, index, data) {
            this.data = data;
            this.x = x;
            this.y = y;
            this.index = index;
            this.xSize = xSize;
            this.ySize = ySize;
            this.num = num;
            if (this.num == 0) {this.sprite = flowerSprite; this.spriteSize = this.sprite.height; this.spriteShift = data*this.spriteSize;}
            if (this.num == 1) {this.sprite = grassSprite; this.spriteSize = this.sprite.height; this.spriteShift = data*this.spriteSize;}
            if (this.num == 2) {this.sprite = grassBackSprite; this.spriteSize = this.sprite.height; this.spriteShift = data*this.spriteSize;}
            if (this.num == 3) {this.sprite = coinSprite; this.spriteSize = this.sprite.height; this.animLength = (this.sprite.width/this.sprite.height)-1;}
            if (this.num == 4) {this.sprite = textSprite; this.spriteSize = this.sprite.height;}
            if (this.num == 5) {this.sprite = stoneSprite; this.spriteSize = this.sprite.height;}
            if (this.num == 6) {this.sprite = stoneBackSprite; this.spriteSize = this.sprite.height;}
            return this;
        },
    }

    var inputManager = {
        rightKey: false,
        upKey: false,
        leftKey: false,
        downKey: false,

        keyManager: function(event) {
            var keyPressed = (event.type == "keydown")? true : false;
            switch (event.keyCode) {
                case 81: inputManager.leftKey = keyPressed; break;
                case 90: inputManager.upKey = keyPressed; break;
                case 68: inputManager.rightKey = keyPressed; break;
                case 83: inputManager.downKey = keyPressed; break;

                case 37: inputManager.leftKey = keyPressed; break;
                case 38: inputManager.upKey = keyPressed; break;
                case 39: inputManager.rightKey = keyPressed; break;
                case 40: inputManager.downKey = keyPressed; break;
            }
        }
    };

    //50 = 1 unite
    var scene = {
        objects: [],
        decorations: [],
        coins: [],
        backblocks: [],

        renderImage: function(image, xCropStart, yCropStart, xCropEnd, yCropEnd, xPos, yPos, xSize, ySize) {
            x = ((xPos-camera.x)/camera.z) + screenWidth/2;
            y = ((yPos-camera.y)/camera.z) + screenHeight/2;
            xs = (xSize/camera.z);
            ys = (ySize/camera.z);
            try {
                context.drawImage(
                    image, xCropStart, yCropStart, xCropEnd, yCropEnd, x-xs/2, y-ys/2, xs, ys
                );
            } catch (error){
                console.log('Draw Image Error:\n  ')
                console.log(error)
            }
        },

        renderRect: function(xPos, yPos, xSize, ySize) {
            x = ((xPos-camera.x)/camera.z) + screenWidth/2;
            y = ((yPos-camera.y)/camera.z) + screenHeight/2;
            xs = (xSize/camera.z);
            ys = (ySize/camera.z);
            context.fillStyle = 'rgb(60, 60, 60)'
            context.fillRect(x-xs/2, y-ys/2, xs, ys)
        },

        renderDec: function(xPos, yPos, xSize, ySize) {
            x = ((xPos-camera.x)/camera.z) + screenWidth/2;
            y = ((yPos-camera.y)/camera.z) + screenHeight/2;
            xs = (xSize/camera.z);
            ys = (ySize/camera.z);
            context.fillStyle = 'rgb(10, 10, 40)'
            context.fillRect(x-xs/2, y-ys/2, xs, ys)
        },

        renderText: function(text, xPos, yPos) {
            x = ((xPos-camera.x)/camera.z) + screenWidth/2;
            y = ((yPos-50-camera.y)/camera.z) + screenHeight/2;
            context.font = "20px sans serif";
            context.fillStyle = "white";
            texts = text.split('\\n')
            try {
                for (let l = 0; l < texts.length; l++) {
                    context.fillText(texts[l], x-context.measureText(texts[l]).width/2, y+l*20);
                }
            }
            catch {console.log("can't render name for player "+text)}
        },

        renderScene: function() {
            var time = new Date();
            deltaTime = time.getTime()/1000-lastTime;
            lastTime = time.getTime()/1000;

            fps = Math.round( (1/deltaTime)/5 ) *5

            //dessine le ciel
            context.fillStyle = gradient;
            context.fillRect(0, 0, screenWidth, screenHeight);

            //dessine toute la map
            for (var i = 0; i < this.backblocks.length; i++) {
                this.backblocks[i].render(deltaTime);
            }
            for (var i = 0; i < this.objects.length; i++) {
                this.objects[i].render(deltaTime);
            }
            for (var i = 0; i < this.coins.length; i++) {
                this.coins[i].render(deltaTime);
                for (let h = 0; h < playersList.length; h++) {
                    const p = playersList[h]
                    if(this.coins[i].x-50 < p.x && this.coins[i].x+50 > p.x && this.coins[i].y-75 < p.y && this.coins[i].y+75 > p.y) {
                        this.coins[i].show = false;
                        if (this.coins[i].num == 3) {
                            socket.emit('coinPicked', {
                                index: this.coins[i].index
                            })
                        }
                    }
                    else {if (this.coins[i].num == 4) {this.coins[i].show = true;}}
                }
            }
            for (var i = 0; i < this.decorations.length; i++) {
                this.decorations[i].render(deltaTime);
            }
            for (var i = 0; i < playersList.length; i++) {
                if(playersList[i].id != player.id) {
                    playersList[i].render(deltaTime);
                }
            }
            //dessine le joueur
            player.render(deltaTime); 
            
            camera.render(deltaTime);
            HUD.lifeBar.render(deltaTime);

            context.font = "20px sans serif";
            context.fillStyle = "white";
            context.fillText("FPS: "+fps.toString(), 5, 30);
        },
    };
    
    var drawMap = function() {
        scene.objects = [];
        scene.decorations = [];
        scene.coins = [];
        scene.backblocks = [];
        for(var y = 0; y < mapH; y++) {
            for(var x = 0; x < mapW; x++) {
                if(!isNaN(map[y*mapW+x])) {
                    if (map[y*mapW+x] == 0 || map[y*mapW+x] == 3) { //fleurs
                        var rd = Math.random();
                        var up = (map[(y-1)*mapW+x] == 1)? true: false;
                        var down = (map[(y+1)*mapW+x] == 1)? true: false;
                        var small = (rd > 0.50 && rd < 0.80)? true: false;
                        var big = (rd > 0.80)? true: false;
                        if(down) {
                            if(small) {scene.decorations.push(Object.create(mapBox).init(x*50, y*50+75-mapH*50, 51, 51, 0, y*mapW+x, 0))}
                            if(big)   {scene.decorations.push(Object.create(mapBox).init(x*50, y*50+75-mapH*50, 51, 51, 0, y*mapW+x, 1))}
                        }
                        if(up) {
                            if(small) {scene.decorations.push(Object.create(mapBox).init(x*50, y*50+75-mapH*50, 51, 51, 0, y*mapW+x, 2))}
                            if(big)   {scene.decorations.push(Object.create(mapBox).init(x*50, y*50+75-mapH*50, 51, 51, 0, y*mapW+x, 3))}
                        }
                    }
                    if (map[y*mapW+x] == 1) { //blocks
                        //regarde pour les textures d'herbe
                        var side = 0 //voir orde en haut du code (faire -1)
                        var up = (map[(y-1)*mapW+x] == 1)? true: false;
                        var left = (map[y*mapW+x-1] == 1)? true: false;
                        var right = (map[y*mapW+x+1] == 1)? true: false;
                        if(!up) {
                            if(!left) {
                                if(!right) {side = 7}
                                else {side = 5}
                            }
                            else {
                                if(!right) {side = 4}
                                else {side = 1}
                            }
                        }
                        else {
                            if(!right) {
                                if(!left) {side = 6}
                                else {side = 2}
                            }
                            else {
                                if(!left) {side = 3}
                                else {side = 0}
                            }
                        }
                        scene.objects.push(Object.create(mapBox).init(x*50, y*50+75-mapH*50, 51, 51, 1, y*mapW+x, side))
                    }
                    if (map[y*mapW+x] == 2) { //back blocks
                        //regarde pour les textures d'herbe
                        var side = 0 //voir orde en haut du code (faire -1)
                        var up = (map[(y-1)*mapW+x] == 2)? true: false;
                        var left = (map[y*mapW+x-1] == 2)? true: false;
                        var right = (map[y*mapW+x+1] == 2)? true: false;
                        if(!up) {
                            if(!left) {
                                if(!right) {side = 7}
                                else {side = 5}
                            }
                            else {
                                if(!right) {side = 4}
                                else {side = 1}
                            }
                        }
                        else {
                            if(!right) {
                                if(!left) {side = 6}
                                else {side = 2}
                            }
                            else {
                                if(!left) {side = 3}
                                else {side = 0}
                            }
                        }
                        scene.backblocks.push(Object.create(mapBox).init(x*50, y*50+75-mapH*50, 51, 51, 2, y*mapW+x, side))
                    }
                    if (map[y*mapW+x] == 3) { //piece
                        scene.coins.push(Object.create(mapBox).init(x*50, y*50+75-mapH*50, 51, 51, 3, y*mapW+x, 0))
                    }
                    if (map[y*mapW+x] == 5) { //pierre
                        scene.objects.push(Object.create(mapBox).init(x*50, y*50+75-mapH*50, 51, 51, 5, y*mapW+x, 0))
                    }
                    if (map[y*mapW+x] == 6) { //back pierre
                        scene.backblocks.push(Object.create(mapBox).init(x*50, y*50+75-mapH*50, 51, 51, 6, y*mapW+x, 0))
                    }
                }
                else { //text
                    scene.coins.push(Object.create(mapBox).init(x*50, y*50+75-mapH*50, 51, 51, 4, y*mapW+x, map[y*mapW+x]))
                }
            };
        };
    };

    gameLoop = function() {
        if(!setup) {window.requestAnimationFrame(gameLoop); return}
        if (inputManager.upKey && player.isGrounded) {
            player.jump();
            camera.changeZto(1.6);
            player.doubleJumped = false;
        };
        if(inputManager.upKey && player.canAirJump && !player.doubleJumped) {
            player.airJump();
            camera.changeZto(1.7);
            player.doubleJumped = true;
        }
        if(!inputManager.upKey && !player.isGrounded) {
            player.canAirJump = true;
        }
        if (inputManager.rightKey) {
            player.walkRight();
            camera.changeZto(1.5);
        };
        if (inputManager.leftKey) {
            player.walkLeft();
            camera.changeZto(1.5);
        };
        if (inputManager.downKey) {
            camera.changeZto(6.4);
        };
        if (!inputManager.leftKey && !inputManager.rightKey && !inputManager.upKey && !inputManager.downKey) {
            player.idle();
            camera.changeZto(1.4);
        };
        scene.renderScene();
        window.requestAnimationFrame(gameLoop);
    };

    window.addEventListener("keydown", inputManager.keyManager);
    window.addEventListener("keyup", inputManager.keyManager);
    window.requestAnimationFrame(gameLoop);
}