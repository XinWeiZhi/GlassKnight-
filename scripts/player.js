class Player {
    constructor(x, y) {
        this.position = createVector(this.x, this.y);
        this.speed = 9;
        this.realSpeed = 9;
        this.movementAccelerator = 2;
        this.width = 100;
        this.height = 180;
        this.hp = 20;
        this.mhp = 20;
        this.maxJumps = 2;
        this.jumps = this.maxJumps;
        this.grounded = false;
        this.jumpSpeed = 20;
        this.currentJumpSpeed = 0;
        this.terminal = 45;
        this.gravityMultiplier = 1;
        this.feetY = this.position.y + this.height / 2;
        this.floorY = 800;
        this.canAttack = true;
        this.canSpell = true;
        this.canMove = true;
        this.inJump = false;
        this.jumpCoolDown = 30;
        this.direction = 1;
        this.stillGoingUp = false;
        this.damageMultiplier = 1;

        this.weapon = new Sword(this.position.x, this.position.y);
        //make this.damage = to the weapon damage and such


        this.animation = {
            Idle: [pepe, pepe, walk, walk, walk, walk, walk, walk],
            WalkLeft: [walkLeft0, walkLeft0, walkLeft0, walkLeft0, walkLeft0, pepe, walk, pepe, walk, walk, walk, walk],
            WalkRight: [pepe, pepe, walk, walk, pepe, walk, walk, walk],
            Jump: [walk, walk, walk, walk, walk, walk, walk, walk],
            Attack: [sword, sword, sword, sword, sword, sword],
            MoveAttackLeft: [walkAttackleft, walkAttackleft, walkAttackleft, walkAttackleft, walkAttackleft],
            MoveAttackRight: [walkAttackleft, walkAttackleft, walkAttackleft, walkAttackleft, walkAttackleft],
            AttackJump: [walkAttackleft, walkAttackleft, walkAttackleft, walkAttackleft],
            AttackDive: [walkAttackleft, walkAttackleft],
            Spell: [fire, fire, fire, fire, fire, fire, fire, fire, fire, fire, fire],
            Up: [up, up, up, up, up, up],
        }
        this.currentAnimation = this.animation.Idle;
        this.isAttackingFor = 0;
        this.image;
        this.mana = 250;
        this.mMana = 250;
        this.frame = 0;
        this.hitboxX = 215;
        this.spellDamage = 0;
        this.damage = 2;
        this.experience = 0;
        this.experienceToLevel = 30;
        this.atkCooldown = 0;
        this.state = 0 // 0 for idle, 1 for movement right, 2 for move left, 3 for attacking, 4 for spell, 5 for jump
        this.takenDamageMultiplier = 1;
        this.comboAttack = 0;


        this.spellSelect = [DashRef, RegenerateRef, FireballRef, FireballRef];
        this.weaponSelect = [];
        this.rooted = false;
        this.stunned = false;
        this.slowedBy = 1;
        this.poisoned = false;
        this.silenced = false;
        this.canProcess = true;

        this.comboArray = [
            { //regular attack regular attack regular attack
                damage: 2,
                movement: createVector(0, 0),
                animation: this.animation.Attack,
                xBox: 120,
                yBox: this.height / 2
            },
            {
                damage: 3,
                movement: createVector(2, 0),
                animation: this.animation.Jump,
                xBox: 150,
                yBox: this.height / 2
            },
            {
                damage: 4,
                movement: createVector(3, 0),
                animation: this.animation.Attack,
                xBox: 150,
                yBox: this.height / 2
            },
            {
                damage: 5,
                movement: createVector(5, 0),
                animation: this.animation.Spell,
                xBox: 220,
                yBox: this.height / 2
            },

        ]

        this.moveArray = [
            //move attacks move attacks move attacks
            { //up
                damage: 2,
                movement: createVector(0, 0),
                animation: this.animation.Up,
                xBox: 150,
                yBox: this.height
            },
            { // left
                damage: 3,
                movement: createVector(5, 0),
                animation: this.animation.Jump,
                xBox: 150,
                yBox: this.height / 2
            },
            { // right
                damage: 4,
                movement: createVector(12, 0),
                animation: this.animation.Attack,
                xBox: 150,
                yBox: this.height / 2
            },
            { // down
                damage: 5,
                movement: createVector(0, 0),
                animation: this.animation.Spell,
                xBox: 150,
                yBox: this.height / 2
            }, //move attack includes up attack or down attack

        ]

        //perhaps this.hat / this.armor
    }


    changeAnimationTo(array) {
        if (this.currentAnimation != array) {
            this.frame = 0;
            this.currentAnimation = array;
            console.log(this.currentAnimation)

        }
    }


    show() {

        this.image = this.currentAnimation[this.frame];
        image(this.image, this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height);

    }


    //always on
    jump() {
        if (!this.jumpCoolDown) {
            this.jumpCoolDown = 30;
            this.jumps--;
            this.currentJumpSpeed = this.jumpSpeed;
            this.reposition(0, -this.currentJumpSpeed);
            this.gravityMultiplier = 1;
        }


    }

    animate() {
        if (this.frame < this.currentAnimation.length - 1) {
            this.frame++;
        } else {
            this.frame = 0; // reset animation no matter what

            if (!this.canAttack && this.canSpell) { // so only if its a physical attack not a spell check collision
                for (let e = 0; e < enemies.length; e++) {
                    if (collisionDetected(enemies[e], this.position, this.hitboxX, this.hitboxY)) {
                        dealDamage(enemies[e], this.damage, e);
                    }
                }
            }
            //decide the next animation array in process and if none have animation idle

            this.canMove = true;
            this.canAttack = true;
            this.canSpell = true;

        }
    }

    reposition(x, y) {
        this.position.add(createVector(x, y));
    }

    attack(slot, combo, moving) { // slot in spell array or wep, 0 if it is not a spell
        this.canAttack = false;
        this.canMove = false;
        let direction;

        if (mouseX + camX >= this.position.x) {
            this.direction = 1;
        } else {
            this.direction = -1;
        }

        if (keyIsDown(87)) {
            direction = 0;
        } else if (keyIsDown(83)) {
            direction = 3;
        } else if (keyIsDown(68)) {
            direction = 2;
        } else if (keyIsDown(65)) {
            direction = 1;
        }

        if (this.currentAnimation === this.animation.MoveAttackLeft || this.currentAnimation === this.animation.MoveAttackRight && moving) { // combo == 0 up, 1 L, 2 R, 3 down  
            this.reposition(this.moveArray[direction].movement.x * this.direction, this.moveArray[direction].movement.y);
            this.damage = (this.moveArray[direction].damage);
            this.hitboxX = (this.moveArray[direction].xBox);
            this.hitboxY = (this.moveArray[direction].yBox);

        } else {
            this.changeAnimationTo(this.comboArray[this.comboAttack].animation); // at the end of animation deal damage
            this.reposition(this.comboArray[this.comboAttack].movement.x * this.direction, this.comboArray[this.comboAttack].movement.y);
            this.damage = (this.comboArray[this.comboAttack].damage);
            this.hitboxX = (this.comboArray[this.comboAttack].xBox);
            this.hitboxY = (this.comboArray[this.comboAttack].yBox);


        }


        if (this.comboAttack == 3) {
            this.comboAttack = 0;
        } else {
            this.comboAttack++;
        }
    }

    spell(direction, slot, i) {
        if (this.mana - this.spellSelect[slot].manaCost >= 0 && this.spellSelect[slot].cooldown <= 0) {
            let type = this.spellSelect[slot].type;
            this.canAttack = false;
            this.canSpell = false;
            this.canMove = false;
            if (type === "teleport") {
                this.spellSelect[slot].make(this,this.speed);
            }

            if (type === "missile") {
                this.spellSelect[slot].make(this.position.x, this.position.y, this.spellSelect[slot].maxRange, 50, 40, this.spellSelect[slot].damage + this.spellDamage, this.speed / 7 * this.direction, this.spellSelect[slot].xBox, this.spellSelect[slot].yBox);
            }

//            if (type === "summon") {
//                this.spellSelect[slot].make(this,this.position.x, this.position.y);
//            }

            if (type === "buff") {
                this.spellSelect[slot].make(this);
            }

            this.mana -= this.spellSelect[slot].manaCost;
            this.spellSelect[slot].cooldown = this.spellSelect[slot].fullCooldown;
        }

    }


    //jumps etcd
    process(iam) {
        //always happening
        if (this.atkCooldown > 0) {
            this.atkCooldown--;
        }
        
        if(this.spellSelect[0].cooldown >= 0) {
            this.spellSelect[0].cooldown--;
        } 
         if(this.spellSelect[1].cooldown >= 0) {
            this.spellSelect[1].cooldown--;
        } 
         if(this.spellSelect[2].cooldown >= 0) {
            this.spellSelect[2].cooldown--;
        } 
         if(this.spellSelect[3].cooldown >= 0) {
            this.spellSelect[3].cooldown--;
        } 

        if (this.jumpCoolDown > 0) {
            this.jumpCoolDown--;
        }

        if (this.mana < this.mMana) {
            this.mana += 0.5;
        }

      
        //animations and states

        if (this.canProcess) {


            //can only move if this is true
            if (this.canMove && !this.rooted && !this.stunned) {
                this.reposition(0, -this.currentJumpSpeed);

                if (keyIsDown(68) && keyIsDown(65)) {
                    this.changeAnimationTo(this.animation.Idle)
                } else if (keyIsDown(68)) {
                    this.realSpeed = this.speed;
                    this.direction = 1;
                    if (this.movementAccelerator < 2) {
                        this.movementAccelerator += 0.2;
                    }
                    //ATTACK ATTACK ATTACK
                    if (mouseIsPressed && this.currentAnimation == this.animation.WalkRight && this.canAttack) {
                        if (mouseButton == LEFT) {
                            this.changeAnimationTo(this.animation.MoveAttackRight);
                            this.attack(0, 0, true);
                        }
                    } else if (this.currentAnimation != this.animation.MoveAttackRight) {
                        this.changeAnimationTo(this.animation.WalkRight);
                    }

                } else if (keyIsDown(65)) { // a
                    this.realSpeed = this.speed;
                    this.direction = -1;
                    if (this.movementAccelerator < 2) {
                        this.movementAccelerator += 0.2;
                    }
                    //ATTACK ATTACK ATTACK
                    if (mouseIsPressed && this.currentAnimation == this.animation.WalkLeft && this.canAttack) {
                        if (mouseButton == LEFT) {
                            this.changeAnimationTo(this.animation.MoveAttackLeft);
                            this.attack(0, 0, true);
                        }
                    } else if (this.currentAnimation != this.animation.MoveAttackLeft) {
                        this.changeAnimationTo(this.animation.WalkLeft);
                    }

                } else if (this.canAttack) {
                    this.currentAnimation = this.animation.Idle
                    this.realSpeed = 0;
                    this.movementAccelerator = 0;
                }
                  
                if (this.currentJumpSpeed > 0) {
                    this.currentAnimation = this.animation.Jump;
                }
            }
            this.reposition((this.realSpeed + this.movementAccelerator) * this.direction);
            //processes after move // ATTACK ATTACK ATTACK
            if (this.canAttack && !this.stunned) {
                if (mouseIsPressed) {
                    if (mouseButton == LEFT) {
                        this.changeAnimationTo(this.animation.Attack);
                        this.attack(0, this.comboAttack, false);
                    }
                }

                //SPELL SPELL SPELL, w will be used for up - attack
                if (!this.silenced) {
                    if (keyIsDown(81)) { // q
                        this.spell(this.direction, 1, iam);
                    } else if (keyIsDown(69)) { // e
                        this.spell(this.direction, 2, iam);
                    } else if (keyIsDown(82)) { // r
                        this.spell(this.direction, 3, iam);
                    } else if (keyIsDown(16)) { // shift
                        this.spell(this.direction, 0, iam);
                    }
                }

            }
        }
    }


    isGrounded() {
        if (this.floorY <= this.position.y + this.height / 2 && this.gravityMultiplier * gravity >= this.currentJumpSpeed) {
            this.grounded = true;
            this.jumps = this.maxJumps;
            this.gravityMultiplier = 1;
            this.currentJumpSpeed = 0;
            this.position.y = this.floorY - this.height / 2;
        } else {
            this.grounded = false;
            this.position.y += gravity * this.gravityMultiplier;
            this.gravityMultiplier++;
            //gravity
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

        }


    }


}
