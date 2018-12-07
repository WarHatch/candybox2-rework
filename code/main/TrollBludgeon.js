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
var TrollBludgeon = /** @class */ (function (_super) {
    __extends(TrollBludgeon, _super);
    // Constructor
    function TrollBludgeon() {
        return _super.call(this, "eqItemWeaponTrollBludgeon", "eqItemWeaponTrollBludgeonName", "eqItemWeaponTrollBludgeonDescription", "eqItems/weapons/trollBludgeon") || this;
    }
    // Public getters
    TrollBludgeon.prototype.getQuestEntityWeapon = function (quest, player) {
        var qew = new PlayerBludgeon(quest, player, new Naming("The troll's bludgeon", "the troll's bludgeon"), player.getClassicCollisionBoxCollection());
        qew.getCloseCombatDelay().setFixedDelay(6);
        return qew;
    };
    return TrollBludgeon;
}(EqItem));
//# sourceMappingURL=TrollBludgeon.js.map