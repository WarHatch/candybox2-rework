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
var PlayerCloneMedium = /** @class */ (function (_super) {
    __extends(PlayerCloneMedium, _super);
    // Constructor
    function PlayerCloneMedium(quest, pos) {
        var _this = _super.call(this, quest, pos, new Naming("A clone", "a clone"), new RenderArea(11, 4), new Pos(0, 0), new CollisionBoxCollection(), new QuestEntityMovement()) || this;
        //breaking change fix
        _this.setCbc(new CollisionBoxCollection(new CollisionBox(_this, new Pos(0, 0), new Pos(11, 1)), new CollisionBox(_this, new Pos(1, 1), new Pos(9, 1)), new CollisionBox(_this, new Pos(2, 2), new Pos(7, 1)), new CollisionBox(_this, new Pos(4, 3), new Pos(3, 1))));
        // Set the team
        _this.setTeam(QuestEntityTeam.PLAYER);
        // Set destructible
        _this.setDestructible(true);
        _this.setMaxHp(quest.getGame().getPlayer().getHp());
        _this.setHp(quest.getGame().getPlayer().getHp());
        // Set the ascii art and the transparent character
        _this.getRenderArea().drawArray(Database.getAscii("players/medium"));
        _this.setTransparency(new RenderTransparency(" ", "%"));
        // Set the weapon and its delay
        _this.addQuestEntityWeapon(new QuestEntityWeapon(_this.getQuest(), _this, new Naming("Its fists", "its fists"), new CollisionBoxCollection(new CollisionBox(_this, new Pos(-1, -1), new Pos(13, 6))), 3));
        _this.getLastQuestEntityWeapon().getCloseCombatDelay().setFixedDelay(3);
        return _this;
    }
    return PlayerCloneMedium;
}(QuestEntity));
//# sourceMappingURL=PlayerCloneMedium.js.map