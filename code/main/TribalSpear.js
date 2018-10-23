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
var TribalSpear = /** @class */ (function (_super) {
    __extends(TribalSpear, _super);
    // Constructor
    function TribalSpear() {
        return _super.call(this, "eqItemWeaponTribalSpear", "eqItemWeaponTribalSpearName", "eqItemWeaponTribalSpearDescription", "eqItems/weapons/tribalSpear") || this;
    }
    // Public getters
    TribalSpear.prototype.getQuestEntityWeapon = function (quest, player) {
        var qew = new QuestEntityWeapon(quest, player, new Naming("A tribal spear", "a tribal spear"), player.getClassicCollisionBoxCollection(), 8);
        qew.getCloseCombatDelay().setFixedDelay(2);
        return qew;
    };
    return TribalSpear;
}(EqItem));
//# sourceMappingURL=TribalSpear.js.map