// Navigation 
const nav_menu = 1;
const nav_game = 2;
const nav_after_game = 3;
const nav_level_menu = 4;
const nav_scene_menu = 5;
const nav_scene = 6;
class GameEngine {
    constructor() {
        this.navigation = null;
        this.menuController = new MenuController();
        this.levelMenuController = new LevelMenuController();
        this.sceneMenuController = new SceneMenuController();
    }
    init() {
        this.menuController.init();
        this.levelMenuController.init();
        this.sceneMenuController.init();
        this.menuController.gotoMenu();
        this.mainLoop();
    }
    mainLoop() {
        switch (gameEngine.navigation) {
            case nav_menu:
                gameEngine.menuController.menu();
                break;
            case nav_game:
                updateGame();
                break;
            case nav_after_game:
                gameEngine.menuController.afterGame();
                break;
            case nav_level_menu:
                gameEngine.levelMenuController.levelMenu();
                break;
            case nav_scene_menu:
                gameEngine.sceneMenuController.sceneMenu();
                break;
            case nav_scene:
                //scene();
                break;
            default:
                break;
        }
        requestAnimationFrame(gameEngine.mainLoop);
    }
    checkClickEvents(mouseX, mouseY) {
        switch (this.navigation) {
            case nav_menu:
                this.menuController.checkClick(mouseX, mouseY);
                break;
            case nav_game:
                checkGameClicks(mouseX, mouseY);
                break;
            case nav_after_game:
                break;
            case nav_level_menu:
                this.levelMenuController.checkClick(mouseX, mouseY);
                break;
            case nav_scene_menu:
                this.sceneMenuController.checkClick(mouseX, mouseY);
                break;
            case nav_scene:
                break;
            default:
                break;
        }
    }
    checkRightClickEvents(mouseX, mouseY) {
        switch (this.navigation) {
            case nav_menu:
                break;
            case nav_game:
                checkGameRightClicks(mouseX, mouseY);
                break;
            case nav_after_game:
                break;
            case nav_level_menu:
                break;
            case nav_scene_menu:
                break;
            case nav_scene:
                break;
            default:
                break;
        }
    }
    checkMouseUpEvents() {
        switch (this.navigation) {
            case nav_menu:
                break;
            case nav_game:
                checkGameMouseUp();
                break;
            case nav_after_game:
                break;
            case nav_level_menu:
                break;
            case nav_scene_menu:
                break;
            case nav_scene:
                break;
            default:
                break;
        }
    }
}
class LevelMenuController {
    constructor() {
    }
    gotoLevelMenu() {
        gameEngine.navigation = nav_level_menu;
        this.level_chosen = null;
    }
    init() {
        //navigation = nav_level_menu;
        this.level_chosen = null;
        this.levels = [];
        LevelController.initLevels();
    }
    levelMenu() {
        // UPDATE
        // space to start
        if (this.level_chosen > 0)
            if (keys[32])
                initGame();
        // goto menu on m
        if (keys[77])
            gameEngine.menuController.gotoMenu();
        // delete cookies with d
        if (keys[68])
            this.deleteAllStats();
        // DRAW
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        // Headline
        ctx.fillStyle = "red";
        ctx.font = "bold 50px Arial";
        ctx.fillText("LEVELS", 100, 100);
        // draw levels
        this.drawAllLevelIcons();
        // draw level Text
        ctx.fillStyle = "black";
        ctx.font = "bold 20px Arial";
        if (this.level_chosen > 0) {
            ctx.fillText(this.levels[this.level_chosen - 1].text, 20, 250);
            // Navigation
            ctx.fillStyle = "black";
            ctx.font = "bold 20px Arial";
            ctx.fillText("Press Space to start level", 20, 350);
        }
        // Navigation
        ctx.fillStyle = "black";
        ctx.font = "bold 20px Arial";
        ctx.fillText("Press M to return to the menu", 20, 400);
        ctx.fillText("Press D to delete stats", 20, 450);
    }
    checkClick(mouseX, mouseY) {
        // loop all levels
        for (var i = 0; i < this.levels.length; i++) {
            var level = this.levels[i];
            if (mouseX > level.x && mouseX < level.x + 50
                && mouseY > level.y && mouseY < level.y + 50) {
                this.level_chosen = level.number;
                return;
            }
        }
    }
    drawAllLevelIcons() {
        // loop all levels
        for (var i = 0; i < this.levels.length; i++) {
            this.drawLevelIcon(this.levels[i]);
        }
    }
    drawLevelIcon(level) {
        if (this.level_chosen == level.number)
            ctx.fillStyle = "lime";
        else
            ctx.fillStyle = "black";
        ctx.fillRect(level.x, level.y, 50, 50);
        if (level.won)
            ctx.fillStyle = "green";
        else
            ctx.fillStyle = "red";
        ctx.fillRect(level.x + 5, level.y + 5, 40, 40);
        ctx.fillStyle = "black";
        ctx.font = "bold 30px Arial";
        ctx.fillText(String(level.number), level.x + 15, level.y + 35);
    }
    loadLevelStats() {
        // loop levels and get stats
        for (var i = 0; i < this.levels.length; i++) {
            var level = this.levels[i];
            var levelCookie = getCookie("level_" + level.number);
            if (levelCookie == "won")
                level.won = true;
        }
    }
    wonLevel() {
        if (this.level_chosen > 0 && mission_done) {
            this.levels[this.level_chosen - 1].won = true;
            this.saveLevel();
        }
    }
    saveLevel() {
        setCookie("level_" + this.level_chosen, "won");
    }
    deleteAllStats() {
        // loop levels and get stats
        for (var i = 0; i < this.levels.length; i++) {
            var level = this.levels[i];
            deleteCookie("level_" + level.number);
        }
        this.init();
    }
}
class MenuController {
    constructor() {
        this.startButtonX = 400;
        this.startButtonY = 540;
        this.startButtonWidth = 50;
        this.startButtonHeight = 50;
    }
    gotoMenu() {
        gameEngine.navigation = nav_menu;
    }
    init() {
        initMenuParameters();
    }
    menu() {
        // UPDATE 
        // space to start
        if (keys[32])
            initGame();
        // restart on R
        if (keys[82])
            setRandomValues();
        // levels on L
        if (keys[76])
            gameEngine.levelMenuController.gotoLevelMenu();
        // scenes on S
        if (keys[83])
            gameEngine.sceneMenuController.gotoSceneMenu();
        //DRAW
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        // Headline
        ctx.fillStyle = "red";
        ctx.font = "bold 50px Arial";
        ctx.fillText(gameName, 100, 100);
        drawMenuParameters();
        // Navigation
        ctx.fillText("Press Space to start", 20, 500);
        ctx.fillText("Press R to set random values", 20, 530);
        ctx.fillText("Press L to go to the level screen", 20, 560);
        ctx.fillText("Press S to go to the scene menu", 20, 590);
        this.drawStartButton(this.startButtonX, this.startButtonY, this.startButtonWidth, this.startButtonHeight);
    }
    afterGame() {
        // UPDATE 
        // goto menu on m
        if (keys[77])
            this.gotoMenu();
        // restart on r
        if (keys[82])
            initGame();
        // restart on L
        if (keys[76])
            gameEngine.levelMenuController.gotoLevelMenu();
        // DRAW
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        // Headline
        ctx.fillStyle = "red";
        ctx.font = "bold 50px Arial";
        if (mission_done) {
            ctx.fillText("YOU WON :)", 100, 100);
            drawAfterGameParams();
        }
        else {
            ctx.fillText("YOU LOSE :(", 100, 100);
            // Loose String
            ctx.fillStyle = "black";
            ctx.font = "bold 20px Arial";
            ctx.fillText(mission_loose_string, 20, 170);
        }
        // Navigation
        ctx.fillStyle = "black";
        ctx.font = "bold 20px Arial";
        ctx.fillText("Press R to restart", 20, 300);
        ctx.fillText("Press M to return to the menu", 20, 350);
        ctx.fillText("Press L to go to the level menu", 20, 400);
        ctx.fillText("Press S to go to the scene menu", 20, 450);
    }
    drawStartButton(x, y, width, height) {
        ctx.fillStyle = "black";
        ctx.fillRect(x, y, width, height);
        ctx.fillStyle = "green";
        ctx.fillRect(x + 5, y + 5, width - 10, height - 10);
        ctx.fillStyle = "black";
        ctx.font = "bold 20px Arial";
        ctx.fillText("GO", x + 10, y + 35);
    }
    checkClick(mouseX, mouseY) {
        if (mouseX > this.startButtonX && mouseX < this.startButtonX + this.startButtonWidth
            && mouseY > this.startButtonY && mouseY < this.startButtonY + this.startButtonHeight) {
            initGame();
            return;
        }
    }
}
class SceneMenuController {
    constructor() {
    }
    gotoSceneMenu() {
        gameEngine.navigation = nav_scene_menu;
        this.scene_chosen = null;
    }
    init() {
        //navigation = nav_scene_menu;
        this.scene_chosen = null;
        this.scenes = [];
        initScenes();
    }
    sceneMenu() {
        // UPDATE
        // space to start
        if (this.scene_chosen > 0)
            if (keys[32])
                null; //initScene();
        // goto menu on m
        if (keys[77])
            gameEngine.menuController.gotoMenu();
        // delete cookies with d
        if (keys[68])
            gameEngine.levelMenuController.deleteAllStats();
        // DRAW
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        // Headline
        ctx.fillStyle = "red";
        ctx.font = "bold 50px Arial";
        ctx.fillText("SCENES", 100, 100);
        // draw scenes
        this.drawAllSceneIcons();
        // draw scenes Text
        ctx.fillStyle = "black";
        ctx.font = "bold 20px Arial";
        if (this.scene_chosen > 0) {
            ctx.fillText(this.scenes[this.scene_chosen - 1].text, 20, 250);
            // Navigation
            ctx.fillStyle = "black";
            ctx.font = "bold 20px Arial";
            ctx.fillText("Press Space to start scene", 20, 350);
        }
        // Navigation
        ctx.fillStyle = "black";
        ctx.font = "bold 20px Arial";
        ctx.fillText("Press M to return to the menu", 20, 400);
    }
    checkClick(mouseX, mouseY) {
        // loop all scenes
        for (var i = 0; i < this.scenes.length; i++) {
            var scene = this.scenes[i];
            if (mouseX > scene.x && mouseX < scene.x + 50
                && mouseY > scene.y && mouseY < scene.y + 50) {
                this.scene_chosen = scene.id;
                return;
            }
        }
    }
    drawAllSceneIcons() {
        // loop all scenes
        for (var i = 0; i < this.scenes.length; i++) {
            this.drawSceneIcon(this.scenes[i]);
        }
    }
    drawSceneIcon(scene) {
        if (this.scene_chosen == scene.id)
            ctx.fillStyle = "lime";
        else
            ctx.fillStyle = "black";
        ctx.fillRect(scene.x, scene.y, 50, 50);
        if (scene.unlocked)
            ctx.fillStyle = "green";
        else
            ctx.fillStyle = "red";
        ctx.fillRect(scene.x + 5, scene.y + 5, 40, 40);
        ctx.fillStyle = "black";
        ctx.font = "bold 30px Arial";
        ctx.fillText(String(scene.id), scene.x + 15, scene.y + 35);
    }
    loadSceneStats() {
        // loop scene and get stats
        for (var i = 0; i < this.scenes.length; i++) {
            var scene = this.scenes[i];
            var sceneCookie = getCookie("scene_" + scene.id);
            if (sceneCookie == "unlocked")
                scene.unlocked = true;
        }
    }
    unlockScene() {
        setCookie("scene_" + this.scene_chosen, "unlocked");
    }
}
/************************************************
################# VARIABLES #####################
************************************************/
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
var canvasMidX = CANVAS_WIDTH / 2;
var canvasMidY = CANVAS_HEIGHT / 2;
var body;
var canvas;
var ctx;
var keys;
var mousePosX;
var mousePosY;
var gameEngine;
/************************************************
################## METHODS ######################
************************************************/
/***********************************
 # Some Stuff for the game loop
 ***********************************/
(function () {
    //var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    //window.requestAnimationFrame = requestAnimationFrame;
})();
/***********************************
 # on load event listener
 ***********************************/
window.addEventListener("load", function () {
    init();
});
/***********************************
# Init main technical components
***********************************/
function init() {
    // INIT input stuff
    window.addEventListener('keydown', keyDown, true);
    window.addEventListener('keyup', keyUp, true);
    canvas = document.getElementById("canvas");
    canvas.addEventListener('mousedown', mouseDownHandler, false);
    canvas.addEventListener('mouseup', mouseUpHandler, false);
    canvas.addEventListener('mousemove', updateMousePos, false);
    canvas.addEventListener('contextmenu', function (ev) {
        ev.preventDefault();
        return false;
    }, false);
    ctx = canvas.getContext("2d");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    keys = [];
    // INIT game engine
    gameEngine = new GameEngine();
    gameEngine.init();
}
/***********************************
# Input Stuff
***********************************/
function keyDown(evt) {
    keys[evt.keyCode] = true;
    //alert(evt.keyCode);
}
function keyUp(evt) {
    keys[evt.keyCode] = false;
}
/***********************************
# handle mouse click
***********************************/
function mouseDownHandler(evt) {
    //updateMousePos(canvas, evt);
    console.log(evt.which);
    if (evt.which == 1)
        gameEngine.checkClickEvents(mousePosX, mousePosY); // left Click
    if (evt.which == 3)
        gameEngine.checkRightClickEvents(mousePosX, mousePosY); // right Click
}
/***********************************
# handle mouse up
***********************************/
function mouseUpHandler(evt) {
    gameEngine.checkMouseUpEvents();
}
/***********************************
# get relativ mouse pos
***********************************/
function updateMousePos(evt) {
    // get canvas position
    var obj = canvas;
    var top = 0;
    var left = 0;
    while (obj.tagName != 'BODY') {
        top += obj.offsetTop;
        left += obj.offsetLeft;
        obj = obj.offsetParent;
    }
    // save relative mouse position
    mousePosX = evt.clientX - left + window.pageXOffset;
    mousePosY = evt.clientY - top + window.pageYOffset;
}
class GameDraw {
    constructor() {
    }
    draw() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        meetingRoom.draw();
        for (var i = 0; i < balls.length; i++) {
            balls[i].draw();
        }
        ballBasket.draw();
        player.draw();
        for (var i = 0; i < players.length; i++) {
            players[i].draw();
        }
        drawButtons();
        // DRAW Frame and infos
        // Frame
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'white';
        ctx.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.closePath();
        //drawTime();
        //drawPoints();
    }
}
class Level {
    constructor(x, y, number, text) {
        this.x = x;
        this.y = y;
        this.number = number;
        this.text = text;
        this.won = false;
    }
}
class LevelController {
    constructor() {
    }
    static initLevels() {
        // first level
        /*levels.push({
            x: 50,
            y: 150,
            number: 1,
            text: 'First Level',
            won: false,
            speed: 1,
            time: 0,
            items: 20,
            teamMembers: 6,
            target_points: 200
        });*/
    }
}
class Scene {
    constructor(x, y, id, text, unlocked) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.text = text;
        this.unlocked = unlocked;
    }
}
//import * as express from "express";
//import * as socketio from "socket.io";
//import { Ball } from "../gameObjects/Ball";
let socketio = require("socket.io");
/************************************************
################# CONSTANTS #####################
************************************************/
// game speed modes 
const GAME_SPEED_PAUSE = 0;
const GAME_SPEED_DAILY = 1;
const GAME_SPEED_SPRINT = 10;
const GAME_SPEED_PI = 50;
const CLICK_LEFT = 0;
const CLICK_RIGHT = 1;
/************************************************
################# VARIABLES #####################
************************************************/
// TIME Parameters
var lastTime = 0;
var timeDiff = 0;
var gameName = "Ball Point Game";
// GAME Parameters
var par_speed;
var par_time;
var par_items;
var par_teamMembers;
var par_target_points;
var actualSpeed;
var lastGameSpeed = 0;
var gameSpeedMode;
//GAME Objects
var player;
var balls;
var ballBasket;
var meetingRoom;
//Multiplayer Objects
var players;
// GAME Object Controller
var gameDraw;
var drawColliders = false;
//Multiplayer
var socket;
/************************************************
################## METHODS ######################
************************************************/
/***********************************
# Method to init all game objects
***********************************/
function initGame() {
    //console.log("init game");
    gameEngine.navigation = nav_game;
    gameSpeedMode = GAME_SPEED_SPRINT;
    // open socket connection to server
    socket = socketio.io();
    socket.on('state', processServerSync);
    //init object controllers
    player = new Player(620, 180, true, true);
    ballBasket = new BallBasket(200, 130, true);
    meetingRoom = new MeetingRoom(true);
    gameDraw = new GameDraw();
    balls = [];
    //balls.push(new Ball(400, 400, true));
    players = [];
    //players.push(new Player(300,300));
    //time
    var now = new Date();
    lastTime = now.getTime();
    //init game parameters
    setParametersFromMenu();
    initMissions();
    // INIT Game Objects here
    initButtons();
    player.init();
}
/***********************************
# Game loop
***********************************/
function updateGame() {
    //time
    var now = new Date();
    var time = now.getTime();
    timeDiff = time - lastTime;
    lastTime = time;
    // UPDATE Game Objects
    updateButtons();
    player.updateControls();
    player.update(timeDiff);
    ballBasket.update(timeDiff);
    meetingRoom.update(timeDiff);
    for (var i = 0; i < players.length; i++) {
        //players[i].update(timeDiff);
    }
    for (var i = 0; i < balls.length; i++) {
        balls[i].update(timeDiff);
    }
    // DRAW Game Objects
    gameDraw.draw();
}
/***********************************
# sync client with server states
***********************************/
function processServerSync(serverPlayers, serverBalls) {
    //console.log(players);
    //console.log(balls);
    for (var id in serverPlayers) {
        var serverPlayer = serverPlayers[id];
        // if its not the main Player, sync it
        if (serverPlayer.id != player.id) {
            //console.log('sync player: ' + player.id);
            var foundPlayer = false;
            // find client Player Object
            for (var i = 0; i < players.length; i++) {
                var clientPlayer = players[i];
                if (clientPlayer.id == serverPlayer.id) {
                    clientPlayer.syncPlayerState(serverPlayer);
                    foundPlayer = true;
                }
            }
            if (!foundPlayer) {
                //console.log('Add new Player to client');
                var newPlayer = new Player(serverPlayer.x, serverPlayer.y, true, false);
                newPlayer.syncPlayerState(serverPlayer);
                players.push(newPlayer);
            }
        }
    }
    // loop client players and remove not existing ones
    var playersToRemove = [];
    for (var i = 0; i < players.length; i++) {
        var clientPlayer = players[i];
        var foundPlayer = false;
        for (var id in serverPlayers) {
            var serverPlayer = serverPlayers[id];
            if (clientPlayer.id == serverPlayer.id) {
                foundPlayer = true;
                break;
            }
        }
        if (!foundPlayer) {
            playersToRemove.push(clientPlayer);
        }
    }
    for (id in playersToRemove) {
        var playerToRemove = playersToRemove[id];
        var tempPlayer = [];
        for (var i = 0; i < players.length; i++) {
            if (players[i].id != playerToRemove.id)
                tempPlayer.push(players[i]);
        }
        players = tempPlayer;
    }
    // Balls
    // loop server balls and refresh / add existing balls
    for (var id in serverBalls) {
        var serverBall = serverBalls[id];
        var foundBall = false;
        for (var i = 0; i < balls.length; i++) {
            var clientBall = balls[i];
            if (clientBall.id == serverBall.id) {
                if (clientBall.state != serverBall.state && serverBall.lastHolderId != player.id)
                    clientBall.syncBallState(serverBall);
                foundBall = true;
                break;
            }
        }
        if (!foundBall) {
            //check if the ball is in one hand
            if (player.leftHand != null && player.leftHand.id == serverBall.id)
                break;
            if (player.rightHand != null && player.rightHand.id == serverBall.id)
                break;
            var newBall = new Ball(serverBall.x, serverBall.y, true);
            newBall.syncBallState(serverBall);
            balls.push(newBall);
            console.log(balls);
        }
    }
    // loop client balls and remove not existing balls
    var ballsToRemove = [];
    for (var i = 0; i < balls.length; i++) {
        var clientBall = balls[i];
        var foundBall = false;
        for (var id in serverBalls) {
            var serverBall = serverBalls[id];
            if (clientBall.id == serverBall.id) {
                foundBall = true;
                break;
            }
        }
        if (!foundBall) {
            ballsToRemove.push(clientBall);
        }
    }
    for (id in ballsToRemove) {
        var ballToRemove = ballsToRemove[id];
        var tempBalls = [];
        for (var i = 0; i < balls.length; i++) {
            if (balls[i].id != ballToRemove.id)
                tempBalls.push(balls[i]);
        }
        balls = tempBalls;
    }
}
/***********************************
# end game
# --> go to after_game screen
***********************************/
function endGame() {
    gameEngine.navigation = nav_after_game;
    gameEngine.levelMenuController.wonLevel();
}
/***********************************
# check clicks
***********************************/
function checkGameClicks(mouseX, mouseY) {
    //console.log("checkGameClicks");
    player.checkClick(mouseX, mouseY, CLICK_LEFT);
}
function checkGameRightClicks(mouseX, mouseY) {
    console.log("checkGameRightClicks");
    player.checkClick(mouseX, mouseY, CLICK_RIGHT);
}
/***********************************
# check mouse up
***********************************/
function checkGameMouseUp() {
    //console.log("checkGameClicks");
}
/************************************************
################# VARIABLES #####################
************************************************/
var input_speed;
var input_time;
var input_items;
var input_teamMembers;
var input_target_points;
/************************************************
################## METHODS ######################
************************************************/
/***********************************
# Init the menu elements
***********************************/
function initMenuParameters() {
    // INIT game parameters
    input_speed = new CanvasInput({
        canvas: canvas,
        x: 150,
        y: 150,
        width: 50,
        value: 1
    });
    input_time = new CanvasInput({
        canvas: canvas,
        x: 350,
        y: 150,
        width: 50,
        value: 1000
    });
    input_items = new CanvasInput({
        canvas: canvas,
        x: 150,
        y: 200,
        width: 50,
        value: 3
    });
    input_teamMembers = new CanvasInput({
        canvas: canvas,
        x: 350,
        y: 200,
        width: 50,
        value: 5
    });
    // INIT targets
    input_target_points = new CanvasInput({
        canvas: canvas,
        x: 150,
        y: 330,
        width: 50,
        value: 1000
    });
}
/***********************************
# draw the menu
***********************************/
function drawMenuParameters() {
    // DRAW game parameters
    ctx.fillStyle = "black";
    ctx.font = "bold 20px Arial";
    ctx.fillText("SPEED", 20, 170);
    input_speed.render();
    ctx.fillText("TIME", 250, 170);
    input_time.render();
    ctx.fillText("Workitems", 20, 220);
    input_items.render();
    ctx.fillText("Teamsize", 250, 220);
    input_teamMembers.render();
    // DRAW targets
    ctx.fillText("Targets", 20, 320);
    ctx.fillText("Points", 20, 350);
    input_target_points.render();
}
/***********************************
# draw after game params
***********************************/
function drawAfterGameParams() {
    //Stats
    ctx.fillStyle = "black";
    ctx.font = "bold 20px Arial";
    // Points 
    ctx.fillText("Points: " + points, 20, 170);
}
/***********************************
# pass parameters to game
***********************************/
function setParametersFromMenu() {
    // SET game parameters
    par_speed = Number(input_speed.value());
    par_time = Number(input_time.value());
    par_items = Number(input_items.value());
    par_teamMembers = Number(input_teamMembers.value());
    // SET targets
    par_target_points = Number(input_target_points.value());
}
/***********************************
# destroy input fields
***********************************/
function destroyInputs() {
    // DESTROY game parameters
    input_speed = null;
    input_time = null;
    input_items = null;
    input_teamMembers = null;
    // DESTROY targets
    input_target_points = null;
}
/***********************************
# set random values
***********************************/
function setRandomValues() {
    // SET random game parameters
    input_speed.setValue(String(getRandomNumber(1, 1)));
    input_time.setValue(String(getRandomNumber(30, 120)));
    input_items.setValue(String(getRandomNumber(1, 20)));
    input_teamMembers.setValue(String(getRandomNumber(2, 8)));
    // SET random targets
    input_target_points.setValue(String(getRandomNumber(25, 300)));
}
/***********************************
# pass parameters to game
***********************************/
function setParametersFromLevel(level) {
    par_speed = level.speed;
    par_time = level.time;
    par_items = level.items;
    par_teamMembers = level.teamMembers;
    par_target_points = level.target_points;
}
/************************************************
################# CONSTANTS #####################
************************************************/
var playTime;
var points;
var countdown;
var targetPoints;
var mission_startTime;
var mission_timeDiff;
var mission_done = false;
var mission_loose_string;
/************************************************
################## METHODS ######################
************************************************/
/***********************************
# init Missions
***********************************/
function initMissions() {
    playTime = 0;
    points = 0;
    mission_done = false;
    if (par_time > 0) {
        countdown = par_time * 1000; // Seconds
    }
    targetPoints = 100;
    var now = new Date();
    mission_startTime = now.getTime();
}
/***********************************
# update missions
***********************************/
function updateMissions() {
    var now = new Date();
    var time = now.getTime();
    if (par_time > 0) {
        playTime = Math.round((countdown - (time - mission_startTime)) / 1000);
    }
    else {
        playTime = Math.round((time - mission_startTime) / 1000);
    }
    checkMissions();
}
/***********************************
# check if conditions are met
***********************************/
function checkMissions() {
    // Punkte erreicht
    if (par_target_points > 0 && points >= par_target_points) {
        mission_done = true;
        endGame();
    }
    // Punkte - Zeit abgelaufen
    if (par_target_points > 0 && par_time > 0 && playTime <= 0) {
        mission_loose_string = 'Zeit abgelaufen';
        endGame();
    }
    // Zeit geschafft
    /*
    if(par_time > 0 && playTime <= 0 &&
       par_target_points == 0 && par_target_length == 0){
       
        mission_done = true;
        endGame();
    }*/
}
/***********************************
# draw time
***********************************/
function drawTime() {
    //inputs
    ctx.fillStyle = "black";
    ctx.font = "bold 20px Arial";
    ctx.fillText("Time: " + playTime, 40, 30);
}
/***********************************
# draw points
***********************************/
function drawPoints() {
    //inputs
    ctx.fillStyle = "black";
    ctx.font = "bold 20px Arial";
    ctx.fillText("Points: " + points, 150, 30);
}
/************************************************
################# VARIABLES #####################
************************************************/
/************************************************
################## METHODS ######################
************************************************/
/***********************************
# INIT the scene menu elements
***********************************/
function initScenes() {
    // first scene
    gameEngine.sceneMenuController.scenes.push(new Scene(50, 150, 1, 'Intro', false));
    gameEngine.sceneMenuController.loadSceneStats();
}
//FAKE OBJECT!!!
class CanvasInput {
    constructor(object) {
    }
    render() {
    }
    value() {
        return '';
    }
    setValue(data) {
    }
}
class CircleCollider {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }
}
class TempCollider {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
const BALL_STATE_ONGROUND = 0;
const BALL_STATE_INAIR = 1;
const BALL_STATE_FALLING = 2;
const BALL_STATE_TAKEN = 3;
class Ball {
    constructor(x, y, ui) {
        this.ui = ui;
        var date = Date.now();
        this.id = date.toString();
        this.x = x;
        this.y = y;
        this.radius = 7;
        this.color = 'red';
        this.speedX = 0;
        this.speedY = 0;
    }
    getSyncObject() {
        return {
            id: this.id,
            x: this.x,
            y: this.y,
            speedX: this.speedX,
            speedY: this.speedY,
            state: this.state,
            lastHolderId: this.lastHolderId
        };
    }
    syncBallState(serverBall) {
        this.id = serverBall.id;
        this.x = serverBall.x;
        this.y = serverBall.y;
        this.speedX = serverBall.speedX;
        this.speedY = serverBall.speedY;
        this.state = serverBall.state;
        this.lastX = serverBall.x;
        this.lastY = serverBall.y;
        this.lastHolderId = serverBall.lastHolderId;
    }
    init() {
    }
    // LOGIC
    update(timeDiff) {
        // MOVEMENT
        this.x += this.speedX * timeDiff;
        this.y += this.speedY * timeDiff;
        if (this.state == BALL_STATE_FALLING) {
            this.speedX *= 0.9;
            this.speedY *= 0.9;
            if (Math.abs(this.speedX) < 0.01)
                this.speedX = 0;
            if (Math.abs(this.speedY) < 0.01)
                this.speedY = 0;
            if (this.speedX == 0 && this.speedY == 0) {
                this.state = BALL_STATE_ONGROUND;
            }
        }
        // COLLISIONS
        var col = false;
        // Meeting Room
        if (this.x - this.radius <= meetingRoom.border)
            col = true; //left
        else if (this.y + this.radius >= CANVAS_HEIGHT - meetingRoom.border)
            col = true; //down
        else if (this.y - this.radius <= meetingRoom.border)
            col = true; //up
        else if (this.x + this.radius >= CANVAS_WIDTH - meetingRoom.border)
            col = true; //right
        //Basket
        else if (colCheckCirlces(this.x, this.y, this.radius, ballBasket.x, ballBasket.y, ballBasket.radius))
            col = true;
        //Balls
        for (var i = 0; i < balls.length; i++) {
            if (balls[i].state == BALL_STATE_INAIR && balls[i].x != this.x && balls[i].y != this.y)
                if (colCheckCirlces(this.x, this.y, this.radius, balls[i].x, balls[i].y, balls[i].radius))
                    col = true;
        }
        //Players   
        if (this.lastHolderId != player.id && colCheckCirlces(this.x, this.y, this.radius, player.x, player.y, player.radius))
            col = true;
        for (var i = 0; i < players.length; i++) {
            if (this.lastHolderId != players[i].id && colCheckCirlces(this.x, this.y, this.radius, players[i].middleX, players[i].middleY, players[i].radius))
                col = true;
        }
        if (col) { // reset to last save position
            this.x = this.lastX;
            this.y = this.lastY;
            this.speedX *= -0.6;
            this.speedY *= -0.6;
            this.state = BALL_STATE_FALLING;
        }
        else { // save position
            this.lastX = this.x;
            this.lastY = this.y;
        }
        if (this.state != this.lastState) { // this.lastHolderId == player.id && 
            socket.emit('sync ball', this.getSyncObject());
            this.lastState = this.state;
        }
    }
    take(player) {
        this.state = BALL_STATE_TAKEN;
        this.speedX = 0;
        this.speedY = 0;
        this.lastHolderId = player.id;
    }
    shoot(shootAngle, shootSpeed) {
        this.speedX = shootSpeed * (Math.cos(shootAngle));
        this.speedY = shootSpeed * (Math.sin(shootAngle));
        this.state = BALL_STATE_INAIR;
    }
    // UI
    draw() {
        if (!this.ui)
            return;
        if (this.state != BALL_STATE_TAKEN) {
            if (drawColliders)
                drawCyrcle(this.x, this.y, this.radius + 1, 'blue');
            drawCyrcle(this.x, this.y, this.radius, this.color);
        }
    }
    // UTILS
    getShootAngle(shootTargetX, shootTargetY, playerPosX, playerPosY) {
        var dx = shootTargetX - playerPosX;
        // Minus to correct for coord re-mapping
        var dy = (shootTargetY - playerPosY) * -1;
        var inRads = Math.atan2(dy, dx);
        // We need to map to coord system when 0 degree is at 3 O'clock, 270 at 12 O'clock
        if (inRads < 0)
            inRads = inRads + 2 * Math.PI;
        //inRads = Math.abs(inRads);
        //else
        //inRads = inRads + 2*Math.PI;
        //inRads = 2*Math.PI - inRads;
        //if (inRads < 0) inRads -= 2 * Math.PI;
        return this.radToDegree(inRads);
    }
    radToDegree(radValue) {
        var pi = Math.PI;
        var ra_de = radValue * (180 / pi);
        return ra_de;
    }
    degreeToRad(degreeValue) {
        var pi = Math.PI;
        var de_ra = degreeValue * (pi / 180);
        return de_ra;
    }
    getDistance(fromX, fromY, toX, toY) {
        var a = Math.abs(fromX - toX);
        var b = Math.abs(fromY - toY);
        return Math.sqrt((a * a) + (b * b));
    }
}
class BallBasket {
    constructor(x, y, ui) {
        this.radius = 30;
        this.ballRadius = 7;
        this.ballColor = 'red';
        this.x = x;
        this.y = y;
        this.ui = ui;
    }
    update(timeDiff) {
    }
    draw() {
        if (!this.ui)
            return;
        //Basket
        if (drawColliders)
            this.drawBasketColider();
        drawCyrcle(this.x, this.y, this.radius, 'chocolate');
        //balls
        for (var i = -12; i <= 12; i += 12) {
            for (var j = -12; j <= 12; j += 12) {
                drawCyrcle(this.x + i, this.y + j, this.ballRadius, this.ballColor);
            }
        }
    }
    drawBasketColider() {
        drawCyrcle(this.x, this.y, this.radius + 1, 'blue');
    }
}
class MeetingRoom {
    constructor(ui) {
        this.border = 100;
        this.ui = ui;
        if (ui) {
            this.spriteBG = new Image();
            this.spriteBG.src = "/static/resources/meetingRoom3.png";
            this.spriteBGWidth = 1024;
            this.spriteBGHeight = 768;
        }
    }
    update(timeDiff) {
    }
    draw() {
        if (!this.ui)
            return;
        //BG
        ctx.drawImage(this.spriteBG, 0, 0, this.spriteBGWidth, this.spriteBGHeight, // sprite cutout position and size
        0, 0, 900, 1000); // draw position and size
        if (drawColliders)
            this.drawBorder();
    }
    drawBorder() {
        //draw border
        ctx.beginPath();
        ctx.strokeStyle = 'blue';
        ctx.rect(this.border, this.border, CANVAS_WIDTH - this.border * 2, CANVAS_HEIGHT - this.border * 2);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
    }
}
class Player {
    constructor(x, y, ui, syncToServer) {
        this.speed = 0.2;
        this.ui = ui;
        this.syncToServer = syncToServer;
        var date = Date.now();
        this.id = date.toString();
        this.x = x;
        this.y = y;
        this.width = 70;
        this.height = 60;
        this.middleX = this.x + this.width / 2;
        this.middleY = this.y + this.height / 2;
        this.radius = 30;
        this.rotation = 180;
        this.actionCircleRadius = 30;
        if (ui) {
            this.sprite = new Image();
            this.sprite.src = "/static/resources/person_blue_stand.png";
            this.spriteWidth = 218;
            this.spriteHeight = 170;
        }
        if (this.syncToServer)
            socket.emit('new player', this.getSyncObject(), new MeetingRoom(false), new BallBasket(200, 130, false));
    }
    getSyncObject() {
        return {
            id: this.id,
            socketId: this.socketId,
            x: this.x,
            y: this.y,
            middleX: this.middleX,
            middleY: this.middleY,
            rotation: this.rotation,
            rightHand: this.rightHand != null,
            leftHand: this.leftHand != null,
            moveUp: this.moveUp,
            moveDown: this.moveDown,
            moveLeft: this.moveLeft,
            moveRight: this.moveRight
        };
    }
    init() {
    }
    syncPlayerState(player) {
        //console.log('syncPlayerState from ' + this.id);
        this.id = player.id;
        this.x = player.x;
        this.y = player.y;
        this.socketId = player.socketId;
        this.middleX = player.middleX;
        this.middleY = player.middleY;
        this.rotation = player.rotation;
        this.moveUp = player.moveUp;
        this.moveDown = player.moveDown;
        this.moveLeft = player.moveLeft;
        this.moveRight = player.moveRight;
        if (player.rightHand)
            this.rightHand = new Ball(this.x, this.y, true);
        else
            this.rightHand = null;
        if (player.leftHand)
            this.leftHand = new Ball(this.x, this.y, true);
        else
            this.leftHand = null;
    }
    // CONTROLS
    updateControls() {
        // W
        if (keys[87])
            this.moveUp = true;
        else
            this.moveUp = false;
        // A
        if (keys[65])
            this.moveLeft = true;
        else
            this.moveLeft = false;
        // S
        if (keys[83])
            this.moveDown = true;
        else
            this.moveDown = false;
        // D
        if (keys[68])
            this.moveRight = true;
        else
            this.moveRight = false;
        this.lookX = mousePosX;
        this.lookY = mousePosY;
    }
    checkClick(mouseX, mouseY, clickType) {
        console.log("clicked");
        if (clickType == CLICK_LEFT)
            this.clickedLeft = true;
        if (clickType == CLICK_RIGHT)
            this.clickedRight = true;
        this.clickedX = mouseX;
        this.clickedY = mouseY;
    }
    // LOGIC
    update(timeDiff) {
        // MOVEMENT
        if (this.moveUp)
            this.y -= this.speed * timeDiff;
        if (this.moveLeft)
            this.x -= this.speed * timeDiff;
        if (this.moveDown)
            this.y += this.speed * timeDiff;
        if (this.moveRight)
            this.x += this.speed * timeDiff;
        this.middleX = this.x + this.width / 2;
        this.middleY = this.y + this.height / 2;
        // COLLISIONS
        var col = false;
        // Meeting Room
        if (this.middleX - this.radius <= meetingRoom.border)
            col = true; //left
        else if (this.middleY + this.radius >= CANVAS_HEIGHT - meetingRoom.border)
            col = true; //down
        else if (this.middleY - this.radius <= meetingRoom.border)
            col = true; //up
        else if (this.middleX + this.radius >= CANVAS_WIDTH - meetingRoom.border)
            col = true; //right
        //Basket
        else if (colCheckCirlces(this.middleX, this.middleY, this.radius, ballBasket.x, ballBasket.y, ballBasket.radius))
            col = true;
        //Balls
        for (var i = 0; i < balls.length; i++) {
            if (balls[i].state == BALL_STATE_INAIR)
                if (colCheckCirlces(this.x, this.y, this.radius, balls[i].x, balls[i].y, balls[i].radius))
                    col = true;
        }
        //Players   
        for (var i = 0; i < players.length; i++) {
            //if(colCheckCirlces(this.x, this.y, this.radius, players[i].middleX, players[i].middleY, players[i].radius)) col = true;
        }
        if (col) { // reset to last save position
            this.x = this.lastX;
            this.y = this.lastY;
            this.middleX = this.x + this.width / 2;
            this.middleY = this.y + this.height / 2;
        }
        else { // save position
            this.lastX = this.x;
            this.lastY = this.y;
        }
        // OTHER STUFF
        this.rotation = -this.getShootAngle(this.lookX, this.lookY, this.x + this.width / 2, this.y + this.height / 2) - 90;
        this.setActionAreaCircle();
        if (this.rightHand != null) {
            this.rightHand.x = this.middleX;
            this.rightHand.y = this.middleY;
        }
        if (this.leftHand != null) {
            this.leftHand.x = this.middleX;
            this.leftHand.y = this.middleY;
        }
        if (this.clickedLeft) {
            this.performAction(CLICK_LEFT);
            this.clickedLeft = false;
        }
        if (this.clickedRight) {
            this.performAction(CLICK_RIGHT);
            this.clickedRight = false;
        }
        if (this.syncToServer)
            socket.emit('player sync', this.getSyncObject());
    }
    setActionAreaCircle() {
        var fAngle = this.degreeToRad(-this.rotation + 90);
        var diagonalDistX = (this.radius + this.actionCircleRadius) * (Math.cos(fAngle));
        var diagonalDistY = -(this.radius + this.actionCircleRadius) * (Math.sin(fAngle));
        this.actionCircleX = this.middleX - diagonalDistX / 3;
        this.actionCircleY = this.middleY - diagonalDistY / 3;
    }
    performAction(clickType) {
        if (clickType == CLICK_LEFT && this.leftHand != null
            || clickType == CLICK_RIGHT && this.rightHand != null) {
            //check BallBasket
            if (colCheckCirlces(this.actionCircleX, this.actionCircleY, this.actionCircleRadius, ballBasket.x, ballBasket.y, ballBasket.radius)) {
                if (clickType == CLICK_LEFT)
                    this.leftHand = null;
                if (clickType == CLICK_RIGHT)
                    this.rightHand = null;
                return;
            }
            this.shootBall(clickType);
        }
        else { // nothing in Hand
            // check Balls
            for (var i = 0; i < balls.length; i++) {
                if (colCheckCirlces(this.actionCircleX, this.actionCircleY, this.actionCircleRadius, balls[i].x, balls[i].y, balls[i].radius)) {
                    this.takeBall(balls[i], clickType);
                    balls.splice(i, 1);
                    return;
                }
            }
            //check BallBasket
            if (colCheckCirlces(this.actionCircleX, this.actionCircleY, this.actionCircleRadius, ballBasket.x, ballBasket.y, ballBasket.radius)) {
                var newBall = new Ball(this.middleX, this.middleY, true);
                this.takeBall(newBall, clickType);
            }
        }
    }
    takeBall(ball, clickType) {
        if (clickType == CLICK_RIGHT)
            this.rightHand = ball;
        if (clickType == CLICK_LEFT)
            this.leftHand = ball;
        ball.take(this);
        if (this.syncToServer)
            socket.emit('take ball', ball.getSyncObject());
    }
    shootBall(clickType) {
        var fAngle = this.degreeToRad(this.rotation + 90);
        if (clickType == CLICK_RIGHT)
            this.rightHand.shoot(fAngle, 0.5);
        if (clickType == CLICK_LEFT)
            this.leftHand.shoot(fAngle, 0.5);
        if (this.syncToServer) {
            if (clickType == CLICK_RIGHT)
                socket.emit('throw ball', this.rightHand.getSyncObject());
            if (clickType == CLICK_LEFT)
                socket.emit('throw ball', this.leftHand.getSyncObject());
        }
        if (clickType == CLICK_RIGHT)
            balls.push(this.rightHand);
        if (clickType == CLICK_LEFT)
            balls.push(this.leftHand);
        if (clickType == CLICK_RIGHT)
            this.rightHand = null;
        if (clickType == CLICK_LEFT)
            this.leftHand = null;
    }
    // UI STUFF
    draw() {
        if (!this.ui)
            return;
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation * Math.PI / 180);
        //Sprite
        ctx.drawImage(this.sprite, 0, 0, this.spriteWidth, this.spriteHeight, // sprite cutout position and size
        -this.width / 2, -this.height / 2, this.width, this.height); // draw position and size
        if (this.leftHand != null) {
            var myBall = this.leftHand;
            drawCyrcle(13, 13, myBall.radius, myBall.color);
        }
        if (this.rightHand != null) {
            var myBall = this.rightHand;
            drawCyrcle(-13, 15, myBall.radius, myBall.color);
        }
        ctx.rotate(-this.rotation * Math.PI / 180);
        ctx.translate(-this.x - this.width / 2, -this.y - this.height / 2);
        if (drawColliders)
            this.drawActionArea();
    }
    drawActionArea() {
        drawCyrcleOutline(this.middleX, this.middleY, this.radius, 'blue');
        drawCyrcleOutline(this.actionCircleX, this.actionCircleY, this.actionCircleRadius, 'green');
    }
    // UTIL STUFF
    getShootAngle(shootTargetX, shootTargetY, playerPosX, playerPosY) {
        var dx = shootTargetX - playerPosX;
        var dy = (shootTargetY - playerPosY) * -1;
        var inRads = Math.atan2(dy, dx);
        if (inRads < 0)
            inRads = inRads + 2 * Math.PI;
        return this.radToDegree(inRads);
    }
    radToDegree(radValue) {
        var pi = Math.PI;
        var ra_de = radValue * (180 / pi);
        return ra_de;
    }
    degreeToRad(degreeValue) {
        var pi = Math.PI;
        var de_ra = degreeValue * (pi / 180);
        return de_ra;
    }
    getDistance(fromX, fromY, toX, toY) {
        var a = Math.abs(fromX - toX);
        var b = Math.abs(fromY - toY);
        return Math.sqrt((a * a) + (b * b));
    }
}
/************************************************
################# CONSTANTS #####################
************************************************/
/************************************************
################# VARIABLES #####################
************************************************/
var buttons = [];
/************************************************
################## METHODS ######################
************************************************/
/***********************************
# Init Buttons
***********************************/
function initButtons() {
}
class Button {
    constructor(x, y, width, height, text) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.visible = true;
        this.disabled = false;
    }
    click(object) {
    }
    ;
    show() {
        this.visible = true;
    }
    ;
    hide() {
        this.visible = false;
    }
    ;
    disable() {
        this.disabled = true;
    }
    ;
    enable() {
        this.disabled = false;
    }
    ;
    checkForClick(mouseX, mouseY) {
        if (this.visible && !this.disabled && checkClickOnRectObject(mouseX, mouseY, this)) {
            return true;
        }
    }
    ;
    draw() {
        if (this.visible) {
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.fillRect(this.x, this.y, this.width, this.height);
            if (this.disabled)
                ctx.fillStyle = "grey";
            else
                ctx.fillStyle = "lightgrey";
            ctx.fillRect(this.x + 2, this.y + 2, this.width - 4, this.height - 4);
            ctx.fillStyle = "black";
            ctx.font = "bold 10px Arial";
            ctx.fillText(this.text, this.x + 10, this.y + 15);
            ctx.stroke();
            ctx.closePath();
        }
    }
}
/***************************************
# update Button
***************************************/
function updateButtons() {
}
/***************************************
# draw Buttons
***************************************/
function drawButtons() {
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].visible) {
            buttons[i].draw();
        }
    }
}
/***********************************
# check if button is clicked
***********************************/
function checkButtonsClick(mouseX, mouseY) {
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].visible && !buttons[i].disabled && checkClickOnRectObject(mouseX, mouseY, buttons[i])) {
            buttons[i].click(null);
        }
    }
}
/************************************************
################# CONSTANTS #####################
************************************************/
/************************************************
################## METHODS ######################
************************************************/
/***************************************
# check if a rect object is clicked
# object needs x, y, width, height
***************************************/
function checkClickOnRectObject(mouseX, mouseY, object) {
    if (mouseX > object.x && mouseX < object.x + object.width &&
        mouseY > object.y && mouseY < object.y + object.height) {
        return true;
    }
    else {
        return false;
    }
}
/************************************************
################# CONSTANTS #####################
************************************************/
/************************************************
################## METHODS ######################
************************************************/
/***************************************
# Calculates collisions between
# a point and a cirle
***************************************/
function colCheckCirlcePoint(pX, pY, cX, cY, cR) {
    var a = pX - cX;
    var b = pY - cY;
    var c = Math.sqrt(a * a + b * b);
    if (c < cR)
        return true;
    else
        return false;
}
/***************************************
# Calculates collisions between circles
***************************************/
function colCheckCirlces(aX, aY, aR, cX, cY, cR) {
    var a = Math.abs(aX - cX);
    var b = Math.abs(aY - cY);
    var dist = Math.sqrt((a * a) + (b * b));
    return dist < aR + cR;
}
/***************************************
# Calculates collisions between rect objects
***************************************/
function colCheck(shapeA, shapeB) {
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)), vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)), 
    // add the half widths and half heights of the objects
    hWidths = (shapeA.width / 2) + (shapeB.width / 2), hHeights = (shapeA.height / 2) + (shapeB.height / 2), colDir = null;
    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        // figures out on which side we are colliding (top, bottom, left, or right)
        var oX = hWidths - Math.abs(vX), oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                //shapeA.y += oY;
            }
            else {
                colDir = "b";
                //shapeA.y -= oY;
            }
        }
        else {
            if (vX > 0) {
                colDir = "l";
                //shapeA.x += oX;
            }
            else {
                colDir = "r";
                //shapeA.x -= oX;
            }
        }
    }
    return colDir;
}
/***************************************
# Calculates collisions between objects
# but do not let them overlap
***************************************/
function colCheckWithShapeReset(shapeA, shapeB) {
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)), vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)), 
    // add the half widths and half heights of the objects
    hWidths = (shapeA.width / 2) + (shapeB.width / 2), hHeights = (shapeA.height / 2) + (shapeB.height / 2), colDir = null;
    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        // figures out on which side we are colliding (top, bottom, left, or right)
        var oX = hWidths - Math.abs(vX), oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                shapeA.y += oY;
            }
            else {
                colDir = "b";
                shapeA.y -= oY;
            }
        }
        else {
            if (vX > 0) {
                colDir = "l";
                shapeA.x += oX;
            }
            else {
                colDir = "r";
                shapeA.x -= oX;
            }
        }
    }
    return colDir;
}
/***************************************
# Calculates collisions between 2 lines
# returns the point of collision
***************************************/
function checkLineCollision(p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y) {
    var d1x = p1x - p0x, d1y = p1y - p0y, d2x = p3x - p2x, d2y = p3y - p2y, 
    // determinator
    d = d1x * d2y - d2x * d1y, px, py, s, t;
    // continue if intersecting/is not parallel
    if (d) {
        px = p0x - p2x;
        py = p0y - p2y;
        s = (d1x * py - d1y * px) / d;
        if (s >= 0 && s <= 1) {
            // if s was in range, calc t
            t = (d2x * py - d2y * px) / d;
            if (t >= 0 && t <= 1) {
                return { x: p0x + (t * d1x),
                    y: p0y + (t * d1y) };
            }
        }
    }
    return null;
}
/************************************************
################# CONSTANTS #####################
************************************************/
/************************************************
################## METHODS ######################
************************************************/
/***************************************
# write var to cookie
***************************************/
function setCookie(name, value) {
    document.cookie = name + "=" + value;
}
/***************************************
# delete cookie
***************************************/
function deleteCookie(name) {
    var d = new Date();
    d.setTime(d.getTime() - (24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=; " + expires;
}
/***************************************
# load cookie
***************************************/
function getCookie(name) {
    var cName = name + "=";
    //alert("cookie: " + document.cookie);
    // get all cookies
    var cookieArray = document.cookie.split(';');
    // loop all cookies
    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        // leerzeichen wegschneiden
        while (cookie.charAt(0) == ' ')
            cookie = cookie.substring(1);
        // prüfen ob das cookie gefuden wurde und returnen
        if (cookie.indexOf(cName) == 0)
            return cookie.substring(cName.length, cookie.length);
    }
    return "";
}
/************************************************
################# CONSTANTS #####################
************************************************/
/************************************************
################## METHODS ######################
************************************************/
/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke === 'undefined') {
        stroke = true;
    }
    if (typeof radius === 'undefined') {
        radius = 5;
    }
    if (typeof radius === 'number') {
        radius = { tl: radius, tr: radius, br: radius, bl: radius };
    }
    else {
        var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
        for (var side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
        }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
        ctx.fill();
    }
    if (stroke) {
        ctx.stroke();
    }
}
function drawCyrcle(x, y, radius, farbe) {
    // set draw parameters
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = farbe;
    ctx.fillStyle = farbe;
    // circle
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}
function drawCyrcleOutline(x, y, radius, farbe) {
    // set draw parameters
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = farbe;
    ctx.fillStyle = farbe;
    // circle
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
}
/************************************************
################# CONSTANTS #####################
************************************************/
/************************************************
################## METHODS ######################
************************************************/
/***************************************
# get random number 2 numbers
***************************************/
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
/***************************************
# get random enry from array
***************************************/
function getRandomEntryFromNumberedArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}
/***************************************
# make the first char of String to Upper
***************************************/
function capFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
/***************************************
# get random name
***************************************/
function getRandomName() {
    var name1 = ["abandoned", "able", "absolute", "adorable", "adventurous", "academic", "acceptable", "acclaimed", "accomplished", "accurate", "aching", "acidic", "acrobatic", "active", "actual", "adept", "admirable", "admired", "adolescent", "adorable", "adored", "advanced", "afraid", "affectionate", "aged", "aggravating", "aggressive", "agile", "agitated", "agonizing", "agreeable", "ajar", "alarmed", "alarming", "alert", "alienated", "alive", "all", "altruistic", "amazing", "ambitious", "ample", "amused", "amusing", "anchored", "ancient", "angelic", "angry", "anguished", "animated", "annual", "another", "antique", "anxious", "any", "apprehensive", "appropriate", "apt", "arctic", "arid", "aromatic", "artistic", "ashamed", "assured", "astonishing", "athletic", "attached", "attentive", "attractive", "austere", "authentic", "authorized", "automatic", "avaricious", "average", "aware", "awesome", "awful", "awkward", "babyish", "bad", "back", "baggy", "bare", "barren", "basic", "beautiful", "belated", "beloved", "beneficial", "better", "best", "bewitched", "big", "big-hearted", "biodegradable", "bite-sized", "bitter", "black", "black-and-white", "bland", "blank", "blaring", "bleak", "blind", "blissful", "blond", "blue", "blushing", "bogus", "boiling", "bold", "bony", "boring", "bossy", "both", "bouncy", "bountiful", "bowed", "brave", "breakable", "brief", "bright", "brilliant", "brisk", "broken", "bronze", "brown", "bruised", "bubbly", "bulky", "bumpy", "buoyant", "burdensome", "burly", "bustling", "busy", "buttery", "buzzing", "calculating", "calm", "candid", "canine", "capital", "carefree", "careful", "careless", "caring", "cautious", "cavernous", "celebrated", "charming", "cheap", "cheerful", "cheery", "chief", "chilly", "chubby", "circular", "classic", "clean", "clear", "clear-cut", "clever", "close", "closed", "cloudy", "clueless", "clumsy", "cluttered", "coarse", "cold", "colorful", "colorless", "colossal", "comfortable", "common", "compassionate", "competent", "complete", "complex", "complicated", "composed", "concerned", "concrete", "confused", "conscious", "considerate", "constant", "content", "conventional", "cooked", "cool", "cooperative", "coordinated", "corny", "corrupt", "costly", "courageous", "courteous", "crafty", "crazy", "creamy", "creative", "creepy", "criminal", "crisp", "critical", "crooked", "crowded", "cruel", "crushing", "cuddly", "cultivated", "cultured", "cumbersome", "curly", "curvy", "cute", "cylindrical", "damaged", "damp", "dangerous", "dapper", "daring", "darling", "dark", "dazzling", "dead", "deadly", "deafening", "dear", "dearest", "decent", "decimal", "decisive", "deep", "defenseless", "defensive", "defiant", "deficient", "definite", "definitive", "delayed", "delectable", "delicious", "delightful", "delirious", "demanding", "dense", "dental", "dependable", "dependent", "descriptive", "deserted", "detailed", "determined", "devoted", "different", "difficult", "digital", "diligent", "dim", "dimpled", "dimwitted", "direct", "disastrous", "discrete", "disfigured", "disgusting", "disloyal", "dismal", "distant", "downright", "dreary", "dirty", "disguised", "dishonest", "dismal", "distant", "distinct", "distorted", "dizzy", "dopey", "doting", "double", "downright", "drab", "drafty", "dramatic", "dreary", "droopy", "dry", "dual", "dull", "dutiful", "each", "eager", "earnest", "early", "easy", "easy-going", "ecstatic", "edible", "educated", "elaborate", "elastic", "elated", "elderly", "electric", "elegant", "elementary", "elliptical", "embarrassed", "embellished", "eminent", "emotional", "empty", "enchanted", "enchanting", "energetic", "enlightened", "enormous", "enraged", "entire", "envious", "equal", "equatorial", "essential", "esteemed", "ethical", "euphoric", "even", "evergreen", "everlasting", "every", "evil", "exalted", "excellent", "exemplary", "exhausted", "excitable", "excited", "exciting", "exotic", "expensive", "experienced", "expert", "extraneous", "extroverted", "extra-large", "extra-small", "fabulous", "failing", "faint", "fair", "faithful", "fake", "false", "familiar", "famous", "fancy", "fantastic", "far", "faraway", "far-flung", "far-off", "fast", "fat", "fatal", "fatherly", "favorable", "favorite", "fearful", "fearless", "feisty", "feline", "female", "feminine", "few", "fickle", "filthy", "fine", "finished", "firm", "first", "firsthand", "fitting", "fixed", "flaky", "flamboyant", "flashy", "flat", "flawed", "flawless", "flickering", "flimsy", "flippant", "flowery", "fluffy", "fluid", "flustered", "focused", "fond", "foolhardy", "foolish", "forceful", "forked", "formal", "forsaken", "forthright", "fortunate", "fragrant", "frail", "frank", "frayed", "free", "French", "fresh", "frequent", "friendly", "frightened", "frightening", "frigid", "frilly", "frizzy", "frivolous", "front", "frosty", "frozen", "frugal", "fruitful", "full", "fumbling", "functional", "funny", "fussy", "fuzzy", "gargantuan", "gaseous", "general", "generous", "gentle", "genuine", "giant", "giddy", "gigantic", "gifted", "giving", "glamorous", "glaring", "glass", "gleaming", "gleeful", "glistening", "glittering", "gloomy", "glorious", "glossy", "glum", "golden", "good", "good-natured", "gorgeous", "graceful", "gracious", "grand", "grandiose", "granular", "grateful", "grave", "gray", "great", "greedy", "green", "gregarious", "grim", "grimy", "gripping", "grizzled", "gross", "grotesque", "grouchy", "grounded", "growing", "growling", "grown", "grubby", "gruesome", "grumpy", "guilty", "gullible", "gummy", "hairy", "half", "handmade", "handsome", "handy", "happy", "happy-go-lucky", "hard", "hard-to-find", "harmful", "harmless", "harmonious", "harsh", "hasty", "hateful", "haunting", "healthy", "heartfelt", "hearty", "heavenly", "heavy", "hefty", "helpful", "helpless", "hidden", "hideous", "high", "high-level", "hilarious", "hoarse", "hollow", "homely", "honest", "honorable", "honored", "hopeful", "horrible", "hospitable", "hot", "huge", "humble", "humiliating", "humming", "humongous", "hungry", "hurtful", "husky", "icky", "icy", "ideal", "idealistic", "identical", "idle", "idiotic", "idolized", "ignorant", "ill", "illegal", "ill-fated", "ill-informed", "illiterate", "illustrious", "imaginary", "imaginative", "immaculate", "immaterial", "immediate", "immense", "impassioned", "impeccable", "impartial", "imperfect", "imperturbable", "impish", "impolite", "important", "impossible", "impractical", "impressionable", "impressive", "improbable", "impure", "inborn", "incomparable", "incompatible", "incomplete", "inconsequential", "incredible", "indelible", "inexperienced", "indolent", "infamous", "infantile", "infatuated", "inferior", "infinite", "informal", "innocent", "insecure", "insidious", "insignificant", "insistent", "instructive", "insubstantial", "intelligent", "intent", "intentional", "interesting", "internal", "international", "intrepid", "ironclad", "irresponsible", "irritating", "itchy", "jaded", "jagged", "jam-packed", "jaunty", "jealous", "jittery", "joint", "jolly", "jovial", "joyful", "joyous", "jubilant", "judicious", "juicy", "jumbo", "junior", "jumpy", "juvenile", "kaleidoscopic", "keen", "key", "kind", "kindhearted", "kindly", "klutzy", "knobby", "knotty", "knowledgeable", "knowing", "known", "kooky", "kosher", "lame", "lanky", "large", "last", "lasting", "late", "lavish", "lawful", "lazy", "leading", "lean", "leafy", "left", "legal", "legitimate", "light", "lighthearted", "likable", "likely", "limited", "limp", "limping", "linear", "lined", "liquid", "little", "live", "lively", "livid", "loathsome", "lone", "lonely", "long", "long-term", "loose", "lopsided", "lost", "loud", "lovable", "lovely", "loving", "low", "loyal", "lucky", "lumbering", "luminous", "lumpy", "lustrous", "luxurious", "mad", "made-up", "magnificent", "majestic", "major", "male", "mammoth", "married", "marvelous", "masculine", "massive", "mature", "meager", "mealy", "mean", "measly", "meaty", "medical", "mediocre", "medium", "meek", "mellow", "melodic", "memorable", "menacing", "merry", "messy", "metallic", "mild", "milky", "mindless", "miniature", "minor", "minty", "miserable", "miserly", "misguided", "misty", "mixed", "modern", "modest", "moist", "monstrous", "monthly", "monumental", "moral", "mortified", "motherly", "motionless", "mountainous", "muddy", "muffled", "multicolored", "mundane", "murky", "mushy", "musty", "muted", "mysterious", "naive", "narrow", "nasty", "natural", "naughty", "nautical", "near", "neat", "necessary", "needy", "negative", "neglected", "negligible", "neighboring", "nervous", "new", "next", "nice", "nifty", "nimble", "nippy", "nocturnal", "noisy", "nonstop", "normal", "notable", "noted", "noteworthy", "novel", "noxious", "numb", "nutritious", "nutty", "obedient", "obese", "oblong", "oily", "oblong", "obvious", "occasional", "odd", "oddball", "offbeat", "offensive", "official", "old", "old-fashioned", "only", "open", "optimal", "optimistic", "opulent", "orange", "orderly", "organic", "ornate", "ornery", "ordinary", "original", "other", "our", "outlying", "outgoing", "outlandish", "outrageous", "outstanding", "oval", "overcooked", "overdue", "overjoyed", "overlooked", "palatable", "pale", "paltry", "parallel", "parched", "partial", "passionate", "past", "pastel", "peaceful", "peppery", "perfect", "perfumed", "periodic", "perky", "personal", "pertinent", "pesky", "pessimistic", "petty", "phony", "physical", "piercing", "pink", "pitiful", "plain", "plaintive", "plastic", "playful", "pleasant", "pleased", "pleasing", "plump", "plush", "polished", "polite", "political", "pointed", "pointless", "poised", "poor", "popular", "portly", "posh", "positive", "possible", "potable", "powerful", "powerless", "practical", "precious", "present", "prestigious", "pretty", "precious", "previous", "pricey", "prickly", "primary", "prime", "pristine", "private", "prize", "probable", "productive", "profitable", "profuse", "proper", "proud", "prudent", "punctual", "pungent", "puny", "pure", "purple", "pushy", "putrid", "puzzled", "puzzling", "quaint", "qualified", "quarrelsome", "quarterly", "queasy", "querulous", "questionable", "quick", "quick-witted", "quiet", "quintessential", "quirky", "quixotic", "quizzical", "radiant", "ragged", "rapid", "rare", "rash", "raw", "recent", "reckless", "rectangular", "ready", "real", "realistic", "reasonable", "red", "reflecting", "regal", "regular", "reliable", "relieved", "remarkable", "remorseful", "remote", "repentant", "required", "respectful", "responsible", "repulsive", "revolving", "rewarding", "rich", "rigid", "right", "ringed", "ripe", "roasted", "robust", "rosy", "rotating", "rotten", "rough", "round", "rowdy", "royal", "rubbery", "rundown", "ruddy", "rude", "runny", "rural", "rusty", "sad", "safe", "salty", "same", "sandy", "sane", "sarcastic", "sardonic", "satisfied", "scaly", "scarce", "scared", "scary", "scented", "scholarly", "scientific", "scornful", "scratchy", "scrawny", "second", "secondary", "second-hand", "secret", "self-assured", "self-reliant", "selfish", "sentimental", "separate", "serene", "serious", "serpentine", "several", "severe", "shabby", "shadowy", "shady", "shallow", "shameful", "shameless", "sharp", "shimmering", "shiny", "shocked", "shocking", "shoddy", "short", "short-term", "showy", "shrill", "shy", "sick", "silent", "silky", "silly", "silver", "similar", "simple", "simplistic", "sinful", "single", "sizzling", "skeletal", "skinny", "sleepy", "slight", "slim", "slimy", "slippery", "slow", "slushy", "small", "smart", "smoggy", "smooth", "smug", "snappy", "snarling", "sneaky", "sniveling", "snoopy", "sociable", "soft", "soggy", "solid", "somber", "some", "spherical", "sophisticated", "sore", "sorrowful", "soulful", "soupy", "sour", "Spanish", "sparkling", "sparse", "specific", "spectacular", "speedy", "spicy", "spiffy", "spirited", "spiteful", "splendid", "spotless", "spotted", "spry", "square", "squeaky", "squiggly", "stable", "staid", "stained", "stale", "standard", "starchy", "stark", "starry", "steep", "sticky", "stiff", "stimulating", "stingy", "stormy", "straight", "strange", "steel", "strict", "strident", "striking", "striped", "strong", "studious", "stunning", "stupendous", "stupid", "sturdy", "stylish", "subdued", "submissive", "substantial", "subtle", "suburban", "sudden", "sugary", "sunny", "super", "superb", "superficial", "superior", "supportive", "sure-footed", "surprised", "suspicious", "svelte", "sweaty", "sweet", "sweltering", "swift", "sympathetic", "tall", "talkative", "tame", "tan", "tangible", "tart", "tasty", "tattered", "taut", "tedious", "teeming", "tempting", "tender", "tense", "tepid", "terrible", "terrific", "testy", "thankful", "that", "these", "thick", "thin", "third", "thirsty", "this", "thorough", "thorny", "those", "thoughtful", "threadbare", "thrifty", "thunderous", "tidy", "tight", "timely", "tinted", "tiny", "tired", "torn", "total", "tough", "traumatic", "treasured", "tremendous", "tragic", "trained", "tremendous", "triangular", "tricky", "trifling", "trim", "trivial", "troubled", "true", "trusting", "trustworthy", "trusty", "truthful", "tubby", "turbulent", "twin", "ugly", "ultimate", "unacceptable", "unaware", "uncomfortable", "uncommon", "unconscious", "understated", "unequaled", "uneven", "unfinished", "unfit", "unfolded", "unfortunate", "unhappy", "unhealthy", "uniform", "unimportant", "unique", "united", "unkempt", "unknown", "unlawful", "unlined", "unlucky", "unnatural", "unpleasant", "unrealistic", "unripe", "unruly", "unselfish", "unsightly", "unsteady", "unsung", "untidy", "untimely", "untried", "untrue", "unused", "unusual", "unwelcome", "unwieldy", "unwilling", "unwitting", "unwritten", "upbeat", "upright", "upset", "urban", "usable", "used", "useful", "useless", "utilized", "utter", "vacant", "vague", "vain", "valid", "valuable", "vapid", "variable", "vast", "velvety", "venerated", "vengeful", "verifiable", "vibrant", "vicious", "victorious", "vigilant", "vigorous", "villainous", "violet", "violent", "virtual", "virtuous", "visible", "vital", "vivacious", "vivid", "voluminous", "wan", "warlike", "warm", "warmhearted", "warped", "wary", "wasteful", "watchful", "waterlogged", "watery", "wavy", "wealthy", "weak", "weary", "webbed", "wee", "weekly", "weepy", "weighty", "weird", "welcome", "well-documented", "well-groomed", "well-informed", "well-lit", "well-made", "well-off", "well-to-do", "well-worn", "wet", "which", "whimsical", "whirlwind", "whispered", "white", "whole", "whopping", "wicked", "wide", "wide-eyed", "wiggly", "wild", "willing", "wilted", "winding", "windy", "winged", "wiry", "wise", "witty", "wobbly", "woeful", "wonderful", "wooden", "woozy", "wordy", "worldly", "worn", "worried", "worrisome", "worse", "worst", "worthless", "worthwhile", "worthy", "wrathful", "wretched", "writhing", "wrong", "wry", "yawning", "yearly", "yellow", "yellowish", "young", "youthful", "yummy", "zany", "zealous", "zesty", "zigzag", "rocky"];
    var name2 = ["people", "history", "way", "art", "world", "information", "map", "family", "government", "health", "system", "computer", "meat", "year", "thanks", "music", "person", "reading", "method", "data", "food", "understanding", "theory", "law", "bird", "literature", "problem", "software", "control", "knowledge", "power", "ability", "economics", "love", "internet", "television", "science", "library", "nature", "fact", "product", "idea", "temperature", "investment", "area", "society", "activity", "story", "industry", "media", "thing", "oven", "community", "definition", "safety", "quality", "development", "language", "management", "player", "variety", "video", "week", "security", "country", "exam", "movie", "organization", "equipment", "physics", "analysis", "policy", "series", "thought", "basis", "boyfriend", "direction", "strategy", "technology", "army", "camera", "freedom", "paper", "environment", "child", "instance", "month", "truth", "marketing", "university", "writing", "article", "department", "difference", "goal", "news", "audience", "fishing", "growth", "income", "marriage", "user", "combination", "failure", "meaning", "medicine", "philosophy", "teacher", "communication", "night", "chemistry", "disease", "disk", "energy", "nation", "road", "role", "soup", "advertising", "location", "success", "addition", "apartment", "education", "math", "moment", "painting", "politics", "attention", "decision", "event", "property", "shopping", "student", "wood", "competition", "distribution", "entertainment", "office", "population", "president", "unit", "category", "cigarette", "context", "introduction", "opportunity", "performance", "driver", "flight", "length", "magazine", "newspaper", "relationship", "teaching", "cell", "dealer", "debate", "finding", "lake", "member", "message", "phone", "scene", "appearance", "association", "concept", "customer", "death", "discussion", "housing", "inflation", "insurance", "mood", "woman", "advice", "blood", "effort", "expression", "importance", "opinion", "payment", "reality", "responsibility", "situation", "skill", "statement", "wealth", "application", "city", "county", "depth", "estate", "foundation", "grandmother", "heart", "perspective", "photo", "recipe", "studio", "topic", "collection", "depression", "imagination", "passion", "percentage", "resource", "setting", "ad", "agency", "college", "connection", "criticism", "debt", "description", "memory", "patience", "secretary", "solution", "administration", "aspect", "attitude", "director", "personality", "psychology", "recommendation", "response", "selection", "storage", "version", "alcohol", "argument", "complaint", "contract", "emphasis", "highway", "loss", "membership", "possession", "preparation", "steak", "union", "agreement", "cancer", "currency", "employment", "engineering", "entry", "interaction", "limit", "mixture", "preference", "region", "republic", "seat", "tradition", "virus", "actor", "classroom", "delivery", "device", "difficulty", "drama", "election", "engine", "football", "guidance", "hotel", "match", "owner", "priority", "protection", "suggestion", "tension", "variation", "anxiety", "atmosphere", "awareness", "bread", "climate", "comparison", "confusion", "construction", "elevator", "emotion", "employee", "employer", "guest", "height", "leadership", "mall", "manager", "operation", "recording", "respect", "sample", "transportation", "boring", "charity", "cousin", "disaster", "editor", "efficiency", "excitement", "extent", "feedback", "guitar", "homework", "leader", "mom", "outcome", "permission", "presentation", "promotion", "reflection", "refrigerator", "resolution", "revenue", "session", "singer", "tennis", "basket", "bonus", "cabinet", "childhood", "church", "clothes", "coffee", "dinner", "drawing", "hair", "hearing", "initiative", "judgment", "lab", "measurement", "mode", "mud", "orange", "poetry", "police", "possibility", "procedure", "queen", "ratio", "relation", "restaurant", "satisfaction", "sector", "signature", "significance", "song", "tooth", "town", "vehicle", "volume", "wife", "accident", "airport", "appointment", "arrival", "assumption", "baseball", "chapter", "committee", "conversation", "database", "enthusiasm", "error", "explanation", "farmer", "gate", "girl", "hall", "historian", "hospital", "injury", "instruction", "maintenance", "manufacturer", "meal", "perception", "pie", "poem", "presence", "proposal", "reception", "replacement", "revolution", "river", "son", "speech", "tea", "village", "warning", "winner", "worker", "writer", "assistance", "breath", "buyer", "chest", "chocolate", "conclusion", "contribution", "cookie", "courage", "desk", "drawer", "establishment", "examination", "garbage", "grocery", "honey", "impression", "improvement", "independence", "insect", "inspection", "inspector", "king", "ladder", "menu", "penalty", "piano", "potato", "profession", "professor", "quantity", "reaction", "requirement", "salad", "sister", "supermarket", "tongue", "weakness", "wedding", "affair", "ambition", "analyst", "apple", "assignment", "assistant", "bathroom", "bedroom", "beer", "birthday", "celebration", "championship", "cheek", "client", "consequence", "departure", "diamond", "dirt", "ear", "fortune", "friendship", "funeral", "gene", "girlfriend", "hat", "indication", "intention", "lady", "midnight", "negotiation", "obligation", "passenger", "pizza", "platform", "poet", "pollution", "recognition", "reputation", "shirt", "speaker", "stranger", "surgery", "sympathy", "tale", "throat", "trainer", "uncle", "youth", "time", "work", "film", "water", "money", "example", "while", "business", "study", "game", "life", "form", "air", "day", "place", "number", "part", "field", "fish", "back", "process", "heat", "hand", "experience", "job", "book", "end", "point", "type", "home", "economy", "value", "body", "market", "guide", "interest", "state", "radio", "course", "company", "price", "size", "card", "list", "mind", "trade", "line", "care", "group", "risk", "word", "fat", "force", "key", "light", "training", "name", "school", "top", "amount", "level", "order", "practice", "research", "sense", "service", "piece", "web", "boss", "sport", "fun", "house", "page", "term", "test", "answer", "sound", "focus", "matter", "kind", "soil", "board", "oil", "picture", "access", "garden", "range", "rate", "reason", "future", "site", "demand", "exercise", "image", "case", "cause", "coast", "action", "age", "bad", "boat", "record", "result", "section", "building", "mouse", "cash", "class", "period", "plan", "store", "tax", "side", "subject", "space", "rule", "stock", "weather", "chance", "figure", "man", "model", "source", "beginning", "earth", "program", "chicken", "design", "feature", "head", "material", "purpose", "question", "rock", "salt", "act", "birth", "car", "dog", "object", "scale", "sun", "note", "profit", "rent", "speed", "style", "war", "bank", "craft", "half", "inside", "outside", "standard", "bus", "exchange", "eye", "fire", "position", "pressure", "stress", "advantage", "benefit", "box", "frame", "issue", "step", "cycle", "face", "item", "metal", "paint", "review", "room", "screen", "structure", "view", "account", "ball", "discipline", "medium", "share", "balance", "bit", "black", "bottom", "choice", "gift", "impact", "machine", "shape", "tool", "wind", "address", "average", "career", "culture", "morning", "pot", "sign", "table", "task", "condition", "contact", "credit", "egg", "hope", "ice", "network", "north", "square", "attempt", "date", "effect", "link", "post", "star", "voice", "capital", "challenge", "friend", "self", "shot", "brush", "couple", "exit", "front", "function", "lack", "living", "plant", "plastic", "spot", "summer", "taste", "theme", "track", "wing", "brain", "button", "click", "desire", "foot", "gas", "influence", "notice", "rain", "wall", "base", "damage", "distance", "feeling", "pair", "savings", "staff", "sugar", "target", "text", "animal", "author", "budget", "discount", "file", "ground", "lesson", "minute", "officer", "phase", "reference", "register", "sky", "stage", "stick", "title", "trouble", "bowl", "bridge", "campaign", "character", "club", "edge", "evidence", "fan", "letter", "lock", "maximum", "novel", "option", "pack", "park", "quarter", "skin", "sort", "weight", "baby", "background", "carry", "dish", "factor", "fruit", "glass", "joint", "master", "muscle", "red", "strength", "traffic", "trip", "vegetable", "appeal", "chart", "gear", "ideal", "kitchen", "land", "log", "mother", "net", "party", "principle", "relative", "sale", "season", "signal", "spirit", "street", "tree", "wave", "belt", "bench", "commission", "copy", "drop", "minimum", "path", "progress", "project", "sea", "south", "status", "stuff", "ticket", "tour", "angle", "blue", "breakfast", "confidence", "daughter", "degree", "doctor", "dot", "dream", "duty", "essay", "father", "fee", "finance", "hour", "juice", "luck", "milk", "mouth", "peace", "pipe", "stable", "storm", "substance", "team", "trick", "afternoon", "bat", "beach", "blank", "catch", "chain", "consideration", "cream", "crew", "detail", "gold", "interview", "kid", "mark", "mission", "pain", "pleasure", "score", "screw", "sex", "shop", "shower", "suit", "tone", "window", "agent", "band", "bath", "block", "bone", "calendar", "candidate", "cap", "coat", "contest", "corner", "court", "cup", "district", "door", "east", "finger", "garage", "guarantee", "hole", "hook", "implement", "layer", "lecture", "lie", "manner", "meeting", "nose", "parking", "partner", "profile", "rice", "routine", "schedule", "swimming", "telephone", "tip", "winter", "airline", "bag", "battle", "bed", "bill", "bother", "cake", "code", "curve", "designer", "dimension", "dress", "ease", "emergency", "evening", "extension", "farm", "fight", "gap", "grade", "holiday", "horror", "horse", "host", "husband", "loan", "mistake", "mountain", "nail", "noise", "occasion", "package", "patient", "pause", "phrase", "proof", "race", "relief", "sand", "sentence", "shoulder", "smoke", "stomach", "string", "tourist", "towel", "vacation", "west", "wheel", "wine", "arm", "aside", "associate", "bet", "blow", "border", "branch", "breast", "brother", "buddy", "bunch", "chip", "coach", "cross", "document", "draft", "dust", "expert", "floor", "god", "golf", "habit", "iron", "judge", "knife", "landscape", "league", "mail", "mess", "native", "opening", "parent", "pattern", "pin", "pool", "pound", "request", "salary", "shame", "shelter", "shoe", "silver", "tackle", "tank", "trust", "assist", "bake", "bar", "bell", "bike", "blame", "boy", "brick", "chair", "closet", "clue", "collar", "comment", "conference", "devil", "diet", "fear", "fuel", "glove", "jacket", "lunch", "monitor", "mortgage", "nurse", "pace", "panic", "peak", "plane", "reward", "row", "sandwich", "shock", "spite", "spray", "surprise", "till", "transition", "weekend", "welcome", "yard", "alarm", "bend", "bicycle", "bite", "blind", "bottle", "cable", "candle", "clerk", "cloud", "concert", "counter", "flower", "grandfather", "harm", "knee", "lawyer", "leather", "load", "mirror", "neck", "pension", "plate", "purple", "ruin", "ship", "skirt", "slice", "snow", "specialist", "stroke", "switch", "trash", "tune", "zone", "anger", "award", "bid", "bitter", "boot", "bug", "camp", "candy", "carpet", "cat", "champion", "channel", "clock", "comfort", "cow", "crack", "engineer", "entrance", "fault", "grass", "guy", "hell", "highlight", "incident", "island", "joke", "jury", "leg", "lip", "mate", "motor", "nerve", "passage", "pen", "pride", "priest", "prize", "promise", "resident", "resort", "ring", "roof", "rope", "sail", "scheme", "script", "sock", "station", "toe", "tower", "truck", "witness", "can", "will", "other", "use", "make", "good", "look", "help", "go", "great", "being", "still", "public", "read", "keep", "start", "give", "human", "local", "general", "specific", "long", "play", "feel", "high", "put", "common", "set", "change", "simple", "past", "big", "possible", "particular", "major", "personal", "current", "national", "cut", "natural", "physical", "show", "try", "check", "second", "call", "move", "pay", "let", "increase", "single", "individual", "turn", "ask", "buy", "guard", "hold", "main", "offer", "potential", "professional", "international", "travel", "cook", "alternative", "special", "working", "whole", "dance", "excuse", "cold", "commercial", "low", "purchase", "deal", "primary", "worth", "fall", "necessary", "positive", "produce", "search", "present", "spend", "talk", "creative", "tell", "cost", "drive", "green", "support", "glad", "remove", "return", "run", "complex", "due", "effective", "middle", "regular", "reserve", "independent", "leave", "original", "reach", "rest", "serve", "watch", "beautiful", "charge", "active", "break", "negative", "safe", "stay", "visit", "visual", "affect", "cover", "report", "rise", "walk", "white", "junior", "pick", "unique", "classic", "final", "lift", "mix", "private", "stop", "teach", "western", "concern", "familiar", "fly", "official", "broad", "comfortable", "gain", "rich", "save", "stand", "young", "heavy", "lead", "listen", "valuable", "worry", "handle", "leading", "meet", "release", "sell", "finish", "normal", "press", "ride", "secret", "spread", "spring", "tough", "wait", "brown", "deep", "display", "flow", "hit", "objective", "shoot", "touch", "cancel", "chemical", "cry", "dump", "extreme", "push", "conflict", "eat", "fill", "formal", "jump", "kick", "opposite", "pass", "pitch", "remote", "total", "treat", "vast", "abuse", "beat", "burn", "deposit", "print", "raise", "sleep", "somewhere", "advance", "consist", "dark", "double", "draw", "equal", "fix", "hire", "internal", "join", "kill", "sensitive", "tap", "win", "attack", "claim", "constant", "drag", "drink", "guess", "minor", "pull", "raw", "soft", "solid", "wear", "weird", "wonder", "annual", "count", "dead", "doubt", "feed", "forever", "impress", "repeat", "round", "sing", "slide", "strip", "wish", "combine", "command", "dig", "divide", "equivalent", "hang", "hunt", "initial", "march", "mention", "spiritual", "survey", "tie", "adult", "brief", "crazy", "escape", "gather", "hate", "prior", "repair", "rough", "sad", "scratch", "sick", "strike", "employ", "external", "hurt", "illegal", "laugh", "lay", "mobile", "nasty", "ordinary", "respond", "royal", "senior", "split", "strain", "struggle", "swim", "train", "upper", "wash", "yellow", "convert", "crash", "dependent", "fold", "funny", "grab", "hide", "miss", "permit", "quote", "recover", "resolve", "roll", "sink", "slip", "spare", "suspect", "sweet", "swing", "twist", "upstairs", "usual", "abroad", "brave", "calm", "concentrate", "estimate", "grand", "male", "mine", "prompt", "quiet", "refuse", "regret", "reveal", "rush", "shake", "shift", "shine", "steal", "suck", "surround", "bear", "brilliant", "dare", "dear", "delay", "drunk", "female", "hurry", "inevitable", "invite", "kiss", "neat", "pop", "punch", "quit", "reply", "representative", "resist", "rip", "rub", "silly", "smile", "spell", "stretch", "stupid", "tear", "temporary", "tomorrow", "wake", "wrap", "yesterday", "Thomas", "Tom", "Lieuwe"];
    var name = capFirst(name1[getRandomNumber(0, name1.length + 1)]) + ' ' + capFirst(name2[getRandomNumber(0, name2.length + 1)]);
    return name;
}
/************************************************
################# CONSTANTS #####################
************************************************/
/************************************************
################## METHODS ######################
************************************************/
/***************************************
# get entry from array depending on probabilities
***************************************/
function getEntryFromNumberedProbabilityArray(probabilityArray) {
    //console.log(probabilityArray);
    var totalSum = 0;
    for (var i = 0; i < probabilityArray.length; i++) {
        totalSum = totalSum + probabilityArray[i];
    }
    //console.log("totalSum = " + totalSum);
    var index = getRandomNumber(0, totalSum);
    var i = 0;
    var sum = probabilityArray[i];
    while (sum < index) {
        i = i + 1;
        sum = sum + probabilityArray[i];
    }
    return i;
}
/***************************************
# apply manipulator Array to probability array
***************************************/
function getManipulatedProbabilityArray(probabilityArray, manipulatorArray) {
    var manipulatedArray = [];
    for (var i = 0; i < probabilityArray.length; i++) {
        manipulatedArray[i] = probabilityArray[i] + manipulatorArray[i];
    }
    return manipulatedArray;
}
//# sourceMappingURL=mybundle.js.map