class Tile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 1200;
        this.height = 2500;
        this.image;
    }
    
    show() {
        image(this.image, this.x, this.y, this.width,this.height);
    }

}

class Grass extends Tile {
    constructor(x, y) {
       super(x,y)
        this.image = grass;   
    }
}
