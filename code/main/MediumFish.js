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
var MediumFish = /** @class */ (function (_super) {
    __extends(MediumFish, _super);
    // Constructor
    function MediumFish(quest, pos) {
        var _this = _super.call(this, quest, pos, new Naming("A fish", "a fish"), new RenderArea(8, 4), new Pos(0, 0), new CollisionBoxCollection(), new QuestEntityMovement(new Pos(-1, 0))) || this;
        //breaking change fix
        _this.setCbc(new CollisionBoxCollection(new CollisionBox(_this, new Pos(1, 1), new Pos(7, 1)), new CollisionBox(_this, new Pos(0, 2), new Pos(8, 1)), new CollisionBox(_this, new Pos(1, 3), new Pos(7, 1))));
        // Set destructible
        _this.setDestructible(true);
        _this.setMaxHp(30);
        _this.setHp(30);
        // Set the ascii art
        _this.getRenderArea().drawArray(Database.getAscii("places/quests/theSea/mediumFish"));
        // Set the transparency
        _this.setTransparency(new RenderTransparency(" ", "%"));
        // Set the weapon and its delay
        _this.addQuestEntityWeapon(new QuestEntityWeapon(_this.getQuest(), _this, new Naming("Its fins", "its fins"), new CollisionBoxCollection(new CollisionBox(_this, new Pos(-1, -1), new Pos(10, 6))), 3));
        _this.getLastQuestEntityWeapon().getCloseCombatDelay().setFixedDelay(4);
        return _this;
    }
    // willDie()
    MediumFish.prototype.willDie = function () {
        this.getQuest().getGame().getQuestLog().addMessage(new QuestLogMessage(this.getDeathMessage() + " (and found " + Algo.pluralFormat(this.getQuest().foundCandies(15), " candy", " candies") + ")", this.getQuest().getCandiesFoundMessage()));
    };
    return MediumFish;
}(QuestEntity));
//# sourceMappingURL=MediumFish.js.map