//YES

let map = 1;

//end of VARIABLES

function setup() {
    let width = window.outerWidth;
    let height = window.outerHeight - 4.20;
    createCanvas(width, height);
    background(0);
    //initialize player
    player = new Player(0,800);
}

function drawMap() {
    d
    //draw prebuilt maps
    
}

function drawEnemies() {
    //draw prebuilt enemies
}

function draw() {
      background(0);
    controlCamera(player.position.x, player.position.y);
    //draw player
    player.show();
    player.process();
    player.jump();
    
    //move player
    
    
}

function keyPressed() {

}
