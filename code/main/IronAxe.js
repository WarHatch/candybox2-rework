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
var IronAxe = /** @class */ (function (_super) {
    __extends(IronAxe, _super);
    // Constructor
    function IronAxe() {
        return _super.call(this, "eqItemWeaponIronAxe", "eqItemWeaponIronAxeName", "eqItemWeaponIronAxeDescription", "eqItems/weapons/ironAxe") || this;
    }
    // Public getters
    IronAxe.prototype.getQuestEntityWeapon = function (quest, player) {
        var qew = new QuestEntityWeapon(quest, player, new Naming("An iron axe", "an iron axe"), player.getClassicCollisionBoxCollection(), 3);
        qew.getCloseCombatDelay().setFixedDelay(3, 0);
        return qew;
    };
    return IronAxe;
}(EqItem));
//# sourceMappingURL=IronAxe.js.map