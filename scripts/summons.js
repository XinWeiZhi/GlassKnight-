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
        if (this.floorY <= this.position.y + this.height / 2) {
            this.grounded = true;
            this.jumps = this.mJumps;
            this.jumpSpeed = 8;
            this.position.y = this.floorY - this.height / 2;
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
    
    follow() {
        if(player.position.x < this.position.x) {
            this.reposition(-this.speed, 0);
        } else {
            this.reposition(this.speed,0);
        }
    }
    // check for target
    process() {
        
        if(this.inAttack) {
            this.attack();
        } else {
            this.follow();
        }
        
        for (let e = 0; e < enemies.length; e++) {
                if (this.target == null || this.target.hp <= 0) {
                    this.target = enemies[e];
                    this.changeAggroAt = 1000;
                
                }
            break;
            } 
     if(this.target.position.x > this.position.x) {
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
        
        if(this.canAttack === false) {
            this.attack(1,3);
        }
    }


}
