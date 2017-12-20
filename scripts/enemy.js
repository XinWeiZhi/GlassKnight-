class Enemy {
    constructor(x, y) {
        this.name = "Skeleton";
        this.position = createVector(x, y);
        this.damage = 1;
        this.attackPattern;
        this.speed = 3;
        this.width = 100;
        this.height = 180;
        this.hp = 10;
        this.mhp = 10;
        this.canJump = true;
        this.grounded = true;
        this.jumpSpeed = 0;
        this.terminal = 80;
        this.gravityMultiplier = 1;
        this.feetY = this.height + this.height;
        this.floorY = 800;
        this.image = skeleton;
        this.factor = 20;
        this.canAttack = true;
        this.attackRange = 200;
        this.inAttackFor = 0;
        this.target;
        this.hitboxX = 250;
        this.attackCooldown = 0;
        this.takenDamageMultiplier = 1;
        this.hoverY = 800;
//        this.armor = new Chainmail(this)
//        this.hp = 10 + this.armor.hp;
//        this.animationIdle = [];
//        this.animationRun = [];
//        this.animationAttack1 = [];
//        this.animationAttack2 = [];
//        this.animationAttack3 = [];
//        this.animationBlock = [];
//        this.animationIdle = [];
//        this.currentAnimation = this.animationIdle;
        this.frame = 0;
        //perhaps this.hat / this.armor
    }

    changeAnimationTo(array) {
        this.frame = 0;
        this.currentAnimation = array;
    }
    
    show() {
        image(this.image, this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height);
    }

    process() {

        if (this.attackCooldown > 0) {
            this.attackCooldown--;
        }

        if (this.grounded == false) {
            this.position.y += gravity * this.gravityMultiplier;
            if (this.gravityMultiplier <= this.terminal) {
                this.gravityMultiplier++;
            }
        }

        //if using a spell or item or weapon, this.canAttack will become false
        if (this.canAttack) {
            if (player.position.x < this.position.x) {
                this.position.x -= this.speed;
                this.direction = -1;
            }
            if (player.position.x > this.position.x) {
                this.position.x += this.speed;
                this.direction = 1;
            }

            if (this.canAttack && Math.abs(this.position.x - player.position.x) <= this.attackRange && this.attackCooldown === 0) {
                this.canAttack = false;

                this.attackPattern = floor(random(0, 3)); //0,1,2,3 - 4 patterns

                this.inAttackFor = (this.attackPattern + 1) * 20;
                this.attackCooldown += (this.attackPattern + 1) * 80;
            }


        }
        if (this.canAttack == false && this.attackPattern == 0) {
            //quick stab
            if (this.inAttackFor > 0) {
                this.inAttackFor--;
                //add attack pattern coding here
                //just a quick stab

            } else {
                this.checkCollision(120, this.height);
                this.canAttack = true;
            }
        } else if (this.canAttack == false && this.attackPattern == 2) {
            //medium charged attack jump
            if (this.inAttackFor > 0) {
                this.inAttackFor--;
                //add attack pattern coding here
                if (this.direction == 1) {
                    this.position.x += 4;
                } else {
                    this.position.x -= 4;
                }

                this.jumpSpeed = 15;
                this.position.y -= this.jumpSpeed;


            } else {

                this.checkCollision(100, this.height);


                this.canAttack = true;
            }
        } else if (this.canAttack == false && this.attackPattern == 1) {
            //long distance charge
            if (this.inAttackFor > 0) {
                this.inAttackFor--;
                //add attack pattern coding here
                if (this.direction == 1) {
                    this.position.x += 10;
                } else {
                    this.position.x -= 10;
                }
                this.checkCollision(10);
            } else {
                this.canAttack = true;
            }
        }
    }



    checkCollision(hitboxx, hitboxy) {
        this.hitboxX = hitboxx;
        this.hitboxY = hitboxy;
        this.target = player;
        if (this.direction == -1) {
            if (this.target.position.x <= this.position.x && this.target.position.x >= this.position.x - this.hitboxX) {
                dealDamage(player, this.damage, 0)
                this.inAttackFor = 0;

            }
        } else if (this.target.position.x >= this.position.x && this.target.position.x <= this.position.x + this.hitboxX && this.target.position.y >= this.position.y - this.height / 2 && this.target.position.y <= this.position.y + this.height / 2) {
            dealDamage(player, this.damage, 0)
            this.inAttackFor = 0;
        }

    }




    //solid code
    isGrounded() {
        this.feetY = this.position.y + this.height / 2;
        if (this.floorY <= this.feetY) {
            this.grounded = true;
            this.canJump = true;
            this.gravityMultiplier = 1;
            this.jumpSpeed = 0;
            this.position.y = this.floorY - this.height / 2;
        } else {
            this.grounded = false;
        }
        //and if this is true, then ur feetY will equal the floorY

        //find this.floorY
        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i].x <= this.position.x && this.position.x <= tiles[i].x + tiles[i].width) {
                this.floorY = tiles[i].y;

                break;
            }
        }
    }

    receivedHit(i) {
        if (this.hp <= 0) {
            effects.push(new GlowingDust(random(player.position.x - 150, player.position.x + 150), player.position.y));
            enemies.splice(i, 1);

        }
    }

}


class Harpy extends Enemy {
    constructor(x, y) {
        super(x, y);
        this.image = bird;
        this.height = 100;
        this.width = 180;
        this.speed = 1;
        this.grounded = false;
        this.isHovering = true;
        this.hoverY;
        this.speed = 4;
        this.terminal = 80;
        this.canStillDamage = true;
        this.hp = 30;
        this.spellDamage = 1;
        this.shockWaveSpeed = 3;
        //perhaps this.hat / this.armor
    }

    process() {
        if (this.canAttack == true) {
            this.reposition();
        }


        if (this.attackCooldown > 0) {
            this.attackCooldown--;
        }
        if (this.hoverY < this.position.y) {
            if (this.gravityMultiplier <= this.terminal) {
                this.gravityMultiplier++;
            }

            this.position.y -= gravity * this.gravityMultiplier;
        } else if (this.position.y <= this.hoverY) {

            this.isHovering = true;
            this.gravityMultiplier = 1;
        }



        //if using a spell or item or weapon, this.canAttack will become false
        if (this.canAttack) {
            if (player.position.x < this.position.x) {
                this.position.x -= this.speed;
                this.direction = -1;
            }
            if (player.position.x > this.position.x) {
                this.position.x += this.speed;
                this.direction = 1;
            }

            if (this.canAttack && Math.abs(this.position.x - player.position.x) <= this.attackRange && this.attackCooldown === 0 && this.isHovering) {
                this.canAttack = false;

                this.attackPattern = floor(random(0, 2)); //0,1,2,3 - 4 patterns
                this.canStillDamage = true;
                this.jumpSpeed = 0;
                this.gravityMultiplier = 1;

                if (this.attackPattern == 1) {
                    this.inAttackFor = 100;
                    this.attackCooldown = 500;
                } else {
                    this.inAttackFor = 30;
                    this.attackCooldown = 100;
                }


            }


        }
        if (this.canAttack == false && this.attackPattern == 0) {
            //hyper beam
            if (this.inAttackFor > 0) {
                this.inAttackFor--;
                if (this.inAttackFor % 5 == 0) {
                    projectiles.push(new ShockWave(this.position.x, this.position.y, player, 110, 15, this.spellDamage, this.shockWaveSpeed, 55, 7.5));
                }

            } else {
                this.checkCollision(120, this.height);
                this.canAttack = true;
            }
        } else if (this.canAttack == false && this.attackPattern == 1) {
            //medium charged attack dive
            if (this.isHovering == false || this.inAttackFor > 0) {
                this.inAttackFor--;
                this.isHovering = false; // remove this line if u know how to program
                if (this.isHovering) {
                    this.inAttackFor = 0;
                    this.canAttack = true;
                    this.attackCooldown = 200;
                }

                //add attack pattern coding here
                if (this.direction == 1) {
                    this.position.x += 8;
                } else {
                    this.position.x -= 8;
                }


                this.jumpSpeed = 25;
                this.position.y += this.jumpSpeed;

                if (this.canStillDamage) {
                    this.checkCollision(100, this.height);
                }


            } else {
                this.canAttack = true;
            }
        }
    }



    checkCollision(hitboxx, hitboxy) {
        this.hitboxX = hitboxx;
        this.hitboxY = hitboxy;
        this.target = player;

        if (this.attackPattern == 1) {
            if (dist(this.position.x, this.position.y, this.target.position.x, this.target.position.y) < 130) {
                console.log("diveatk")
                this.damage = 1;
                dealDamage(player, this.damage);
                this.canStillDamage = false;



            }
        } else {
            //hyper beam attack shoots line at player
            if (this.direction == -1) {
                if (this.target.position.x <= this.position.x && this.target.position.x >= this.position.x - this.hitboxX) {

                    this.target.hp -= this.damage;
                    this.target.receivedHit();
                }
            } else if (this.direction == 1) {
                if (this.target.position.x >= this.position.x && this.target.position.x <= this.position.x + this.hitboxX && this.target.position.y >= this.position.y - this.height / 2 && this.target.position.y <= this.position.y + this.height / 2) {

                    this.target.hp -= this.damage;
                    this.target.receivedHit();

                }
            }
        }



    }

    reposition() {
        if (player.canAttack && dist(player.position.x, player.position.y, this.position.x, this.position.y) <= 320) {
            if (player.position.x > this.position.x) {
                this.position.x -= 5;
            } else {
                this.position.x += 5;
            }

        }
    }




    //solid code
    isGrounded() {
        this.hoverY = this.floorY - 600;
        //find this.floorY
        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i].x <= this.position.x && this.position.x <= tiles[i].x + tiles[i].width) {
                this.floorY = tiles[i].y;
                break;
            }
        }
    }

}
//he will hide behind graves
class GraveMaster extends Enemy {
    constructor(x, y) {
        super(x, y);
        this.image = gravewatcher;
        this.hp = 150;
        this.mhp = 150;
        this.standoff = false;
        this.attackRange = 400;
        //perhaps this.hat / this.armor
    }

    process() {

        if (this.attackCooldown > 0) {
            this.attackCooldown--;
        }

        if (this.grounded == false) {
            this.position.y += gravity * this.gravityMultiplier;
            if (this.gravityMultiplier <= this.terminal) {
                this.gravityMultiplier++;
            }
        }

        //if using a spell or item or weapon, this.canAttack will become false
        if (this.canAttack) {
            if (player.position.x < this.position.x) {
                if (player.position.x < this.position.x - 200) {
                    this.position.x -= this.speed;
                } else {
                    this.position.x -= this.speed / 8
                }

                this.direction = -1;
            } else {
                this.standoff = true;
            }
            if (player.position.x > this.position.x) {
                if (player.position.x > this.position.x + 200) {
                    this.position.x += this.speed;
                } else {
                    this.position.x += this.speed / 8
                }
                this.direction = 1;
            } else {
                this.standoff = true;
            }



            if (this.canAttack && Math.abs(this.position.x - player.position.x) <= this.attackRange && this.attackCooldown === 0) {
                this.canAttack = false;

                this.attackPattern = floor(random(0, 3)); //0,1,2, -3 patterns

                this.inAttackFor = (this.attackPattern + 1) * 20;
                this.attackCooldown += (this.attackPattern + 1) * 80;
            }


        }
        if (this.canAttack == false && this.attackPattern == 0) {
            //quick stab
            if (this.inAttackFor > 0) {
                this.inAttackFor--;
                //add attack pattern coding here
                //just a quick stab
                if (this.direction == 1) {
                    this.position.x += 2;
                } else {
                    this.position.x -= 2;
                }

            } else {
                this.damage = 0.5;
                this.checkCollision(120, this.height);
                this.canAttack = true;
            }
        } else if (this.canAttack == false && this.attackPattern == 2) {
            //medium charged attack jump
            if (this.inAttackFor > 0 || this.grounded == false) {
                this.inAttackFor--;
                //add attack pattern coding here
                if (this.direction == 1) {
                    this.position.x += 4;
                } else {
                    this.position.x -= 4;
                }

                this.jumpSpeed = 26;
                this.position.y -= this.jumpSpeed;


            } else {
                ellipse(this.position.x, this.position.y, 500, 500);
                if (this.grounded) {
                    this.damage = 2;
                    this.checkCollision(300);
                }

                this.canAttack = true;
            }
        } else if (this.canAttack == false && this.attackPattern == 1) {
            //long distance charge
            if (this.inAttackFor > 0) {
                this.inAttackFor--;
                //add attack pattern coding here
                if (this.direction == 1) {
                    this.position.x += 20;
                } else {
                    this.position.x -= 20;
                }
                this.damage = 0.5;
                this.checkCollision(21);
            } else {
                this.canAttack = true;
            }
        }
    }



    checkCollision(hitboxx, hitboxy) {
        this.hitboxX = hitboxx;
        this.hitboxY = hitboxy;
        this.target = player;

        if (this.attackPattern == 2) {
            if (dist(this.position.x, this.position.y, this.target.position.x, this.target.position.y) < 190) {
                dealDamage(player, this.damage, 0)
                this.inAttackFor = 0;
            }
        } else {
            if (this.direction == -1) {
                if (this.target.position.x <= this.position.x && this.target.position.x >= this.position.x - this.hitboxX) {
                    dealDamage(player, this.damage, 0)
                    this.inAttackFor = 0;
                }
            } else if (this.target.position.x >= this.position.x && this.target.position.x <= this.position.x + this.hitboxX && this.target.position.y >= this.position.y - this.height / 2 && this.target.position.y <= this.position.y + this.height / 2) {
                dealDamage(player, this.damage, 0)
                this.inAttackFor = 0;


            }
        }


    }




    //solid code
    isGrounded() {
        this.feetY = this.position.y + this.height / 2;
        if (this.floorY <= this.feetY) {
            this.grounded = true;
            this.canJump = true;
            this.gravityMultiplier = 1;
            this.jumpSpeed = 0;
            this.position.y = this.floorY - this.height / 2;
        } else {
            this.grounded = false;
        }
        //and if this is true, then ur feetY will equal the floorY

        //find this.floorY
        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i].x <= this.position.x && this.position.x <= tiles[i].x + tiles[i].width) {
                this.floorY = tiles[i].y;

                break;
            }
        }
    }

}

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

//class BlackKnight extends Enemy {
//    constructor(x, y) {
//        super(x, y);
//        this.image = blackknight;
//        this.hp = 60;
//        this.mhp = 60;
//        this.width = 200;
//        this.height = 350;
//        this.standoff = false;
//        this.attackRange = 700;
//        this.hoverY = this.floorY + 300;
//        this.jumpSpeed = 7;
//        this.speed = 5;
//        this.target = player;
//        this.canSurface = true;
//        this.surfaceWhenXDistanceIs = 120;
//        this.attackPattern = 3;
//        this.maxX;
//        this.minX;
//        this.spellDamage = 3;
//        this.direction = -1;
//        this.acidBallSpeed = 10;
//
//        //if it is this close to the player it will stop repositioning and start going into attack mode
//        //        this.attackRange = 60; // close range attack emerge
//        this.aggroRange = 1200;
//
//        //perhaps this.hat / this.armor
//    }
//
//    show() {
//        fill(231, 10, 40);
//        rect(this.position.x - 80, this.position.y - 120, this.mhp * this.factor, 1 * this.factor);
//        fill(100, 230, 40);
//        rect(this.position.x - 80, this.position.y - 120, this.hp * this.factor, 1 * this.factor);
//
//        image(this.image, this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height);
//
//    }
//    
//    attack() {
//        //quick slash can be comboed
//        this.inAttackFor--;
//        if(this.target.position.dist(this.position) < 120) {
//            
//            this.checkCollision(160,this.height);
//        }
//        
//        if (this.inAttackFor == 0) {
//            //second slash
//            if (this.attackPattern == 1) {
//                if (this.target.position.x > this.position.x) {
//                    this.direction = 1;
//                } else {
//                    this.direction = -1;
//                }
//                
//                
//                this.attackPattern = 2;
//                this.inAttackFor = 20;
//            }
//        }
//
//        if (this.attackPattern == 2) {
//            if (this.target.position.x > this.position.x) {
//                this.direction = 1;
//            } else {
//                this.direction = -1;
//            }
//
//            if (this.inAttackFor == 0) {
//                //third slash
//                if (this.attackPattern == 1) {
//                if (this.target.position.x > this.position.x) {
//                    this.direction = 1;
//                } else {
//                    this.direction = -1;
//                }
//                this.attackPattern = 2;
//                this.inAttackFor = 20;
//            }
//        }
//
//        if (this.attackPattern == 3) {
//            if (this.target.position.x > this.position.x) {
//                this.direction = 1;
//            } else {
//                this.direction = -1;
//            }
//
//            if (this.inAttackFor == 0) {
//                //stop after 3 slashes
//
//                this.attackPattern = 2;
//                this.inAttackFor = 20;
//            }
//        }
//
//
//
//
//        //block and reposition spam
//        if (this.attackPattern == 2) {
//            //dive
//            this.jumpSpeed = -14;
//            this.reposition(0, -this.jumpSpeed);
//            if (this.inAttackFor === 0 || this.position.y > this.floorY + 250) {
//                this.attackPattern = 0;
//                this.inAttackFor = 0;
//                this.attackCooldown = 300; // after dive just stop attacking
//                this.maxX = this.target.position.x + random(500, 800); // values will remain these for a bit
//                this.minX = this.target.position.x - random(500, 800);
//            }
//        }
//        //charge attack
//        if (this.attackPattern == 3) {
//            //surface
//            //GOING UP AT THIS SPEED
//            this.jumpSpeed = 14;
//            if (this.canSurface) { // reposition
//                if (dist(this.position.x, 0, this.target.position.x, 0) <= this.surfaceWhenXDistanceIs) {
//                    this.canSurface = false;
//                    this.inAttackFor = 150; // just enough to last for the surfacing 
//                }
//            }
//
//            if (this.canSurface == false) {
//                this.reposition(0, -this.jumpSpeed);
//
//                this.damage = 5;
//                this.checkCollision(this.width / 2 + this.target.width / 2, this.height / 2 + this.target.height / 2);
//                if (this.position.y + this.height / 2 <= this.floorY) {
//                    this.attackPattern = 1; // acidballs
//
//                    this.inAttackFor = 260; // 6 acid balls 4.33 seconds
//                }
//            }
//        }
//
//
//    reposition(x, y) {
//        this.position.add(createVector(x, y));
//    }
//
//    interactWith(object) {
//
//    }
//
//    hover() {
//        this.hoverY = this.floorY + 250;
//        this.position.y = this.hoverY;
//
//        //reposition spamming
//        if (this.direction === 1) {
//            if (this.position.x < this.maxX) {
//                this.reposition(this.speed, 0);
//            } else {
//                this.direction = -1;
//                this.maxX = this.target.position.x + random(600, 900);
//            }
//        } else if (this.direction === -1) {
//            if (this.position.x > this.minX) {
//                this.reposition(-this.speed, 0);
//            } else {
//                this.direction = 1;
//                this.minX = this.target.position.x - random(600, 900);
//            }
//        }
//    }
//
//    process() {
//
//
//        //controls cooldowns only after diving for this guy
//        if (this.attackCooldown > 0) {
//            this.attackCooldown--;
//        }
//        // in the middle of attacking
//        if (!this.canAttack && this.inAttackFor > 0) {
//            this.attack();
//        } else if (this.inAttackFor === 0) { // after diving or not finding a target at all to surface, then it will reset the ability to attack but not the atk cooldown
//            this.canAttack = true;
//            this.canSurface = true;
//            this.maxX = this.target.position.x + random(600, 900); // values will remain these for a bit
//            this.minX = this.target.position.x - random(600, 900);
//        }
//
//        //movement
//        if (this.canAttack) {
//            this.hover(); // just reposition around
//            //target cannot change midattack
//            for (let a = 0; a < allies.length; a++) {
//                if (allies[a].position.dist(this.position) < this.aggroRange && allies[a].position.dist(this.position) > allies[a].position.dist(this.position)) {
//
//                    this.target = allies[a];
//
//                }
//            }
//
//
//            //deciding an attack pattern if safe to do so
//            if (this.canAttack && this.target.position.dist(this.position) <= this.attackRange && this.attackCooldown === 0 && dist(this.target.position.x, 0, this.position.x, 0) < this.surfaceWhenXDistanceIs) {
//
//                this.attackPattern = 3;
//                this.canSurface = true;
//                this.inAttackFor = floor(random(150, 200));
//                this.canAttack = false
//                this.canStillDamage = true;
//            }
//
//
//
//        }
//    }
//
//    //  perhaps also have item interaction            
//
//
//
//    //takes in 2 parameters, the x which is dist from position of enemy to square side and y which is center to top or bot
//    checkCollision(x, y) {
//        if (this.attackPattern == 3) {
//            for (let a = 0; a < allies.length; a++) {
//                if (this.position.x + x > allies[a].position.x && this.position.x - x < allies[a].position.x && this.position.y + y > allies[a].position.y && this.position.y - y < allies[a].position.y) {
//                    if (this.canStillDamage) {
//                        dealDamage(allies[a], 5);
//                        this.canStillDamage = false;
//                    }
//
//                }
//            }
//        }
//
//    }
//
//
//
//
//    //solid code
//    isGrounded() {
//        //is Submerged
//        if (this.position.y + this.height / 2 > this.floorY) {
//            this.grounded = true;
//            this.canExplode = true;
//            this.gravityMultiplier = 1;
//        }
//
//
//        //find this.floorY
//        for (let i = 0; i < tiles.length; i++) {
//            if (tiles[i].x <= this.position.x && this.position.x <= tiles[i].x + tiles[i].width) {
//                this.floorY = tiles[i].y;
//                break;
//            }
//        }
//    }
//
//
//}
