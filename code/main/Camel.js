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
var Camel = /** @class */ (function (_super) {
    __extends(Camel, _super);
    // Constructor
    function Camel(quest, pos) {
        var _this = _super.call(this, quest, pos, new Naming("A camel", "a camel"), new RenderArea(7, 2), new Pos(0, 0), new CollisionBoxCollection(), new QuestEntityMovement()) || this;
        //Breaking change fix
        _this.setCbc(new CollisionBoxCollection(new CollisionBox(_this, new Pos(0, 0), new Pos(6, 1)), new CollisionBox(_this, new Pos(2, 1), new Pos(5, 1))));
        // Set gravity
        _this.getQuestEntityMovement().setGravity(true);
        // Set destructible
        _this.setDestructible(true);
        _this.setMaxHp(7);
        _this.setHp(7);
        // Set the ascii art and the transparent character
        _this.getRenderArea().drawArray(Database.getAscii("places/quests/desert/camel"));
        _this.setTransparency(new RenderTransparency(" "));
        // Set the weapon and its delay
        _this.addQuestEntityWeapon(new QuestEntityWeapon(_this.getQuest(), _this, new Naming("Its long neck", "its long neck"), new CollisionBoxCollection(new CollisionBox(_this, new Pos(-1, 0), new Pos(3, 3))), 5));
        _this.getLastQuestEntityWeapon().getCloseCombatDelay().setBetweenDelay(5, 7);
        return _this;
    }
    // Public methods
    Camel.prototype.willDie = function () {
        this.getQuest().getGame().getQuestLog().addMessage(new QuestLogMessage(this.getDeathMessage() + " (and found " + Algo.pluralFormat(this.getQuest().foundCandies(5 + Random.upTo(5)), " candy", " candies") + ")", this.getQuest().getCandiesFoundMessage()));
    };
    return Camel;
}(QuestEntity));
//# sourceMappingURL=Camel.js.map