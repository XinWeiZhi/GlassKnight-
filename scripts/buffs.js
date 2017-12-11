class Buff {
    constructor(sender, time) {
        this.sender = sender;
        this.time = time;
        this.image;
        this.type = "buff";
    }
    
    show() {
        
    }
    
    use() {
        
    }
}

class Dash extends Buff {
    constructor(sender,time) {
        super(sender,time);
        this.image;
    }
    
    show() {
        fill(0,0,0,70);
        rect(this.sender.position.x, this.sender.position.y, 100, 100)
    }
}

class Regenerate extends Buff {
    constructor(sender,time) {
        super(sender, time);
        this.image;
        this.heal = 0.25;
    }
    
    show() {
        
    }
    
    use() {
        if(this.sender.hp < this.sender.mhp) {
            this.sender.hp += this.heal;
        } 
        
    }
}

class EmptySpell {
    constructor(x,y) {
        this.position = createVector(x,y);
        this.type = null;
        this.width = 60;
    }
    
    show() {
        rect(this.position.x, this.position.y, this.width, this.width);
    }
    
    use() {
        console.log("assign a spell to this slot"); 
    }
}