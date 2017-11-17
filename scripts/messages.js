
class Message {
    constructor(amount,x,y) {
        this.color;
        this.position = createVector(x,y);
        this.text = amount;
    }
}

class RedText extends Message {

}

class BlueText extends Message {

}