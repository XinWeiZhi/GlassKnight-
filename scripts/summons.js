class Summon {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.speed;
        this.image;
        this.damage;
        this.direction;
        this.hp;
        this.mhp;
        this.width;
        this.height;
        this.floorY;
        this.jumps;
        this.mJumps;
        this.jumpSpeed;
        this.target;
        this.detectRange = 800;
        this.aggroRange = 500;
        this.canAttack = true;
        this.canMove = true;
        this.canStillDamage = true;
        this.attackCooldown = 0;
    }

    animate() {
        
    }
    
    show() {
        image(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    reposition(x, y) {
        this.position.add(createVector(x, y));
    }

    attack(pattern, direction) {

    }

    process() {
        if (this.attackCooldown > 0) {
            this.attackCooldown--;
        }
    }

    isGrounded() {
        if (this.floorY <= this.position.y + this.height / 2) {
            this.grounded = true;
            this.jumps = this.mJumps;
            this.jumpSpeed = 8;
            this.position.y = this.floorY - this.height / 2;
        } else {
            this.grounded = false;
            //gravity
            this.jumpSpeed -= gravity;
        }

        //find this.floorY
        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i].x <= this.position.x && this.position.x <= tiles[i].x + tiles[i].width) {
                this.floorY = tiles[i].y;
                break;
            } else {
                this.floorY = 10000;
            }
        }
    }

    receivedHit(a) {
        if (this.hp <= 0) {
            allies.splice(a, 1);
        }

    }
}

class SummonBoar extends Summon {
    constructor(x, y) {
        super(x, y)
        this.speed = 6;
        this.image = pepe;
        this.damage = 3;
        this.hp = 20;
        this.mhp = 20;
        this.width = 180;
        this.height = 110;
        this.changeAggroAt;
        this.target;
        // && enemies[e].aggroLevel > this.changeAggroAt
    }
    //show, isGrounded
    attack(pattern, damage) {
        if (pattern === 1) {
            this.reposition(this.speed, 0);
            for (let e = 0; e < enemies.length; e++) {
                if (collisionDetected(enemies[e], this.position, this.width / 2, this.height / 2)) {
                    dealDamage(this.target, this.damage, e);
                    this.attackCooldown = 60;
                    this.canStillDamage = false;
                    this.canAttack = false;
                }
            }

        }
    }
    // check for target
    process() {
        if (this.attackCooldown == false) {
            this.canStillDamage = true;
            this.canAttack = true;
            for (let e = 0; e < enemies.length; e++) {
                if (this.target === null || this.position.dist(enemies[e].position) < this.position.dist(this.target.position)) {
                    this.target = enemies[e];
                    this.changeAggroAt = 200;
                }
            }
        } else {
            this.attackCooldown--;
        }
    }


}
