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
var DesertBird = /** @class */ (function (_super) {
    __extends(DesertBird, _super);
    // Constructor
    function DesertBird(quest, pos, goingRight) {
        var _this = _super.call(this, quest, pos, new Naming("A desert bird", "a desert bird"), new RenderArea(9, 4), new Pos(0, 0), new CollisionBoxCollection()) || this;
        _this.setCbc(new CollisionBoxCollection(new CollisionBox(_this, new Pos(0, 0), new Pos(9, 4))));
        // If we're heading to right
        if (goingRight) {
            _this.setQuestEntityMovement(new QuestEntityMovement(new Pos(1, 0)));
            _this.setQuestEntityAnimation(new QuestEntityAnimation(3, Random.upTo(2), Random.upTo(1), "places/quests/desert/birdRightUp", "places/quests/desert/birdRightDown"));
        }
        // Else
        else {
            _this.setQuestEntityMovement(new QuestEntityMovement(new Pos(-1, 0)));
            _this.setQuestEntityAnimation(new QuestEntityAnimation(3, Random.upTo(2), Random.upTo(1), "places/quests/desert/birdLeftUp", "places/quests/desert/birdLeftDown"));
        }
        // Set destructible
        _this.setDestructible(true);
        _this.setMaxHp(6);
        _this.setHp(6);
        return _this;
    }
    // willDie()
    DesertBird.prototype.willDie = function () {
        _super.prototype.willDie.call(this);
        this.getQuest().foundGridOrEqItem(new QuestItemFound(this.getQuest(), "gridItemPossessedFeather", "You found a desert bird feather!", "You gain a desert bird feather"));
    };
    return DesertBird;
}(QuestEntity));
//# sourceMappingURL=DesertBird.js.map