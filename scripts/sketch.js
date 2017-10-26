//YES

let map = 1;

//end of VARIABLES

function setup() {
    createCanvas(1920, 1080);
    background(0);
    //initialize player
    var player = new Player(0,0);
}

function drawMap() {
    
    //draw prebuilt maps
    
}

function drawEnemies() {
    //draw prebuilt enemies
}

function draw() {

    
    //draw player
    player.show();
    player.process();
    
    //move player
    
    
}

function keyPressed() {

}