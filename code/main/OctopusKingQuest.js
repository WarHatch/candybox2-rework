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
var OctopusKingQuest = /** @class */ (function (_super) {
    __extends(OctopusKingQuest, _super);
    // Constructor
    function OctopusKingQuest(game) {
        var _this = _super.call(this, game) || this;
        // Resize the quest
        _this.resizeQuest(100, 20);
        // Add collision boxes around
        _this.addPlayerCollisionBoxes(true, true, true, true);
        // Add the player
        _this.getGame().getPlayer().loadCandyBoxCharacter(_this);
        _this.getGame().getPlayer().setGlobalPosition(new Pos(0, 17));
        _this.configPlayerOrClone(_this.getGame().getPlayer());
        _this.addEntity(_this.getGame().getPlayer());
        // Add the roof and the floor
        _this.addRoofAndFloor();
        // Add the monkey wizard
        _this.addOctopusKing(new Pos(88, 16));
        // Add the message
        _this.getGame().getQuestLog().addMessage(new QuestLogMessage("You challenged the Octopus King. Let the fight begin!"));
        return _this;
    }
    // Public methods
    OctopusKingQuest.prototype.configPlayerOrClone = function (entity) {
        entity.setQuestEntityMovement(new QuestEntityMovement(new Pos(1, 0)));
        entity.getQuestEntityMovement().setGravity(true);
        entity.getQuestEntityMovement().setWormsLike(true);
    };
    OctopusKingQuest.prototype.endQuest = function (win) {
        // We add some messages
        if (win) {
            this.getGame().getQuestLog().addMessage(new QuestLogMessage("You continue to explore the cave."));
        }
        // We call the endQuest method of our mother class
        _super.prototype.endQuest.call(this, win);
    };
    OctopusKingQuest.prototype.update = function () {
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
        this.getRenderArea().drawArray(Database.getAscii("places/quests/octopusKing/roof"), this.getRealQuestPosition().x, this.getRealQuestPosition().y);
        this.drawEntities();
        this.drawAroundQuest();
        this.addExitQuestButton(new CallbackCollection(this.endQuest.bind(this, true), this.getGame().goToTheCave.bind(this.getGame())), "buttonExitQuestKeeping");
        this.postDraw();
    };
    // Private methods
    OctopusKingQuest.prototype.addOctopusKing = function (pos) {
        var king = new OctopusKing(this, pos);
        king.setHealthBar(new QuestEntityHealthBar(king, new Pos(100, 1), new Pos(0, 5), QuestEntityHealthBarPositionType.FIXED, false, true, BarType.HEALTH));
        this.addEntity(king);
    };
    OctopusKingQuest.prototype.addRoofAndFloor = function () {
        // Create the wall entity
        var wall = new Wall(this, new Pos(0, 0));
        // Add the roof
        wall.addBox(new Pos(0, 0), new Pos(100, 2));
        wall.addBox(new Pos(0, 2), new Pos(7, 1));
        wall.addBox(new Pos(18, 2), new Pos(50, 1));
        wall.addBox(new Pos(71, 2), new Pos(29, 1));
        wall.addBox(new Pos(0, 3), new Pos(2, 1));
        wall.addBox(new Pos(24, 3), new Pos(21, 1));
        wall.addBox(new Pos(83, 3), new Pos(17, 1));
        wall.addBox(new Pos(0, 4), new Pos(1, 1));
        wall.addBox(new Pos(99, 4), new Pos(1, 1));
        // Add the floor
        wall.addBox(new Pos(-20, 20), new Pos(120, 1));
        // Add the wall entity
        this.addEntity(wall);
    };
    return OctopusKingQuest;
}(Quest));
//# sourceMappingURL=OctopusKingQuest.js.map