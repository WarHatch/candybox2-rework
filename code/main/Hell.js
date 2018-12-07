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
var Hell = /** @class */ (function (_super) {
    __extends(Hell, _super);
    // Constructor
    function Hell(game) {
        var _this = _super.call(this, game) || this;
        // Resize the quest
        _this.resizeQuest(150, 30);
        // Add collision boxes around
        _this.addPlayerCollisionBoxes(true, true, true, true);
        // Add the player
        _this.getGame().getPlayer().loadCandyBoxCharacter(_this);
        _this.getGame().getPlayer().setGlobalPosition(new Pos(0, 23));
        _this.configPlayerOrClone(_this.getGame().getPlayer());
        _this.addEntity(_this.getGame().getPlayer());
        // Add the floor
        _this.addFloor(0, 20);
        // Add the lava entities
        _this.addLava(new Pos(53, 27), new Pos(20, 2));
        _this.addLava(new Pos(92, 27), new Pos(16, 2));
        // Add the devil
        _this.addDevil(new Pos(130, 2));
        // Add Camazotz
        _this.addCamazotz(new Pos(Random.between(70, 100), 2));
        // Add the message
        _this.getGame().getQuestLog().addMessage(new QuestLogMessage("You enter Hell."));
        return _this;
    }
    // Public methods
    Hell.prototype.castPlayerTeleport = function () {
        _super.prototype.castPlayerTeleport.call(this, new Pos(0, 0), new Pos(20, 21));
    };
    Hell.prototype.configPlayerOrClone = function (entity) {
        entity.setQuestEntityMovement(new QuestEntityMovement(new Pos(1, 0)));
        entity.getQuestEntityMovement().setGravity(true);
        entity.getQuestEntityMovement().setWormsLike(true);
    };
    Hell.prototype.endQuest = function (win) {
        // We add some messages
        if (win) {
            this.getGame().getQuestLog().addMessage(new QuestLogMessage("You managed to beat the devil itself!"));
        }
        else {
            this.getGame().getQuestLog().addMessage(new QuestLogMessage("You died in Hell. Your soul will wander here for all eternity."));
        }
        // We call the endQuest method of our mother class
        _super.prototype.endQuest.call(this, win);
    };
    Hell.prototype.update = function () {
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
        this.drawBackground(0, 20);
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
    Hell.prototype.addCamazotz = function (pos) {
        var camazotz;
        camazotz = new Camazotz(this, pos);
        camazotz.setHealthBar(new QuestEntityHealthBar(camazotz, new Pos(22, 1), new Pos(0, 0)));
        this.addEntity(camazotz);
    };
    Hell.prototype.addDevil = function (pos) {
        this.devil = new Devil(this, pos, 2, 19);
        this.devil.setHealthBar(new QuestEntityHealthBar(this.devil, new Pos(100, 1), new Pos(0, 0), QuestEntityHealthBarPositionType.FIXED_ON_PAGE, true, true, BarType.HEALTH));
        this.addEntity(this.devil);
    };
    Hell.prototype.addFloor = function (x, y) {
        // Create the wall entity
        var wall = new Wall(this, new Pos(x, y));
        // Add the floor
        wall.addBox(new Pos(0, 4), new Pos(53, 6));
        wall.addBox(new Pos(73, 4), new Pos(19, 6));
        wall.addBox(new Pos(108, 4), new Pos(42, 6));
        wall.addBox(new Pos(0, 9), new Pos(150, 1));
        // Add the wall entity
        this.addEntity(wall);
    };
    Hell.prototype.addLava = function (pos, size) {
        this.addEntity(new Lava(this, pos, size));
    };
    Hell.prototype.drawBackground = function (x, y) {
        // Draw the ascii
        this.getRenderArea().drawArray(Database.getAscii("places/quests/hell/background"), this.getRealQuestPosition().x + x, this.getRealQuestPosition().y + y);
        // Add the red color for the first lava pit
        this.drawLava(x + 55, x + 71, y + 4);
        this.drawLava(x + 54, x + 72, y + 5);
        this.drawLava(x + 53, x + 73, y + 6);
        this.drawLava(x + 52, x + 74, y + 7);
        this.drawLava(x + 51, x + 75, y + 8);
        this.drawLava(x + 51, x + 75, y + 9);
        // Same thing for the second pit
        this.drawLava(x + 94, x + 106, y + 4);
        this.drawLava(x + 93, x + 107, y + 5);
        this.drawLava(x + 92, x + 108, y + 6);
        this.drawLava(x + 91, x + 109, y + 7);
        this.drawLava(x + 90, x + 110, y + 8);
        this.drawLava(x + 90, x + 110, y + 9);
    };
    Hell.prototype.drawLava = function (x1, x2, y) {
        this.getRenderArea().addBackgroundColor(this.getRealQuestPosition().x + x1, this.getRealQuestPosition().x + x2, this.getRealQuestPosition().y + y, new Color(ColorType.HELL_RED_LAVA));
    };
    Hell.prototype.thePlayerWon = function () {
        // If the devil is dead, we return true
        if (this.devil.shouldDie() == true)
            return true;
        // Else we return false
        return false;
    };
    return Hell;
}(Quest));
//# sourceMappingURL=Hell.js.map