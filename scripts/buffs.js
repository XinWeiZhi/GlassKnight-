class Buff {
    constructor(sender, stat, duration) {
        this.sender = sender;
        this.image;
        this.duration = duration;
        this.type = "buff";
    }

    show() {

    }

    use(b) {

    }
}

class Dash extends Buff {
    constructor(sender, speed, duration) {
        super(sender, speed, duration);
        this.image;
        this.speed = speed;
    }

    show() {
        fill(0, 0, 0, 70);
        rect(this.sender.position.x, this.sender.position.y, 100, 100);
    }

    use(b) {
        this.sender.canMove = false;
        this.sender.realSpeed = (this.sender.characterSpeed - this.sender.armor.speedDebuff) * 6;
        this.sender.updateStats()
        this.duration--;
        if (this.duration <= 0) {
            buffs.splice(b, 1);
        }
    }
}

class Regenerate extends Buff {
    constructor(sender, duration) {
        super(sender, duration);
        this.image;
        this.heal = 0.05;
        this.duration = duration;
    }

    show() {

    }

    use(b) {
        if (this.sender.hp < this.sender.mhp) {
            this.sender.hp += this.heal;
        }

        this.duration--;
        console.log(this.duration);
        if (this.duration <= 0) {
            buffs.splice(b, 1);
        }

    }
}

class EmptySpell {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.type = null;
        this.width = 60;
        this.type = "buff"
    }

    show() {
        rect(this.position.x, this.position.y, this.width, this.width);
    }

    make() {
        console.log("assign a spell to this slot");
    }
}
