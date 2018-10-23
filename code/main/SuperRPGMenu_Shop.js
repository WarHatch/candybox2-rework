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
var SuperRPGMenu_Shop = /** @class */ (function (_super) {
    __extends(SuperRPGMenu_Shop, _super);
    // Constructor
    function SuperRPGMenu_Shop(superRPG) {
        return _super.call(this, superRPG, "places/village/thirdHouseGames/SuperRPG/shop", 0) || this;
    }
    // Public methods
    SuperRPGMenu_Shop.prototype.addBuyingDefenseItem = function (defenseItem, defense, price) {
        this.addEntry(new SuperRPGMenuEntry(defenseItem + " (" + price + ")", new CallbackCollection(this.buyDefenseItem.bind(this, defenseItem, defense, price))));
    };
    SuperRPGMenu_Shop.prototype.addBuyingHealthCrystal = function () {
        this.addEntry(new SuperRPGMenuEntry("Health crystal (100)", new CallbackCollection(this.buyHealthCrystal.bind(this))));
    };
    SuperRPGMenu_Shop.prototype.addBuyingHealthPendant = function () {
        this.addEntry(new SuperRPGMenuEntry("Health pendant (30)", new CallbackCollection(this.buyHealthPendant.bind(this))));
    };
    SuperRPGMenu_Shop.prototype.addBuyingHealthPotion = function () {
        this.addEntry(new SuperRPGMenuEntry("Health potion (5)", new CallbackCollection(this.buyHealthPotion.bind(this))));
    };
    SuperRPGMenu_Shop.prototype.addBuyingSuperHealthPotion = function () {
        this.addEntry(new SuperRPGMenuEntry("Health potion ++ (25)", new CallbackCollection(this.buySuperHealthPotion.bind(this))));
    };
    SuperRPGMenu_Shop.prototype.addBuyingWeapon = function (weapon, damage, price) {
        this.addEntry(new SuperRPGMenuEntry(weapon + " (" + price + ")", new CallbackCollection(this.buyWeapon.bind(this, weapon, damage, price))));
    };
    SuperRPGMenu_Shop.prototype.addQuitTheShop = function () {
        this.addEntry(new SuperRPGMenuEntry("Quit the shop", new CallbackCollection(this.getSuperRPG().nextFloorStep.bind(this.getSuperRPG()))));
    };
    // Private methods
    SuperRPGMenu_Shop.prototype.buyDefenseItem = function (defenseItem, defense, price) {
        if (this.getSuperRPG().getCoins() >= price && this.getSuperRPG().getDefense() < defense) {
            this.getSuperRPG().setCoins(this.getSuperRPG().getCoins() - price);
            this.getSuperRPG().setDefenseItem(defenseItem);
            this.getSuperRPG().setDefense(defense);
        }
    };
    SuperRPGMenu_Shop.prototype.buyHealthCrystal = function () {
        if (this.getSuperRPG().getCoins() >= 100) {
            this.getSuperRPG().setCoins(this.getSuperRPG().getCoins() - 100);
            this.getSuperRPG().setMaxHp(this.getSuperRPG().getMaxHp() + 20);
            this.getSuperRPG().setHp(this.getSuperRPG().getHp() + 20);
        }
    };
    SuperRPGMenu_Shop.prototype.buyHealthPendant = function () {
        if (this.getSuperRPG().getCoins() >= 30) {
            this.getSuperRPG().setCoins(this.getSuperRPG().getCoins() - 30);
            this.getSuperRPG().setMaxHp(this.getSuperRPG().getMaxHp() + 5);
            this.getSuperRPG().setHp(this.getSuperRPG().getHp() + 5);
        }
    };
    SuperRPGMenu_Shop.prototype.buyHealthPotion = function () {
        if (this.getSuperRPG().getCoins() >= 5 && this.getSuperRPG().getHp() < this.getSuperRPG().getMaxHp()) {
            this.getSuperRPG().setCoins(this.getSuperRPG().getCoins() - 5);
            this.getSuperRPG().setHp(this.getSuperRPG().getHp() + 8);
        }
    };
    SuperRPGMenu_Shop.prototype.buySuperHealthPotion = function () {
        if (this.getSuperRPG().getCoins() >= 25 && this.getSuperRPG().getHp() < this.getSuperRPG().getMaxHp()) {
            this.getSuperRPG().setCoins(this.getSuperRPG().getCoins() - 25);
            this.getSuperRPG().setHp(this.getSuperRPG().getHp() + 50);
        }
    };
    SuperRPGMenu_Shop.prototype.buyWeapon = function (weapon, damage, price) {
        if (this.getSuperRPG().getCoins() >= price && this.getSuperRPG().getDamage() < damage) {
            this.getSuperRPG().setCoins(this.getSuperRPG().getCoins() - price);
            this.getSuperRPG().setWeapon(weapon);
            this.getSuperRPG().setDamage(damage);
        }
    };
    return SuperRPGMenu_Shop;
}(SuperRPGMenu_Ingame));
//# sourceMappingURL=SuperRPGMenu_Shop.js.map