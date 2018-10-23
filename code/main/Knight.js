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
var Knight = /** @class */ (function (_super) {
    __extends(Knight, _super);
    // Constructor
    function Knight(quest, pos) {
        var _this = _super.call(this, quest, pos, new Naming("A knight", "a knight"), new RenderArea(15, 6), new Pos(0, 0), new CollisionBoxCollection(), new QuestEntityMovement(new Pos(0, 0))) || this;
        //breaking change fix
        _this.setCbc(new CollisionBoxCollection(new CollisionBox(_this, new Pos(3, 1), new Pos(1, 1)), new CollisionBox(_this, new Pos(6, 1), new Pos(3, 1)), new CollisionBox(_this, new Pos(0, 2), new Pos(9, 1)), new CollisionBox(_this, new Pos(2, 3), new Pos(13, 1)), new CollisionBox(_this, new Pos(3, 4), new Pos(9, 1)), new CollisionBox(_this, new Pos(4, 5), new Pos(2, 1)), new CollisionBox(_this, new Pos(9, 5), new Pos(2, 1))));
        // Default movement related variables values
        _this.moving = false;
        _this.currentAsciiNumber = 1;
        // Set gravity
        _this.getQuestEntityMovement().setGravity(true);
        // Set destructible
        _this.setDestructible(true);
        _this.setMaxHp(150);
        _this.setHp(150);
        // Set the ascii art and the transparent character
        _this.reDrawAscii();
        _this.setTransparency(new RenderTransparency(" ", "%"));
        // Set the weapon and its delay
        _this.addQuestEntityWeapon(new QuestEntityWeapon(_this.getQuest(), _this, new Naming("A sword", "a sword"), new CollisionBoxCollection(new CollisionBox(_this, new Pos(-1, 0), new Pos(17, 7))), 70));
        _this.getLastQuestEntityWeapon().getCloseCombatDelay().setFixedDelay(8);
        return _this;
    }
    // update()
    Knight.prototype.update = function () {
        // If we're not moving
        if (this.moving == false) {
            // If we're able to move now
            if (this.testNewGlobalPosition(this.getGlobalPosition().plus(new Pos(-3, 0)))) {
                this.moving = true; // We move
                this.getQuestEntityMovement().setOffset(new Pos(-3, 0)); // The movement
            }
        }
        // Else, if we're moving
        else {
            // If we're not able to move anymore
            if (this.testNewGlobalPosition(this.getGlobalPosition().plus(new Pos(-3, 0))) == false) {
                this.moving = false; // We stop moving
                this.getQuestEntityMovement().setOffset(new Pos(0, 0)); // The movement
                this.currentAsciiNumber = 1; // currentAsciiNumber
                this.reDrawAscii();
            }
            // Else we're really moving
            else {
                // Change the currentAsciiNumber
                this.currentAsciiNumber += 1;
                if (this.currentAsciiNumber > 5)
                    this.currentAsciiNumber = 1;
                this.reDrawAscii();
            }
        }
        // Call the mother class update
        _super.prototype.update.call(this);
    };
    // willDie()
    Knight.prototype.willDie = function () {
        this.getQuest().getGame().getQuestLog().addMessage(new QuestLogMessage(this.getDeathMessage() + " (and found " + Algo.pluralFormat(this.getQuest().foundCandies(800 + Random.upTo(15) * 100), " candy", " candies") + ")", this.getQuest().getCandiesFoundMessage()));
        if (Random.oneChanceOutOf(5))
            this.getQuest().foundGridOrEqItem(new QuestItemFound(this.getQuest(), "eqItemBodyArmoursKnightBodyArmour", "You found a body armour on a knight", "You gain a knight body armour"));
    };
    // Private methods
    Knight.prototype.reDrawAscii = function () {
        this.getRenderArea().drawArray(Database.getAscii("places/quests/castleEntrance/knight" + this.currentAsciiNumber.toString()));
    };
    return Knight;
}(QuestEntity));
//# sourceMappingURL=Knight.js.map