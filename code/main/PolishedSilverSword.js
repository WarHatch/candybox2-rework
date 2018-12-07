///<reference path="EqItem.ts"/>
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
var PolishedSilverSword = /** @class */ (function (_super) {
    __extends(PolishedSilverSword, _super);
    // Constructor
    function PolishedSilverSword() {
        return _super.call(this, "eqItemWeaponPolishedSilverSword", "eqItemWeaponPolishedSilverSwordName", "eqItemWeaponPolishedSilverSwordDescription", "eqItems/weapons/polishedSilverSword") || this;
    }
    // Public getters
    PolishedSilverSword.prototype.getQuestEntityWeapon = function (quest, player) {
        var qew = new QuestEntityWeapon(quest, player, new Naming("A polished silver sword", "a polished silver sword"), player.getClassicCollisionBoxCollection(), 7);
        qew.getCloseCombatDelay().setFixedDelay(4, 0);
        return qew;
    };
    return PolishedSilverSword;
}(EqItem));
//# sourceMappingURL=PolishedSilverSword.js.map