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
var DeveloperEntity = /** @class */ (function (_super) {
    __extends(DeveloperEntity, _super);
    // Constructor
    function DeveloperEntity(quest, pos) {
        var _this = _super.call(this, quest, pos, new Naming("The developer", "the developer"), new RenderArea(43, 34), new Pos(0, 0), new CollisionBoxCollection(), new QuestEntityMovement()) || this;
        //breaking change fix
        _this.setCbc(new CollisionBoxCollection(new CollisionBox(_this, new Pos(20, 0), new Pos(6, 1)), new CollisionBox(_this, new Pos(16, 1), new Pos(12, 1)), new CollisionBox(_this, new Pos(15, 2), new Pos(14, 1)), new CollisionBox(_this, new Pos(12, 3), new Pos(18, 1)), new CollisionBox(_this, new Pos(11, 4), new Pos(20, 1)), new CollisionBox(_this, new Pos(10, 5), new Pos(22, 1)), new CollisionBox(_this, new Pos(9, 6), new Pos(24, 2)), new CollisionBox(_this, new Pos(9, 8), new Pos(25, 1)), new CollisionBox(_this, new Pos(9, 9), new Pos(26, 2)), new CollisionBox(_this, new Pos(9, 11), new Pos(27, 3)), new CollisionBox(_this, new Pos(9, 14), new Pos(28, 1)), new CollisionBox(_this, new Pos(8, 15), new Pos(29, 3)), new CollisionBox(_this, new Pos(7, 18), new Pos(30, 4)), new CollisionBox(_this, new Pos(7, 22), new Pos(31, 2)), new CollisionBox(_this, new Pos(6, 24), new Pos(32, 4)), new CollisionBox(_this, new Pos(5, 28), new Pos(33, 1)), new CollisionBox(_this, new Pos(5, 29), new Pos(34, 1)), new CollisionBox(_this, new Pos(4, 30), new Pos(35, 1)), new CollisionBox(_this, new Pos(2, 31), new Pos(38, 1)), new CollisionBox(_this, new Pos(1, 32), new Pos(40, 1)), new CollisionBox(_this, new Pos(0, 33), new Pos(43, 1))));
        // Init the time spent
        _this.timeSpent = 0;
        // Create the texts
        _this.createTexts();
        // Set gravity
        _this.getQuestEntityMovement().setGravity(false);
        // Set destructible
        _this.setDestructible(true);
        _this.setMaxHp(1000000000);
        _this.setHp(1000000000);
        // Set the ascii art and the transparent character
        _this.getRenderArea().drawArray(Database.getAscii("places/quests/developer/me"));
        _this.setTransparency(new RenderTransparency(" "));
        return _this;
    }
    // inflictDamage()
    DeveloperEntity.prototype.inflictDamage = function (damage, reason) {
        _super.prototype.inflictDamage.call(this, damage * Random.between(60000, 70000), reason);
    };
    // update()
    DeveloperEntity.prototype.update = function () {
        // Increase the time spent
        this.timeSpent += 1;
        // Increase the current text index, depending on the time spent
        if (this.timeSpent == 95 || this.timeSpent == 245)
            this.indexOfCurrentText += 1;
        // Call the current text update method
        this.texts[this.indexOfCurrentText].update(this);
        // Call the mother class update method
        _super.prototype.update.call(this);
    };
    // willDie()
    DeveloperEntity.prototype.willDie = function () {
        this.getQuest().getGame().getQuestLog().addMessage(new QuestLogMessage(this.getDeathMessage() + " (and found " + Algo.pluralFormat(this.getQuest().foundCandies(6000000), " candy", " candies") + ")", this.getQuest().getCandiesFoundMessage()));
        this.getQuest().foundGridOrEqItem(new QuestItemFound(this.getQuest(), "gridItemPossessedY", "You found a strange stone.", "You gain a strange stone."));
    };
    // Public methods
    DeveloperEntity.prototype.addMagicBall = function (finalPosition, damage, timeToLive, colorType) {
        // Set the first position (either the mouth or one of the eyes)
        var firstPosition;
        switch (Random.upTo(2)) {
            case 0:
                firstPosition = new Pos(15, 15);
                break;
            case 1:
                firstPosition = new Pos(25, 15);
                break;
            case 2:
                firstPosition = new Pos(20, 26);
                break;
        }
        // Create the fireball
        var magicBall = new DeveloperMagicBall(this.getQuest(), this.getGlobalPosition().plus(firstPosition), new Naming("A magic ball", "a magic ball"), new Color(colorType), new Pos(2, 1), damage, this.getAndPossiblyCreateSpellCastingDamageReason(new Naming("A magic ball", "a magic ball")), timeToLive);
        // No target
        magicBall.setTargetTypeTargetPosition(finalPosition, new Pos(1, 1));
        // Add the entity
        this.getQuest().addEntity(magicBall);
    };
    DeveloperEntity.prototype.createTexts = function () {
        // Empty the array
        this.texts = [];
        // At first we're working on the first text
        this.indexOfCurrentText = 0;
        // Add "Hello"
        this.texts.push(new DeveloperEntityText(20, new Pos(3, 3), 110, Database.getAscii("places/quests/developer/hello")));
        // Add "I'm glad you made it so far"
        this.texts.push(new DeveloperEntityText(32, new Pos(3, 3), 150, Database.getAscii("places/quests/developer/imgladyoumadeitsofar")));
        // Add "<3"
        this.texts.push(new DeveloperEntityText(9999999999999, new Pos(8, 10), 100, Database.getAscii("places/quests/developer/love")));
    };
    DeveloperEntity.prototype.playerUsedBlackMagic = function () {
        // We use a blackhole on the player
        this.getQuest().addEntity(new Blackhole(this.getQuest(), this.getQuest().getGame().getPlayer().getRenderAreaCenter(), 5000, new QuestEntityDamageReason(QuestEntityDamageReasonWhoType.ENTITY, QuestEntityDamageReasonWhatType.SPELL).setQuestEntity(this).setSpellNaming(new Naming("A blackhole", "a blackhole"))));
    };
    return DeveloperEntity;
}(QuestEntity));
//# sourceMappingURL=DeveloperEntity.js.map