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
var GiantSpoonOfDoom = /** @class */ (function (_super) {
    __extends(GiantSpoonOfDoom, _super);
    // Constructor
    function GiantSpoonOfDoom() {
        return _super.call(this, "eqItemWeaponGiantSpoonOfDoom", "eqItemWeaponGiantSpoonOfDoomName", "eqItemWeaponGiantSpoonOfDoomDescription", "eqItems/weapons/giantSpoonOfDoom") || this;
    }
    // Public getters
    GiantSpoonOfDoom.prototype.getQuestEntityWeapon = function (quest, player) {
        var qew = new QuestEntityWeapon(quest, player, new Naming("The giant Spoon of Doom", "the giant Spoon of Doom"), player.getClassicCollisionBoxCollection(), 315);
        qew.getCloseCombatDelay().setFixedDelay(14, 0);
        return qew;
    };
    return GiantSpoonOfDoom;
}(EqItem));
//# sourceMappingURL=GiantSpoonOfDoom.js.map