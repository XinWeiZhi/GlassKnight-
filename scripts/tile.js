class Tile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.position = createVector(x,y);
        this.width = 1200;
        this.height = 2500;
        this.image = grass;
    }
    
    show() {
        image(this.image, this.position.x, this.position.y, this.width,this.height);
        console.log(this.position.x)
    }

}

class Grass extends Tile {
    constructor(x, y) {
       super(x,y)
        this.image = grass;   
    }
}
