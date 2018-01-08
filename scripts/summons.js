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
        this.type = "summon";
        this.takenDamageMultiplier = 1;
        this.gravityMultiplier = 1;
        this.inAttack = false;
        this.duration;
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
        if (this.floorY <= this.position.y + this.height) {
            this.grounded = true;
            this.jumps = this.mJumps;
            this.jumpSpeed = 8;
            this.position.y = this.floorY - this.height;
        } else {
            this.grounded = false;
            this.position.y += gravity * this.gravityMultiplier;
            this.gravityMultiplier++;
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
        this.damage = 1;
        this.hp = 12;
        this.mhp = 12;
        this.width = 180;
        this.height = 110;
        this.changeAggroAt = 1000;
        this.target;

    }
    //show, isGrounded
    attack(pattern, damage) {
        if (pattern === 1) {
            this.reposition(this.speed, 0);
            for (let e = 0; e < enemies.length; e++) {
                if (collisionDetected(enemies[e], this.position, this.width / 2, this.height / 2)) {
                    dealDamage(this.target, damage);
                    this.attackCooldown = 60;
                    this.canStillDamage = false;
                    this.canAttack = false;
                }
            }

        }
    }

    //    follow() {
    //        if(player.position.x < this.position.x) {
    //            this.reposition(-this.speed, 0);
    //        } else {
    //            this.reposition(this.speed,0);
    //        }
    //    }
    // check for target
    process() {

        //        if(this.inAttack) {
        //            this.attack();
        //        } else {
        //            this.follow();
        //        }

        for (let e = 0; e < enemies.length; e++) {
            if (this.target == null || this.target.hp <= 0) {
                this.target = enemies[e];
                this.changeAggroAt = 1000;

            }
            break;
        }
        if (this.target.position.x > this.position.x) {
            this.reposition(this.speed, 0);
        } else {
            this.reposition(-this.speed, 0);
        }
        if (this.attackCooldown <= 0) {
            this.canStillDamage = true;
            this.canAttack = false;

        } else {
            this.attackCooldown--;
            this.canAttack = true;
        }

        if (this.canAttack === false) {
            this.attack(1, 3);
        }
    }


}

class SummonCannon extends Summon {
    constructor(x, y, duration) {
        super(x, y, duration)
        this.speed = 6;
        this.image = cannon;
        this.damage = 1;
        this.hp = 15;
        this.mhp = 15;
        this.width = 180;
        this.height = 140;
        this.attackRange = 1200;
        this.target;
        this.direction = 1;
        this.canProcess = true;
        this.duration = duration;
        this.currentSpeed = 0;

    }


    attack(pattern, target) {
        console.log("attack")
        //cannon fire 1 quick attack
        if (pattern === 1) {
            //                projectiles.push(new Beam(this.position.x + this.width / 2, this.position.y + this.height / 2, this.target, 1, 1, this.damage, 100, this.target.position));
            projectiles.push(new CannonArrow(this.position.x, this.position.y, this.target, 20, 20, this.damage, 5, this.target.position));
            this.attackCooldown = 6;
        } else if (pattern === 2) {
            this.position.add(-30 * this.direction, 10);
            //            projectiles.push(new GrapeShot())
            this.attackCooldown = 30;
        }


    }

    receiveHit(damage, slot) {
        if (this.hp <= 0) {
            allies.splice(slot, 1);
        }
    }

    follow() {
        if (player.position.x - 220 <= this.position.x) {
           
            if(this.direction != -1) {
                this.direction = -1;
                this.currentSpeed = 0;
            }
             this.position.add(-this.currentSpeed, 0);
        } else if (player.position.x - 220 > this.position.x) {
            
            if(this.direction != 1) {
                this.direction = 1;
                this.currentSpeed = 0;
            }
            this.position.add(this.currentSpeed, 0);
        }
        if (this.currentSpeed < this.speed) {
            this.currentSpeed += 0.2;
        }
    }



    // check for target
    process(i) {

        //usual pattern is follow player unless an enemy enters into the range of 1500 vector x,y, in this case the cannon will switch immediately into attack mode with cannonball arrows
        //cooldowns
        this.target = targetEnemy(this.position, this.attackRange);
        if (this.target != null && this.attackCooldown == 0) {
            //decide between attack 1 or 2
            if (this.target.position.dist(this.position) < 70) {
//                this.attack(2, this.target);
                this.attack(1, this.target);
            } else {
                this.attack(1, this.target);
            }
        } else {
            this.follow();
            if (this.attackCooldown > 0) {
                this.attackCooldown--;
            }
        }

        //check timer
        this.duration--;
        if (this.duration <= 0) {
            allies.splice(i, 1);
        }


    }


}
