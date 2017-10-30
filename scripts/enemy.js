class Enemy {
    constructor(x, y) {
        this.position = createVector(this.x, this.y);
        this.attack = 1;
        this.speed = 6.75;
        this.width = 100;
        this.height = 180;
        this.hp = 10;
        this.mhp = 10;
        this.canJump = true;
        this.grounded = true;
        this.jumpSpeed = 0;
        this.terminal = 80;
        this.gravityMultiplier = 1;
        this.feetY = this.height + this.height;
        this.floorY = 800;
        this.canAttack = true;
        //perhaps this.hat / this.armor
    }
}
