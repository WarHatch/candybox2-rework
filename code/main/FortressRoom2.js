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
var FortressRoom2 = /** @class */ (function (_super) {
    __extends(FortressRoom2, _super);
    // Constructor
    function FortressRoom2(game) {
        var _this = _super.call(this, game) || this;
        // Resize the quest
        _this.resizeQuest(100, 17);
        // Add collision boxes around
        _this.addPlayerCollisionBoxes(true, true, true, true);
        // Add the player
        _this.getGame().getPlayer().loadCandyBoxCharacter(_this);
        _this.getGame().getPlayer().setGlobalPosition(new Pos(0, 13));
        _this.configPlayerOrClone(_this.getGame().getPlayer());
        _this.addEntity(_this.getGame().getPlayer());
        // Add the ground
        _this.addWalls();
        // Add the chest
        _this.addTeapot();
        // Add the message
        _this.getGame().getQuestLog().addMessage(new QuestLogMessage("You enter the second room. There's a giant teapot in the center."));
        return _this;
    }
    // Public methods
    FortressRoom2.prototype.configPlayerOrClone = function (entity) {
        entity.setQuestEntityMovement(new QuestEntityMovement(new Pos(1, 0)));
        entity.getQuestEntityMovement().setGravity(true);
        entity.getQuestEntityMovement().setWormsLike(true);
    };
    FortressRoom2.prototype.endQuest = function (win) {
        // We add some messages
        if (win) {
            this.getGame().getQuestLog().addMessage(new QuestLogMessage("You exit the room."));
        }
        // We call the endQuest method of our mother class
        _super.prototype.endQuest.call(this, win);
    };
    FortressRoom2.prototype.update = function () {
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
        this.getRenderArea().drawArray(Database.getAscii("places/quests/fortress/room2"), this.getRealQuestPosition().x, this.getRealQuestPosition().y);
        this.drawEntities();
        this.drawAroundQuest();
        this.addExitQuestButton(new CallbackCollection(this.endQuest.bind(this, true), this.getGame().goToInsideFortress.bind(this.getGame())), "buttonExitQuestKeeping");
        this.postDraw();
    };
    // Private methods
    FortressRoom2.prototype.addWalls = function () {
        // Create the wall entity
        var wall = new Wall(this, new Pos(0, 0));
        // Add the boxes
        wall.addBox(new Pos(0, 0), new Pos(100, 4));
        wall.addBox(new Pos(96, 4), new Pos(4, 1));
        wall.addBox(new Pos(97, 5), new Pos(3, 8));
        wall.addBox(new Pos(96, 13), new Pos(4, 1));
        wall.addBox(new Pos(0, 14), new Pos(20, 1));
        wall.addBox(new Pos(79, 14), new Pos(21, 1));
        wall.addBox(new Pos(0, 15), new Pos(37, 1));
        wall.addBox(new Pos(59, 15), new Pos(41, 1));
        wall.addBox(new Pos(0, 16), new Pos(100, 1));
        // Add the wall entity
        this.addEntity(wall);
    };
    FortressRoom2.prototype.addTeapot = function () {
        var teapot = new Teapot(this, new Pos(39, 9));
        teapot.setHealthBar(new QuestEntityHealthBar(teapot, new Pos(96, 1), new Pos(0, 5), QuestEntityHealthBarPositionType.FIXED_ON_PAGE, false, true, BarType.HEALTH));
        this.addEntity(teapot);
    };
    return FortressRoom2;
}(Quest));
//# sourceMappingURL=FortressRoom2.js.map