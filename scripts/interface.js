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
        super(x,y);
    }
    
    show() {
        rect(this.position.x, this.position.y, this.width, this.height);
        text("inventory", camX + 200, camY + 300);
        
    }
    
    isClicked() {
        if(mouseX > this.position.x - camX && mouseX < this.position.x - camX + this.width && this.position.y + this.height - camY > mouseY  && this.position.y - camY < mouseY && mouseIsPressed) {
            return true;
            
        }
            
    }
    
}

class ToOptions extends InterfaceButton {
    constructor(x,y) {
        super(x,y);
    }
    
    show() {
        rect(this.position.x, this.position.y, this.width, this.height);
    }
    
    isClicked() {
        if(mouseX > this.position.x - camX && mouseX < this.position.x - camX + this.width && this.position.y + this.height - camY > mouseY  && this.position.y - camY < mouseY && mouseIsPressed) {
            return true;
        }
            
    }
    
}

class ToCharacter extends InterfaceButton {
    constructor(x,y) {
    super(x,y);
    }
    
    show() {
        fill(200, 110, 50, 130);
        rect(this.position.x, this.position.y, this.width, this.height);
        text("character", camX + 400, camY + 300);
    }
    
    isClicked() {
        if(mouseX > this.position.x - camX && mouseX < this.position.x - camX + this.width && this.position.y + this.height - camY > mouseY  && this.position.y - camY < mouseY && mouseIsPressed) {
            return true;
        }
            
    }
    
}