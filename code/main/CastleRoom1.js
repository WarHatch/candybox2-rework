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
var CastleRoom1 = /** @class */ (function (_super) {
    __extends(CastleRoom1, _super);
    // Constructor
    function CastleRoom1(game) {
        var _this = _super.call(this, game) || this;
        // Resize the quest
        _this.resizeQuest(100, 30);
        // Add collision boxes around
        _this.addPlayerCollisionBoxes(true, true, true, true);
        // Add the player
        _this.getGame().getPlayer().loadCandyBoxCharacter(_this);
        _this.getGame().getPlayer().setGlobalPosition(new Pos(97, 10));
        _this.configPlayerOrClone(_this.getGame().getPlayer());
        _this.addEntity(_this.getGame().getPlayer());
        // Add the walls
        _this.addWalls();
        // Add the spikes
        _this.addEntity(new Spikes(_this, new Pos(7, 23), 88));
        // Add the message
        _this.getGame().getQuestLog().addMessage(new QuestLogMessage("You enter one of the castle's room. Damn, it seems to be full of spikes!"));
        return _this;
    }
    // Public methods
    CastleRoom1.prototype.castPlayerTeleport = function () {
        _super.prototype.castPlayerTeleport.call(this, new Pos(96, 6), new Pos(2, 3));
    };
    CastleRoom1.prototype.configPlayerOrClone = function (entity) {
        entity.setQuestEntityMovement(new QuestEntityMovement(new Pos(-1, 0)));
        entity.getQuestEntityMovement().setGravity(true);
        entity.getQuestEntityMovement().setWormsLike(true);
    };
    CastleRoom1.prototype.endQuest = function (win) {
        // We add some messages
        if (win) {
            this.getGame().getQuestLog().addMessage(new QuestLogMessage("You exit the room."));
        }
        // We call the endQuest method of our mother class
        _super.prototype.endQuest.call(this, win);
    };
    CastleRoom1.prototype.update = function () {
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
        this.getRenderArea().drawArray(Database.getAscii("places/quests/castle/room1/background"), this.getRealQuestPosition().x, this.getRealQuestPosition().y);
        this.drawEntities();
        this.drawAroundQuest();
        this.addExitQuestButton(new CallbackCollection(this.endQuest.bind(this, true), this.getGame().goToCastle.bind(this.getGame())), "buttonExitQuestKeeping");
        this.postDraw();
    };
    // Private methods
    CastleRoom1.prototype.addWalls = function () {
        // Create the wall entity
        var wall = new Wall(this, new Pos(0, 0));
        // Add the boxes
        wall.addBox(new Pos(0, 0), new Pos(100, 3));
        wall.addBox(new Pos(0, 3), new Pos(7, 25));
        wall.addBox(new Pos(7, 24), new Pos(93, 4));
        wall.addBox(new Pos(95, 3), new Pos(5, 5));
        wall.addBox(new Pos(95, 11), new Pos(5, 16));
        // Add the wall entity
        this.addEntity(wall);
    };
    return CastleRoom1;
}(Quest));
//# sourceMappingURL=CastleRoom1.js.map