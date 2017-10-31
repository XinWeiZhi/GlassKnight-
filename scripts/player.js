class Player {
    constructor(x, y) {
        this.position = createVector(this.x, this.y);
        this.attack = 1;
        this.speed = 6.75;
        this.width = 100;
        this.height = 180;
        this.hp = 10;
        this.mhp = 10;
        this.canJump = true;
        this.grounded = false;
        this.jumpSpeed = 0;
        this.terminal = 80;
        this.gravityMultiplier = 1;
        this.feetY = this.position.y + this.height / 2;
        this.floorY = 800;
        this.canAttack = true;
        this.canSpell = true;
        this.canMove = true;
        this.direction = 1;
        this.weapon = new Sword(this.position.x, this.position.y);
        this.animationWalk = [walk,walk,walk,walk,walk,walk,walk,walk];
        this.isAttackingFor;
        this.attackFrame =[sword,sword,sword,skeleton,skeleton,skeleton,skeleton,skeleton,skeleton,skeleton,skeleton];
        this.image = pepe;
        this.frame = 0;
        this.hitboxX = 300;
        this.damage = 2;
        this.state = 0 // 0 for idle, 1 for movement right, 2 for move left, 3 for attacking, 4 for spell, 5 for jump

        //perhaps this.hat / this.armor
    }

    show() {
        fill(255);
        image(this.image,this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height);
    }

    process() {
        if (this.grounded == false) {
            this.position.y += gravity * this.gravityMultiplier;
            if (this.gravityMultiplier <= this.terminal) {
                this.gravityMultiplier++;
            }
          
        }

        //if using a spell or item or weapon, this.canAttack will become false
        if (this.canAttack == false && this.state != 3) { //mustve clicked with mouse or keyboard shortcut then
            this.state = 3;
            this.frame = 0;
            this.isAttackingFor = 10; //change to animation length
        } else if (this.canAttack && this.canSpell && this.canMove) { //canMove
            this.state = 0;
            this.image = this.animationWalk[this.frame];
            if (keyIsDown(65)) {
                this.position.x -= this.speed;
                if (keyIsDown(16)) {
                    this.position.x -= this.speed;
                }
                this.direction = -1;
                this.state = 2;
                this.frame++
            }
            if (keyIsDown(68)) {
                this.position.x += this.speed;
                if (keyIsDown(16)) {
                    this.position.x += this.speed;
                }
                this.direction = 1;
                this.frame++
                this.state = 1;
            }

            if (keyIsDown(32) && this.canJump || this.canJump == false) {
                this.canJump = false;
                this.grounded = false;
                this.jumpSpeed = 32;
                this.position.y -= this.jumpSpeed;
                this.state = 5;
                this.frame++;
            }
            
            if(this.frame == this.animationWalk.length - 1) {
                this.frame = 0;
                this.image = pepe;
            }
        } else if (this.state == 3) {

            if (this.isAttackingFor != 0) {
                this.isAttackingFor--;
                this.frame++;
                this.image = this.attackFrame[this.frame];
                if (this.isAttackingFor == 0) {
                    this.checkCollision();
                }
            } else {
                this.frame = 0;
                this.canAttack = true;
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


    checkCollision() {
        for (let target = 0; target < enemies.length; target++)
            if (enemies[target].position.x >= player.position.x && enemies[target].position.x <= player.position.x + this.hitboxX) {
                console.log("dsajknkdas")
                enemies[target].hp -= this.damage;
                enemies[target].receivedHit();
            }

    }

}
