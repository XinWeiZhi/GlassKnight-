class Projectile {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.speed = 8;
        this.width = 23;
        this.height = 21;
        this.distFrame;
        this.target;
        this.movementVector = this.target - this.position;
    }

    show() {
        fill(255, 255, 255, 90);
        ellipse(this.position.x, this.position.y, this.width, this.height);
    }



    //called 60fps
    move(i) {
        if (frameCount % 3 == 0) {
            this.target = createVector(player.position.x, player.position.y);
             this.movementVector = p5.Vector.sub(this.target,this.position)
       }
        this.iam = i;
       

        if (this.target != null) {
            //getting the x and y values of the target 
            this.distFrame = this.speed / 60;
            //todo improve this checking dist
            if (dist(this.position.x, this.position.y, this.target.x, this.target.y) <= 15) {
                //do nothing
                silvercoins += 2;
                player.experience += 1;
                effects.splice(this.iam,1);
            } else {
                this.position.x += this.movementVector.x * this.distFrame;
                this.position.y += this.movementVector.y * this.distFrame;
            }

        }
    }

}