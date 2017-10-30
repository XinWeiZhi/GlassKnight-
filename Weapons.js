class Weapon {
    constructor(x, y) {
        this.position = (x, y); // should be in the middle of player rectangle
        this.image;
        this.animation = [];
        this.frame = 0;
        this.isAttackingFor = 0;
        //if enemy in this range, they take damage once
        this.hitBoxX = 250;
        this.damage; //base + player damage
        //        this.hitBoxY = 180;
    }

    show() {
        this.position.y = player.position.y;
        if(player.direction == 1) {
            this.position.x = player.position.x + player.width;
        } else {
            this.position.x = player.position.x;
        }
        
        
        image(this.image, this.position.x, this.position.y);
    }
    //on attack, lockin animation for 10 frames and then inflict damage over one frame
    attack(direction) {

        if (this.isAttackingFor != 0) {
            this.isAttackingFor--;
            this.frame++;
            this.image = this.animation[this.frame];
            if (this.isAttackingFor == 0) {
                this.checkCollision();
            }
        } else {
            this.frame = 0;
        }
    }

    checkCollision() {
        for (let target = 0; target < enemies.length; target++)
            if (enemies[target].position.x >= player.position.x && enemies[target].position.x <= player.position.x + this.hitboxX) {
                enemies[target].hp -= this.damage;
                enemies[target].receivedHit();
            }

    }
}

class Sword extends Weapon {
    constructor(x, y) {
        super(x, y)
        this.image = sword;
    }


}

class Katana extends Weapon {
    constructor(x, y) {
        super(x, y)

    }
}
