class Player {
    constructor(x, y) {
        this.position = createVector(this.x, this.y);
        this.attack = 1;
        this.speed = 8.5;
        this.width = 100;
        this.height = 180;
        this.hp = 10;
        this.mhp = 10;
        this.jumps = 2;
        this.grounded = false;
        this.jumpSpeed = 0;
        this.terminal = 440;
        this.gravityMultiplier = 1;
        this.feetY = this.position.y + this.height / 2;
        this.floorY = 800;
        this.canAttack = true;
        this.canSpell = true;
        this.canMove = true;
        this.direction = 1;
        this.stillGoingUp = false;
        this.weapon = new Sword(this.position.x, this.position.y);
        //make this.damage = to the weapon damage and such

        this.animationIdle = [pepe, pepe, walk, walk, walk, walk, walk, walk];
        this.animationWalkLeft = [walk, walk, walk, walk, walk, walk, walk, walk];
        this.animationWalkRight = [walk, walk, walk, walk, walk, walk, walk, walk];
        this.animationJump = [walk, walk, walk, walk, walk, walk, walk, walk];
        this.animationAttack = [sword, sword, sword, sword, sword, sword, skeleton, skeleton, skeleton, skeleton];
        this.animationSpell = []
        this.isAttackingFor = 0;
        this.image = pepe;
        this.frame = 0;
        this.hitboxX = 145;
        this.damage = 2;
        this.state = 0 // 0 for idle, 1 for movement right, 2 for move left, 3 for attacking, 4 for spell, 5 for jump

        //perhaps this.hat / this.armor
    }

    show() {
        fill(255);
        image(this.image, this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height);
    }

    animate() {
        if (this.state == 0) { // idle
            this.image = this.animationIdle[this.frame];
            if (this.frame < this.animationIdle.length - 1) {
                this.frame++;
            }

        } else if (this.state == 1) { // move right
            this.image = this.animationWalkRight[this.frame];
            if (this.frame < this.animationWalkRight.length - 1) {
                this.frame++;
            }
        } else if (this.state == 2) { // move left
            this.image = this.animationWalkLeft[this.frame];
            if (this.frame < this.animationWalkLeft.length - 1) {
                this.frame++;
            }
        } else if (this.state == 3) { //attack

            if (this.isAttackingFor != 0) {
                this.isAttackingFor--;
                if (this.frame < this.animationAttack.length - 1) {
                    this.frame++;
                }
                this.image = this.animationAttack[this.frame];
                if (this.isAttackingFor == 0) {
                    this.checkCollision();
                    this.canAttack = true;
                    this.frame = 0;
                }

            }

        } else if (this.state == 4) { // spell
            this.image = this.animationSpell[this.frame];
            if (this.frame < this.animationWalkRight.length - 1) {
                this.frame++;
            }
        } else if (this.state == 5) { //jump
            this.image = this.animationJump[this.frame];
            if (this.frame < this.animationJump.length - 1) {
                this.frame++;
            }
            //to do code the jump animations in 
            if (keyIsDown(32) && this.stillGoingUp) {
                this.position.y -= this.jumpSpeed;
                console.log("going")
            } else if (this.stillGoingUp) {
                this.stillGoingUp = false;
                console.log("cancel")
            }
            //possibly state for falling
        }

    }

    process() {
        if (this.grounded == false) {
            this.position.y += gravity * this.gravityMultiplier;
            if (this.gravityMultiplier <= this.terminal) {
                this.gravityMultiplier += 1;
            }

        }


        //if using a spell or item or weapon, this.canAttack will become false
        if (this.canAttack && this.canSpell && this.canMove) { //canMove if you are not in an attack or spell
            //idle
            if (this.state != 0 && this.state != 5) {
                this.state = 0;
            }
            //move left
            if (keyIsDown(65)) {
                this.position.x -= this.speed;
                if (keyIsDown(16)) {
                    this.position.x -= this.speed;
                }
                if (this.state != 2 && this.state != 5) {
                    this.direction = -1;
                    this.state = 2;
                    this.frame = 0;
                }


            }
            //move right
            if (keyIsDown(68)) {
                this.position.x += this.speed;
                if (keyIsDown(16)) {
                    this.position.x += this.speed;
                }
                if (this.state != 1 && this.state != 5) {
                    this.direction = 1;
                    this.state = 1;
                    this.frame = 0;
                }
            }
            //attack if not already in state 3
            if (mouseIsPressed && mouseButton == LEFT && this.state != 3) { // attack
                this.frame = 0;
                this.state = 3;
                this.isAttackingFor = this.animationAttack.length - 1
            }


        }
    }


    //solid code
    isGrounded() {
        this.feetY = this.position.y + this.height / 2;
        if (this.floorY <= this.feetY) {
            this.grounded = true;
            this.jumps = 2;
            this.gravityMultiplier = 1;
            this.jumpSpeed = 0;
            this.position.y = this.floorY - this.height / 2;
        } else {
            this.grounded = false;
        }
        //and if this is true, then ur feetY will equal the floorY

        //find this.floorY
        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i].x <= this.position.x && this.position.x <= tiles[i].x + tiles[i].width) {
                this.floorY = tiles[i].y;
                break;
            }
        }
    }


    checkCollision() {
        for (let target = 0; target < enemies.length; target++)
            if (enemies[target].position.x >= player.position.x && enemies[target].position.x <= player.position.x + this.hitboxX) {
                console.log("dsajknkdas")
                enemies[target].hp -= this.damage;
                enemies[target].receivedHit();
                //                text(this.damage, enemies[target].position.x, enemies[target].position.y - 40);
            }

    }

}
