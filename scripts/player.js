class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.position = createVector(this.x, this.y);
        this.attack = 1;
        this.speed = 4.5;
        this.jumpLevel = 1;
        this.width = 60;
        this.height = 100;
        //perhaps this.hat / this.armor
    }

    show() {
        fill(0);
        rect(this.position.x - this.width / 2, this.position.y + this.width / 2, this.width, this.height )
    }

    process() {
    
    //movement
        if (keyIsDown(65)) {
            player.x -= player.speed;
        }
        if (keyIsDown(68)) {
            player.x += player.speed;
        }

        if (keyIsDown(32)) {
            player.jump(player.jumpLevel);
        }
    }
    //attack

}

