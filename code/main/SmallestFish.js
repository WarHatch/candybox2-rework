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
var SmallestFish = /** @class */ (function (_super) {
    __extends(SmallestFish, _super);
    // Constructor
    function SmallestFish(quest, pos) {
        var _this = _super.call(this, quest, pos, new Naming("A very small fish", "a very small fish"), new RenderArea(3, 1), new Pos(0, 0), new CollisionBoxCollection(), new QuestEntityMovement(new Pos(-1, 0))) || this;
        //breaking change fix
        _this.setCbc(new CollisionBoxCollection(new CollisionBox(_this, new Pos(0, 0), new Pos(3, 1))));
        // Set destructible
        _this.setDestructible(true);
        _this.setMaxHp(10);
        _this.setHp(10);
        // Set the ascii art
        _this.getRenderArea().drawArray(Database.getAscii("places/quests/theSea/smallestFish"));
        // Set the weapon and its delay
        _this.addQuestEntityWeapon(new QuestEntityWeapon(_this.getQuest(), _this, new Naming("Its fins", "its fins"), new CollisionBoxCollection(new CollisionBox(_this, new Pos(-1, -1), new Pos(5, 2))), 1));
        _this.getLastQuestEntityWeapon().getCloseCombatDelay().setFixedDelay(6);
        return _this;
    }
    return SmallestFish;
}(QuestEntity));
//# sourceMappingURL=SmallestFish.js.map