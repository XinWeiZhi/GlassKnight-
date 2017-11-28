class Enemy {
    constructor(x, y) {
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
        this.iam;
        this.factor = 20;
        this.canAttack = true;
        this.attackRange = 200;
        this.inAttackFor = 0;
        this.target;
        this.hitboxX = 250;
        this.attackCooldown = 0;
        this.takenDamageMultiplier = 1;
        this.hoverY = 800;
        //perhaps this.hat / this.armor
    }

    show(k) {
        this.iam = k;
        fill(231, 10, 40);
        rect(this.position.x - 80, this.position.y - 120, this.mhp * this.factor, 1 * this.factor);
        fill(100, 230, 40);
        rect(this.position.x - 80, this.position.y - 120, this.hp * this.factor, 1 * this.factor);

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

    show(k) {
        this.iam = k;
        fill(231, 10, 40);
        rect(this.position.x - 80, this.position.y - 120, this.mhp * this.factor, 1 * this.factor);
        fill(100, 230, 40);
        rect(this.position.x - 80, this.position.y - 120, this.hp * this.factor, 1 * this.factor);

        image(this.image, this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height);
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

        show(k) {
            this.iam = k;
            fill(231, 10, 40);
            rect(this.position.x - 80, this.position.y - 120, this.mhp * this.factor, 1 * this.factor);
            fill(100, 230, 40);
            rect(this.position.x - 80, this.position.y - 120, this.hp * this.factor, 1 * this.factor);

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
            this.hp = 25;
            this.mhp = 25;
            this.standoff = false;
            this.attackRange = 700;
            this.hoverY = this.floorY + 300;
            this.jumpSpeed = 5;
            
            //if it is this close to the player it will stop repositioning and start going into attack mode
            this.attackRange = 60; // close range attack emerge
            
            //perhaps this.hat / this.armor
        }

        show() {
            fill(231, 10, 40);
            rect(this.position.x - 80, this.position.y - 120, this.mhp * this.factor, 1 * this.factor);
            fill(100, 230, 40);
            rect(this.position.x - 80, this.position.y - 120, this.hp * this.factor, 1 * this.factor);

            image(this.image, this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height);
        }

        attack() {
            
        }
    
        reposition(x,y) {
            this.position.add(x,y);
            
        }
    
        decideMove() {
         if (player.position.x < this.position.x) {
                    if (player.position.x < this.position.x - 200) {
                        this.position.x -= this.speed;
                        this.reposition(-this.speed);
                    } else {
                        this.position.x -= this.speed / 8
                    }

                    this.direction = -1;
                } 
                if (player.position.x > this.position.x) {
                    if (player.position.x > this.position.x + 200) {
                        this.position.x += this.speed;
                    } else {
                        this.position.x += this.speed / 8
                    }
                    this.direction = 1;
                }
        }
    
        interactWith(object) {
            
        }
    
        process() {

            if (this.attackCooldown > 0) {
                this.attackCooldown--;
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

                    this.attackPattern = floor(random(3,4)); //0,1,2, -3 patterns

                    this.inAttackFor = (this.attackPattern + 1) * 20;
                    this.attackCooldown += (this.attackPattern + 1) * 50;
                }


            }
            
            
            if (this.canAttack == false && this.attackPattern == 3) {
                //quick tunnel
                if (this.inAttackFor > 0) {
                    this.inAttackFor--;
                    this.jumpSpeed = 5;
                    this.position.y -= this.jumpSpeed;
                    this.position.y += this.jumpSpeed / 2;
                    

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
            //is Submerged
            if(this.position.y + this.height / 2 > this.floorY) {
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
