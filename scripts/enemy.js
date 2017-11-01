class Enemy {
    constructor(x, y) {
        this.position = createVector(this.x, this.y);
        this.attack = 1;
        this.speed = 1.15;
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
        this.image = skeleton;
        this.iam;
        this.factor = 20;
        this.canAttack = true;
        this.attackRange = 90;
        this.inAttackFor = 0;
        //perhaps this.hat / this.armor
    }

    show(k) {
        this.iam = k;
        fill(231, 10, 40);
        rect(this.position.x - 80, this.position.y - 120, this.mhp * this.factor, 1 * this.factor);
        fill(100, 230, 40);
        rect(this.position.x - 80, this.position.y - 120, this.hp * this.factor, 1 * this.factor);

        image(this.image, this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height);
    }

    process() {
        if (this.grounded == false) {
            this.position.y += gravity * this.gravityMultiplier;
            if (this.gravityMultiplier <= this.terminal) {
                this.gravityMultiplier++;
            }
        }

        //if using a spell or item or weapon, this.canAttack will become false
        if (this.canAttack == true) {
            if (player.position.x < this.position.x) {
                this.position.x -= this.speed;
                if (keyIsDown(16)) {
                    this.position.x -= this.speed;
                }
                this.direction = -1;
            }
            if (player.position.x > this.position.x) {
                this.position.x += this.speed;
                if (keyIsDown(16)) {
                    this.position.x += this.speed;
                }
                this.direction = 1;
            }

            if (this.canAttack && dist(player.position.x, this.position.x, player.position.y, this.position.y) <= this.attackRange) {
                this.canAttack = false;
            }

            if (this.canAttack == false) {
                this.inAttackFor = 20
                if (this.inAttackdFor != 0) {
                    this.inAttackFor--;
                    this.image
                } else {
                    this.checkCollision();
                    this.canAttack = true;
                }
            }
        }
    }

    checkCollision() {
        for (let target = 0; target < enemies.length; target++)
            if (enemies[target].position.x >= player.position.x && enemies[target].position.x <= player.position.x + this.hitboxX) {
                console.log("dsajknkdas")
                enemies[target].hp -= this.damage;
                enemies[target].receivedHit();

            }

    }




    //solid code
    isGrounded() {
        this.feetY = this.position.y + this.height / 2;
        if (this.floorY <= this.feetY) {
            this.grounded = true;
            this.canJump = true;
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

    receivedHit() {
        if (this.hp <= 0) {
            enemies.splice(this.iam);
        }
    }

}
