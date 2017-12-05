class Player {
    constructor(x, y) {
        this.position = createVector(this.x, this.y);
        this.speed = 9;
        this.width = 100;
        this.height = 180;
        this.hp = 20;
        this.mhp = 20;
        this.jumps = 2;
        this.grounded = false;
        this.jumpSpeed = 0;
        this.terminal = 45;
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


        this.animation = {
            Idle: [pepe, pepe, walk, walk, walk, walk, walk, walk],
            WalkLeft: [walkLeft0, walkLeft0, walkLeft0, walkLeft0, walkLeft0, pepe, walk, pepe, walk, walk, walk, walk],
            WalkRight: [pepe, pepe, walk, walk, pepe, walk, walk, walk],
            Jump: [walk, walk, walk, walk, walk, walk, walk, walk],
            Attack: [sword, sword, sword, sword, sword, sword],
            MoveAttackLeft: [walkAttackleft, walkAttackleft ,walkAttackleft ,walkAttackleft, walkAttackleft],
            MoveAttackRight: [walkAttackleft,walkAttackleft,walkAttackleft,walkAttackleft,walkAttackleft],
            AttackJump: [walkAttackleft,walkAttackleft,walkAttackleft,walkAttackleft],
            AttackDive: [walkAttackleft,walkAttackleft],
            Attack: [walkAttackleft, walkAttackleft],
            Spell: [fire, fire, fire, fire, fire, fire, fire, fire, fire, fire, fire],
        }
        this.currentAnimation = this.animationIdle;
        this.isAttackingFor = 0;
        this.image = pepe;
        this.canDash = true;
        this.dashFor = 0;
        this.mana = 250;
        this.mMana = 250;
        this.frame = 0;
        this.hitboxX = 215;
        this.spellDamage = 5;
        this.damage = 2;
        this.experience = 0;
        this.experienceToLevel = 30;
        this.atkCooldown = 0;
        this.state = 0 // 0 for idle, 1 for movement right, 2 for move left, 3 for attacking, 4 for spell, 5 for jump
        this.takenDamageMultiplier = 1;
        this.comboAttack = 0;
        this.spellArray = [];
        this.comboArray = [];
        this.weaponArray = [];
        
        this.comboAttack = {
            0: {damage: 2, movement: createVector(5,0), animation :[this.animation.MoveAttackLeft], xBox: 120, yBox: this.height / 2},
            1: {damage: 3, movement: createVector(5,0), animation : [this.animation.Jump] , xBox: 150, yBox: this.height / 2},
            2: {damage: 4, movement: createVector(12,0), animation: [this.animation.Attack], xBox: 150, yBox: this.height / 2},
            3: {damage: 5, movement: createVector(5,0), animation : [this.animation.Spell] , xBox: 220, yBox: this.height / 2},
            
        }
        
        //perhaps this.hat / this.armor
    }

    
    changeAnimationTo(array) {
        if (this.currentAnimation != array) {
            this.frame = 0;
            this.currentAnimation = array;
        }
    }


    show() {

        this.image = this.currentAnimation[this.frame];
        image(this.image, this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height);


        if (this.frame < this.currentAnimation.length - 1) {
            this.frame++;
        } else {
            this.frame = 0; // reset animation no matter what
            
            if(!this.canAttack) {
                for(e = 0; e < enemies.length; e++) {
                    if(collisionDetected(enemies[e], this.position, this.hitboxX, this.hitboxY)) {
                      dealDamage(enemies[e], this.damage, e);     
                    }
                    
                }
             
            }
            //decide the next animation array in process and if none have animation idle
            this.canAttack = true;
            this.canSpell = true;
            this.canMove = true;
        }


    }
    
    jump() {
        if(keyIsDown(32)) {
            this.position.y -= this.jumpSpeed; 
            this.position.y += gravity * this.gravityMultiplier;
        }
    }

    animate() {
        if (this.state == 5) { //jump
            this.image = this.animationJump[this.frame];
            if (this.frame < this.animationJump.length - 1) {
                this.frame++;
            } else {
                this.frame = 0;
            }
            //to do code the jump animations in 
            if (keyIsDown(32) && this.stillGoingUp) {
                this.position.y -= this.jumpSpeed;
            } else if (this.stillGoingUp) {
                this.stillGoingUp = false;
            }
            //possibly sdtate for falling
        } else if (this.state == 0) { // idle
            this.image = this.animationIdle[this.frame];
            if (this.frame < this.animationIdle.length - 1) {
                this.frame++;

            } else {
                this.frame = 0;
            }

        } else if (this.state == 3) { //attack atk timer --

            if (this.isAttackingFor > 0) {
                this.isAttackingFor--;
                if (this.frame < this.animationAttack.length - 1) {
                    this.frame++;
                }
                this.image = this.animationAttack[this.frame];
                if (this.isAttackingFor == 0) {
                    this.checkCollision(250, this.height);

                    this.frame = 0;
                    this.state = 0;
                    this.canAttack = true;

                }

            }

        } else if (this.state == 4) { // spell
            this.mana -= 3;
            if (this.isAttackingFor > 0) {
                this.isAttackingFor--;
                if (this.frame < this.animationSpell.length - 1) {
                    this.frame++;
                }
                this.image = this.animationSpell[this.frame];
                if (this.isAttackingFor == 0) {
                    projectiles.push(new FireBall(this.position.x, this.position.y, 1800, 50, 40, this.spellDamage, this.speed / 7 * this.direction, 55, 20));
                    this.frame = 0;
                    this.state = 0;
                    this.canSpell = true;
                }

            }

        }
    }

    reposition(x, y) {
        this.position.add(createVector(x, y));
    }

    attack(direction, spell, type, slot, damage, x, y) { //x,y refer to hitboxes, type refers to buff or projectile slot in spell array or wep
        this.canAttack = false;
        if(!spell) { // type will refer to combo so far instead of spell type
            this.changeAnimationTo(this.comboArray.type.animation);
            this.reposition(this.comboArray.type.movement);
            this.damage = (this.comboArray.type.damage);
            this.hitboxX = (this.comboArray.type.xBox);
            this.hitboxY = (this.comboArray.type.yBox);
            this.comboAttack++;
            
            
        } else if(spell) {
            if(type === "buff") {
                
            }
            
            if(type === "missile") {
                
            }
            
            if(type === "summon") {
                
            }
        }
    }
    
    
    //jumps etc
    process() {
        //always happening
        if (this.atkCooldown > 0) {
            this.atkCooldown--;
        }

        if (this.grounded == false && this.jumps == 2) {
            this.jumps = 1;
        }

        if (this.mana < this.mMana) {
            this.mana += 0.5;
        }

        if (this.grounded == false) {
            this.position.y += gravity * this.gravityMultiplier;
            if (this.gravityMultiplier <= this.terminal) {
                this.gravityMultiplier *= 1.08;
            }

        }
        //animations and states
        //can only move if this is true
        if (this.canMove) {
            // move animation
            // if key is down activate move
            
            // if already in move then activate attack move
            // if already in attack move then wait for animation frame to end 
            //make animation walk frame carry over 
        if (keyIsDown(68)) {
            if (this.currentAnimation == this.animation.Idle) {
                this.direction = 1;
                this.movementAccelerator = 0;
            }
            this.reposition((this.speed + this.movementAccelerator) * this.direction);
            if (this.movementAccelerator < 2) {
                this.movementAccelerator += 0.2;
            }

            if (mouseIsPressed && this.currentAnimation == this.animation.WalkRight && this.canAttack) {
                if (mouseButton == LEFT) {
                    this.changeAnimationTo(this.animation.MoveAttackRight);
                    this.attack();
                }
            } else if (this.currentAnimation != this.animation.MoveAttackRight) {
                this.changeAnimationTo(this.animation.WalkRight);
            }

        } else if (keyIsDown(65)) {
            if (this.currentAnimation == this.animation.Idle) {
                this.direction = -1;
                this.movementAccelerator = 0;
            }

            this.reposition((this.speed + this.movementAccelerator) * this.direction);
            if (this.movementAccelerator < 2) {
                this.movementAccelerator += 0.2;
            }
            
            if (mouseIsPressed && this.currentAnimation == this.animation.WalkLeft && this.canAttack) {
                if (mouseButton == LEFT) {
                    this.changeAnimationTo(this.animation.MoveAttackLeft);
                    this.attack();
                }
            } else if (this.currentAnimation != this.animation.MoveAttackLeft) {
                this.changeAnimationTo(this.animation.WalkLeft);
            }

        }


    }
    //if still attack
    //canAttack if this is true
        //processes after move
    if (this.canAttack) {
        if(mouseClicked) {
            
        }
        if (this.direction === -1) {
            this.changeAnimationTo(this.animationWalkLeft);
        } else if (this.direction === 1) {
            this.changeAnimationTo(this.animationWalkRight);
        }


    } else {
        //you are attacking and moving
        if (this.canAttack && )
    }


}

if (this.canSpell) {

    this.changeAnimationTo(this.animationSpell);

}

if (this.canAttack) {

    this.canAttack = false;
    this.changeAnimationTo(this.animationAttack); // at the end of the animation checkCollision;

}

if (this.canJump) {

    this.changeAnimationTo(this.animationJump);

}

if (this.canAttack && this.canJump && this.canMove && this.canSpell) {
    if (this.currentAnimation != this.animationIdle) {
        this.changeAnimationTo(this.animationIdle);
    } else {









    }

}




//if using a spell or item or weapon, this.canAttack will become false
if (this.canAttack && this.canSpell && this.canMove) { //canMove if you are not in an attack or spell
    //idle


    if (this.dashFor > 0) {
        this.dashFor--;
        this.mana--;
        if (this.direction == 1) {
            this.position.x += this.speed * 7;
        } else if (this.direction == -1) {
            this.dashFor--;
            this.position.x -= this.speed * 7;
        }


    } else {
        if (keyIsDown(68) && keyIsDown(65)) {
            if (this.state != 0 && this.state != 5 && this.state != 3) {
                this.frame = 0;
                this.state = 0;
            }
        } else if (keyIsDown(68)) { // move right
            this.direction = 1;
            this.position.x += this.speed;
            if (keyIsDown(16) && this.canDash && this.mana >= 10) {
                this.dashFor = 8;
                this.mana -= 10;
                this.canDash = false;

            }
            if (this.state != 1 && this.state != 5) {
                this.frame = 0;
                this.state = 1;
                this.speed = 7;
            }
        } else if (keyIsDown(65)) {

            this.direction = -1;
            this.position.x -= this.speed;
            if (keyIsDown(16) && this.canDash && this.mana >= 10) {
                this.dashFor = 20;
                this.mana -= 10;
                this.canDash = false;

            }
            if (this.state != 2 && this.state != 5) {
                this.frame = 0;
                this.state = 2;
                this.speed = 7;
            }


        } else if (this.state != 0 && this.state != 5 && this.state != 3) {
            this.frame = 0;
            this.state = 0;

        }
    }



    if (keyIsDown(69) && this.state != 4) { // spell
        this.frame = 0;
        this.state = 4;
        this.canSpell = false;
        this.isAttackingFor = this.animationSpell.length - 1
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
        if (this.state == 5) {
            this.state = 0;
            this.frame = 0;
        }

    } else {
        this.grounded = false;
    }
    //and if this is true, then ur feetY will equal the floorY

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


checkCollision(a, b) { // planning on adding 3rd intake damage and just using that for the hit
    this.hitboxX = a;
    this.hitboxX = b;
    for (let target = 0; target < enemies.length; target++) {
        if (this.direction == -1) {
            if (enemies[target].position.x >= this.position.x - this.hitboxX && enemies[target].position.x <= this.position.x && enemies[target].position.y + enemies[target].height / 2 >= this.position.y - this.height / 2 && enemies[target].position.y - enemies[target].height / 2 <= this.position.y + this.height / 2) {
                dealDamage(enemies[target], this.damage, target);
            }
        } else if (this.direction == 1) {
            if (enemies[target].position.x <= this.position.x + this.hitboxX && enemies[target].position.x >= this.position.x && enemies[target].position.y + enemies[target].height / 2 >= this.position.y - this.height / 2 && enemies[target].position.y - enemies[target].height / 2 <= this.position.y + this.height / 2) {
                dealDamage(enemies[target], this.damage, target);
            }
        }


    }


}


attack() {
    //attack if not already in state 3 / all the code will be in animation
    this.frame = 0;
    this.state = 3;
    if (mouseX + camX >= this.position.x) {
        this.direction = 1;
    } else {
        this.direction = -1;
    }
    this.isAttackingFor = this.animationAttack.length - 1

}

receivedHit() {
    if (this.hp <= 0) {

    }


}


}
