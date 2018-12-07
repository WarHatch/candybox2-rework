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
var Bridge = /** @class */ (function (_super) {
    __extends(Bridge, _super);
    // Constructor
    function Bridge(game) {
        var _this = _super.call(this, game) || this;
        // Resize the quest
        _this.resizeQuest(138, 32);
        // Add collision boxes around
        _this.addPlayerCollisionBoxes(true, false, false, true);
        // Add the player
        _this.getGame().getPlayer().loadCandyBoxCharacter(_this);
        _this.getGame().getPlayer().setGlobalPosition(new Pos(0, 17));
        _this.configPlayerOrClone(_this.getGame().getPlayer());
        _this.addEntity(_this.getGame().getPlayer());
        // Add a wall at the bridge position
        _this.addBridgeFloor();
        // Add the troll
        _this.addTroll();
        // Add the message
        _this.getGame().getQuestLog().addMessage(new QuestLogMessage("You're trying to cross the bridge. A huge troll is blocking your way!"));
        return _this;
    }
    // Public methods
    Bridge.prototype.configPlayerOrClone = function (entity) {
        entity.setQuestEntityMovement(new QuestEntityMovement(new Pos(1, 0)));
        entity.getQuestEntityMovement().setGravity(true);
        entity.getQuestEntityMovement().setWormsLike(true);
    };
    Bridge.prototype.endQuest = function (win) {
        // We add some messages
        if (win) {
            this.getGame().getQuestLog().addMessage(new QuestLogMessage("You managed to cross the bridge!"));
            Saving.saveBool("mainMapDoneBridge", true); // The bridge is done
        }
        else {
            this.getGame().getQuestLog().addMessage(new QuestLogMessage("You didn't manage to cross the bridge."));
        }
        // We call the endQuest method of our mother class
        _super.prototype.endQuest.call(this, win);
    };
    Bridge.prototype.update = function () {
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
        this.getRenderArea().drawArray(Database.getAscii("places/quests/bridge/bridge"), this.getRealQuestPosition().x, this.getRealQuestPosition().y + 17);
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
    Bridge.prototype.addBridgeFloor = function () {
        // Create the wall
        var wall = new Wall(this, new Pos(0, 18));
        // Add boxes
        wall.addBox(new Pos(0, 0), new Pos(138, 2));
        wall.addBox(new Pos(3, 2), new Pos(10, 1));
        wall.addBox(new Pos(6, 3), new Pos(4, 11));
        wall.addBox(new Pos(64, 2), new Pos(10, 1));
        wall.addBox(new Pos(67, 3), new Pos(4, 11));
        wall.addBox(new Pos(126, 2), new Pos(10, 1));
        wall.addBox(new Pos(129, 3), new Pos(4, 11));
        // Add the wall to the quest
        this.addEntity(wall);
    };
    Bridge.prototype.addTroll = function () {
        var troll = new Troll(this, new Pos(100, 8));
        troll.setQuestEntityMovement(new QuestEntityMovement(new Pos(-1, 0), 12));
        troll.setHealthBar(new QuestEntityHealthBar(troll, new Pos(100, 1), new Pos(0, 0), QuestEntityHealthBarPositionType.FIXED_ON_PAGE, true, true, BarType.HEALTH));
        this.addEntity(troll);
    };
    Bridge.prototype.thePlayerWon = function () {
        // If the player is at the right of the desert, we return true
        if (this.getGame().getPlayer().getGlobalPosition().x >= 138)
            return true;
        // Else we return false
        return false;
    };
    return Bridge;
}(Quest));
//# sourceMappingURL=Bridge.js.map