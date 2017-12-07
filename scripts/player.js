class Player {
    constructor(x, y) {
        this.position = createVector(this.x, this.y);
        this.speed = 9;
        this.width = 100;
        this.height = 180;
        this.hp = 20;
        this.mhp = 20;
        this.maxJumps = 2;
        this.jumps = this.maxJumps;
        this.grounded = false;
        this.jumpSpeed = 10;
        this.currentJumpSpeed = 0;
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
            MoveAttackLeft: [walkAttackleft, walkAttackleft, walkAttackleft, walkAttackleft, walkAttackleft],
            MoveAttackRight: [walkAttackleft, walkAttackleft, walkAttackleft, walkAttackleft, walkAttackleft],
            AttackJump: [walkAttackleft, walkAttackleft, walkAttackleft, walkAttackleft],
            AttackDive: [walkAttackleft, walkAttackleft],
            Spell: [fire, fire, fire, fire, fire, fire, fire, fire, fire, fire, fire],
        }
        this.currentAnimation = this.animation.Idle;
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
        this.spellSelect = [new Dash()];
        this.weaponSelect = [];
        this.rooted = false;
        this.stunned = false;
        this.slowedBy = 1;
        this.poisoned = false;
        this.silenced = false;

        this.comboArray = [
            {
                damage: 2,
                movement: createVector(5, 0),
                animation: this.animation.Attack,
                xBox: 120,
                yBox: this.height / 2
            },
            {
                damage: 3,
                movement: createVector(5, 0),
                animation: this.animation.Jump,
                xBox: 150,
                yBox: this.height / 2
            },
            {
                damage: 4,
                movement: createVector(12, 0),
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

            if (!this.canAttack && this.spell) { // so only if its a physical attack not a spell check collision
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

    beginJump(grounded) {

        if (this.jumps === this.maxJumps && this.grounded) {
            this.currentJumpSpeed = this.jumpSpeed;
            this.jumps--;
            this.stillGoingUp = true;
            this.grounded = false;
        } else if (jumps > 0 && this.currentJumpSpeed <= this.jumpSpeed * 0.5) {
            this.currentJumpSpeed = this.jumpSpeed;
            this.jumps--;
            this.stillGoingUp = true;
            this.grounded = false;
        }

    }

    //always on
    jump() {

        if (!this.grounded) {
            if (keyIsDown(32) && this.stillGoingUp) {
                this.reposition(0, -this.currentJumpSpeed);
                this.changeAnimationTo(this.animation.Jump);
            } else if (this.stillGoingUp) {
                this.stillGoingUp = false;
                this.currentJumpSpeed = 0;
            }

            if (this.currentJumpSpeed > 0) {
                this.currentJumpSpeed -= gravity;
            }

        } else if (this.grounded) {
            this.currentJumpSpeed = 0;
        }


    }

    animate() {


        if (this.state == 4) { // spell
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

    attack(slot, combo) { // slot in spell array or wep, 0 if it is not a spell
        this.canAttack = false;
        this.canMove = false;

        if (mouseX + camX >= this.position.x) {
            this.direction = 1;
        } else {
            this.direction = -1;
        }

        this.changeAnimationTo(this.comboArray[combo].animation); // at the end of animation deal damage
        this.reposition(this.comboArray[combo].movement);
        this.damage = (this.comboArray[combo].damage);
        this.hitboxX = (this.comboArray[combo].xBox);
        this.hitboxY = (this.comboArray[combo].yBox);


        if (this.comboAttack == 3) {
            this.comboAttack = 0;
        } else {
            this.comboAttack++;
        }
    }

    spell(direction, slot, i) {
        let type = spellSelect[slot].type;
        this.canAttack = false;
        this.canSpell = false;
        this.canMove = false;
        if (type === "buff") {
//            buffs.push(new this.spellSelect[slot](allies[i], spellSelect.[slot] timer));
        }

        if (type === "missile") {

        }

        if (type === "summon") {

        }

        if (type === "teleport") {}
    }


    //jumps etc
    process(iam) {

        if (this.currentAnimation === this.animation.Jump) {
            this.jump();
        }

        //always happening
        if (this.atkCooldown > 0) {
            this.atkCooldown--;
        }

        if (this.mana < this.mMana) {
            this.mana += 0.5;
        }


        //animations and states

        //processes before move // ATTACK ATTACK ATTACK
        if (this.canAttack && !this.stunned) {
            if (mouseIsPressed) {
                if (mouseButton == LEFT) {
                    this.changeAnimationTo(this.animation.Attack);
                    this.attack(0, this.comboAttack);
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
        //can only move if this is true
        if (this.canMove && !this.rooted && !this.stunned) {
            // move animation

            if (this.canJump) {
                if (keyIsDown(32)) {
                    this.beginJump(this.grounded);
                }
            }

            if (keyIsDown(68)) {
                if (this.currentAnimation == this.animation.Idle) {
                    this.direction = 1;
                    this.movementAccelerator = 0;
                }
                this.reposition((this.speed + this.movementAccelerator) * this.direction);
                if (this.movementAccelerator < 2) {
                    this.movementAccelerator += 0.2;
                }
                //ATTACK ATTACK ATTACK
                if (mouseIsPressed && this.currentAnimation == this.animation.WalkRight && this.canAttack) {
                    if (mouseButton == LEFT) {
                        this.changeAnimationTo(this.animation.MoveAttackRight);
                        this.attack(0, this.comboAttack);
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
                //ATTACK ATTACK ATTACK
                if (mouseIsPressed && this.currentAnimation == this.animation.WalkLeft && this.canAttack) {
                    if (mouseButton == LEFT) {
                        this.changeAnimationTo(this.animation.MoveAttackLeft);
                        this.attack(0, this.comboAttack);
                    }
                } else if (this.currentAnimation != this.animation.MoveAttackLeft) {
                    this.changeAnimationTo(this.animation.WalkLeft);
                }

            } else if (!this.grounded) {
                this.currentAnimation = this.animation.Idle
            }
        }
    }


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
