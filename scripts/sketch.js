//YES

let map = 1;

//end of VARIABLES

function setup() {
    createCanvas(1920, 1080);
    background(0);
    //initialize player
    player = new Player(0,0);
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
    player.move();
    player.process();
    
    //move player
    
    
}

function keyPressed() {

}