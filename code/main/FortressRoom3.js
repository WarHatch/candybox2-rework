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
Saving.registerBool("fortressRoom3ChestFound", false);
var FortressRoom3 = /** @class */ (function (_super) {
    __extends(FortressRoom3, _super);
    // Constructor
    function FortressRoom3(game) {
        var _this = _super.call(this, game) || this;
        // Did we open the chest?
        _this.chestOpened = false;
        // Resize the quest
        _this.resizeQuest(100, 31);
        // Add collision boxes around
        _this.addPlayerCollisionBoxes(true, true, true, true);
        // Add the player
        _this.getGame().getPlayer().loadCandyBoxCharacter(_this);
        _this.getGame().getPlayer().setGlobalPosition(new Pos(0, 30));
        _this.configPlayerOrClone(_this.getGame().getPlayer());
        _this.addEntity(_this.getGame().getPlayer());
        // Add the ground
        _this.addWalls();
        // Add the chest
        _this.addEntity(new Chest(_this, new Pos(87, 6), false, new CallbackCollection(_this.openChest.bind(_this)), Saving.loadBool("fortressRoom3ChestFound")));
        // Add the message
        _this.getGame().getQuestLog().addMessage(new QuestLogMessage("You enter the third room. There's a chest up there. How to reach it?!"));
        return _this;
    }
    // Public methods
    FortressRoom3.prototype.castPlayerTeleport = function () {
        _super.prototype.castPlayerTeleport.call(this, new Pos(2, 26), new Pos(1, 1));
    };
    FortressRoom3.prototype.configPlayerOrClone = function (entity) {
        entity.setQuestEntityMovement(new QuestEntityMovement(new Pos(1, 0)));
        entity.getQuestEntityMovement().setGravity(true);
        entity.getQuestEntityMovement().setWormsLike(true);
    };
    FortressRoom3.prototype.endQuest = function (win) {
        // We add some messages
        if (win) {
            this.getGame().getQuestLog().addMessage(new QuestLogMessage("You exit the room."));
        }
        // We call the endQuest method of our mother class
        _super.prototype.endQuest.call(this, win);
        // If we won and we opened the chest, we confirm that we found it
        if (win && this.chestOpened) {
            Saving.saveBool("fortressRoom3ChestFound", true);
        }
    };
    FortressRoom3.prototype.update = function () {
        if (this.getQuestEnded() == false) {
            // Test if the player is dead, if so end the quest (he won) and return
            if (this.getGame().getPlayer().shouldDie()) {
                this.endQuest(true); // true because we always win
                return;
            }
            // Update entities
            this.updateEntities();
        }
        // Draw
        this.preDraw();
        this.getRenderArea().drawArray(Database.getAscii("places/quests/fortress/room3"), this.getRealQuestPosition().x, this.getRealQuestPosition().y);
        this.drawEntities();
        this.drawAroundQuest();
        this.addExitQuestButton(new CallbackCollection(this.endQuest.bind(this, true), this.getGame().goToInsideFortress.bind(this.getGame())), "buttonExitQuestKeeping");
        this.postDraw();
    };
    // Private methods
    FortressRoom3.prototype.addWalls = function () {
        // Create the wall entity
        var wall = new Wall(this, new Pos(0, 0));
        // Add the boxes
        wall.addBox(new Pos(0, 0), new Pos(100, 2));
        wall.addBox(new Pos(0, 2), new Pos(16, 23));
        wall.addBox(new Pos(90, 2), new Pos(10, 1));
        wall.addBox(new Pos(91, 3), new Pos(9, 3));
        wall.addBox(new Pos(90, 6), new Pos(10, 1));
        wall.addBox(new Pos(82, 7), new Pos(18, 24));
        wall.addBox(new Pos(0, 31), new Pos(100, 1));
        // Add the wall entity
        this.addEntity(wall);
    };
    FortressRoom3.prototype.openChest = function () {
        this.chestOpened = true;
        this.foundGridOrEqItem(new QuestItemFound(this, "eqItemBootsRocketBoots", "You opened a chest and found rocket boots!", "You gain rocket boots."));
    };
    return FortressRoom3;
}(Quest));
//# sourceMappingURL=FortressRoom3.js.map