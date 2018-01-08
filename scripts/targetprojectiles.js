class TargetedProjectile { // things that go after people
    constructor(x, y, target, width, height, damage, speed, hitboxX, hitboxY) {
        this.width = width;
        this.height = height;
        this.damage = damage;
        this.speed = speed
        this.position = createVector(x + this.width / 2, y + this.height / 2);
        this.distFrame;
        this.target = target;
        this.aim = createVector(target.position.x, target.position.y);
        this.movementVector = p5.Vector.sub(this.aim, this.position);
    }

    show() {
        fill(255, 255, 255, 90);
        ellipse(this.position.x, this.position.y, this.width, this.height);
    }



    //called 60fps
    move(i) {
        if (frameCount % 3 == 0) {
            this.target = createVector(player.position.x, player.position.y);
            this.movementVector = p5.Vector.sub(this.target, this.position)
        }


        if (this.target != null) {
            //getting the x and y values of the target 
            this.distFrame = this.speed / 60;
            //todo improve this checking dist
            if (dist(this.position.x, this.position.y, this.target.x, this.target.y) <= 15) {
                projectiles.splice(i, 1);
            } else {
                this.position.x += this.movementVector.x * this.distFrame;
                this.position.y += this.movementVector.y * this.distFrame;
            }

        }
    }

}

class ShockWave extends TargetedProjectile {
    constructor(x, y, target, width, height, damage, speed, hitboxX, hitboxY) {
        super(x, y, target, width, height, damage, speed, hitboxX, hitboxY)
    }

    show() {
        fill(255, 255, 255, 90);
        rect(this.position.x - this.width / 2, this.position.y, this.width, this.height);
    }



    //called 60fps
    move(i) {


        //getting the x and y values of the target 
        this.distFrame = this.speed / 60;
        //todo improve this checking dist
        if (dist(this.position.x, this.position.y, this.aim.x, this.aim.y) <= 25) {
            projectiles.splice(i, 1);
        } else {
            this.position.x += this.movementVector.x * this.distFrame;
            this.position.y += this.movementVector.y * this.distFrame;

            if (this.position.x >= this.target.position.x - this.target.width / 2 && this.position.x <= this.target.position.x + this.target.width / 2 && this.position.y <= this.target.position.y + this.target.height / 2 && this.position.y >= this.target.position.y - this.target.height / 2) {
                dealDamage(this.target, this.damage);
                projectiles.splice(i, 1);
            }

        }


    }
}

class AcidBall extends TargetedProjectile {
    constructor(x, y, target, width, height, damage, speed, hitboxX, hitboxY) {
        super(x, y, target, width, height, damage, speed, hitboxX, hitboxY)
        this.launchSpeed = 7;
        this.gravityMultiplier = 1;
    }

    show() {
        fill(111, 245, 25, 190);
        ellipse(this.position.x - this.width / 2, this.position.y, this.width, this.height);
    }



    //called 60fps
    move(i) {
        this.position.x += this.speed;
        this.position.y += gravity * this.gravityMultiplier;
        this.position.y -= this.launchSpeed;
        this.gravityMultiplier += 0.5;

        if (this.position.y > this.target.floorY) {
            projectiles.splice(i, 1);
        }

        if (this.position.x >= this.target.position.x - this.target.width / 2 && this.position.x <= this.target.position.x + this.target.width / 2 && this.position.y <= this.target.position.y + this.target.height / 2 && this.position.y >= this.target.position.y - this.target.height / 2) {
            dealDamage(this.target, this.damage);
            projectiles.splice(i, 1);
        }

    }


}

class Beam extends TargetedProjectile {
    constructor(x, y, target, width, height, damage, speed, end) {
        super(x, y, target, width, height, damage, speed, end)
        this.startPosition = createVector(x, y);
        this.endPosition = end;
        this.speed = 100;
        this.duration = 20;
    }

    show() {
        stroke(255, 234, 234);
        strokeWeight(8);
        line(this.startPosition.x, this.startPosition.y, this.endPosition.x, this.endPosition.y);
        ellipse(this.endPosition.x, this.endPosition.y, this.width, this.height);
        strokeWeight(1);
    }



    //called 60fps
    move(i) {
        this.duration--
            if (this.duration == 0) {
                projectiles.splice(i, 1);
            }
        this.movementVector = p5.Vector.sub(this.aim, this.startPosition);
        //        this.movementVector = p5.Vector.mult(this.movementVector.mult, 3);
        this.distFrame = this.speed / 10;

        for (let d = 0; d <= this.duration; d++) {
            this.position.add(this.movementVector * this.distFrame);
            for (let e = 0; e < enemies.length; e++) {
                if (collisionDetected(enemies[e], this.position, enemies[e].width / 2, enemies[e].height / 2)) {
                    dealDamage(enemies[e], this.damage, e);
                    projectiles.splice(i, 1);
                }

            }
        }

    }


}

class CannonArrow extends TargetedProjectile {
    constructor(x, y, target, width, height, damage, speed, end) {
        super(x, y, target, width, height, damage, speed, end);
    }

    show() {
        fill(20);
        ellipse(this.position.x - this.width / 2, this.position.y - this.width / 2, this.width, this.height);
    }



    //called 60fps
    move(i) {
        //move

        //        this.movementVector = p5.Vector.mult(this.movementVector.mult, 3);
        this.distFrame = this.speed / 60;
        //todo improve this checking dist
        if (dist(this.position.x, this.position.y, this.aim.x, this.aim.y) <= 25) {
            projectiles.splice(i, 1);
        } else {
            this.position.x += this.movementVector.x * this.distFrame;
            this.position.y += this.movementVector.y * this.distFrame;
            if(targetEnemy(this.position, 40)) {
                 dealDamage(targetEnemy(this.position, 40), this.damage);
                projectiles.splice(i, 1);
            }
        }

    }



}
