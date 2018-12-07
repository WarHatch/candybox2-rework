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
var Scythe = /** @class */ (function (_super) {
    __extends(Scythe, _super);
    // Constructor
    function Scythe() {
        return _super.call(this, "eqItemWeaponScythe", "eqItemWeaponScytheName", "eqItemWeaponScytheDescription", "eqItems/weapons/scythe") || this;
    }
    // Public getters
    Scythe.prototype.getQuestEntityWeapon = function (quest, player) {
        var qew = new QuestEntityWeapon(quest, player, new Naming("A scythe", "a scythe"), player.getClassicCollisionBoxCollection(), 21);
        qew.getCloseCombatDelay().setFixedDelay(0);
        return qew;
    };
    return Scythe;
}(EqItem));
//# sourceMappingURL=Scythe.js.map