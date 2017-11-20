class Message {
    constructor(amount, x, y) {
        this.color;
        this.position = createVector(x, y);
        this.text = amount;
        this.duration = 40;
    }

    show(m) {
        textSize(30);
        fill(this.color);
        text(this.text, this.position.x, this.position.y);
        this.position.y -= 0.52;
        this.duration--
            if (this.duration == 0) {
                messages.splice(m, 1);
            }
    }
}

class RedText extends Message {
    constructor(amount, x, y) {
        super(amount, x, y)
        this.color = "red";
    }

}

class BlueText extends Message {
    constructor(amount, x, y) {
        super(amount, x, y)
        this.color = "blue";
    }
}
