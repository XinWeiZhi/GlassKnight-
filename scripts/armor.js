class Armor {
    constructor(equipper) {

        this.hp = 0;
        this.armor = 0;
        this.magicResistance = 0;
        this.damageResistance = 0;
        this.tenacity = 0;
        this.speedDebuff = 0;
    }
}

class Chainmail extends Armor {
    constructor(equipper) {
        super(equipper);
        this.hp = 10;
        this.armor = 10;
        this.magicResistance = 10;
        this.damageResistance = 20;
        this.tenacity = 50;
        this.speedDebuff = 5;
    }
}

class IronMaiden extends Armor {
    constructor(equipper) {
        super(equipper);
        this.hp = 70;
        this.armor = 90;
        this.magicResistance = 40;
        this.damageResistance = 20;
        this.tenacity = 1000;
        this.speedDebuff = 8;
    }
}

class AssassinCloak extends Armor {
    constructor(equipper) {
        super(equipper);
        this.hp = 0;
        this.armor = 10;
        this.magicResistance = 10;
        this.damageResistance = 20;
        this.tenacity = 0;
        this.speedDebuff = -3;
    }
}

class DragonHeart extends Armor {
    constructor(equipper) {
        super(equipper);
        this.hp = 10;
        this.armor = 10;
        this.magicResistance = 10;
        this.damageResistance = 20;
        this.tenacity = 50;
        this.speedDebuff = 5;
    }
}

class LeatherProtector extends Armor {
     constructor(equipper) {
        super(equipper);
        this.hp = 5;
        this.armor = 10;
        this.magicResistance = 10;
        this.damageResistance = 20;
        this.tenacity = 50;
        this.speedDebuff = 1;
    }
    
}

class Cloth extends Armor {
     constructor(equipper) {
        super(equipper);
        this.hp = 5;
        this.armor = 10;
        this.magicResistance = 10;
        this.damageResistance = 20;
        this.tenacity = 50;
        this.speedDebuff = 1;
    }
    
}