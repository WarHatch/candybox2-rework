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
var PlayerCloneCandyBox = /** @class */ (function (_super) {
    __extends(PlayerCloneCandyBox, _super);
    // Constructor
    function PlayerCloneCandyBox(quest, pos) {
        var _this = _super.call(this, quest, pos, new Naming("A clone", "a clone"), new RenderArea(3, 1), new Pos(0, 0), new CollisionBoxCollection(), new QuestEntityMovement()) || this;
        //breaking change fix
        _this.setCbc(new CollisionBoxCollection(new CollisionBox(_this, new Pos(0, 0), new Pos(3, 1))));
        // Set the team
        _this.setTeam(QuestEntityTeam.PLAYER);
        // Set destructible
        _this.setDestructible(true);
        _this.setMaxHp(quest.getGame().getPlayer().getHp());
        _this.setHp(quest.getGame().getPlayer().getHp());
        // Set the ascii art and the transparent character
        _this.getRenderArea().drawString("\\o/");
        // Set the weapon and its delay
        _this.addQuestEntityWeapon(new QuestEntityWeapon(_this.getQuest(), _this, new Naming("Its fists", "its fists"), new CollisionBoxCollection(new CollisionBox(_this, new Pos(-1, -1), new Pos(5, 3))), 3));
        _this.getLastQuestEntityWeapon().getCloseCombatDelay().setFixedDelay(3);
        return _this;
    }
    return PlayerCloneCandyBox;
}(QuestEntity));
//# sourceMappingURL=PlayerCloneCandyBox.js.map