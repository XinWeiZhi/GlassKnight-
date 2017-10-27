//YES

let map = 1;
let tiles = [];
let gravity = 1.5;
//end of VARIABLES


function preload() {
    grass = loadImage("scripts/assets/weed.jpg");
}

function drawMap() {
    
    //makes the tileA < x amount
    if (map == 1) {
        for(let tileA = 0; tileA < 3; tileA++) {
            tiles.push(new Grass(-400 + tileA * 1200, 700 - tileA * 50 ));
        }
    }
    //draw prebuilt maps

}

function setup() {
    let width = window.outerWidth;
    let height = window.outerHeight - 4.20;
    createCanvas(width, height);
    background(0);
    //initialize player
    player = new Player(0, 800);
    drawMap();
}



function drawEnemies() {
    //draw prebuilt enemies
}

function draw() {
    background(30);
    //draw tiles
    for(let t = 0; t < tiles.length; t++) {
        tiles[t].show();
    }
    controlCamera(player.position.x, player.position.y);
    //draw player
    player.show();
    player.process();
    player.jump();
    player.isGrounded();

    //move player


    
    
}

function keyPressed() {

}
