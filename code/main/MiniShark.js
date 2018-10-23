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
var MiniShark = /** @class */ (function (_super) {
    __extends(MiniShark, _super);
    // Constructor
    function MiniShark(quest, pos) {
        var _this = _super.call(this, quest, pos, new Naming("A dangerous fish", "a dangerous fish"), new RenderArea(19, 5), new Pos(0, 0), new CollisionBoxCollection(), new QuestEntityMovement(new Pos(-1, 0))) || this;
        //breaking change fix
        _this.setCbc(new CollisionBoxCollection(new CollisionBox(_this, new Pos(8, 1), new Pos(2, 1)), new CollisionBox(_this, new Pos(17, 1), new Pos(2, 1)), new CollisionBox(_this, new Pos(5, 2), new Pos(14, 1)), new CollisionBox(_this, new Pos(2, 3), new Pos(17, 1)), new CollisionBox(_this, new Pos(0, 4), new Pos(12, 1)), new CollisionBox(_this, new Pos(18, 4), new Pos(1, 1))));
        // Set destructible
        _this.setDestructible(true);
        _this.setMaxHp(70);
        _this.setHp(70);
        // Set the ascii art
        _this.getRenderArea().drawArray(Database.getAscii("places/quests/theSea/miniShark"));
        // Set the transparency
        _this.setTransparency(new RenderTransparency(" ", "%"));
        // Set the weapon and its delay
        _this.addQuestEntityWeapon(new QuestEntityWeapon(_this.getQuest(), _this, new Naming("Its teeth", "its teeth"), new CollisionBoxCollection(new CollisionBox(_this, new Pos(-1, -1), new Pos(21, 7))), 8));
        _this.getLastQuestEntityWeapon().getCloseCombatDelay().setFixedDelay(2);
        return _this;
    }
    // willDie()
    MiniShark.prototype.willDie = function () {
        this.getQuest().getGame().getQuestLog().addMessage(new QuestLogMessage(this.getDeathMessage() + " (and found " + Algo.pluralFormat(this.getQuest().foundCandies(50 + 10 * Random.upTo(5)), " candy", " candies") + ")", this.getQuest().getCandiesFoundMessage()));
    };
    return MiniShark;
}(QuestEntity));
//# sourceMappingURL=MiniShark.js.map