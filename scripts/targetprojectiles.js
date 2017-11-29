class TargetedProjectile { // things that go after people
    constructor(x, y, target, width, height, damage, speed, hitboxX, hitboxY) {
        this.width = width;
        this.height = height;
        this.damage = damage;
        this.speed = speed
        this.position = createVector(x + this.width / 2, y + this.height / 2);
        this.distFrame;
        this.hitboxX = hitboxX;
        this.hitboxY = hitboxY;
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
        this.launchSpeed = 4;
        this.gravityMultiplier = 1;
    }

    show() {
        fill(111, 245, 25, 190);
        ellipse(this.position.x - this.width / 2, this.position.y, this.width, this.height);
    }



    //called 60fps
    move(i) {
        //have gravity here
        this.position.y -= gravity * this.gravityMultiplier;
        this.position.y += this.launchSpeed;
        
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

