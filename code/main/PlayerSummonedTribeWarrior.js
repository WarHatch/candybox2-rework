///<reference path="QuestEntity.ts"/>
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
var PlayerSummonedTribeWarrior = /** @class */ (function (_super) {
    __extends(PlayerSummonedTribeWarrior, _super);
    // Constructor
    function PlayerSummonedTribeWarrior(quest, pos) {
        var _this = _super.call(this, quest, pos, new Naming("A tribe warrior", "a tribe warrior"), new RenderArea(4, 4), new Pos(0, 0), new CollisionBoxCollection(), new QuestEntityMovement()) || this;
        //breaking change fix
        _this.setCbc(new CollisionBoxCollection(new CollisionBox(_this, new Pos(0, 0), new Pos(1, 1)), new CollisionBox(_this, new Pos(0, 1), new Pos(4, 3))));
        // Set gravity and worms like
        _this.setQuestEntityMovement(new QuestEntityMovement(new Pos(1, 0)));
        _this.getQuestEntityMovement().setGravity(true);
        _this.getQuestEntityMovement().setWormsLike(true);
        // Set destructible
        _this.setDestructible(true);
        _this.setMaxHp(25);
        _this.setHp(25);
        // Set the team
        _this.setTeam(QuestEntityTeam.PLAYER);
        // Set the ascii art and the transparent character
        _this.getRenderArea().drawArray(Database.getAscii("places/quests/theHole/lostTribeWarrior"));
        _this.setTransparency(new RenderTransparency(" "));
        // Set the weapon and its delay
        _this.addQuestEntityWeapon(new QuestEntityWeapon(_this.getQuest(), _this, new Naming("A tribal spear", "a tribal spear"), new CollisionBoxCollection(new CollisionBox(_this, new Pos(-1, -1), new Pos(6, 6))), 8));
        _this.getLastQuestEntityWeapon().getCloseCombatDelay().setFixedDelay(2);
        return _this;
    }
    // update()
    PlayerSummonedTribeWarrior.prototype.update = function () {
        _super.prototype.update.call(this);
    };
    return PlayerSummonedTribeWarrior;
}(QuestEntity));
//# sourceMappingURL=PlayerSummonedTribeWarrior.js.map