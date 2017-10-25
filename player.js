class Player {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        
        this.position = createVector(this.x, this.y);
        this.attack = 1;
        this.speed = 4.5;
        this.jumpLevel = 1;
        //perhaps this.hat / this.armor
    }
    
    move() {
        
    }
    
    show() {
        
    }
    
    process() {
        
    }
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