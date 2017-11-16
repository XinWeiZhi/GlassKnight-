//YES
let interactables = [];
let effects = [];
let map = 1;
let tiles = [];
let gravity = 0.6;
let numTiles = 0;
let enemies = [];
let camX = 0;
let hudDesired = false;
let camY = 0;
let camZ = 0;
let silvercoins = 0;
//end of VARIABLES


function preload() {
    //make sure to manually flip sprite sheet
    grass = loadImage("scripts/assets/weed.jpg");
    sword = loadImage("scripts/assets/sword.png");
    skeleton = loadImage("scripts/assets/skeleton.jpg");
    pepe = loadImage("scripts/assets/pepe.png");
    walk = loadImage("scripts/assets/download.jpg");
    walkLeft0 = loadImage("scripts/assets/trumpleft.jpg");
    door = loadImage("scripts/assets/door.jpg");
    rockies = loadImage("scripts/assets/stone.jpg");
}

function drawMap() {

    //makes the tileA < x amount
    if (map === 1) {
        tiles = [];
        interactables = [];
        numTiles = 6
        enemies.push(new Enemy(800, 0));
        enemies.push(new Enemy(900, 0));
        enemies.push(new Enemy(700, 0));
        enemies.push(new Enemy(1000, 0));
        enemies.push(new Enemy(1200, 0));
        enemies.push(new Enemy(1100, 0));
        for (let tileA = 0; tileA < numTiles; tileA++) {
            tiles.push(new Grass(-400 + tileA * 1200, 700 - tileA * 50));
        }

        interactables.push(new Door(300, 530));


    } else if (map === 2) {
        tiles = [];
        interactables = [];
        
        numTiles = 18
        enemies.push(new Enemy(800, 0));
        enemies.push(new Enemy(900, 0));
        enemies.push(new Enemy(700, 0));
        enemies.push(new Enemy(1000, 0));
        enemies.push(new Enemy(1200, 0));
        enemies.push(new Enemy(1100, 0));
        for (let tileA = 0; tileA < numTiles; tileA++) {
            tiles.push(new Stone(-400 + tileA * 120, 700 - tileA * 5));
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

    for (let d = 0; d < effects.length; d++) {
        effects[d].show();
        effects[d].move(d);
    }

    for (let i = 0; i < interactables.length; i++) {
        interactables[i].show();

    }

    //draw hud
    noStroke();
    //health
    fill("gray")
    rect(camX + 190, camY + 50, player.mhp * 20, 20);
    fill("red")
    rect(camX + 190, camY + 50, player.hp * 20, 20);
    //mana
    fill("white")
    rect(camX + 160, camY + 100, player.mMana, 20);
    fill("blue")
    rect(camX + 160, camY + 100, player.mana, 20);
    //picture
    fill(30, 50, 30, 80)
    ellipse(camX + 160, camY + 60, 120, 120)
    //exp bar
     fill("gray")
    rect(camX + 160, camY + 120, player.experienceToLevel * 10, 20);
    fill("green")
    rect(camX + 160, camY + 120, player.experience * 10, 20);
    
    
    
    
    
    
    drawHud();
}

function keyPressed() {

    if (keyCode == 32 && player.jumps > 0) {
        player.jumps--
            player.grounded = false;
        player.frame = 0;
        player.state = 5;
        player.gravityMultiplier = 1;
        player.jumpSpeed = 15;
        player.stillGoingUp = true;



    }
    
    if (keyCode == 27) {
        hudDesired = !hudDesired; // likely the inventory
        
    }

    if (keyCode == 70) {
        for (let i = 0; i < interactables.length; i++) {
            interactables[i].use(i);
            break;
        }
    }
    //q for item possibly
    //e or r for spell
}

function mouseClicked() {
    if (player.canAttack) {
        player.frame = 0;
        player.canAttack = false;
    }

}



function keyReleased() {
    if (keyCode === 16) {
        player.canDash = true;
    }
}

function drawHud() {
    if(hudDesired) {
        rect(camX + 100,camY + 100, 900, 600);
    }
}
