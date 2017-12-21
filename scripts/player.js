class Player {
    constructor(x, y) {
        this.position = createVector(this.x, this.y);
        this.weapon = new Sword(this);
        this.armor = new AssassinCloak(this);
        this.width = 100;
        this.height = 180;

        this.buff = {
            damage: 1, // up in 0.xx - %
            speed: 1, // ^
            damageReduction: 0, // up in x.xx


        }

        this.image;
        this.frame = 0;
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
            Stunned: [stunned, stunned, stunned, stunned, stunned],
        }
        this.currentAnimation = this.animation.Idle;

        //skills
        this.comboAttack = 0;
        this.spellSelect = [DashRef, RegenerateRef, FireballRef, FireballRef];
        this.itemSelect = [HealthPotionRef, CannonRef, EmptyItemRef]; // kb 1, 2, 3, 4 ,5

        //stats

        this.characterHp = 20;
        this.mhp = this.characterHp + this.armor.hp;
        this.hp = this.mhp;
        this.manaRegeneration = 0;
        this.hpRegeneration = 0;
        this.characterTenacity = 8;
        this.mtenacity = this.characterTenacity + this.armor.tenacity;
        this.tenacity = this.mtenacity;

        this.characterArmor = 0;
        this.characterMagicResistance = 0;
        this.characterDamageResistance = 0;

        this.mana = 250;
        this.mMana = 250;

        this.damage = 2;
        this.characterDamage = 2;
        this.characterSpellDamage = 0;
        this.spellDamage = 0;

        this.characterSpeed = 9;
        this.speed = (this.characterSpeed - this.armor.speedDebuff) * this.buff.speed;


        this.experience = 0; // remove these in the future
        this.experienceToLevel = 30;
        this.level = 1;
        
        this.jumpSpeed = 10; //based on char

        //calculation stats
        this.target = null;
        this.realSpeed = 0;
        this.movementAccelerator = 2;
        this.floorY = 800;
//        this.jumpCoolDown = 30;
        this.direction = 1;
        this.damageMultiplier = 1;
        this.takenDamageMultiplier = 1;
        this.atkCooldown = 0;
        this.hitboxX = 215;
        this.stillGoingUp = false;
        this.maxJumps = 2;
        this.jumps = this.maxJumps;
        this.grounded = false;
        this.currentJumpSpeed = 0;
        this.gravityMultiplier = 1;

        //disables
        this.staggered = false;
        this.canAttack = true;
        this.canSpell = true;
        this.canMove = true;
        this.rooted = false;
        this.stunned = false;
        this.slowedBy = 1;
        this.poisoned = false;
        this.silenced = false;
        this.canProcess = true;
        this.inDash = false;
        this.framesSinceDamaged = 0;
        this.framesSinceAttack = 0;
        //
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
        this.updateStats();
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

    }
    jump() {
            this.jumps--;
            this.currentJumpSpeed = this.jumpSpeed;
            this.gravityMultiplier = 1;
            this.stillGoingUp = true;

    }


    updateStats() {
        this.mhp = this.characterHp + this.armor.hp
        this.hpRegeneration = this.hpRegeneration; // only affected by buffs
        this.manaRegeneration = this.manaRegeneration; // only affected by buffs
        this.mtenacity = this.characterTenacity + this.armor.tenacity;
        this.takenDamageMultiplier = 1 + this.characterDamageResistance / -100 + this.armor.damageResistance / -100 + this.buff.damageReduction / -100;
        this.damage = (this.characterDamage + this.weapon.damage) * this.buff.damage;
        this.spellDamage = this.characterSpellDamage;
        this.speed = (this.characterSpeed - this.armor.speedDebuff) * this.buff.speed;
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
                        this.framesSinceAttack = 0;
                        for(let a = 0; a < allies.length; a++) {
                            allies[a].target = enemies[e];
                        }
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
        } else if(this.framesSinceAttack < 6) {
            this.comboAttack++;
        } else {
            this.comboAttack = 0;
        }
    }

    spell(direction, slot) {
        if (this.mana - this.spellSelect[slot].manaCost >= 0 && this.spellSelect[slot].cooldown <= 0) {
            let type = this.spellSelect[slot].type;
            this.canAttack = false;
            this.canSpell = false;
            this.canMove = false;
            if (type === "teleport") {
                this.spellSelect[slot].make(this, this.speed);
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

    item(direction, slot) {
        if (this.itemSelect[slot].cooldown <= 0) {
            this.canAttack = false;
            this.canSpell = false;
            this.canMove = false;
            let type = this.itemSelect[slot].type;
            if (type === "teleport") {
                this.itemSelect[slot].make(this, this.speed);
            }

            if (type === "missile") {
                this.itemSelect[slot].make(this.position.x, this.position.y, this.itemSelect[slot].maxRange, 50, 40, this.itemSelect[slot].damage + this.spellDamage, this.speed / 7 * this.direction, this.itemSelect[slot].xBox, this.itemSelect[slot].yBox);
            }

            if (type === "summon") {
                this.itemSelect[slot].make(this, this.position.x, this.position.y);
            }

            if (type === "buff") {
                this.itemSelect[slot].make(this);
            }
            this.itemSelect[slot].cooldown = this.itemSelect[slot].fullCooldown;
        }
    }


    process(iam) {
        //always happening
        this.framesSinceDamaged++;
        this.framesSinceAttack++;
        if (this.atkCooldown > 0) {
            this.atkCooldown--;
        }
        if (this.spellSelect[0].cooldown >= 0) {
            this.spellSelect[0].cooldown--;
        }
        if (this.spellSelect[1].cooldown >= 0) {
            this.spellSelect[1].cooldown--;
        }
        if (this.spellSelect[2].cooldown >= 0) {
            this.spellSelect[2].cooldown--;
        }
        if (this.spellSelect[3].cooldown >= 0) {
            this.spellSelect[3].cooldown--;
        }
        
        if (this.itemSelect[0].cooldown >= 0) {
            this.itemSelect[0].cooldown--;
        }
        if (this.itemSelect[1].cooldown >= 0) {
            this.itemSelect[1].cooldown--;
        }
        if (this.itemSelect[2].cooldown >= 0) {
            this.itemSelect[2].cooldown--;
        }
        if (this.tenacity < this.characterTenacity + this.armor.tenacity) {
            this.tenacity += this.characterTenacity / 300 * this.framesSinceDamaged / 100;
        }
        if (this.staggered) {
            this.changeAnimationTo(this.animation.Stunned);
            this.canProcess = false;
            this.tenacity += this.characterTenacity / 100;
            if (this.tenacity > this.characterTenacity / 4) {
                this.staggered = false;
                this.canProcess = true;
                this.currentJumpSpeed = 0;
            }
        }

        if (this.manaRegeneration != 0) {
            this.mana += this.manaRegeneration;
        }

        if (this.hpRegeneration != 0) {
            this.hp += this.hpRegeneration;
        }


        if (this.canProcess) {

            if (this.canMove && !this.rooted && !this.stunned) {
                this.reposition(0, -this.currentJumpSpeed);
                if(keyIsDown(32) && this.stillGoingUp) {
                    this.reposition(0, -this.jumpSpeed * 0.75)
                } else {
                    this.stillGoingUp = false;
                }
                if (keyIsDown(68) && keyIsDown(65)) {
                    this.changeAnimationTo(this.animation.Idle)
                } else if (keyIsDown(68)) {
                    this.realSpeed = this.speed;
                    this.direction = 1;
                    this.reposition((this.realSpeed + this.movementAccelerator));
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
                    this.reposition((-this.realSpeed - this.movementAccelerator));
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
            } else if (this.inDash) {
                this.reposition((this.realSpeed) * this.direction);
            }

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
                        this.spell(this.direction, 1);
                    } else if (keyIsDown(69)) { // e
                        this.spell(this.direction, 2);
                    } else if (keyIsDown(82)) { // r
                        this.spell(this.direction, 3);
                    } else if (keyIsDown(16)) { // shift
                        this.spell(this.direction, 0);
                    } else if (keyIsDown(49)) { // #1
                        this.item(this.direction, 0);
                    } else if (keyIsDown(50)) { // #2
                        this.item(this.direction, 1);
                    } else if (keyIsDown(51)) { // #3
                        this.item(this.direction, 2);
                    }
                }

            }
        }
    }


    isGrounded() {
        
        if(!this.grounded) {
            this.position.y += gravity * this.gravityMultiplier;
            this.gravityMultiplier++;
        }
        if (this.floorY <= this.position.y + this.height / 2 && this.gravityMultiplier * gravity >= this.currentJumpSpeed) {

            this.grounded = true;
            this.jumps = this.maxJumps;
            this.gravityMultiplier = 1;
            this.currentJumpSpeed = 0;
            this.position.y = this.floorY - this.height / 2;
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

    receivedHit(damage) {
        if (this.hp <= 0) {
            //die
        }

        if (!this.staggered) {
            this.framesSinceDamaged = 0;
            this.tenacity -= damage;
            if (this.tenacity <= 0) {
                this.tenacity = 0;
                this.staggered = true;
            }
        }


    }


}
