class Enemy {
    constructor(x, y) {
        this.name;
        this.position = createVector(x, y);
        this.originPosition = createVector(x, y); // usually make rounds around there  
        this.damage;
        this.attackPattern; //0 will always be standoff stance
        this.speed;
        this.currentSpeed;
        this.width;
        this.height;
        this.hp;
        this.mhp
        this.grounded;
        this.jumpSpeed = 15;
        this.currentJumpSpeed;
        this.gravityMultiplier = 1;
        this.floorY;
        this.image;
        this.factor = 20; // ??
        this.canAttack = true;
        this.attackRange = 400; // should actually vary
        this.onRange = 3500; // when to start processing
        this.aggroRange = 1000; // when to start attacking 
        this.inAttackFor; //max time in stance
        this.target;
        this.stamina;
        this.attackCooldown; // after attacking perhaps chains into another, otherwise assume stance 0 
        this.takenDamageMultiplier = 1;
        this.hoverY;
        this.tenacity = 100;
        this.standoff = 1;
        this.boss = false;
    }

    show() {
        image(this.image, this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height);
    }

    wander() {
        //move around origin location - 1000 to origin location + 1000
        if (this.position.x <= this.originPosition.x - 1000) {
            this.position.add(this.currentSpeed, 0)
            this.direction = 1;
        } else if (this.position.x >= this.originPosition.x + 1000) {
            this.position.add(-this.currentSpeed, 0)
            this.direction = -1;
        } else {
            //make the rounds 
            this.position.add(this.currentSpeed * this.direction, 0)
        }
    }

    attack() {
        //example for skeleton specifically
        if (this.attackPattern === 0) { // basic standoff, movement etc 
            if (this.target.position.x <= this.position.x) {
                this.direction = -1;
            } else {
                this.direction = 1;
            }

            this.position.add(this.speed / 2 * this.standoff, 0);
            //movement

        } else if (this.attackPattern === 1) {
            for (let a = 0; a < allies.length; a++) {
                if (collisionDetected(allies[a], this.position, 150 * this.direction, this.height) && this.inAttackFor === 0) {
                    damageAlly(allies[a], 2);
                }
            }
            this.position.add(this.speed * this.direction, -10);


        } else if (this.attackPattern === 2) {
            for (let a = 0; a < allies.length; a++) {
                if (collisionDetected(allies[a], this.position, 150 * this.direction, this.height) && this.inAttackFor === 0) {
                    damageAlly(allies[a], 2);
                }
            }
            this.position.add(this.speed * this.direction, 0);

        } else if (this.attackPattern === 3) {
            this.position.add(this.speed / 2 * this.direction, -this.currentJumpSpeed);
        }

        this.inAttackFor--;

    }

    process() {
        if (player.position.dist(this.position) < this.onRange) {
            this.target = targetAlly(this.position, this.aggroRange); //check if anything in range else the function returns null target, to do include stealth if time
            if (this.target != null) {
                //ATTACK!!
                //select attackPattern
                if (this.inAttackFor === 0) {
                    if (this.target.position.x < this.position.x) {
                        this.direction = -1;
                    } else {
                        this.direction = 1;
                    }
                    //criteria for different attack patterns
                    if (this.target.position.dist(this.position) > this.attackRange) {
                        this.attackPattern = 0; //standoff
                        this.inAttackFor = floor(random(10, 30));
                        this.standoff = this.standoff * -1;
                    } else if (this.target.position.dist(this.position) <= this.attackRange && this.attackPattern === 0) {
                        //random choice between charge or slash (1,2)
                        this.attackPattern = floor(random(1, 3));
                        if (this.attackPattern === 1) {
                            this.inAttackFor = 3;
                        } else {
                            this.inAttackFor = 50;
                        }
                    } else {
                        //chain the slash or charge into a jump attack
                        this.attackPattern = 3;
                        this.currentJumpSpeed = this.jumpSpeed;
                        this.inAttackFor = 9999;
                    }
                } else {
                    //this is already in an attack and should finish
                    this.attack();
                }

            } else {
                //no target therefore should make rounds
                this.wander();
            }
            //things that will always be in effect
            this.checkIfGrounded();

        }
    }






    //solid code
    checkIfGrounded() {
        //relying not on overlapping tiles, todo finding the highest platform not above the object
        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i].x <= this.position.x && this.position.x <= tiles[i].x + tiles[i].width) {
                this.floorY = tiles[i].y;
                break;
            }
        }

        if (this.position.y + this.height / 2 > this.floorY) {
            this.grounded = true;
            //therefore 
            this.currentJumpSpeed = 0;
            this.gravityMultiplier = 1;
            this.position.y = this.floorY - this.height / 2;

        } else {
            this.grounded = false;
            //therefore
            this.position.add(0, gravity * this.gravityMultiplier);
            if (this.gravityMultiplier * gravity <= terminalVelocity) {
                this.gravityMultiplier++;
            }
        }


    }

    receivedHit(i) {
        if (this.hp <= 0) {
            effects.push(new GlowingDust(random(player.position.x - 150, player.position.x + 150), player.position.y));
            enemies.splice(i, 1);

        }

        //        if(this.tenacity <= 0) {
        //            this.stagger();
        //        }
    }

}

class Skeleton extends Enemy {
    constructor(x, y) {
        super(x, y);
        this.name = "Skeleton";
        this.originPosition = createVector(x, y); // usually make rounds around there  
        this.damage = 2;
        this.attackPattern; //0 will always be standoff stance
        this.speed = 5;
        this.width = 120;
        this.height = 180;
        this.hp = 12;
        this.mhp = 12;
        this.grounded = true;
        this.jumpSpeed = 25;
        this.currentJumpSpeed = 0;
        this.gravityMultiplier = 1;
        this.floorY;
        this.image = skeleton;
        this.factor = 20; // ??
        this.attackRange = 400; // should actually vary
        this.onRange = 3500; // when to start processing
        this.aggroRange = 1100; // when to start attacking 
        this.inAttackFor = 0; //max time in stance
        this.target;
        this.stamina;
        this.attackCooldown; // after attacking perhaps chains into another, otherwise assume stance 0 
        this.takenDamageMultiplier = 1;
        this.hoverY;
        this.tenacity = 100;
        this.standoff = 1;
        this.direction = 1;
    }

    show() {
        image(this.image, this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height);
    }

    wander() {
        //move around origin location - 1000 to origin location + 1000
        if (this.position.x <= this.originPosition.x - 1000) {
            this.position.add(this.speed, 0)
            this.direction = 1;
        } else if (this.position.x >= this.originPosition.x + 1000) {
            this.position.add(-this.speed, 0)
            this.direction = -1;
        } else {
            //make the rounds 
            this.position.add(this.speed * this.direction, 0)
        }
    }

    attack() {
        //example for skeleton specifically
        if (this.attackPattern === 0) { // basic standoff, movement etc 
            if (this.target.position.x <= this.position.x) {
                this.direction = -1;
            } else {
                this.direction = 1;
            }

            this.position.add(this.speed / 2 * this.standoff + this.direction, 0);
            //movement

        } else if (this.attackPattern === 1) {
            this.position.add(this.speed * this.direction, -3);
            for (let a = 0; a < allies.length; a++) {
                if (this.direction === 1) {
                    if (allies[a].position.x < this.position.x + 90 && allies[a].position.x > this.position.x && allies[a].position.y > this.position.y - this.height / 2 && allies[a].position.y < this.position.y + this.height / 2 && this.inAttackFor === 1) {
                        damageAlly(allies[a], 2);
                    } else {
                        if (allies[a].position.x > this.position.x - 90 && allies[a].position.x < this.position.x && allies[a].position.y > this.position.y - this.height / 2 && allies[a].position.y < this.position.y + this.height / 2 && this.inAttackFor === 1) {
                            damageAlly(allies[a], 2);
                        }
                    }
                }
            }
        } else if (this.attackPattern === 2) {

            this.position.add(this.speed * this.direction * 2, 0);
            for (let a = 0; a < allies.length; a++) {
                if (collisionDetected(allies[a], this.position, this.width / 2, this.height / 2) && this.inAttackFor % 6 == 0) {
                    damageAlly(allies[a], 1);
                    allies[a].knockBack(1, this.direction);

                }
            }

        } else if (this.attackPattern === 3) {
            this.position.add(this.speed / 2 * this.direction, -this.currentJumpSpeed);
        }

        this.inAttackFor--;

    }

    process(e) {

        if (player.position.dist(this.position) < this.onRange) {
            this.target = targetAlly(this.position, this.aggroRange); //check if anything in range else the function returns null target, to do include stealth if time
            //things that will always be in effect
            this.checkIfGrounded();
            if (this.hp <= 0) {
                enemies.splice(i, 1);
            }
            if (this.target != null) {
                //ATTACK!!
                //select attackPattern
                if (this.inAttackFor === 0) {
                    if (this.target.position.x < this.position.x) {
                        this.direction = -1;
                    } else {
                        this.direction = 1;
                    }
                    //criteria for different attack patterns
                    if (this.target.position.dist(this.position) > this.attackRange) {
                        this.attackPattern = 0; //standoff
                        this.inAttackFor = floor(random(10, 30));
                        this.standoff = this.standoff * -1;
                    } else if (this.target.position.dist(this.position) <= this.attackRange && this.attackPattern === 0) {
                        //random choice between charge or slash (1,2)
                        this.attackPattern = floor(random(1, 3));
                        if (this.attackPattern === 1) {
                            this.inAttackFor = 20;
                        } else {
                            this.inAttackFor = 120;
                        }
                    } else {
                        //chain the slash or charge into a jump attack
                        this.attackPattern = 3;
                        this.currentJumpSpeed = this.jumpSpeed;
                        this.inAttackFor = 999;
                    }
                } else {
                    //this is already in an attack and should finish
                    this.attack();
                }

            } else {
                //no target therefore should make rounds
                this.wander();
            }


        }


    }






    //solid code
    checkIfGrounded() {
        //relying not on overlapping tiles, todo finding the highest platform not above the object
        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i].x <= this.position.x && this.position.x <= tiles[i].x + tiles[i].width) {
                this.floorY = tiles[i].y;
                break;
            }
        }

        if (this.position.y + this.height / 2 > this.floorY) {

            //therefore 
            if (this.attackPattern === 3 && this.gravityMultiplier > 1 && this.grounded === false) {

                if (targetAlly(this.position, 100)) {
                    for (let a = 0; a < allies.length; a++) {
                        damageAlly(allies[a], 3);
                        console.log("dmg")
                    }
                }
                this.inAttackFor = 25;
                this.attackPattern = 0;
            }
            this.grounded = true;
            this.currentJumpSpeed = 0;
            this.gravityMultiplier = 1;
            this.position.y = this.floorY - this.height / 2;

        } else {
            this.grounded = false;
            //therefore
            this.position.add(0, gravity * this.gravityMultiplier);
            if (this.gravityMultiplier * gravity <= terminalVelocity) {
                this.gravityMultiplier++;
            }
        }


    }

    receivedHit(i) {
        if (this.hp <= 0) {
            effects.push(new GlowingDust(random(player.position.x - 150, player.position.x + 150), player.position.y));
            enemies.splice(i, 1);

        }

        //        if(this.tenacity <= 0) {
        //            this.stagger();
        //        }
    }

}

class Harpy extends Enemy {
    constructor(x, y) {
        super(x, y)
        this.name = "Harpy";
        this.originPosition = createVector(x, y); // usually make rounds around there  
        this.damage = 2;
        this.attackPattern; //0 will always be standoff stance
        this.speed = 3;
        this.width = 160;
        this.height = 110;
        this.hp = 25;
        this.mhp = 25;
        this.grounded = false;
        this.jumpSpeed = 20;
        this.currentJumpSpeed = 0;
        this.gravityMultiplier = 1;
        this.floorY;
        this.image = bird;
        this.factor = 20; // ??
        this.attackRange = 900; // should actually vary
        this.onRange = 3500; // when to start processing
        this.aggroRange = 1300; // when to start attacking 
        this.inAttackFor = 0; //max time in stance
        this.target;
        this.stamina;
        this.attackCooldown; // after attacking perhaps chains into another, otherwise assume stance 0 
        this.takenDamageMultiplier = 1;
        this.hoverY = -800;
        this.tenacity = 100;
        this.standoff = 1;
        this.direction = 1;
    }

    show() {
        image(this.image, this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height);
    }

    wander() {
        //move around origin location - 1000 to origin location + 1000
        if (this.position.x <= this.originPosition.x - 1000) {
            this.position.add(this.speed, 0)
            this.direction = 1;
        } else if (this.position.x >= this.originPosition.x + 1000) {
            this.position.add(-this.speed, 0)
            this.direction = -1;
        } else {
            //make the rounds 
            this.position.add(this.speed * this.direction, 0)
        }
    }

    attack() {
        //harpy patterns
        if (this.attackPattern === 0) { // basic standoff, movement etc 
            if (this.target.position.x <= this.position.x) {
                this.direction = -1;
            } else {
                this.direction = 1;
            }

            this.position.add(this.speed + this.direction * 3 * this.standoff, 0);
            //movement

        } else if (this.attackPattern === 1) {
            //shockwaves
            if (this.inAttackFor % 5 == 0) {
                projectiles.push(new ShockWave(this.position.x, this.position.y, this.target, 110, 15, 1, 2.5, 55, 7.5));
            }
        } else if (this.attackPattern === 2) {
            //claw attack, aim at a vector and stab
            if (this.inAttackFor > 30) {
                this.position.x += this.speed / 60 * this.movementVector.x * 0.75;
                this.position.y += this.speed / 60 * this.movementVector.y * 0.75;
                for (let a = 0; a < allies.length; a++) {
                    if (collisionDetected(allies[a], this.position, this.width / 2, this.height / 2) && this.inAttackFor % 6 == 0) {
                        damageAlly(allies[a], 1);
                        allies[a].knockBack(1, this.direction);

                    }
                }
            } else {
                this.position.x -= this.speed / 60 * this.movementVector.x * 0.75;
                this.position.y -= this.speed / 60 * this.movementVector.y * 0.75;
            }


        } else if (this.attackPattern === 3) { //todo fix this ai
            //dive
            this.position.add(this.speed / 2 * this.direction, this.currentJumpSpeed);
            if (this.position.y > this.hoverY) {
                this.inAttackFor++;
            }
            
            for (let a = 0; a < allies.length; a++) {
                    if (collisionDetected(allies[a], this.position, this.width / 2, this.height / 2)) {
                        damageAlly(allies[a], 0.2);
                        
                    }
                }
        }

        this.inAttackFor--;

    }

    process(e) {
        console.log(this.grounded);
        if (player.position.dist(this.position) < this.onRange) {
            this.target = targetAlly(this.position, this.aggroRange); //check if anything in range else the function returns null target, to do include stealth if time
            //things that will always be in effect
                      this.checkIfGrounded();
      
            if (this.hp <= 0) {
                enemies.splice(i, 1);
            }
            if (this.target != null) {
                //ATTACK!!
                //select attackPattern
                if (this.inAttackFor === 0) {
                    if (this.target.position.x < this.position.x) {
                        this.direction = -1;
                    } else {
                        this.direction = 1;
                    }
                    //criteria for different attack patterns
                    if (this.target.position.dist(this.position) > this.attackRange) {
                        this.attackPattern = 0; //standoff
                        this.inAttackFor = floor(random(40, 60));
                        this.standoff = this.standoff * -1;
                    } else if (this.target.position.dist(this.position) <= this.attackRange && this.attackPattern === 0) {
                        //shockwaves
                        this.attackPattern = 1;
                        this.inAttackFor = floor(random(50, 80));

                    } else if (this.target.position.dist(this.position) <= this.attackRange && this.attackPattern === 1) {
                        //chain the shockwaves into a dive attack of some sort
                        this.attackPattern = floor(random(2, 3));
                        if (this.attackPattern === 2) {
                            this.movementVector = createVector(this.target.position.x - this.position.x, this.target.position.y - this.position.y);
                            this.inAttackFor = 60;              
                        }
                    } else if (this.attackPattern === 2 && this.position.y <= this.hoverY) {
                        if (this.position.dist(this.target.position) > 500) {
                            this.attackPattern = 3;
                            this.inAttackFor = 20;
                            this.currentJumpSpeed = this.jumpSpeed;
                            this.position.add(this.speed / 2 * this.direction, this.currentJumpSpeed);
                        } else {
                            this.attackPattern = 0;
                            this.inAttackFor = floor(random(30, 120)); //cycle cooldown
                        }
                    } else {
                        this.attackPattern = 0;
                        this.inAttackFor = floor(random(30, 120)); //cycle cooldown
                    }
                } else {
                    //this is already in an attack and should finish
                    this.attack();
                }

            } else {
                //no target therefore should make rounds
                this.wander();
            }


        }


    }






    //solid code
    checkIfGrounded() {
        //relying not on overlapping tiles, todo finding the highest platform not above the object
        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i].x <= this.position.x && this.position.x <= tiles[i].x + tiles[i].width) {
                this.hoverY = tiles[i].y - 600;
                break;
            }
        }

        if (this.position.y <= this.hoverY) {
            this.grounded = true; // grounded will substitute with hovering
            this.currentJumpSpeed = 0;
            this.position.y = this.hoverY;

        } else {
            this.grounded = false;
            //therefore 
            this.currentJumpSpeed -= 0.45;
        }


    }

}

class GraveMaster extends Enemy {
    constructor(x, y) {
        super(x, y);
        this.name = "Grave Master";
        this.originPosition = createVector(x, y); // usually make rounds around there  
        this.damage = 2;
        this.attackPattern; //0 will always be standoff stance
        this.speed = 5;
        this.width = 120;
        this.height = 180;
        this.hp = 120;
        this.mhp = 120;
        this.grounded = true;
        this.jumpSpeed = 25;
        this.currentJumpSpeed = 0;
        this.floorY;
        this.image = gravewatcher;
        this.factor = 20; // ??
        this.attackRange = 400; // should actually vary
        this.onRange = 3500; // when to start processing
        this.aggroRange = 1100; // when to start attacking 
        this.inAttackFor = 0; //max time in stance
        this.target;
        this.stamina;
        this.attackCooldown; // after attacking perhaps chains into another, otherwise assume stance 0 
        this.takenDamageMultiplier = 1;
        this.hoverY;
        this.tenacity = 100;
        this.standoff = 1;
        this.direction = 1;
        this.boss = true;
    }

    show() {
        image(this.image, this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height);
//         fill("gray");
//            rect(camX,camY, 100000, 500)
//            fill("blue");
//            rect(player.target.position.x - player.target.width / 1.5, player.target.position.y - player.target.height / 2, player.target.hp * 6, 16);
    }

    wander() {
        //move around origin location - 1000 to origin location + 1000
        if (this.position.x <= this.originPosition.x - 1000) {
            this.position.add(this.speed, 0)
            this.direction = 1;
        } else if (this.position.x >= this.originPosition.x + 1000) {
            this.position.add(-this.speed, 0)
            this.direction = -1;
        } else {
            //make the rounds 
            this.position.add(this.speed * this.direction, 0)
        }
    }

    attack() {
        //example for skeleton specifically
        if (this.attackPattern === 0) { // basic standoff, movement etc 
            if (this.target.position.x <= this.position.x) {
                this.direction = -1;
            } else {
                this.direction = 1;
            }

            this.position.add(this.speed / 2 * this.standoff + this.direction, 0);
            //movement

        } else if (this.attackPattern === 1) {
            this.position.add(this.speed * this.direction, -3);
            for (let a = 0; a < allies.length; a++) {
                if (this.direction === 1) {
                    if (allies[a].position.x < this.position.x + 90 && allies[a].position.x > this.position.x && allies[a].position.y > this.position.y - this.height / 2 && allies[a].position.y < this.position.y + this.height / 2 && this.inAttackFor === 1) {
                        damageAlly(allies[a], 2);
                    } else {
                        if (allies[a].position.x > this.position.x - 90 && allies[a].position.x < this.position.x && allies[a].position.y > this.position.y - this.height / 2 && allies[a].position.y < this.position.y + this.height / 2 && this.inAttackFor === 1) {
                            damageAlly(allies[a], 2);
                        }
                    }
                }
            }
        } else if (this.attackPattern === 2) {

            this.position.add(this.speed * this.direction * 2, 0);
            for (let a = 0; a < allies.length; a++) {
                if (collisionDetected(allies[a], this.position, this.width / 2, this.height / 2) && this.inAttackFor % 6 == 0) {
                    damageAlly(allies[a], 1);
                    allies[a].knockBack(1, this.direction);

                }
            }

        } else if (this.attackPattern === 3) {
            this.position.add(this.speed / 2 * this.direction, -this.currentJumpSpeed);
        }

        this.inAttackFor--;

    }

    process(e) {

        if (player.position.dist(this.position) < this.onRange) {
            this.target = targetAlly(this.position, this.aggroRange); //check if anything in range else the function returns null target, to do include stealth if time
            //things that will always be in effect
            this.checkIfGrounded();
            if (this.hp <= 0) {
                enemies.splice(i, 1);
            }
            if (this.target != null) {
                //ATTACK!!
                //select attackPattern
                if (this.inAttackFor === 0) {
                    if (this.target.position.x < this.position.x) {
                        this.direction = -1;
                    } else {
                        this.direction = 1;
                    }
                    //criteria for different attack patterns
                    if (this.target.position.dist(this.position) > this.attackRange) {
                        this.attackPattern = 0; //standoff
                        this.inAttackFor = floor(random(50, 120));
                        
                        this.standoff = this.standoff * -1;
                    } else if (this.target.position.dist(this.position) <= this.attackRange && this.attackPattern === 0) {
                        //random choice between charge or slash (1,2)
                        this.attackPattern = floor(random(1, 3));
                        if (this.attackPattern === 1) {
                            this.inAttackFor = 20;
                        } else {
                            this.inAttackFor = 120;
                        }
                    } else {
                        //chain the slash or charge into a jump attack
                        this.attackPattern = 3;
                        this.currentJumpSpeed = this.jumpSpeed;
                        this.inAttackFor = 999;
                    }
                } else {
                    //this is already in an attack and should finish
                    this.attack();
                }

            } else {
                //no target therefore should make rounds
                this.wander();
            }


        }


    }






    //solid code
    checkIfGrounded() {
        //relying not on overlapping tiles, todo finding the highest platform not above the object
        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i].x <= this.position.x && this.position.x <= tiles[i].x + tiles[i].width) {
                this.floorY = tiles[i].y;
                break;
            }
        }

        if (this.position.y + this.height / 2 > this.floorY) {

            //therefore 
            if (this.attackPattern === 3 && this.gravityMultiplier > 1 && this.grounded === false) {

                if (targetAlly(this.position, 100)) {
                    for (let a = 0; a < allies.length; a++) {
                        damageAlly(allies[a], 3);
                        console.log("dmg")
                    }
                }
                this.inAttackFor = 25;
                this.attackPattern = 0;
            }
            this.grounded = true;
            this.currentJumpSpeed = 0;
            this.gravityMultiplier = 1;
            this.position.y = this.floorY - this.height / 2;

        } else {
            this.grounded = false;
            //therefore
            this.position.add(0, gravity * this.gravityMultiplier);
            if (this.gravityMultiplier * gravity <= terminalVelocity) {
                this.gravityMultiplier++;
            }
        }


    }

    receivedHit(i) {
        if (this.hp <= 0) {
            effects.push(new GlowingDust(random(player.position.x - 150, player.position.x + 150), player.position.y));
            enemies.splice(i, 1);

        }

        //        if(this.tenacity <= 0) {
        //            this.stagger();
        //        }
    }

}

//class GraveMaster extends Enemy {
//    constructor(x, y) {
//        super(x, y);
//        this.image = gravewatcher;
//        this.hp = 150;
//        this.mhp = 150;
//        this.standoff = false;
//        this.attackRange = 400;
//        //perhaps this.hat / this.armor
//    }
//
//    process() {
//
//        if (this.attackCooldown > 0) {
//            this.attackCooldown--;
//        }
//
//        if (this.grounded == false) {
//            this.position.y += gravity * this.gravityMultiplier;
//            if (this.gravityMultiplier <= this.terminal) {
//                this.gravityMultiplier++;
//            }
//        }
//
//        //if using a spell or item or weapon, this.canAttack will become false
//        if (this.canAttack) {
//            if (player.position.x < this.position.x) {
//                if (player.position.x < this.position.x - 200) {
//                    this.position.x -= this.speed;
//                } else {
//                    this.position.x -= this.speed / 8
//                }
//
//                this.direction = -1;
//            } else {
//                this.standoff = true;
//            }
//            if (player.position.x > this.position.x) {
//                if (player.position.x > this.position.x + 200) {
//                    this.position.x += this.speed;
//                } else {
//                    this.position.x += this.speed / 8
//                }
//                this.direction = 1;
//            } else {
//                this.standoff = true;
//            }
//
//
//
//            if (this.canAttack && Math.abs(this.position.x - player.position.x) <= this.attackRange && this.attackCooldown === 0) {
//                this.canAttack = false;
//
//                this.attackPattern = floor(random(0, 3)); //0,1,2, -3 patterns
//
//                this.inAttackFor = (this.attackPattern + 1) * 20;
//                this.attackCooldown += (this.attackPattern + 1) * 80;
//            }
//
//
//        }
//        if (this.canAttack == false && this.attackPattern == 0) {
//            //quick stab
//            if (this.inAttackFor > 0) {
//                this.inAttackFor--;
//                //add attack pattern coding here
//                //just a quick stab
//                if (this.direction == 1) {
//                    this.position.x += 2;
//                } else {
//                    this.position.x -= 2;
//                }
//
//            } else {
//                this.damage = 0.5;
//                this.checkCollision(120, this.height);
//                this.canAttack = true;
//            }
//        } else if (this.canAttack == false && this.attackPattern == 2) {
//            //medium charged attack jump
//            if (this.inAttackFor > 0 || this.grounded == false) {
//                this.inAttackFor--;
//                //add attack pattern coding here
//                if (this.direction == 1) {
//                    this.position.x += 4;
//                } else {
//                    this.position.x -= 4;
//                }
//
//                this.jumpSpeed = 26;
//                this.position.y -= this.jumpSpeed;
//
//
//            } else {
//                ellipse(this.position.x, this.position.y, 500, 500);
//                if (this.grounded) {
//                    this.damage = 2;
//                    this.checkCollision(300);
//                }
//
//                this.canAttack = true;
//            }
//        } else if (this.canAttack == false && this.attackPattern == 1) {
//            //long distance charge
//            if (this.inAttackFor > 0) {
//                this.inAttackFor--;
//                //add attack pattern coding here
//                if (this.direction == 1) {
//                    this.position.x += 20;
//                } else {
//                    this.position.x -= 20;
//                }
//                this.damage = 0.5;
//                this.checkCollision(21);
//            } else {
//                this.canAttack = true;
//            }
//        }
//    }
//
//
//
//    checkCollision(hitboxx, hitboxy) {
//        this.hitboxX = hitboxx;
//        this.hitboxY = hitboxy;
//        this.target = player;
//
//        if (this.attackPattern == 2) {
//            if (dist(this.position.x, this.position.y, this.target.position.x, this.target.position.y) < 190) {
//                dealDamage(player, this.damage, 0)
//                this.inAttackFor = 0;
//            }
//        } else {
//            if (this.direction == -1) {
//                if (this.target.position.x <= this.position.x && this.target.position.x >= this.position.x - this.hitboxX) {
//                    dealDamage(player, this.damage, 0)
//                    this.inAttackFor = 0;
//                }
//            } else if (this.target.position.x >= this.position.x && this.target.position.x <= this.position.x + this.hitboxX && this.target.position.y >= this.position.y - this.height / 2 && this.target.position.y <= this.position.y + this.height / 2) {
//                dealDamage(player, this.damage, 0)
//                this.inAttackFor = 0;
//
//
//            }
//        }
//
//
//    }
//
//
//
//
//    //solid code
//    isGrounded() {
//        this.feetY = this.position.y + this.height / 2;
//        if (this.floorY <= this.feetY) {
//            this.grounded = true;
//            this.canJump = true;
//            this.gravityMultiplier = 1;
//            this.jumpSpeed = 0;
//            this.position.y = this.floorY - this.height / 2;
//        } else {
//            this.grounded = false;
//        }
//        //and if this is true, then ur feetY will equal the floorY
//
//        //find this.floorY
//        for (let i = 0; i < tiles.length; i++) {
//            if (tiles[i].x <= this.position.x && this.position.x <= tiles[i].x + tiles[i].width) {
//                this.floorY = tiles[i].y;
//
//                break;
//            }
//        }
//    }
//
//}

class Worm extends Enemy {
    constructor(x, y) {
        super(x, y);
        this.image = worm;
        this.hp = 44;
        this.mhp = 44;
        this.width = 200;
        this.height = 350;
        this.standoff = false;
        this.attackRange = 700;
        this.hoverY = this.floorY + 300;
        this.jumpSpeed = 7;
        this.speed = 5;
        this.target = player;
        this.canSurface = true;
        this.surfaceWhenXDistanceIs = 120;
        this.attackPattern = 3;
        this.maxX;
        this.minX;
        this.spellDamage = 3;
        this.direction = -1;
        this.acidBallSpeed = 10;

        //if it is this close to the player it will stop repositioning and start going into attack mode
        //        this.attackRange = 60; // close range attack emerge
        this.aggroRange = 1200;

        //perhaps this.hat / this.armor
    }

    attack() {
        this.inAttackFor--;
        if (this.attackPattern == 1) {
            this.position.y = this.floorY - this.height / 2;
            if (this.target.position.x > this.position.x) {
                this.direction = 1;
            } else {
                this.direction = -1;
            }

            if (this.inAttackFor % 40 == 0) {
                projectiles.push(new AcidBall(this.position.x, this.position.y - 35, this.target, 70, 70, this.spellDamage, this.acidBallSpeed * this.direction, 55, 7.5));
            }

            if (this.inAttackFor == 0) {
                this.attackPattern = 2;
                this.inAttackFor = 20;
            }
        }

        if (this.attackPattern == 2) {
            //dive
            this.jumpSpeed = -14;
            this.reposition(0, -this.jumpSpeed);
            if (this.inAttackFor === 0 || this.position.y > this.floorY + 250) {
                this.attackPattern = 0;
                this.inAttackFor = 0;
                this.attackCooldown = 300; // after dive just stop attacking
                this.maxX = this.target.position.x + random(500, 800); // values will remain these for a bit
                this.minX = this.target.position.x - random(500, 800);
            }
        }

        if (this.attackPattern == 3) {
            //surface
            //GOING UP AT THIS SPEED
            this.jumpSpeed = 14;
            if (this.canSurface) { // reposition
                if (dist(this.position.x, 0, this.target.position.x, 0) <= this.surfaceWhenXDistanceIs) {
                    this.canSurface = false;
                    this.inAttackFor = 150; // just enough to last for the surfacing 
                }
            }

            if (this.canSurface == false) {
                this.reposition(0, -this.jumpSpeed);

                this.damage = 5;
                this.checkCollision(this.width / 2 + this.target.width / 2, this.height / 2 + this.target.height / 2);
                if (this.position.y + this.height / 2 <= this.floorY) {
                    this.attackPattern = 1; // acidballs

                    this.inAttackFor = 260; // 6 acid balls 4.33 seconds
                }
            }


        }

    }


    reposition(x, y) {
        this.position.add(createVector(x, y));
    }

    interactWith(object) {

    }

    hover() {
        this.hoverY = this.floorY + 250;
        this.position.y = this.hoverY;

        //reposition spamming
        if (this.direction === 1) {
            if (this.position.x < this.maxX) {
                this.reposition(this.speed, 0);
            } else {
                this.direction = -1;
                this.maxX = this.target.position.x + random(600, 900);
            }
        } else if (this.direction === -1) {
            if (this.position.x > this.minX) {
                this.reposition(-this.speed, 0);
            } else {
                this.direction = 1;
                this.minX = this.target.position.x - random(600, 900);
            }
        }
    }

    process() {


        //controls cooldowns only after diving for this guy
        if (this.attackCooldown > 0) {
            this.attackCooldown--;
        }
        // in the middle of attacking
        if (!this.canAttack && this.inAttackFor > 0) {
            this.attack();
        } else if (this.inAttackFor === 0) { // after diving or not finding a target at all to surface, then it will reset the ability to attack but not the atk cooldown
            this.canAttack = true;
            this.canSurface = true;
            this.maxX = this.target.position.x + random(600, 900); // values will remain these for a bit
            this.minX = this.target.position.x - random(600, 900);
        }

        //movement
        if (this.canAttack) {
            this.hover(); // just reposition around
            //target cannot change midattack
            for (let a = 0; a < allies.length; a++) {
                if (allies[a].position.dist(this.position) < this.aggroRange && allies[a].position.dist(this.position) > allies[a].position.dist(this.position)) {

                    this.target = allies[a];

                }
            }


            //deciding an attack pattern if safe to do so
            if (this.canAttack && this.target.position.dist(this.position) <= this.attackRange && this.attackCooldown === 0 && dist(this.target.position.x, 0, this.position.x, 0) < this.surfaceWhenXDistanceIs) {

                this.attackPattern = 3;
                this.canSurface = true;
                this.inAttackFor = floor(random(150, 200));
                this.canAttack = false
                this.canStillDamage = true;
            }



        }
    }

    //  perhaps also have item interaction            



    //takes in 2 parameters, the x which is dist from position of enemy to square side and y which is center to top or bot
    checkCollision(x, y) {
        if (this.attackPattern == 3) {
            for (let a = 0; a < allies.length; a++) {
                if (this.position.x + x > allies[a].position.x && this.position.x - x < allies[a].position.x && this.position.y + y > allies[a].position.y && this.position.y - y < allies[a].position.y) {
                    if (this.canStillDamage) {
                        dealDamage(allies[a], 5);
                        this.canStillDamage = false;
                    }

                }
            }
        }

    }




    //solid code
    isGrounded() {
        //is Submerged
        if (this.position.y + this.height / 2 > this.floorY) {
            this.grounded = true;
            this.canExplode = true;
            this.gravityMultiplier = 1;
        }


        //find this.floorY
        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i].x <= this.position.x && this.position.x <= tiles[i].x + tiles[i].width) {
                this.floorY = tiles[i].y;
                break;
            }
        }
    }


}

//boss 1 
class BlackKnight extends Enemy {
    constructor(x, y) {
        super(x, y);
        this.name = "Black Knight"
        this.boss = true;
        this.image = blackknight;
        this.hp = 120;
        this.mhp = 120;
        this.width = 200;
        this.height = 350;
        this.standoff = false;
        this.attackRange = 700;
        this.hoverY = this.floorY + 300;
        this.jumpSpeed = 7;
        this.speed = 5;
        this.target = player;
        this.canSurface = true;
        this.surfaceWhenXDistanceIs = 120;
        this.attackPattern = 3;
        this.maxX;
        this.minX;
        this.spellDamage = 3;
        this.direction = -1;
        this.acidBallSpeed = 10;

        //if it is this close to the player it will stop repositioning and start going into attack mode
        //        this.attackRange = 60; // close range attack emerge
        this.aggroRange = 1200;

        //perhaps this.hat / this.armor
    }

    show() {
        fill(231, 10, 40);
        rect(this.position.x - 80, this.position.y - 120, this.mhp * this.factor, 1 * this.factor);
        fill(100, 230, 40);
        rect(this.position.x - 80, this.position.y - 120, this.hp * this.factor, 1 * this.factor);

        image(this.image, this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height);

    }

    attack(pattern, direction) {
        //quick slash can be comboed
        this.inAttackFor--;
        if (this.target.position.dist(this.position) < 120) {

            this.checkCollision(160, this.height);
        }

        if (this.inAttackFor == 0) {
            //second slash
            if (this.attackPattern == 1) {
                if (this.target.position.x > this.position.x) {
                    this.direction = 1;
                } else {
                    this.direction = -1;
                }


                this.attackPattern = 2;
                this.inAttackFor = 20;
            }
        }

        if (this.attackPattern == 2) {
            if (this.target.position.x > this.position.x) {
                this.direction = 1;
            } else {
                this.direction = -1;
            }

            if (this.inAttackFor == 0) {
                //third slash
                if (this.attackPattern == 1) {
                    if (this.target.position.x > this.position.x) {
                        this.direction = 1;
                    } else {
                        this.direction = -1;
                    }
                    this.attackPattern = 2;
                    this.inAttackFor = 20;
                }
            }

            if (this.attackPattern == 3) {
                if (this.target.position.x > this.position.x) {
                    this.direction = 1;
                } else {
                    this.direction = -1;
                }

                if (this.inAttackFor == 0) {
                    //stop after 3 slashes

                    this.attackPattern = 2;
                    this.inAttackFor = 20;
                }
            }




            //block and reposition spam
            if (this.attackPattern == 2) {
                //dive
                this.jumpSpeed = -14;
                this.reposition(0, -this.jumpSpeed);
                if (this.inAttackFor === 0 || this.position.y > this.floorY + 250) {
                    this.attackPattern = 0;
                    this.inAttackFor = 0;
                    this.attackCooldown = 300; // after dive just stop attacking
                    this.maxX = this.target.position.x + random(500, 800); // values will remain these for a bit
                    this.minX = this.target.position.x - random(500, 800);
                }
            }
            //charge attack
            if (this.attackPattern == 3) {
                //surface
                //GOING UP AT THIS SPEED
                this.jumpSpeed = 14;
                if (this.canSurface) { // reposition
                    if (dist(this.position.x, 0, this.target.position.x, 0) <= this.surfaceWhenXDistanceIs) {
                        this.canSurface = false;
                        this.inAttackFor = 150; // just enough to last for the surfacing 
                    }
                }

                if (this.canSurface == false) {
                    this.reposition(0, -this.jumpSpeed);

                    this.damage = 5;
                    this.checkCollision(this.width / 2 + this.target.width / 2, this.height / 2 + this.target.height / 2);
                    if (this.position.y + this.height / 2 <= this.floorY) {
                        this.attackPattern = 1; // acidballs

                        this.inAttackFor = 260; // 6 acid balls 4.33 seconds
                    }
                }
            }
        }
    }


    reposition(x, y) {
        this.position.add(createVector(x, y));
    }

    interactWith(object) {

    }

    hover() {
        this.hoverY = this.floorY + 250;
        this.position.y = this.hoverY;

        //reposition spamming
        if (this.direction === 1) {
            if (this.position.x < this.maxX) {
                this.reposition(this.speed, 0);
            } else {
                this.direction = -1;
                this.maxX = this.target.position.x + random(600, 900);
            }
        } else if (this.direction === -1) {
            if (this.position.x > this.minX) {
                this.reposition(-this.speed, 0);
            } else {
                this.direction = 1;
                this.minX = this.target.position.x - random(600, 900);
            }
        }
    }

    process() {


        //controls cooldowns only after diving for this guy
        if (this.attackCooldown > 0) {
            this.attackCooldown--;
        }
        // in the middle of attacking
        if (!this.canAttack && this.inAttackFor > 0) {
            this.attack();
        } else if (this.inAttackFor === 0) { // after diving or not finding a target at all to surface, then it will reset the ability to attack but not the atk cooldown
            this.canAttack = true;
            this.canSurface = true;
            this.maxX = this.target.position.x + random(600, 900); // values will remain these for a bit
            this.minX = this.target.position.x - random(600, 900);
        }

        //movement
        if (this.canAttack) {
            this.hover(); // just reposition around
            //target cannot change midattack
            for (let a = 0; a < allies.length; a++) {
                if (allies[a].position.dist(this.position) < this.aggroRange && allies[a].position.dist(this.position) > allies[a].position.dist(this.position)) {

                    this.target = allies[a];

                }
            }


            //deciding an attack pattern if safe to do so
            if (this.canAttack && this.target.position.dist(this.position) <= this.attackRange && this.attackCooldown === 0 && dist(this.target.position.x, 0, this.position.x, 0) < this.surfaceWhenXDistanceIs) {

                this.attackPattern = 3;
                this.canSurface = true;
                this.inAttackFor = floor(random(150, 200));
                this.canAttack = false
                this.canStillDamage = true;
            }



        }
    }
    //solid code
    isGrounded() {
        //is Submerged
        if (this.position.y + this.height / 2 > this.floorY) {
            this.grounded = true;
            this.canExplode = true;
            this.gravityMultiplier = 1;
        }


        //find this.floorY
        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i].x <= this.position.x && this.position.x <= tiles[i].x + tiles[i].width) {
                this.floorY = tiles[i].y;
                break;
            }
        }
    }


}
