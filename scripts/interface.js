class InterfaceButton {
    constructor(x,y) {
            this.position = createVector(x,y);
        this.width = 100;
        this.height = 100;
        this.image;
    }
    
    show() {
        rect(this.position.x, this.position.y, this.width, this.height);
    }
    
    isClicked() {
        if(mouseX > this.position.x && mouseX < this.position.x + this.width && this.position.y + this.height > mouseY && this.position.y < mouseY) {
            return true;
        }
            
    }
    
}

class ToInventory extends InterfaceButton {
    constructor(x,y) {
            this.position = createVector(x,y);
        this.width = 100;
        this.height = 100;
    }
    
    show() {
        rect(this.position.x, this.position.y, this.width, this.height);
    }
    
    isClicked() {
        if(mouseX > this.position.x && mouseX < this.position.x + this.width && this.position.y + this.height > mouseY && this.position.y < mouseY) {
            return true;
        }
            
    }
    
}

class ToOptions extends InterfaceButton {
    constructor(x,y) {
            this.position = createVector(x,y);
        this.width = 100;
        this.height = 100;
    }
    
    show() {
        rect(this.position.x, this.position.y, this.width, this.height);
    }
    
    isClicked() {
        if(mouseX > this.position.x && mouseX < this.position.x + this.width && this.position.y + this.height > mouseY && this.position.y < mouseY) {
            return true;
        }
            
    }
    
}

class ToCharacter extends InterfaceButton {
    constructor(x,y) {
            this.position = createVector(x,y);
        this.width = 100;
        this.height = 100;
    }
    
    show() {
        rect(this.position.x, this.position.y, this.width, this.height);
    }
    
    isClicked() {
        if(mouseX > this.position.x && mouseX < this.position.x + this.width && this.position.y + this.height > mouseY && this.position.y < mouseY) {
            return true;
        }
            
    }
    
}