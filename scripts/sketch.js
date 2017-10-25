//YES

function setup() {
    reateCanvas(width,height);
    
    //initialize player
}

function drawMap() {
    
    //draw prebuilt maps
    
}

function drawEnemies() {
    //draw prebuilt enemies
}

function draw() {

    
    //draw player
    
    //move player
    
    
}

function keyPressed() {
    
    if(keyCode == 65) {
        player.x -= player.speed;
    } 
    if (keyCode == 68) {
        player.x += player.speed;
    }
    
    if (keyCode == 32) {
        player.jump(player.jumpLevel); 
    }

}