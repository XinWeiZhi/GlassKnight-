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
let spellHudWidth = 60;


let FireballRef = {
    manaCost: 20,
    type: "missile",
    damage: 5,
    xBox: 70,
    yBox: 70,
    maxRange: 1500,
    cooldown: 0,
    fullCooldown: 60,
    make: function (x, y, maxRange, width, height, damage, speed, direction, xBox, yBox) {
        projectiles.push(new FireBall(x, y, maxRange, width, height, damage, speed, direction, xBox, yBox));
    },
    show(a) {
        image(fireballIcon, camX + 200 + 70 * a, camY + 800, spellHudWidth, spellHudWidth);
        rect(camX + 200 + 70 * a, camY + 860, spellHudWidth, spellHudWidth * this.cooldown / this.fullCooldown * -1);
    }
}


let DashRef = {
    manaCost: 10,
    type: "teleport",
    duration: 3, // 
    cooldown: 0,
    fullCooldown: 26,
    make(sender, speed) {
        buffs.push(new Dash(sender, speed, DashRef.duration));
    },
    show(a) {
        image(dashIcon, camX + 200 + 70 * a, camY + 800, spellHudWidth, spellHudWidth);
        rect(camX + 200 + 70 * a, camY + 860, spellHudWidth, spellHudWidth * this.cooldown / this.fullCooldown * -1);
    }
}

let RegenerateRef = {
    manaCost: 120,
    type: "buff",
    duration: 1200, // 
    cooldown: 0,
    fullCooldown: 2000,
    stock: 2,
    make(sender) {
        buffs.push(new Regenerate(sender, this.duration));
    },
    show(a) {
        image(healIcon, camX + 200 + 70 * a, camY + 800, spellHudWidth, spellHudWidth);
        rect(camX + 200 + 70 * a, camY + 860, spellHudWidth, spellHudWidth * this.cooldown / this.fullCooldown * -1);
    }
}

let EmptySpellRef = {
    manaCost: 0,
    type: null,
    duration: 0, // 
    cooldown: 0,
    fullCooldown: 20,
    make(sender) {
//        buffs.push(new Regenerate(sender, this.duration));
    },
    show(a) {
        image(healIcon, camX + 600 + 70 * a, camY + 800, spellHudWidth, spellHudWidth);
        rect(camX + 200 + 70 * a, camY + 860, spellHudWidth, spellHudWidth * this.cooldown / this.fullCooldown * -1);
    }
}

let EmptyItemRef = {
    manaCost: 0,
    type: null,
    duration: 0, // 
    cooldown: 0,
    fullCooldown: 10,
    make(sender) {
//        buffs.push(new Regenerate(sender, this.duration));
    },
    show(a) {
        image(healIcon, camX + 600 + 70 * a, camY + 800, spellHudWidth, spellHudWidth);
        rect(camX + 600 + 70 * a, camY + 860, spellHudWidth, spellHudWidth * this.cooldown / this.fullCooldown * -1);
    }
}

let HealthPotionRef = { //heal 6hp over 1 second
    manaCost: 0,
    type: "buff",
    duration: 60, // 
    cooldown: 0,
    fullCooldown: 10,
    castFrames: 3,
    stock: 3,
    make(sender) {
        buffs.push(new Regenerate(sender, this.duration));
        this.stock--;
    },
    show(a) {
        image(hppotion, camX + 600 + 70 * a, camY + 800, spellHudWidth, spellHudWidth);
        rect(camX + 600 + 70 * a, camY + 860, spellHudWidth, spellHudWidth * this.cooldown / this.fullCooldown * -1);
    }
}

let CannonRef = {
    manaCost: 0,
    type: "summon",
    duration: 0, // 
    cooldown: 0,
    fullCooldown: 10,
    make(sender) {
//        buffs.push(new Regenerate(sender, this.duration));
    },
    show(a) {
        image(cannon, camX + 600 + 70 * a, camY + 800, spellHudWidth, spellHudWidth);
        rect(camX + 600 + 70 * a, camY + 860, spellHudWidth, spellHudWidth * this.cooldown / this.fullCooldown * -1);
    }
}

//let SummonBoarRef = {
//    manaCost: 120,
//    type: "summon",
//    duration: 3600, // 
//    cooldown: 0, 
//    fullCooldown: 7200,
//    make(sender, x, y) {
//            allies.push(new SummonBoar(x,y)); 
//       
//    }
//}


//spell 1 coords 300,600 
//spell 2 coords 400,600
//spell 3 coords 500,800 
//spell 4 coords 600,700 
//item 1 coords  700 , 800
//item 2 coords  800 , 800
//switch heros in the character menu

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
    up = loadImage("scripts/assets/up.jpg");
    fireballIcon = loadImage("scripts/assets/fireball.png");
    healIcon = loadImage("scripts/assets/heal.png");
    dashIcon = loadImage("scripts/assets/dash.png");
    empowerIcon = loadImage("scripts/assets/empower.png");
    stunned = loadImage("scripts/assets/stunned.jpg");
    hppotion = loadImage("scripts/assets/hppotion.jpg");
    cannon = loadImage("scripts/assets/cannon.jpg");
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
        enemies.push(new Worm(300, 800));
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
        interactables.push(new Door(300, 530, 4));
    } else if (map === 4) {
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
            tiles.push(new Stone(-400 + tileA * 5000, 700 - tileA * 35));
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
    for (let e = 0; e < enemies.length; e++) {
        enemies[e].show(e);
        enemies[e].process();
        enemies[e].isGrounded();

    }

    for (let ability = 0; ability < player.spellSelect.length; ability++) {
        fill(140, 190, 200, 60);
        player.spellSelect[ability].show(ability);
        
    }
    
    for (let item = 0; item < player.itemSelect.length; item++) {
        fill(140, 190, 200, 60);
        player.itemSelect[item].show(item);

    }

    for (let a = 0; a < allies.length; a++) {

        allies[a].process(a);
        allies[a].animate();
        allies[a].show(a);
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
        buffs[b].use(b);
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
    rect(camX + 160, camY + 120, (player.characterTenacity + player.armor.tenacity)* 10, 20);
    fill("green")
    rect(camX + 160, camY + 120, player.tenacity * 10, 20);






    drawHud();
}

function keyPressed() {

    if (keyCode == 27) {
        hudDesired = !hudDesired; // likely the inventory
        interfaceButtons.push(new ToCharacter(camX + 165, camY + 100));
        interfaceButtons.push(new ToInventory(camX + 455, camY + 100));
        interfaceButtons.push(new ToOptions(camX + 745, camY + 100));
        interfaceButtons.push(new CloseTab(camX + 1000, camY + 100));

    }

    if (keyCode == 32 && player.jumps > 0) {
        player.jump();
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

function keyReleased() {


}

function drawHud() {
    //regular hud

    if (hudDesired) {
        player.canProcess = false;
        stroke(50);
        textSize(30);
        for (let i = 0; i < interfaceButtons.length; i++) {
            interfaceButtons[i].show();
            if (interfaceButtons[i].isClicked()) {
                //the one that is clicked has the new desired
                if (interfaceButtons[i] instanceof ToInventory) {
                    inventoryHudDesired = true;
                    optionsHudDesired = false;
                    characterHudDesired = false;
                } else if (interfaceButtons[i] instanceof ToOptions) {
                    optionsHudDesired = true;
                    inventoryHudDesired = false;
                    characterHudDesired = false;

                } else if (interfaceButtons[i] instanceof ToCharacter) {
                    characterHudDesired = true;
                    optionsHudDesired = false;
                    inventoryHudDesired = false;
                } else if (interfaceButtons[i] instanceof CloseTab) {
                    characterHudDesired = false;
                    optionsHudDesired = false;
                    inventoryHudDesired = false;
                    hudDesired = false;
                }
            }
        }
        


        if (optionsHudDesired) {
            fill(150, 150, 150, 150);
            rect(camX + 70, camY + 70, 1000, 750, 50);
        } else if (inventoryHudDesired) {
            fill(180, 130, 150, 150);
            rect(camX + 70, camY + 70, 1000, 750, 50);
        } else if (characterHudDesired) {
            fill(180, 150, 120, 150);
            rect(camX + 70, camY + 70, 1000, 750, 50);
            fill(0)
            //text
            text("Damage: " + floor(player.characterDamage), camX + 200, camY + 500);
            text("HP: " + floor(player.hp) + "/ " + floor(player.mhp), camX + 200, camY + 200);
            text("Spell Damage: " + player.characterSpellDamage, camX + 200, camY + 600);
            text("MP: " + floor(player.mana) + "/ " + floor(player.mMana), camX + 200, camY + 300);
            text("Speed: " + floor(player.speed), camX + 200, camY + 700);
            text("Tenacity : " + floor(player.tenacity) + "/ " + floor(player.mtenacity), camX + 200, camY + 400);

        } else {
            fill(140, 170, 130, 150);
            rect(camX + 70, camY + 70, 1000, 750, 50);
        }


    } else {
        player.canProcess = true;
        interfaceButtons = [];
        characterHudDesired = false;
        optionsHudDesired = false;
        inventoryHudDesired = false;
    }
}

function dealDamage(target, damage, slot) { // , sender
    damage = floor(damage * target.takenDamageMultiplier);
    target.hp -= damage;
    if (target instanceof Player) {
        messages.push(new RedText(damage, target.position.x, target.position.y));
        target.receivedHit(damage);
    } else if (target instanceof Enemy) {
        messages.push(new BlueText(damage, target.position.x, target.position.y));
        target.receivedHit(slot);
    }


}

function collisionDetected(target, from, x, y) { //target is enemies[e], from is this.position
    if (from.x - x <= target.position.x + target.width / 2 && from.x + x >= target.position.x - target.width / 2 && from.y - y <= target.position.y + target.height / 2 && from.y + y >= target.position.y - target.height / 2) {
        return true;
    }
}
