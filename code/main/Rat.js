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
var Rat = /** @class */ (function (_super) {
    __extends(Rat, _super);
    // Constructor
    function Rat(quest, pos) {
        var _this = _super.call(this, quest, pos, new Naming("A rat", "a rat"), new RenderArea(3, 1), new Pos(0, 0), new CollisionBoxCollection(), new QuestEntityMovement()) || this;
        //breaking change fix
        _this.setCbc(new CollisionBoxCollection(new CollisionBox(_this, new Pos(0, 0), new Pos(3, 1))));
        // Set gravity
        _this.getQuestEntityMovement().setGravity(true);
        // Set destructible
        _this.setDestructible(true);
        _this.setMaxHp(3);
        _this.setHp(3);
        // Set the ascii art
        _this.getRenderArea().drawArray(Database.getAscii("places/quests/cellar/rat"));
        // Set the weapon and its delay
        _this.addQuestEntityWeapon(new QuestEntityWeapon(_this.getQuest(), _this, new Naming("Its teeth", "its teeth"), new CollisionBoxCollection(new CollisionBox(_this, new Pos(-1, -1), new Pos(5, 2))), 1));
        _this.getLastQuestEntityWeapon().getCloseCombatDelay().setFixedDelay(3);
        return _this;
    }
    // Public methods
    Rat.prototype.willDie = function () {
        // We find a candy
        if (Random.oneChanceOutOf(3))
            this.getQuest().getGame().getQuestLog().addMessage(new QuestLogMessage(this.getDeathMessage() + " (and found " + Algo.pluralFormat(this.getQuest().foundCandies(1), " candy", " candies") + ")", this.getQuest().getCandiesFoundMessage()));
        // We don't find a candy
        else
            this.getQuest().getGame().getQuestLog().addMessage(new QuestLogMessage(this.getDeathMessage()));
    };
    return Rat;
}(QuestEntity));
//# sourceMappingURL=Rat.js.map