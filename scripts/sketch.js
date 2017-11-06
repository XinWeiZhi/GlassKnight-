//YES

let map = 1;
let tiles = [];
let gravity = 0.8;
let numTiles = 0;
let enemies = [];
let camX = 0;

let camY = 0;
let camZ = 0;
//end of VARIABLES


function preload() {
    //make sure to manually flip sprite sheet
    grass = loadImage("scripts/assets/weed.jpg");
    sword = loadImage("scripts/assets/sword.png");
    skeleton = loadImage("scripts/assets/skeleton.jpg");
    pepe = loadImage("scripts/assets/pepe.png");
    walk = loadImage("scripts/assets/download.jpg");
}

function drawMap() {

    //makes the tileA < x amount
    if (map == 1) {
        numTiles = 3
        for (let tileA = 0; tileA < numTiles; tileA++) {
            tiles.push(new Grass(-400 + tileA * 1200, 700 - tileA * 50));
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
    enemies.push(new Enemy(800, 800));
    drawMap();
}



function drawEnemies() {
    //draw prebuilt enemies
}

function draw() {
    background(30);
    cameraControl();


    for (let t = 0; t < tiles.length; t++) {
        tiles[t].show();
    }



    // camera([player.position.x - 300], [player.position.y - player.floorY], [0]);
    //draw player
    player.show();
    player.process();
    player.animate();
    player.isGrounded();

    //draw enemies

    for (let e = 0; e < enemies.length; e++) {
        enemies[e].show(e);
        enemies[e].process();
        enemies[e].isGrounded();
    }

    //draw hud
    noStroke();
    //health
    fill("gray")
    rect(player.position.x - 110, player.position.y - 600, player.mhp * 20, 20);
    fill("red")
    rect(player.position.x - 110, player.position.y - 600, player.hp * 20, 20);
    //mana
    fill("white")
    rect(player.position.x - 150, player.position.y - 570, player.mMana , 20);
    fill("blue")
    rect(player.position.x - 150, player.position.y - 570, player.mana, 20);
    //picture
    fill(30, 30, 30, 80)
    ellipse(player.position.x - 170, player.position.y - 575, 120, 120)
}

function keyPressed() {

    if (keyCode == 32 && player.jumps > 0) {
        player.jumps--
        player.grounded = false;
            player.state = 5;
        player.gravityMultiplier = 1;
        player.jumpSpeed = 120;
        player.stillGoingUp = true;



    }
    //q for item possibly
    //e or r for spell
}

function mouseClicked() {
    if (player.canAttack) {
        player.canAttack = false;
    }

}

function keyReleased() {
  if (keyCode === 16) {
    player.canDash = true;
  }
}
