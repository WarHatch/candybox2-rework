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
var JellyFish = /** @class */ (function (_super) {
    __extends(JellyFish, _super);
    // Constructor
    function JellyFish(quest, pos) {
        var _this = _super.call(this, quest, pos, new Naming("A jellyfish", "a jellyfish"), new RenderArea(6, 5), new Pos(0, 0), new CollisionBoxCollection(), new QuestEntityMovement(new Pos(-1, 0))) || this;
        //breaking change fix
        _this.setCbc(new CollisionBoxCollection(new CollisionBox(_this, new Pos(0, 1), new Pos(6, 1)), new CollisionBox(_this, new Pos(1, 2), new Pos(4, 1)), new CollisionBox(_this, new Pos(0, 3), new Pos(4, 1)), new CollisionBox(_this, new Pos(1, 4), new Pos(4, 1))));
        // Set destructible
        _this.setDestructible(true);
        _this.setMaxHp(42);
        _this.setHp(42);
        // Set the ascii art
        _this.getRenderArea().drawArray(Database.getAscii("places/quests/theSea/jellyFish"));
        // Set the transparency
        _this.setTransparency(new RenderTransparency(" ", "%"));
        // Set the weapon and its delay
        _this.addQuestEntityWeapon(new QuestEntityWeapon(_this.getQuest(), _this, new Naming("Poisoned tentacles", "poisoned tentacles"), new CollisionBoxCollection(new CollisionBox(_this, new Pos(-1, -1), new Pos(8, 7))), 2));
        _this.getLastQuestEntityWeapon().getCloseCombatDelay().setFixedDelay(0);
        return _this;
    }
    // Public methods
    JellyFish.prototype.update = function () {
        // We follow the player
        this.goTowards(this.getRenderAreaCenter(), this.getQuest().getGame().getPlayer().getRenderAreaCenter(), 3);
        // We call the mother update method
        _super.prototype.update.call(this);
    };
    // willDie()
    JellyFish.prototype.willDie = function () {
        this.getQuest().getGame().getQuestLog().addMessage(new QuestLogMessage(this.getDeathMessage() + " (and found " + Algo.pluralFormat(this.getQuest().foundCandies(120), " candy", " candies") + ")", this.getQuest().getCandiesFoundMessage()));
    };
    return JellyFish;
}(QuestEntity));
//# sourceMappingURL=JellyFish.js.map