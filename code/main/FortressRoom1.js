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
Saving.registerBool("fortressRoom1ChestFound", false);
var FortressRoom1 = /** @class */ (function (_super) {
    __extends(FortressRoom1, _super);
    // Constructor
    function FortressRoom1(game) {
        var _this = _super.call(this, game) || this;
        // Did we open the chest?
        _this.chestOpened = false;
        // Resize the quest
        _this.resizeQuest(208, 31);
        // Add collision boxes around
        _this.addPlayerCollisionBoxes(true, true, true, true);
        // Add the player
        _this.getGame().getPlayer().loadCandyBoxCharacter(_this);
        _this.getGame().getPlayer().setGlobalPosition(new Pos(0, 7));
        _this.configPlayerOrClone(_this.getGame().getPlayer());
        _this.addEntity(_this.getGame().getPlayer());
        // Add the walls
        _this.addWalls();
        // Add the spikes
        _this.addSpikes(new Spikes(_this, new Pos(16, 30), 18));
        _this.addSpikes(new Spikes(_this, new Pos(43, 30), 4));
        _this.addSpikes(new Spikes(_this, new Pos(53, 30), 4));
        _this.addSpikes(new Spikes(_this, new Pos(85, 30), 4));
        _this.addSpikes(new Spikes(_this, new Pos(161, 30), 12));
        _this.addSpikes(new Spikes(_this, new Pos(180, 30), 4));
        _this.addSpikes(new Spikes(_this, new Pos(117, 9), 4));
        _this.addSpikes(new Spikes(_this, new Pos(121, 14), 4));
        _this.addSpikes(new Spikes(_this, new Pos(125, 19), 4));
        _this.addSpikes(new Spikes(_this, new Pos(129, 24), 4));
        // Add the xinopherydon
        _this.addXinopherydon(new Pos(181, 2));
        // Add the chest
        _this.addEntity(new Chest(_this, new Pos(203, 24), false, new CallbackCollection(_this.openChest.bind(_this)), Saving.loadBool("fortressRoom1ChestFound")));
        // Add the message
        _this.getGame().getQuestLog().addMessage(new QuestLogMessage("You enter the first room. It seems tricky."));
        return _this;
    }
    // Public methods
    FortressRoom1.prototype.castPlayerTeleport = function () {
        _super.prototype.castPlayerTeleport.call(this, new Pos(2, 3), new Pos(1, 1));
    };
    FortressRoom1.prototype.configPlayerOrClone = function (entity) {
        entity.setQuestEntityMovement(new QuestEntityMovement(new Pos(1, 0)));
        entity.getQuestEntityMovement().setGravity(true);
        entity.getQuestEntityMovement().setWormsLike(true);
    };
    FortressRoom1.prototype.endQuest = function (win) {
        // We add some messages
        if (win) {
            this.getGame().getQuestLog().addMessage(new QuestLogMessage("You exit the room."));
        }
        // We call the endQuest method of our mother class
        _super.prototype.endQuest.call(this, win);
        // If we won and we opened the chest, we confirm that we found it
        if (win && this.chestOpened) {
            Saving.saveBool("fortressRoom1ChestFound", true);
        }
    };
    FortressRoom1.prototype.update = function () {
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
        this.getRenderArea().drawArray(Database.getAscii("places/quests/fortress/room1"), this.getRealQuestPosition().x, this.getRealQuestPosition().y);
        this.drawEntities();
        this.drawAroundQuest();
        this.addExitQuestButton(new CallbackCollection(this.endQuest.bind(this, true), this.getGame().goToInsideFortress.bind(this.getGame())), "buttonExitQuestKeeping");
        this.postDraw();
    };
    // Private methods
    FortressRoom1.prototype.addSpikes = function (spikes) {
        this.addEntity(spikes);
    };
    FortressRoom1.prototype.addWalls = function () {
        // Create the wall entity
        var wall = new Wall(this, new Pos(0, 0));
        // Add the boxes
        wall.addBox(new Pos(0, 0), new Pos(208, 2));
        wall.addBox(new Pos(0, 8), new Pos(15, 1));
        wall.addBox(new Pos(0, 9), new Pos(16, 22));
        wall.addBox(new Pos(34, 2), new Pos(5, 11));
        wall.addBox(new Pos(34, 15), new Pos(9, 16));
        wall.addBox(new Pos(47, 13), new Pos(6, 18));
        wall.addBox(new Pos(57, 11), new Pos(6, 20));
        wall.addBox(new Pos(63, 19), new Pos(22, 12));
        wall.addBox(new Pos(66, 11), new Pos(4, 7));
        wall.addBox(new Pos(74, 11), new Pos(3, 7));
        wall.addBox(new Pos(80, 11), new Pos(5, 7));
        wall.addBox(new Pos(89, 10), new Pos(14, 5));
        wall.addBox(new Pos(89, 15), new Pos(20, 5));
        wall.addBox(new Pos(89, 20), new Pos(26, 5));
        wall.addBox(new Pos(89, 25), new Pos(72, 6));
        wall.addBox(new Pos(106, 10), new Pos(37, 2));
        wall.addBox(new Pos(112, 15), new Pos(31, 2));
        wall.addBox(new Pos(118, 20), new Pos(25, 2));
        wall.addBox(new Pos(200, 2), new Pos(8, 1));
        wall.addBox(new Pos(201, 3), new Pos(7, 4));
        wall.addBox(new Pos(200, 7), new Pos(8, 1));
        wall.addBox(new Pos(157, 8), new Pos(51, 10));
        wall.addBox(new Pos(157, 18), new Pos(25, 1));
        wall.addBox(new Pos(157, 19), new Pos(24, 1));
        wall.addBox(new Pos(157, 20), new Pos(23, 1));
        wall.addBox(new Pos(157, 21), new Pos(22, 1));
        wall.addBox(new Pos(173, 25), new Pos(7, 6));
        wall.addBox(new Pos(184, 23), new Pos(3, 2));
        wall.addBox(new Pos(207, 18), new Pos(1, 6));
        wall.addBox(new Pos(206, 24), new Pos(2, 1));
        wall.addBox(new Pos(184, 25), new Pos(24, 6));
        // Add the wall entity
        this.addEntity(wall);
    };
    FortressRoom1.prototype.addXinopherydon = function (pos) {
        var xino = new Xinopherydon(this, pos);
        xino.setHealthBar(new QuestEntityHealthBar(xino, new Pos(41, 1), new Pos(158, 2), QuestEntityHealthBarPositionType.FIXED, false, true, BarType.HEALTH));
        this.addEntity(xino);
    };
    FortressRoom1.prototype.openChest = function () {
        this.chestOpened = true;
        this.foundGridOrEqItem(new QuestItemFound(this, "gridItemPossessedUnicornHorn", "You opened a chest and found a unicorn horn!", "You gain a unicorn horn."));
    };
    return FortressRoom1;
}(Quest));
//# sourceMappingURL=FortressRoom1.js.map