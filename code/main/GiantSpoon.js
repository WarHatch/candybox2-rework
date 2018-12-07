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
var GiantSpoon = /** @class */ (function (_super) {
    __extends(GiantSpoon, _super);
    // Constructor
    function GiantSpoon() {
        return _super.call(this, "eqItemWeaponGiantSpoon", "eqItemWeaponGiantSpoonName", "eqItemWeaponGiantSpoonDescription", "eqItems/weapons/giantSpoon") || this;
    }
    // Public getters
    GiantSpoon.prototype.getQuestEntityWeapon = function (quest, player) {
        var qew = new QuestEntityWeapon(quest, player, new Naming("A giant spoon", "a giant spoon"), player.getClassicCollisionBoxCollection(), 70);
        qew.getCloseCombatDelay().setFixedDelay(7, 0);
        return qew;
    };
    return GiantSpoon;
}(EqItem));
//# sourceMappingURL=GiantSpoon.js.map