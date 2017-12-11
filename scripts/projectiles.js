class PresetProjectile {
    constructor(x, y, range, width, height, damage, speed, hitboxX, hitboxY) {
        this.width = width;
        this.height = height;
        this.damage = damage;
        this.hitboxX = hitboxX;
        this.hitboxY = hitboxY;
        this.position = createVector(x + this.width / 2, y - this.height / 2);
        this.speed = speed;
        this.distFrame;
        this.aim = createVector(x + range, y); // prob change this up each variation
        this.movementVector = p5.Vector.sub(this.aim, this.position);
        this.type = "missile";
    }

    show() {
        fill(255, 255, 255, 90);
        ellipse(this.position.x, this.position.y, this.width, this.height);
    }



    //called 60fps
    move(i) {
        for (let e = 0; e < enemies.length; e++) {
            if (p5.Vector.dist(this.position, enemies[e].position) <= this.width) {
                dealDamage(enemies[e], this.damage);
                projectiles.splice(i, 1);
            }
        }
        //getting the x and y values of the target 
        this.distFrame = this.speed / 60;
        //todo improve this checking dist

        //        this.position.x += this.movementVector.x * this.distFrame;
        //        this.position.y += this.movementVector.y * this.distFrame;


    }

}

class FireBall extends PresetProjectile {
    constructor(x, y, range, width, height, damage, speed, hitboxX, hitboxY) {
        super(x, y, range, width, height, damage, speed, hitboxX, hitboxY)
    }

    show() {
        fill("red");
        rect(this.position.x + this.width / 2, this.position.y + this.width / 2, this.width, this.height);
    }



    //called 60fps
    move(i) {
        for (let e = 0; e < enemies.length; e++) {
            //if(collisionDetected(enemies[e], this.position, this.width / 2, this.height/2)) {
            if (this.position.x >= enemies[e].position.x - enemies[e].width / 2 && this.position.x <= enemies[e].position.x + enemies[e].width / 2 && this.position.y <= enemies[e].position.y + enemies[e].height / 2 && this.position.y >= enemies[e].position.y - enemies[e].height / 2) {
                dealDamage(enemies[e], this.damage, e);
                projectiles.splice(i, 1);
            }
        }



        //getting the x and y values of the target 
        this.distFrame = this.speed / 60;
        //todo improve this checking dist
        //        this.position.add(this.movementVector * this.distFrame);
        this.position.x += this.movementVector.x * this.distFrame;
        this.position.y += this.movementVector.y * this.distFrame;

    }
}
