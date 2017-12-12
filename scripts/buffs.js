class Buff {
    constructor(sender, time) {
        this.sender = sender;
        this.time = time;
        this.image;
        this.type = "buff";
    }
    
    show() {
        
    }
    
    use(b) {
        
    }
}

class Dash extends Buff {
    constructor(sender,speed, duration) {
        super(sender,speed,duration);
        this.image;
        this.speed = speed;
        this.duration = duration;
    }
    
    show() {
        fill(0,0,0,70);
        rect(this.sender.position.x, this.sender.position.y, 100, 100);
    }
    
    use(b) {
        this.sender.realSpeed = this.speed * 7;
        this.sender.canMove = false;
        this.duration--;
        if(this.duration <= 0) {
            buffs.splice(b,1);
        }
    }
}

class Regenerate extends Buff {
    constructor(sender, hp, duration) {
        super(sender, hp, duration);
        this.image;
        this.heal = 0.02;
    }
    
    show() {
        
    }
    
    use(b) {
        if(this.sender.hp < this.sender.mhp) {
            this.sender.hp += this.heal;
        } 
        
        this.duration--;
        if(this.duration <= 0) {
            buffs.splice(b,1);
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