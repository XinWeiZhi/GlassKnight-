class InterfaceButton {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.width = 220;
        this.height = 50;
        this.image;
    }

    show() {
        
        rect(this.position.x, this.position.y, this.width, this.height);
    }

    isClicked() {
        if (mouseX > this.position.x - camX && mouseX < this.position.x - camX + this.width && this.position.y + this.height - camY > mouseY && this.position.y - camY < mouseY && mouseIsPressed) {
            return true;
        }

    }

}

class ToInventory extends InterfaceButton {
    constructor(x, y) {
        super(x, y);
    }

    show() {
        fill("green")
        this.position.x = camX + 455;
        this.position.y = camY + 100;
        rect(this.position.x, this.position.y, this.width, this.height);
        text("inventory", this.position.x, this.position.y);

    }

}

//consumables are potions, dmg, or utility
//consumables: # of = 10

//likely remove hp and mana regen, increase maximum
//hp potion restocks at checkpoints
//mana hp potion restocks at checkpoints, 
//oracles ability to see enemies in fog of war
//refillable hp+mana potion on kills
//berserking potion increased damage reduction and damage and speed over a short time
//control totem - summon a guy that will attack for you for 60 seconds, depends on which summon you chose 
//elixir of corruption - lose hp and mana over time but gain lifesteal and dps aura around you
//aoe damage - hawk strike, use the spear of paladins to hurl at multiple enemies on screen
//single damage - throwing knives, spears, swords all do damage based on what it is, stacks up to 10


//inventory weapon armor consumables
//each char has 3 weapons avail
//weapon stats:
//atkspd, dmg, range, onhits, crit

//each char has 3 armors avail
//armor stats:
//health, armor, magic resist, speed, tenacity, 



//inventory space is 5 slots for items + consumables
//usual build is hp , refill, berserking, elixir of corruption, totem


class ToOptions extends InterfaceButton {
    constructor(x, y) {
        super(x, y);
    }
    
    show() {
        this.position.x = camX + 745;
        this.position.y = camY + 100;
        fill("red")
        rect(this.position.x, this.position.y, this.width, this.height);
        text("options", this.position.x, this.position.y);
    }

}

//level up bonus stats + perk
//damage, spelldamage, hp, mana, tenacity, armor, 
//tenacity will be a stat that once it hits zero will stagger you
//- will be calculated based on vanillachar level + equipment * bonuses(buffs)

//7 heroes 1 will betray
//perk tree will work individually for heroes, but level will be for all
//messiah run will have everyone level 6
//domination run will have the mc level 14 (kills all 7), final boss as well

//so depending on hero 15 perks
// 2 x 3 x 2 keystones
//also can level up stats

//redo button

//offensive, defense, utility
//stats, specific bonuses to skills or events


class ToCharacter extends InterfaceButton {
    constructor(x, y) {
        super(x, y);
    }
    show() {
        this.position = createVector(camX + 165, camY + 100);
        fill("orange")
        rect(this.position.x, this.position.y, this.width, this.height);
        text("character", this.position.x, this.position.y);
    }

}

class CloseTab extends InterfaceButton {
    constructor(x, y) {
        super(x, y);
        this.width = this.height;
    }
    show() {
        this.position = createVector(camX + 1000, camY + 100);
        fill("red")
        rect(this.position.x, this.position.y, this.width, this.height);
    }
}