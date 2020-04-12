var name = "Player";

function setup() {
    document.getElementById('screen').style.display = 'none';
    document.getElementById('interface').style.display = 'block';
    window.addEventListener("keydown", eventManager);
    function eventManager(event) {
        if (event.keyCode == 13) {
            start()
        }
    }
}

function start() {
    const gravity = 9.81;
    var time = new Date();
    var lastTime = time.getTime()/1000;
    var deltaTime = 0;
    var fps = 60;
    var mapH = 20;
    var mapW = 100;

    var map = [];
    
    var screenWidth = screen.width;
    var screenHeight = screen.height;

    name = document.getElementById('nameValue').value;
    document.getElementById('screen').style.display = 'block';
    document.getElementById('interface').style.display = 'none';
    var context = document.getElementById('screen').getContext("2d");
    context.canvas.height = screenHeight;
    context.canvas.width = screenWidth;

    var gradient = context.createLinearGradient(0, 0, 0, screenHeight);
    gradient.addColorStop(1, 'rgb(0, 15, 25)');
    gradient.addColorStop(0, 'rgb(0, 100, 160)');
    
    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;
    
    var socket = io();
    var setup = false;

    socket.on('newPlayer', function(data) {
        if(!setup) {
            player.id = data.playerID;
            setup = true;
            map = data.map;
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
        if(playersList.length > data.playersList.length) {
            while (playersList.length > data.playersList.length) {
                playersList.pop()
            }
        }
        if(playersList.length < data.playersList.length) {
            while (playersList.length < data.playersList.length) {
                playersList.push(Object.create(fakePlayer).init(playersList.length))
            }
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

    var playersList = []

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
        name: "Unknown",
        x: 0,
        y: 0,
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
            var XspritePos = this.spriteIndex * player.spriteXsize;
            var YspritePos = this.currentAnimation.ySpriteShift * player.spriteYsize;
            scene.renderImage(player.sprite, XspritePos, YspritePos, player.spriteXsize, player.spriteYsize, this.x, this.y, player.xSize, player.ySize);
            scene.renderText(this.name, this.x, this.y);
        },
        init: function(id) {
            this.id = id;
            return this;
        }
    }

    var player = {
        x: 0,
        y: 0,
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
            window.location.href = './index.html';
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
                if (map[mapIndex] == 1) {
                    this.setGrounded(Math.round(this.y/50)*50);
                }
                else {
                    var mapChecker = {x: Math.round((checkerPos.x-10)/50), y: mapH+Math.round(checkerPos.y/50)}
                    var mapIndex = mapChecker.x+mapChecker.y*mapW
                    if (mapIndex > 0 && mapIndex < map.length-1) {
                        if (map[mapIndex] == 1) {
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
                if (map[mapIndex] == 1) {
                    this.yVelo = 0;
                    this.y += 5;
                }
                else {
                    var mapChecker = {x: Math.round((checkerPos.x-10)/50), y: mapH+Math.round((checkerPos.y-120)/50)}
                    var mapIndex = mapChecker.x+mapChecker.y*mapW
                    if (mapIndex > 0 && mapIndex < map.length-1) {
                        if (map[mapIndex] == 1) {
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
                if (map[mapIndex] == 1) {
                    this.xVelo = 0;
                    this.x -= 1;
                    this.blocTouched = true;
                }
                else {
                    var mapChecker = {x: Math.round((this.x+30)/50), y: mapH+Math.round((this.y-85)/50)}
                    var mapIndex = mapChecker.x+mapChecker.y*mapW
                    if (mapIndex > 0 && mapIndex < map.length-1) {
                        if (map[mapIndex] == 1) {
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
                if (map[mapIndex] == 1) {
                    this.xVelo = 0;
                    this.x += 1;
                    this.blocTouched = true;
                }
                else {
                    var mapChecker = {x: Math.round((this.x-30)/50), y: mapH+Math.round((this.y-85)/50)}
                    var mapIndex = mapChecker.x+mapChecker.y*mapW
                    if (mapIndex > 0 && mapIndex < map.length-1) {
                        if (map[mapIndex] == 1) {
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

            if (this.y > 0) {
                this.setGrounded(0);
            };
            
            this.xVelo *= 0.5

            this.waitTime += dt;
            if (this.waitTime > 1/this.currentAnimation.animSpeed) {
                this.waitTime = 0;
                this.spriteIndex = (this.spriteIndex > this.currentAnimation.nmbrOfSprites-2)? 0: this.spriteIndex+1;
            };

            this.lastPosSent += dt;
            if (this.lastPosSent > 1/120) {
                socket.emit('position', {
                    x: this.x,
                    y: this.y,
                    playerID: player.id,
                    animationID: this.animationID
                })
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
                context.drawImage(
                    this.sprite, 0, this.spriteYsize*(6-this.level), this.spriteXsize, this.spriteYsize, this.Xpos, this.Ypos, this.Xsize, this.Ysize
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
        render: function(dt) {
            if(this.num == 1) {
                scene.renderRect(this.x, this.y, this.xSize, this.ySize)
            }
            if(this.num == 2) {
                scene.renderDec(this.x, this.y, this.xSize, this.ySize)
            }
        },
        init: function(x, y, xSize, ySize, num) {
            this.x = x;
            this.y = y;
            this.xSize = xSize;
            this.ySize = ySize;
            this.num = num;
            return this;
        },
    }

    var inputManager = {
        rightKey: false,
        upKey: false,
        leftKey: false,

        keyManager: function(event) {
            var keyPressed = (event.type == "keydown")? true : false;
            switch (event.keyCode) {
                case 81: inputManager.leftKey = keyPressed; break;
                case 90: inputManager.upKey = keyPressed; break;
                case 68: inputManager.rightKey = keyPressed; break;
                case 37: inputManager.leftKey = keyPressed; break;
                case 38: inputManager.upKey = keyPressed; break;
                case 39: inputManager.rightKey = keyPressed; break;
            }
        }
    };

    //50 = 1 unite
    var scene = {
        objects: [],
        decorations: [],

        renderImage: function(image, xCropStart, yCropStart, xCropEnd, yCropEnd, xPos, yPos, xSize, ySize) {
            x = ((xPos-camera.x)/camera.z) + screenWidth/2;
            y = ((yPos-camera.y)/camera.z) + screenHeight/2;
            xs = (xSize/camera.z);
            ys = (ySize/camera.z);
            context.drawImage(
                image, xCropStart, yCropStart, xCropEnd, yCropEnd, x-xs/2, y-ys/2, xs, ys
            );
        },

        renderRect: function(xPos, yPos, xSize, ySize) {
            x = ((xPos-camera.x)/camera.z) + screenWidth/2;
            y = ((yPos-camera.y)/camera.z) + screenHeight/2;
            xs = (xSize/camera.z);
            ys = (ySize/camera.z);
            context.fillStyle = 'rgb(5, 5, 20)'
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
            try {
                console.log(text.length);
                context.fillText(text, x, y);
            }
            catch {
                
            }
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
            for (var i = 0; i < this.decorations.length; i++) {
                this.decorations[i].render(deltaTime);
            }
            for (var i = 0; i < this.objects.length; i++) {
                this.objects[i].render(deltaTime);
            }
            for (var i = 0; i < playersList.length; i++) {
                if(playersList[i].id != player.id) {
                    playersList[i].render(deltaTime);
                }
            }
            scene.renderRect(5000, 300, 20000, 500)

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
        for(var y = 0; y < mapH; y++) {
            for(var x = 0; x < mapW; x++) {
                if (map[y*mapW+x] == 1) {
                    scene.objects.push(Object.create(mapBox).init(x*50, y*50+75-mapH*50, 51, 51, 1))
                }
                if (map[y*mapW+x] == 2) {
                    scene.decorations.push(Object.create(mapBox).init(x*50, y*50+75-mapH*50, 51, 51, 2))
                }
            };
        };
    };

    gameLoop = function() {
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
        if (!inputManager.leftKey && !inputManager.rightKey && !inputManager.upKey) {
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