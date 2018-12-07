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
var WoodenSword = /** @class */ (function (_super) {
    __extends(WoodenSword, _super);
    // Constructor
    function WoodenSword() {
        return _super.call(this, "eqItemWeaponWoodenSword", "eqItemWeaponWoodenSwordName", "eqItemWeaponWoodenSwordDescription", "eqItems/weapons/woodenSword") || this;
    }
    // Public getters
    WoodenSword.prototype.getQuestEntityWeapon = function (quest, player) {
        var qew = new QuestEntityWeapon(quest, player, new Naming("A wooden sword", "a wooden sword"), player.getClassicCollisionBoxCollection(), 1);
        qew.getCloseCombatDelay().setFixedDelay(4, 0);
        return qew;
    };
    return WoodenSword;
}(EqItem));
//# sourceMappingURL=WoodenSword.js.map