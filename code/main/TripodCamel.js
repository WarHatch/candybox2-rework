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
var TripodCamel = /** @class */ (function (_super) {
    __extends(TripodCamel, _super);
    // Constructor
    function TripodCamel(quest, pos) {
        var _this = _super.call(this, quest, pos, new Naming("A tripod camel", "a tripod camel"), new RenderArea(7, 2), new Pos(0, 0), new CollisionBoxCollection(), new QuestEntityMovement()) || this;
        //breaking change fix
        _this.setCbc(new CollisionBoxCollection(new CollisionBox(_this, new Pos(0, 0), new Pos(6, 1)), new CollisionBox(_this, new Pos(2, 1), new Pos(5, 1))));
        // Set gravity
        _this.getQuestEntityMovement().setGravity(true);
        // Set destructible
        _this.setDestructible(true);
        _this.setMaxHp(7);
        _this.setHp(7);
        // Set the ascii art and the transparent character
        if (Random.flipACoin())
            _this.getRenderArea().drawArray(Database.getAscii("places/quests/desert/tripodCamel1"));
        else
            _this.getRenderArea().drawArray(Database.getAscii("places/quests/desert/tripodCamel2"));
        _this.setTransparency(new RenderTransparency(" "));
        // Set the weapon and its delay
        _this.addQuestEntityWeapon(new QuestEntityWeapon(_this.getQuest(), _this, new Naming("Its long neck", "its long neck"), new CollisionBoxCollection(new CollisionBox(_this, new Pos(-1, 0), new Pos(3, 3))), 5));
        _this.getLastQuestEntityWeapon().getCloseCombatDelay().setBetweenDelay(6, 8);
        return _this;
    }
    // Public methods
    TripodCamel.prototype.willDie = function () {
        this.getQuest().getGame().getQuestLog().addMessage(new QuestLogMessage(this.getDeathMessage() + " (and found " + Algo.pluralFormat(this.getQuest().foundCandies(20 + Random.upTo(12)), " candy", " candies") + ")", this.getQuest().getCandiesFoundMessage()));
    };
    return TripodCamel;
}(QuestEntity));
//# sourceMappingURL=TripodCamel.js.map