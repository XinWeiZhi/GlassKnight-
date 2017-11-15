class Tile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 1200;
        this.height = 2500;
        this.image = grass;
    }

    show() {
        image(this.image, this.x, this.y, this.width, this.height);
    }

}

class Grass extends Tile {
    constructor(x, y) {
        super(x, y)
        this.image = grass;
    }
}

class Interactable {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.width;
        this.height;
        this.canUse = true;
        this.interactRange = 70;
    }
    
    show() {
        image(this.image,this.position.x, this.position.y, this.width,this.height);
    }
    
    inRange() {
        if(dist(this.position.x, this.position.y, player.position.x, player.position.y) <= this.interactRange) {
            return true;
        }
    }
    
    use(i) {
        this.iam = i;
        if(this.inRange()) {
            this.canUse = false;
        }
    }
}

class Door extends Interactable {
    constructor(x, y) {
        super(x, y)
        this.width = 130;
        this.height = 250;
        this.image = door;
        this.interactRange = 130;
    }
    
    use(i) {
        this.iam = i;
        if(this.inRange()) {
//            this.canUse = false;
            player.position.x += 640;
        }
    }
}

class GlowingDust {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.speed = 3;
        this.width = 23;
        this.height = 21;
        this.distFrame;
        this.target = createVector(mouseX, mouseY);
        this.movementVector = this.target - this.position;
    }

    show() {
        fill(255, 255, 255, 90);
        ellipse(this.position.x, this.position.y, this.width, this.height);
    }



    //called 60fps
    move(i) {
        if (frameCount % 1 == 0) {
            this.target = createVector(mouseX  + camX  + random(-30,30) , mouseY  + camY + random(-30,30) );
             this.movementVector = p5.Vector.sub(this.target,this.position)
       }
        this.iam = i;
       

        if (this.target != null) {
            //getting the x and y values of the target 
            this.distFrame = this.speed / 60;
            //todo improve this checking dist
            if (dist(this.position.x, this.position.y, this.target.x, this.target.y) <= 6) {
                //do nothing
            } else {
                this.position.x += this.movementVector.x * this.distFrame;
                this.position.y += this.movementVector.y * this.distFrame;
            }

        }
    }

}
