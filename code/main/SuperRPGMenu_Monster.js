///<reference path="SuperRPGMenu_Ingame.ts"/>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SuperRPGMenu_Monster = /** @class */ (function (_super) {
    __extends(SuperRPGMenu_Monster, _super);
    // Constructor
    function SuperRPGMenu_Monster(superRPG) {
        return _super.call(this, superRPG, "", 0) || this;
    }
    // Public methods
    SuperRPGMenu_Monster.prototype.addUsualEntries = function () {
        this.addEntry(new SuperRPGMenuEntry("Attack", new CallbackCollection(this.playerAttacks.bind(this))));
    };
    SuperRPGMenu_Monster.prototype.draw = function (renderArea) {
        // Draw the monster damage
        renderArea.drawString("ATK " + this.damage, 0, 11);
        // Draw the monster defense
        renderArea.drawString("DEF " + this.defense, 7, 11);
        // Draw the monster hp and max hp
        renderArea.drawString("HP " + this.hp + "/" + this.maxHp, 14, 11);
        // Call the mother class draw method
        _super.prototype.draw.call(this, renderArea);
    };
    SuperRPGMenu_Monster.prototype.setAbstract = function (atk, def, coins, hp) {
        this.setMonster("places/village/thirdHouseGames/SuperRPG/" + Random.fromArray(["cross", "mobius", "triforce", "randomShape", "circle", "dna", "hive", "star"]), atk, def, coins, hp);
    };
    SuperRPGMenu_Monster.prototype.setBabyVampire = function () {
        this.setMonster("places/village/thirdHouseGames/SuperRPG/babyVampire", 10, 2, 8, 30);
    };
    SuperRPGMenu_Monster.prototype.setBlob = function () {
        this.setMonster("places/village/thirdHouseGames/SuperRPG/blob", Random.between(1, 3), 0, Random.between(5, 8), 3);
    };
    SuperRPGMenu_Monster.prototype.setBomb = function () {
        this.setMonster("places/village/thirdHouseGames/SuperRPG/bomb", 99, 0, 0, 12);
    };
    SuperRPGMenu_Monster.prototype.setChest = function (coins) {
        this.setMonster("places/village/thirdHouseGames/SuperRPG/chest", 0, 0, coins, 10);
    };
    SuperRPGMenu_Monster.prototype.setCorpse1 = function () {
        this.setMonster("places/village/thirdHouseGames/SuperRPG/corpse1", 0, 0, (Random.flipACoin() ? 0 : Random.between(1, 300)), 0);
    };
    SuperRPGMenu_Monster.prototype.setCorpse2 = function () {
        this.setMonster("places/village/thirdHouseGames/SuperRPG/corpse2", 0, 0, (Random.flipACoin() ? 0 : Random.between(1, 300)), 0);
    };
    SuperRPGMenu_Monster.prototype.setDragon = function () {
        this.setMonster("places/village/thirdHouseGames/SuperRPG/dragon", Random.between(28, 32), Random.between(7, 9), 1000, Random.fromArray([45, 50, 55]));
    };
    SuperRPGMenu_Monster.prototype.setFerociousBlob = function () {
        this.setMonster("places/village/thirdHouseGames/SuperRPG/ferociousBlob", Random.between(2, 4), 0, Random.between(7, 10), 2);
    };
    SuperRPGMenu_Monster.prototype.setFerociousGoblin = function () {
        this.setMonster("places/village/thirdHouseGames/SuperRPG/ferociousGoblin", 5, 3, 20, 5);
    };
    SuperRPGMenu_Monster.prototype.setFerociousSkeleton = function () {
        this.setMonster("places/village/thirdHouseGames/SuperRPG/ferociousSkeleton", 8, 1, 40, 10);
    };
    SuperRPGMenu_Monster.prototype.setGoblin = function () {
        this.setMonster("places/village/thirdHouseGames/SuperRPG/goblin", 4, 1, 15, 5);
    };
    SuperRPGMenu_Monster.prototype.setSkeletonOrBillGatesSkeleton = function () {
        // Bill gates skeleton
        if (Random.oneChanceOutOf(10))
            this.setMonster("places/village/thirdHouseGames/SuperRPG/billGatesSkeleton", 6, 1, 50, 7);
        // Normal skeleton
        else
            this.setMonster("places/village/thirdHouseGames/SuperRPG/skeleton", 6, 1, 25, 7);
    };
    SuperRPGMenu_Monster.prototype.setSpider = function () {
        this.setMonster("places/village/thirdHouseGames/SuperRPG/spider", 10, 5, Random.between(100, 200), 25);
    };
    SuperRPGMenu_Monster.prototype.setSpiders = function () {
        this.setMonster("places/village/thirdHouseGames/SuperRPG/spiders", 9, 2, 9, 15);
    };
    SuperRPGMenu_Monster.prototype.setThing = function () {
        switch (Random.between(0, 2)) {
            case 0:
                this.setMonster("places/village/thirdHouseGames/SuperRPG/thing", 20, 3, 120, 10);
                break;
            case 1:
                this.setMonster("places/village/thirdHouseGames/SuperRPG/thing", 12, 6, 120, 30);
                break;
            case 2:
                this.setMonster("places/village/thirdHouseGames/SuperRPG/thing", 14, 4, 120, 20);
                break;
        }
    };
    // Private methods
    SuperRPGMenu_Monster.prototype.playerAttacks = function () {
        // Variable used for damage calculation
        var damage;
        // We lose hp
        damage = this.getSuperRPG().getDamage() - this.defense;
        if (damage > 0) {
            this.hp -= damage;
            // If we have 0 or less hp, we get the coins, go to the next floor step and return
            if (this.hp <= 0) {
                this.getSuperRPG().setCoins(this.getSuperRPG().getCoins() + this.coins);
                this.getSuperRPG().nextFloorStep();
                return;
            }
        }
        // We didn't return : it means we're still alive : we counter attack
        damage = this.damage - this.getSuperRPG().getDefense();
        if (damage > 0) {
            this.getSuperRPG().setHp(this.getSuperRPG().getHp() - damage);
        }
    };
    SuperRPGMenu_Monster.prototype.setMonster = function (asciiName, damage, defense, coins, hp, maxHp) {
        if (maxHp === void 0) { maxHp = null; }
        // Set from the parameters
        this.setAsciiName(asciiName);
        this.damage = (this.getSuperRPG().getHardmode() ? Math.floor(damage * 1.2) : damage);
        this.defense = (this.getSuperRPG().getHardmode() ? Math.floor(defense * 1.2) : defense);
        this.coins = (this.getSuperRPG().getHardmode() ? Math.ceil(coins * 0.8) : coins);
        this.hp = (this.getSuperRPG().getHardmode() ? Math.floor(hp * 1.2) : hp);
        if (maxHp == null)
            this.maxHp = this.hp;
        else
            this.maxHp = (this.getSuperRPG().getHardmode() ? Math.floor(maxHp * 1.2) : maxHp);
    };
    return SuperRPGMenu_Monster;
}(SuperRPGMenu_Ingame));
//# sourceMappingURL=SuperRPGMenu_Monster.js.map