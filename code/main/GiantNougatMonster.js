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
var GiantNougatMonster = /** @class */ (function (_super) {
    __extends(GiantNougatMonster, _super);
    // Constructor
    function GiantNougatMonster(quest, pos) {
        var _this = _super.call(this, quest, pos, new Naming("The giant nougat monster", "the giant nougat monster"), new RenderArea(15, 4), new Pos(0, 0), new CollisionBoxCollection(), new QuestEntityMovement()) || this;
        //breaking change fix
        _this.setCbc(new CollisionBoxCollection(new CollisionBox(_this, new Pos(1, 0), new Pos(12, 1)), new CollisionBox(_this, new Pos(0, 1), new Pos(15, 2)), new CollisionBox(_this, new Pos(1, 3), new Pos(12, 1))));
        // Set the default step
        _this.step = GiantNougatMonsterStep.ASLEEP;
        // Set gravity
        _this.getQuestEntityMovement().setGravity(true);
        // Set destructible
        _this.setDestructible(true);
        _this.setMaxHp(2000);
        _this.setHp(2000);
        // Set the ascii art and the transparent character
        _this.reDrawAscii();
        _this.setTransparency(new RenderTransparency(" ", "%"));
        return _this;
    }
    // update()
    GiantNougatMonster.prototype.update = function () {
        // Do something different depending on the current step
        switch (this.step) {
            case GiantNougatMonsterStep.ASLEEP:
                // If we have less then 1577 hp (1577 was the number of bytes of the wikipedia article "Nougat" on the fifth of november, 2005 according to the article revision history. See here : https://en.wikipedia.org/w/index.php?title=Nougat&oldid=27465563)
                if (this.getHp() < 1577) {
                    // We go to awake mode
                    this.step = GiantNougatMonsterStep.AWAKE;
                    this.reDrawAscii(); // Re draw the ascii art
                    this.addWeapon(); // Add the weapon
                }
                break;
            case GiantNougatMonsterStep.AWAKE:
                // If we have less than 500 hp
                if (this.getHp() < 500) {
                    // We go to angry mode
                    this.step = GiantNougatMonsterStep.ANGRY;
                    this.reDrawAscii(); // Re draw the ascii art
                }
                // Go towards the player (speed : 1)
                this.goTowards(this.getGlobalPosition().plus(new Pos(6, 2)), this.getQuest().getGame().getPlayer().getGlobalPosition().plus(new Pos(1, 0)), 0, new Pos(1, 0));
                break;
            case GiantNougatMonsterStep.ANGRY:
                // Go towards the player (speed : 3)
                this.goTowards(this.getGlobalPosition().plus(new Pos(6, 2)), this.getQuest().getGame().getPlayer().getGlobalPosition().plus(new Pos(1, 0)), 0, new Pos(3, 0));
                break;
        }
        // Call the mother class update method
        _super.prototype.update.call(this);
    };
    // willDie()
    GiantNougatMonster.prototype.willDie = function () {
        this.getQuest().getGame().getQuestLog().addMessage(new QuestLogMessage(this.getDeathMessage() + " (and found " + Algo.pluralFormat(this.getQuest().foundCandies(Random.upTo(123456)), " candy", " candies") + ")", this.getQuest().getCandiesFoundMessage()));
    };
    // Private methods
    GiantNougatMonster.prototype.addWeapon = function () {
        this.addQuestEntityWeapon(new QuestEntityWeapon(this.getQuest(), this, new Naming("Nougat", "nougat"), new CollisionBoxCollection(new CollisionBox(this, new Pos(-1, -1), new Pos(17, 6))), 3000));
        this.getLastQuestEntityWeapon().getCloseCombatDelay().setBetweenDelay(20, 40);
    };
    GiantNougatMonster.prototype.reDrawAscii = function () {
        // Draw a different ascii art depending on the step
        switch (this.step) {
            case GiantNougatMonsterStep.ASLEEP:
                this.getRenderArea().drawArray(Database.getAscii("places/quests/giantNougatMonster/monster"));
                break;
            case GiantNougatMonsterStep.AWAKE:
                this.getRenderArea().drawArray(Database.getAscii("places/quests/giantNougatMonster/monsterAwake"));
                break;
            case GiantNougatMonsterStep.ANGRY:
                this.getRenderArea().drawArray(Database.getAscii("places/quests/giantNougatMonster/monsterAngry"));
                break;
        }
    };
    return GiantNougatMonster;
}(QuestEntity));
//# sourceMappingURL=GiantNougatMonster.js.map