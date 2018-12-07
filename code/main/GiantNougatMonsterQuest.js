///<reference path="Quest.ts"/>
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
var GiantNougatMonsterQuest = /** @class */ (function (_super) {
    __extends(GiantNougatMonsterQuest, _super);
    // Constructor
    function GiantNougatMonsterQuest(game) {
        var _this = _super.call(this, game) || this;
        // Resize the quest
        _this.resizeQuest(100, 20);
        // Add collision boxes around
        _this.addPlayerCollisionBoxes(true, true, true, true);
        // Add the player
        _this.getGame().getPlayer().loadCandyBoxCharacter(_this);
        _this.getGame().getPlayer().setGlobalPosition(new Pos(0, 19));
        _this.configPlayerOrClone(_this.getGame().getPlayer());
        _this.addEntity(_this.getGame().getPlayer());
        // Add the walls
        _this.addWalls();
        // Add the monster
        _this.addMonster();
        // Add the message
        _this.getGame().getQuestLog().addMessage(new QuestLogMessage("You attack the giant nougat monster. It seems to be asleep."));
        return _this;
    }
    // Public methods
    GiantNougatMonsterQuest.prototype.configPlayerOrClone = function (entity) {
        entity.setQuestEntityMovement(new QuestEntityMovement(new Pos(1, 0)));
        entity.getQuestEntityMovement().setGravity(true);
        entity.getQuestEntityMovement().setWormsLike(true);
    };
    GiantNougatMonsterQuest.prototype.endQuest = function (win) {
        // We add some messages
        if (win) {
            this.getGame().getQuestLog().addMessage(new QuestLogMessage("You killed the giant nougat monster and gained access to the tower!"));
            Saving.saveBool("castleKilledNougatMonster", true);
        }
        else
            this.getGame().getQuestLog().addMessage(new QuestLogMessage("You failed."));
        // We call the endQuest method of our mother class
        _super.prototype.endQuest.call(this, win);
    };
    GiantNougatMonsterQuest.prototype.update = function () {
        if (this.getQuestEnded() == false) {
            // Test if the player won the quest, if so, end the quest and return
            if (this.thePlayerWon()) {
                this.endQuest(true);
                return;
            }
            // Test if the player is dead, if so, end the quest and return
            if (this.getGame().getPlayer().shouldDie()) {
                this.endQuest(false);
                return;
            }
            // Update entities
            this.updateEntities();
        }
        // Draw
        this.preDraw();
        this.drawEntities();
        this.drawAroundQuest();
        if (this.getQuestEnded() == false)
            this.addExitQuestButton(new CallbackCollection(this.getGame().goToMainMap.bind(this.getGame())), "buttonExitQuestNoKeeping");
        else if (this.getQuestEndedAndWeWon() == false)
            this.addExitQuestButton(new CallbackCollection(this.getGame().goToMainMap.bind(this.getGame())), "buttonExitQuestNoKeepingBecauseLose");
        else
            this.addExitQuestButton(new CallbackCollection(this.getGame().goToMainMap.bind(this.getGame())), "buttonExitQuestKeeping");
        this.postDraw();
    };
    // Private methods
    GiantNougatMonsterQuest.prototype.addMonster = function () {
        this.giantNougatMonster = new GiantNougatMonster(this, new Pos(78, 16));
        this.giantNougatMonster.setHealthBar(new QuestEntityHealthBar(this.giantNougatMonster, new Pos(100, 1), new Pos(0, 0), QuestEntityHealthBarPositionType.FIXED_ON_PAGE, true, true, BarType.HEALTH));
        this.addEntity(this.giantNougatMonster);
    };
    GiantNougatMonsterQuest.prototype.addWalls = function () {
        // Create the wall entity
        var wall = new Wall(this, new Pos(-20, 20));
        // Add the boxes
        wall.addBox(new Pos(0, 0), new Pos(140, 1));
        // Add the wall entity
        this.addEntity(wall);
    };
    GiantNougatMonsterQuest.prototype.thePlayerWon = function () {
        if (this.giantNougatMonster.shouldDie())
            return true;
        return false;
    };
    return GiantNougatMonsterQuest;
}(Quest));
//# sourceMappingURL=GiantNougatMonsterQuest.js.map