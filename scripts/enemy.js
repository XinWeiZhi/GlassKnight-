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
                this.checkCollision(120,this.height);
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

                this.jumpSpeed = 26;
                this.position.y -= this.jumpSpeed;

    
            } else {
                if(this.grounded) {
                    this.checkCollision(100,this.height);
                }
                
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



    checkCollision(hitboxx,hitboxy) {
        this.hitboxX = hitboxx;
        this.hitboxY = hitboxy;
        this.target = player;
        if (this.direction == -1) {
            if (this.target.position.x <= this.position.x && this.target.position.x >= this.position.x - this.hitboxX) {
                console.log("sweep left")
                this.target.hp -= this.damage;
                this.target.receivedHit();
                this.inAttackFor = 0;
            }
        } else if (this.target.position.x >= this.position.x && this.target.position.x <= this.position.x + this.hitboxX && this.target.position.y >= this.position.y - this.height / 2 && this.target.position.y <= this.position.y + this.height / 2) {
            console.log("sweep")
            this.target.hp -= this.damage;
            this.target.receivedHit();
            this.inAttackFor = 0;
            
            //                text(this.damage, this.target.position.x, this.target.position.y - 40);
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

    receivedHit() {
        if (this.hp <= 0) {
            enemies.splice(this.iam, 1);
        }
    }

}
