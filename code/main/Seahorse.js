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
var Seahorse = /** @class */ (function (_super) {
    __extends(Seahorse, _super);
    // Constructor
    function Seahorse(quest, pos, intendedXPosition) {
        var _this = _super.call(this, quest, pos, new Naming("A magical seahorse", "a magical seahorse"), new RenderArea(4, 4), new Pos(0, 0), new CollisionBoxCollection(), new QuestEntityMovement(new Pos(-1, 0))) || this;
        //breaking change fix
        _this.setCbc(new CollisionBoxCollection(new CollisionBox(_this, new Pos(0, 0), new Pos(3, 1)), new CollisionBox(_this, new Pos(1, 1), new Pos(3, 1)), new CollisionBox(_this, new Pos(2, 2), new Pos(1, 1)), new CollisionBox(_this, new Pos(2, 3), new Pos(1, 1))));
        // Set the intended x position
        _this.intendedXPosition = intendedXPosition;
        // Set destructible
        _this.setDestructible(true);
        _this.setMaxHp(20);
        _this.setHp(20);
        // Set the ascii art
        _this.getRenderArea().drawArray(Database.getAscii("places/quests/theSea/seahorse"));
        // Set the transparency
        _this.setTransparency(new RenderTransparency(" "));
        // Add a spell caster
        _this.addQuestEntitySpellCaster(new QuestEntitySpellCaster(new CallbackCollection(_this.castWaterBall.bind(_this))));
        _this.getLastQuestEntitySpellCaster().getDelay().setFixedDelay(30, Random.upTo(30));
        return _this;
    }
    // Public methods
    Seahorse.prototype.tryToGoToIntendedXPosition = function (baseX) {
        this.goTowards(this.getGlobalPosition(), new Pos(baseX + this.intendedXPosition, this.getGlobalPosition().y), 0, new Pos(1, 0));
    };
    // Private methods
    Seahorse.prototype.castWaterBall = function () {
        // Create the waterBall
        var waterBall = new Fireball(this.getQuest(), this.getGlobalPosition().plus(new Pos(-2, 0)), new Naming("A magical water ball", "a magical water ball"), new Color(ColorType.SEAHORSE_WATER_BALL), new Pos(2, 1), 70, this.getAndPossiblyCreateSpellCastingDamageReason(new Naming("A magical water ball", "a magical water ball")));
        // No target
        waterBall.setTargetTypeNoTarget(new Pos(-2, 0));
        // Add the entity
        this.getQuest().addEntity(waterBall);
    };
    // willDie()
    Seahorse.prototype.willDie = function () {
        this.getQuest().getGame().getQuestLog().addMessage(new QuestLogMessage(this.getDeathMessage() + " (and found " + Algo.pluralFormat(this.getQuest().foundCandies(150), " candy", " candies") + ")", this.getQuest().getCandiesFoundMessage()));
    };
    return Seahorse;
}(QuestEntity));
//# sourceMappingURL=Seahorse.js.map