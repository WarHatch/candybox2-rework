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
var CastleEntrance = /** @class */ (function (_super) {
    __extends(CastleEntrance, _super);
    // Constructor
    function CastleEntrance(game) {
        var _this = _super.call(this, game) || this;
        // Last knight added
        _this.lastKnightAdded = null;
        // Resize the quest
        _this.resizeQuest(149, 30);
        // Add collision boxes around
        _this.addPlayerCollisionBoxes(true, false, true, true);
        // Add the player
        _this.getGame().getPlayer().loadCandyBoxCharacter(_this);
        _this.getGame().getPlayer().setGlobalPosition(new Pos(0, 25));
        _this.configPlayerOrClone(_this.getGame().getPlayer());
        _this.addEntity(_this.getGame().getPlayer());
        // Add the walls
        _this.addWalls();
        // Add the first knight
        _this.addKnight(Random.between(80, 120));
        // Add the message
        _this.getGame().getQuestLog().addMessage(new QuestLogMessage("You're trying to cross the castle's entrance."));
        return _this;
    }
    // Public methods
    CastleEntrance.prototype.castPlayerTeleport = function () {
        _super.prototype.castPlayerTeleport.call(this, new Pos(0, 0), new Pos(60, 20));
    };
    CastleEntrance.prototype.configPlayerOrClone = function (entity) {
        entity.setQuestEntityMovement(new QuestEntityMovement(new Pos(1, 0)));
        entity.getQuestEntityMovement().setGravity(true);
        entity.getQuestEntityMovement().setWormsLike(true);
    };
    CastleEntrance.prototype.endQuest = function (win) {
        // We add some messages
        if (win) {
            this.getGame().getQuestLog().addMessage(new QuestLogMessage("You crossed the castle's entrance! You can now enter the castle."));
            Saving.saveBool("mainMapDoneCastleEntrance", true); // The castle entrance is done
        }
        else {
            this.getGame().getQuestLog().addMessage(new QuestLogMessage("You died trying to cross the castle's entrance."));
        }
        // We call the endQuest method of our mother class
        _super.prototype.endQuest.call(this, win);
    };
    CastleEntrance.prototype.update = function () {
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
            // Handle monsters
            this.handleKnights();
            // Update entities
            this.updateEntities();
        }
        // Draw
        this.preDraw();
        this.getRenderArea().drawArray(Database.getAscii("places/quests/castleEntrance/background"), this.getRealQuestPosition().x, this.getRealQuestPosition().y);
        this.drawEntities();
        this.getRenderArea().drawArray(Database.getAscii("places/quests/castleEntrance/front"), this.getRealQuestPosition().x + 104, this.getRealQuestPosition().y);
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
    CastleEntrance.prototype.addKnight = function (x) {
        if (x === void 0) { x = 149; }
        var knight = new Knight(this, new Pos(x, 20));
        knight.setHealthBar(new QuestEntityHealthBar(knight, new Pos(15, 1)));
        if (this.addEntity(knight))
            this.lastKnightAdded = knight;
    };
    CastleEntrance.prototype.addWalls = function () {
        // Create the wall entity
        var wall = new Wall(this, new Pos(0, 0));
        // Add the boxes
        wall.addBox(new Pos(0, 26), new Pos(200, 4));
        wall.addBox(new Pos(104, 6), new Pos(15, 15));
        wall.addBox(new Pos(104, 5), new Pos(16, 1));
        wall.addBox(new Pos(104, 4), new Pos(17, 1));
        wall.addBox(new Pos(106, 3), new Pos(16, 1));
        wall.addBox(new Pos(107, 2), new Pos(6, 1));
        wall.addBox(new Pos(116, 2), new Pos(7, 1));
        // Add the wall entity
        this.addEntity(wall);
    };
    CastleEntrance.prototype.handleKnights = function () {
        // If there's no last knight added or the last knight added is weak or on the left of the player, we add a new one
        if (this.lastKnightAdded == null ||
            (this.lastKnightAdded != null && this.lastKnightAdded.getHp() / this.lastKnightAdded.getMaxHp() < 0.4) ||
            (this.lastKnightAdded != null && this.lastKnightAdded.getGlobalPosition().x + 1 < this.getGame().getPlayer().getGlobalPosition().x)) {
            this.addKnight();
        }
    };
    CastleEntrance.prototype.thePlayerWon = function () {
        // If the player is at the right of the desert, we return true
        if (this.getGame().getPlayer().getGlobalPosition().x >= 149)
            return true;
        // Else we return false
        return false;
    };
    return CastleEntrance;
}(Quest));
//# sourceMappingURL=CastleEntrance.js.map