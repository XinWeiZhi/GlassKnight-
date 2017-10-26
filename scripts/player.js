class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.position = createVector(this.x, this.y);
        this.attack = 1;
        this.speed = 4.5;
        this.width = 120;
        this.height = 250;
        this.jumpStart = false;
        this.grounded = true;
        this.jumpSpeed = 0;
        this.gravityMultiplier = 1;
        this.feetY= this.height - this.height;
        //perhaps this.hat / this.armor
    }

    show() {
        fill(255);
        rect(this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height);
    }

    process() {
        this.feetY = this.position.y + this.height / 2;
        //gravity
        if (this.grounded == false) {
            this.y -= gravity * this.gravityMultiplier;
            this.gravityMultiplier += 0.15;
        } else if(this.gravityMultiplier != 1) {
            this.gravityMultiplier = 1;
        }

        //movement
        if (keyIsDown(65)) {
            this.position.x -= this.speed;
        }
        if (keyIsDown(68)) {
            this.position.x += this.speed;
        }

        if (keyIsDown(32) && this.jumpStart == false) {
            this.jumpStart = true;
            this.jumpSpeed = 0;

        }
    }

    jump() {

    }
    
//    isGrounded() {
//        if(if)
//    }
    //attack

}
