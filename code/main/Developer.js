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
var Developer = /** @class */ (function (_super) {
    __extends(Developer, _super);
    // Constructor
    function Developer(game) {
        var _this = _super.call(this, game) || this;
        // Resize the quest
        _this.resizeQuest(100, 34);
        // Add collision boxes around
        _this.addPlayerCollisionBoxes(true, true, true, true);
        // Add the player
        _this.getGame().getPlayer().loadCandyBoxCharacter(_this);
        _this.getGame().getPlayer().setGlobalPosition(new Pos(0, 33));
        _this.configPlayerOrClone(_this.getGame().getPlayer());
        _this.addEntity(_this.getGame().getPlayer());
        // Add the developer entity
        _this.addDeveloperEntity(new Pos(57, 0));
        // Add the message
        _this.getGame().getQuestLog().addMessage(new QuestLogMessage("You're attacking the developer."));
        return _this;
    }
    // Public methods
    Developer.prototype.castPlayerBlackDemons = function () {
        _super.prototype.castPlayerBlackDemons.call(this);
        this.developerEntity.playerUsedBlackMagic();
    };
    Developer.prototype.castPlayerBlackhole = function () {
        _super.prototype.castPlayerBlackhole.call(this);
        this.developerEntity.playerUsedBlackMagic();
    };
    Developer.prototype.castPlayerEraseMagic = function () {
        _super.prototype.castPlayerEraseMagic.call(this);
        this.developerEntity.playerUsedBlackMagic();
    };
    Developer.prototype.castPlayerObsidianWall = function () {
        _super.prototype.castPlayerObsidianWall.call(this);
        this.developerEntity.playerUsedBlackMagic();
    };
    Developer.prototype.configPlayerOrClone = function (entity) {
        entity.setQuestEntityMovement(new QuestEntityMovement(new Pos(1, 0)));
        entity.getQuestEntityMovement().setGravity(true);
        entity.getQuestEntityMovement().setWormsLike(true);
    };
    Developer.prototype.endQuest = function (win) {
        // We add some messages
        if (win) {
            this.getGame().getQuestLog().addMessage(new QuestLogMessage("You managed to beat me. Congratulations :)"));
        }
        else {
            this.getGame().getQuestLog().addMessage(new QuestLogMessage("You died fighting the developer. Eh, he made this game after all!"));
        }
        // We call the endQuest method of our mother class
        _super.prototype.endQuest.call(this, win);
    };
    Developer.prototype.update = function () {
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
    Developer.prototype.addDeveloperEntity = function (pos) {
        this.developerEntity = new DeveloperEntity(this, pos);
        this.developerEntity.setHealthBar(new QuestEntityHealthBar(this.developerEntity, new Pos(100, 1), new Pos(0, 0), QuestEntityHealthBarPositionType.FIXED_ON_PAGE, true, true, BarType.HEALTH));
        this.addEntity(this.developerEntity);
    };
    Developer.prototype.thePlayerWon = function () {
        // If the developer is dead, we return true
        if (this.developerEntity.shouldDie())
            return true;
        // Else we return false
        return false;
    };
    return Developer;
}(Quest));
//# sourceMappingURL=Developer.js.map