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
                    dealDamage(this.target, damage, e);
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
        this.speed = 5;
        this.image = cannon;
        this.damage = 3;
        this.hp = 10;
        this.mhp = 10;
        this.width = 180;
        this.height = 140;
        this.changeAggroAt = 1000;
        this.attackRange = 1000;
        this.target;
        this.threatenedLevel = 0;
        this.framesSinceAttack = 0;
        this.direction = 1;
        this.canProcess = true;
        this.duration = duration;
        this.currentSpeed = 0;
    }


    getTarget() {
        //in aggroRange
        /* 
            cannon will operate based on threatLevel;
            if threatLevel is higher, then cannon will target
            factors:
            distance to itself, 
            who player is attacking,
        
            also, enemy will target based on same factors, 
            distance to itself, 
            player or summon or npc,
            if player is nearby and attacking, it will automatically target
            if player is nearby and not attacking, it will not target over the cannon
            */

        if (this.target == null) {
            this.threatenedLevel = 0;
            console.log("yes")
        } else {
            strokeWeight(5);
            stroke(200, 30, 10);
            line(this.position.x, this.position.y, this.target.position.x, this.target.position.y);
        }
        if (player.target === null || player.target.position.dist(this.position) > this.attackRange) {
            for (let e = 0; e < enemies.length; e++) {
                if (this.threatenedLevel < enemies[e].damage * 200 - this.position.dist(enemies[e].position) && this.position.dist(enemies[e].position) <= this.attackRange) {
                    this.target = enemies[e];
                    this.threatenedLevel = enemies[e].damage * 200 - this.position.dist(enemies[e].position);
                }
            }
        } else if (player.target.position.dist(this.position) <= this.attackRange) {
            this.target = player.target;
            this.threatenedLevel = this.target.damage * 200 - this.position.dist(this.target.position);
        } else {
            this.target = null;
        }
    }

    attack(pattern, target) {
        //cannon fire 1 quick attack
        if (pattern === 1) {
            //pause for 5 frames
            if (frameCount % 5 == 0) {
                projectiles.push(new Beam(this.position.x + this.width / 2, this.position.y + this.height / 2, this.target, 1, 1, 2, 100));

            }

        } else if (pattern === 2) {
            this.position.x - this.repelDistance * this.direction;
            projectiles.push(new GrapeShot())
        }
        //cannon fire 2 repel aoe
        
    }

    reposition(x, y) {
        this.position.add(x, y);
    }

    receiveHit(damage, slot) {
        if (this.hp <= 0) {
            allies.splice(slot, 1);
        }
    }

    follow() {
        //100 is follow range

        if (player.position.x - 220 <= this.position.x) {
            this.reposition(-this.speed, 0);
        } else if (player.position.x - 220 > this.position.x) {
            this.reposition(this.speed, 0);
        }



    }



    // check for target
    process(i) {
        this.duration--;
        if (this.duration <= 0) {
            allies.splice(i, 1);
        }
        //cooldowns
        if (this.target != null) {
            //attack etc
            if (this.target.position.dist(this.position) <= this.attackRange) {

                this.attack(1, this.target);
            }
            if(this.target.hp <= 0) {
                this.target = null;
            }
        } else {
            this.getTarget();

            if (player.position.dist(this.position) > 240) {
                this.follow();
            }
        }




    }



    //        if (this.attackCooldown <= 0) {
    //            this.canStillDamage = true;
    //            this.canAttack = false;
    //
    //        } else {
    //            this.attackCooldown--;
    //            this.canAttack = true;
    //        }
    //
    //        if (this.canAttack === false) {
    //            this.attack(1, 3);
    //        }
}
