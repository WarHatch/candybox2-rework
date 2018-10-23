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
var SummoningTribalSpear = /** @class */ (function (_super) {
    __extends(SummoningTribalSpear, _super);
    // Constructor
    function SummoningTribalSpear() {
        var _this = _super.call(this, "eqItemWeaponSummoningTribalSpear", "eqItemWeaponSummoningTribalSpearName", "eqItemWeaponSummoningTribalSpearDescription", "eqItems/weapons/summoningTribalSpear") || this;
        // Time since we last summoned a warrior
        _this.timeSinceSummon = 0;
        return _this;
    }
    // Public getters
    SummoningTribalSpear.prototype.getQuestEntityWeapon = function (quest, player) {
        var qew = new QuestEntityWeapon(quest, player, new Naming("A summoning tribal spear", "a summoning tribal spear"), player.getClassicCollisionBoxCollection(), 10);
        qew.getCloseCombatDelay().setFixedDelay(2);
        return qew;
    };
    // Special ability
    SummoningTribalSpear.prototype.getSpecialAbility = function () {
        return "Frequently summons tribe warriors fighting on your side (summoning tribal spear).";
    };
    // update()
    SummoningTribalSpear.prototype.update = function (player, quest) {
        this.timeSinceSummon += 1;
        if (this.timeSinceSummon > 35) {
            this.summon(player, quest);
        }
    };
    // Private methods
    SummoningTribalSpear.prototype.summon = function (player, quest) {
        // Create the warrior
        var warrior = new PlayerSummonedTribeWarrior(quest, player.getSpellCastingPosition().plus(new Pos(1, -3)));
        // Add the health bar
        warrior.setHealthBar(new QuestEntityHealthBar(warrior, new Pos(4, 1)));
        // Add it to the quest
        quest.addEntity(warrior);
        // Reset the summon time
        this.timeSinceSummon = 0;
    };
    return SummoningTribalSpear;
}(EqItem));
//# sourceMappingURL=SummoningTribalSpear.js.map