//by: Jason Rissover

var stage;
var canvas;
var context;

var timer = 0;

var FPS = 30;
var touch;


var mainButton;
var buttonLabel;

var loader;

var spriteSheets;

var curLevel=1;

var levelProgress = 1;

init();

function init() {

    canvas = document.createElement( 'canvas' );
    document.body.appendChild( canvas );
    canvas.style.position = 'absolute';
    canvas.style.top = '0px';
    canvas.style.left = '0px';
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth ;

    stage = new createjs.Stage(canvas);

    touch =  createjs.Touch.isSupported();
    if(touch){
        createjs.Touch.enable(stage,true);
    }

    context = canvas.getContext("2d");
    
    //initGame();
    //initMenu();

    
    loadAssets();
    
    setInterval( function() { stage.update();   } , 1000/FPS ); 
    //draw();
}

function initMainMenu(){

    stage.removeAllChildren();


    var startGameButton = new createjs.Shape();
    var g = startGameButton.graphics;
    g.beginFill("#FFF");
    g.drawRoundRect(canvas.width * 0.25 , canvas.height * 0.4 , canvas.width  * 0.5 ,  canvas.height * 0.1 , 100 )
    g.endFill();
    stage.addChild(startGameButton);
    startGameButton.on("mousedown", function(evt) {
        if((touch && evt.pointerID == 0)|| !touch){
            //initGame(levels[1]);
            initLevelSelectMenu();
        }
        
    });

    var buttonLabel = new createjs.Text("Start Game", "30px Arial", "#000");
    buttonLabel.textAlign = "center";
    buttonLabel.x = canvas.width  * 0.5;
    buttonLabel.y = canvas.height * 0.425;
    stage.addChild(buttonLabel);



    var editDeckButton = new createjs.Shape();
    var g = editDeckButton.graphics;
    g.beginFill("#FFF");
    g.drawRoundRect(canvas.width * 0.25 , canvas.height * 0.6 , canvas.width  * 0.5 ,  canvas.height * 0.1 , 100 )
    g.endFill();
    stage.addChild(editDeckButton);
    editDeckButton.on("mousedown", function(evt) {
        //console.log("todo deck editor");
    });

    var editDeckButtonLabel = new createjs.Text("Edit Deck", "30px Arial", "#000");
    editDeckButtonLabel.textAlign = "center";
    editDeckButtonLabel.x = canvas.width  * 0.5;
    editDeckButtonLabel.y = canvas.height * 0.625;
    stage.addChild(editDeckButtonLabel);



    var exitGameButton = new createjs.Shape();
    var g = exitGameButton.graphics;
    g.beginFill("#FFF");
    g.drawRoundRect(canvas.width * 0.25 , canvas.height * 0.8 , canvas.width  * 0.5 ,  canvas.height * 0.1 , 100 )
    g.endFill();
    stage.addChild(exitGameButton);
    exitGameButton.on("mousedown", function(evt) {
        //console.log("todo exit button");
    });

    var exitGameButtonLabel = new createjs.Text("Exit Game", "30px Arial", "#000");
    exitGameButtonLabel.textAlign = "center";
    exitGameButtonLabel.x = canvas.width  * 0.5;
    exitGameButtonLabel.y = canvas.height * 0.825;
    stage.addChild(exitGameButtonLabel);

}

function initLevelSelectMenu(){

    stage.removeAllChildren();

    curLevel=levelProgress;

    var back = new createjs.Shape();
    var g = back.graphics;
    g.beginFill("#FFF");
    g.drawRoundRect(  canvas.width *0.05 ,  canvas.height *0.05 , canvas.width *0.9 , canvas.height * 0.9 , 100 );
    g.endFill();
    stage.addChild(back);

    var quitButton = new createjs.Shape();
    var g = quitButton.graphics;
    g.beginFill("#F00");
    g.drawRoundRect(canvas.width * 0.1 , canvas.height * 0.7 , canvas.width  * 0.3 ,  canvas.height * 0.2 , 100 )
    g.endFill();
    stage.addChild(quitButton);

    quitButton.on("mousedown", function(evt) {
        if((touch && evt.pointerID == 0)|| !touch){
            initMainMenu();
        }
    });

    var quitButtonLabel = new createjs.Text("Back", "40px Arial", "#000");
    quitButtonLabel.textAlign = "center";
    quitButtonLabel.x = canvas.width  * 0.24;
    quitButtonLabel.y = canvas.height * 0.75;
    stage.addChild(quitButtonLabel);

    var startButton = new createjs.Shape();
    var g = startButton.graphics;
    g.beginFill("#0F0");
    g.drawRoundRect(canvas.width * 0.6 , canvas.height * 0.7 , canvas.width  * 0.3 ,  canvas.height * 0.2 , 100 )
    g.endFill();
    stage.addChild(startButton);

    startButton.on("mousedown", function(evt) {
        if((touch && evt.pointerID == 0)|| !touch){
            initGame(curLevel);
        }
    });

    var startButtonLabel = new createjs.Text("Start", "40px Arial", "#000");
    startButtonLabel.textAlign = "center";
    startButtonLabel.x = canvas.width  * 0.75;
    startButtonLabel.y = canvas.height * 0.75;
    stage.addChild(startButtonLabel);

    var levelLabel = new createjs.Text("Level " + curLevel, "40px Arial", "#000");
    levelLabel.textAlign = "center";
    levelLabel.x = canvas.width  * 0.5;
    levelLabel.y = canvas.height * 0.1;
    stage.addChild(levelLabel);

    var levelPic = new createjs.Bitmap(loader.getResult(levels[curLevel].background));
    levelPic.scaleX = (canvas.width  * 0.5) / levelPic.image.naturalWidth;
    levelPic.scaleY = (canvas.height * 0.4) / levelPic.image.naturalHeight;
    levelPic.x = canvas.width * 0.25;
    levelPic.y = canvas.height * 0.2;
    stage.addChild(levelPic);



    var arrowR = new createjs.Bitmap(loader.getResult("arrow"));
    arrowR.scaleX = (canvas.width  * 0.1) / arrowR.image.naturalWidth;
    arrowR.scaleY = (canvas.height * 0.5) / arrowR.image.naturalHeight;
    arrowR.x = canvas.width * 0.825;
    arrowR.y = canvas.height * 0.15;
    stage.addChild(arrowR);

    arrowR.on("mousedown", function(evt) {
        if((touch && evt.pointerID == 0)|| !touch){
            curLevel+=1;
            if(curLevel > levelProgress){
                curLevel = 0;
            }

            if(curLevel == 0){
                levelLabel.text = "Arcade Mode";
                levelPic.image = loader.getResult("landscape");
                levelPic.scaleX = (canvas.width  * 0.5) / levelPic.image.naturalWidth;
                levelPic.scaleY = (canvas.height * 0.4) / levelPic.image.naturalHeight;
            }
            else{
                levelLabel.text = "Level " + curLevel;
                levelPic.image = loader.getResult(levels[curLevel].background);
                levelPic.scaleX = (canvas.width  * 0.5) / levelPic.image.naturalWidth;
                levelPic.scaleY = (canvas.height * 0.4) / levelPic.image.naturalHeight;
            }
        }
    });

    var arrowL = new createjs.Bitmap(loader.getResult("arrow"));
    arrowL.scaleX = -(canvas.width  * 0.1) / arrowL.image.naturalWidth;
    arrowL.scaleY = (canvas.height * 0.5) / arrowL.image.naturalHeight;
    arrowL.x = canvas.width * 0.175;
    arrowL.y = canvas.height * 0.15;
    stage.addChild(arrowL);

    arrowL.on("mousedown", function(evt) {
        if((touch && evt.pointerID == 0)|| !touch){
            curLevel-=1;
            if(curLevel < 0){
                curLevel = levelProgress;
            }
            if(curLevel == 0){
                levelLabel.text = "Arcade Mode";
                levelPic.image = loader.getResult("landscape");
                levelPic.scaleX = (canvas.width  * 0.5) / levelPic.image.naturalWidth;
                levelPic.scaleY = (canvas.height * 0.4) / levelPic.image.naturalHeight;
            }
            else{
                levelLabel.text = "Level " + curLevel;
                levelPic.image = loader.getResult(levels[curLevel].background);
                levelPic.scaleX = (canvas.width  * 0.5) / levelPic.image.naturalWidth;
                levelPic.scaleY = (canvas.height * 0.4) / levelPic.image.naturalHeight;
            }
        }
    });

    
}