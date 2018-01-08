class Tile {
    constructor(x, y) {
        this.position = createVector(x, y);
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

class Stone extends Tile {
    constructor(x, y) {
        super(x, y)
        this.image = rockies;
    }
}

class Interactable {
    constructor(x, y, img,width,height) {
        this.position = createVector(x, y);
        this.width = width;
        this.height = height;
        this.image = img; 
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
    constructor(x, y, goMap) {
        super(x, y, door, 130, 250)
        this.interactRange = 130;
        this.goMap = goMap;
    }
    
    use(i) {
        this.iam = i;
        if(this.inRange()) {
//            this.canUse = false;
            map = this.goMap;
            drawMap();
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
            if (dist(this.position.x, this.position.y, this.target.x, this.target.y) <= 25) {
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
