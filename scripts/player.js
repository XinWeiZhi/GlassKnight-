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

        this.animationIdle = [pepe, pepe, walk, walk, walk, walk, walk, walk];
        this.animationWalkLeft = [walkLeft0, walkLeft0, walkLeft0, walkLeft0, walkLeft0, pepe, walk, pepe, walk, walk, walk, walk];
        this.animationWalkRight = [pepe, pepe, walk, walk, pepe, walk, walk, walk];
        this.animationJump = [walk, walk, walk, walk, walk, walk, walk, walk];
        this.animationAttack = [sword, sword, sword, sword, sword, sword];
        this.animationSpell = [fire, fire, fire, fire, fire, fire, fire, fire, fire, fire, fire];
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

        //perhaps this.hat / this.armor
    }

    show() {


        fill(255);
        image(this.image, this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height);

        //shield 

        fill(190, 130, 30, 90);
        stroke("yellow");
        rect(this.position.x + this.direction * 50 - 15, this.position.y - 30, 30, 130);

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

        } else if (this.state == 1) { // move right
            this.image = this.animationWalkRight[this.frame];
            if (this.frame < this.animationWalkRight.length - 1) {
                this.frame++;
                if (this.speed < 11) {
                    this.speed += 0.1;
                }
            } else {
                this.frame = 0;
            }
        } else if (this.state == 2) { // move left
            this.image = this.animationWalkLeft[this.frame];
            if (this.frame < this.animationWalkLeft.length - 1) {
                this.frame++;
                if (this.speed < 11) {
                    this.speed += 0.1;
                }
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
                    this.checkCollision(222);

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
//                    this.checkCollision(1000);
                    projectiles.push(new FireBall(this.position.x, this.position.y, 1800,  50, 40, this.spellDamage, this.speed / 7 * this.direction, 55, 20));
                    this.frame = 0;
                    this.state = 0;
                    this.canSpell = true;
                }

            }

        }
    }
    //jumps etc
    process() {
        if (this.atkCooldown > 0) {
            this.atkCooldown--;
        }



        if (this.grounded == false && this.jumps == 2) {
            this.jumps = 1;
        }

        if (player.state == 0) {
            player.canAttack = true;
            player.canSpell = true;
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


    checkCollision(a) {
        this.hitboxX = a;
        for (let target = 0; target < enemies.length; target++)
            if (this.direction == -1) {
                if (enemies[target].position.x <= player.position.x && enemies[target].position.x >= player.position.x - this.hitboxX) {
                    console.log("sweep left")
                    enemies[target].hp -= this.damage;
                    this.giveHitText(this.damage, enemies[target]);
                    enemies[target].receivedHit(target);

                }
            } else if (enemies[target].position.x >= player.position.x && enemies[target].position.x <= player.position.x + this.hitboxX && enemies[target].position.y >= this.position.y - this.height / 2 && enemies[target].position.y <= this.position.y + this.height / 2) {
            console.log("sweep")
            enemies[target].hp -= this.damage;
            this.giveHitText(this.damage, enemies[target]);
            enemies[target].receivedHit(target);

            //                text(this.damage, enemies[target].position.x, enemies[target].position.y - 40);
        }

    }
    
     attack() {
        //attack if not already in state 3 / all the code will be in animation
         console.log("shi")
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

    amHitText(amount) {
        messages.push(new RedText(amount, this.position.x, this.position.y));
        console.log("yes");
    }

    giveHitText(amount, target) {
        messages.push(new BlueText(amount, target.position.x, target.position.y));
        console.log("no")
    }

    //    playTextHits(damage) {
    //        let timer = 10;
    //        
    //        text(damage, player.position.x, player.position.y);
    //    }
}
