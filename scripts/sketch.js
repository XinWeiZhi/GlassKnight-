//YES
let interactables = [];
let effects = [];
let map = 1;
let tiles = [];
let projectiles = [];
let gravity = 0.6;
let numTiles = 0;
let enemies = [];
let camX = 0;
let hudDesired = false;
let characterHudDesired = false;
let optionsHudDesired = false;
let inventoryHudDesired = false;
let camY = 0;
let camZ = 0;
let silvercoins = 0;
let messages = []
let allies = [];
let interfaceButtons = [];
let summons = [];
let buffs = [];
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
    fire = loadImage("scripts/assets/hollow.jpg");
    gravewatcher = loadImage("scripts/assets/abyss.jpg");
    bird = loadImage("scripts/assets/bird.jpg");
    worm = loadImage("scripts/assets/worm.jpg");
    blackknight = loadImage("scripts/assets/blackknight.jpg");
    walkAttackleft = loadImage("scripts/assets/walk.jpg");
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
//        enemies.push(new Harpy(1200, 0));
//        enemies.push(new Harpy(1100, 0));
//        enemies.push(new GraveMaster(300, 30));
//        enemies.push(new Worm(300, 800));
//        enemies.push(new BlackKnight(300, 800));
//        allies.push(new Jim(300,400));
        for (let tileA = 0; tileA < numTiles; tileA++) {
            tiles.push(new Grass(-400 + tileA * 1200, 700 - tileA * 50));
            tiles[tileA].width = 1200
        }

        interactables.push(new Door(300, 530, 2));


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
        enemies.push(new Enemy(1100, 0));
        for (let tileA = 0; tileA < numTiles; tileA++) {
            tiles.push(new Stone(-400 + tileA * 120, 700 - tileA * 35));
            tiles[tileA].width = 120
        }

        interactables.push(new Door(300, 330, 3));
    } else if (map === 3) {
        tiles = [];
        interactables = [];

        numTiles = 11
        enemies.push(new Enemy(800, 0));
        enemies.push(new Enemy(900, 0));
        enemies.push(new Enemy(700, 0));
        enemies.push(new Enemy(1000, 0));
        enemies.push(new Enemy(1200, 0));
        enemies.push(new Enemy(1100, 0));
        for (let tileA = 0; tileA < numTiles; tileA++) {
            tiles.push(new Grass(-400 + tileA * 5000, 700 - tileA * 35));
            tiles[tileA].width = 5000
        }
        interactables.push(new Door(300, 530, 1));
    }
    //draw prebuilt maps

}

function setup() {
    let width = window.outerWidth;
    let height = window.outerHeight;
    createCanvas(width, height);
    background(0);
    //initialize player
    player = new Player(0, 800);
    allies.push(player);
    drawMap();
}



function drawEnemies() {
    //draw prebuilt enemies
}

function draw() {
    background(30);
    cameraControl();

    stroke(220, 160, 70);
    for (let t = 0; t < tiles.length; t++) {
        tiles[t].show();
    }



    // camera([player.position.x - 300], [player.position.y - player.floorY], [0]);
    //draw player
//    player.show();
//    player.process();
//    player.animate();
//    player.isGrounded();

    //draw enemies

    for (let e = 0; e < enemies.length; e++) {
        enemies[e].show(e);
        enemies[e].process();
        enemies[e].isGrounded();

    }
    
    for (let a = 0; a < allies.length; a++) {
        allies[a].show(a);
        allies[a].process(a);
        allies[a].animate();
        allies[a].isGrounded();

    }

    for (let d = 0; d < effects.length; d++) {
        effects[d].show();
        effects[d].move(d);
    }

    for (let i = 0; i < interactables.length; i++) {
        interactables[i].show();

    }

    for (let p = 0; p < projectiles.length; p++) {
        projectiles[p].show();
        projectiles[p].move(p);

    }

    for (let m = 0; m < messages.length; m++) {
        messages[m].show(m);

    }
    
    for (let b = 0; b < buffs.length; b++) {
        buffs[b].show();
        buffs[b].use();
    }

            player.takenDamageMultiplier = 1;
 
    if (mouseIsPressed) {
        if (mouseButton == RIGHT) {
            fill(190, 130, 30, 90);
            stroke("yellow");
            rect(player.position.x + player.direction * 50 - 15, player.position.y - 30, 30, 130);
            player.takenDamageMultiplier = 0.25;
        } 

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
        player.jumpSpeed = 12;
        player.stillGoingUp = true;



    }

    if (keyCode == 27) {
        hudDesired = !hudDesired; // likely the inventory

    }



    //1 for attack or mouseleft


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
    if (mouseButton == LEFT) {
        if (player.canAttack && player.atkCooldown == 0) {
            if (player.state != 3) {
                player.atkCooldown = 15;
                player.attack();
                player.canAttack = false;
            }
        }
    }

}


function keyReleased() {
    if (keyCode === 16) {
        player.canDash = true;
    }
}

function drawHud() {
    if (hudDesired) {
        fill(100,190, 150, 150);
        rect(camX + 100, camY + 200, 700, 500, 50);
        stroke(50);
        textSize(30);
        text("inventory", camX + 200, camY + 300);
        text("character", camX + 400, camY + 300);
        text("options", camX + 600, camY + 300);
        
        for(let i = 0; i < interfaceButtons.length; i++) {
            interfaceButtons[i].show();
            if(interfaceButtons[i].isClicked()) {
                //the one that is clicked has the new desired
                if(interfaceButtons[i] instanceof toInventory) {
                    
                }
            }
        }
       
    
    }
}

function dealDamage(target, damage, slot) { // , sender
    damage = floor(damage * target.takenDamageMultiplier);
    target.hp -= damage;
    if (target instanceof Player) {
        messages.push(new RedText(damage, target.position.x, target.position.y));
        target.receivedHit();
    } else if (target instanceof Enemy) {
        messages.push(new BlueText(damage, target.position.x, target.position.y));
        target.receivedHit(slot);
    }


}

function collisionDetected(target, from, x , y) { //target is enemies[e], from is this.position
    if (from.x - x <= target.position.x + target.width/2 && from.x + x >= target.position.x - target.width/2 && from.y - y <= target.position.y + target.height / 2 && from.y + y >= target.position.y - target.height / 2) {
                return true;
            }
}
