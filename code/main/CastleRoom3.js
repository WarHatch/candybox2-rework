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
var CastleRoom3 = /** @class */ (function (_super) {
    __extends(CastleRoom3, _super);
    // Constructor
    function CastleRoom3(game) {
        var _this = _super.call(this, game) || this;
        // Resize the quest
        _this.resizeQuest(100, 30);
        // Add collision boxes around
        _this.addPlayerCollisionBoxes(true, true, true, true);
        // Add the player
        _this.getGame().getPlayer().loadCandyBoxCharacter(_this);
        _this.getGame().getPlayer().setGlobalPosition(new Pos(97, 23));
        _this.configPlayerOrClone(_this.getGame().getPlayer());
        _this.addEntity(_this.getGame().getPlayer());
        // Add the walls
        _this.addWalls();
        // Add the eggs
        _this.addEggs();
        // Add the monster
        _this.addMonster();
        // Add the chest
        _this.addChest();
        // Add the message
        _this.getGame().getQuestLog().addMessage(new QuestLogMessage("You enter one of the castle's room."));
        return _this;
    }
    // Public methods
    CastleRoom3.prototype.castPlayerTeleport = function () {
        _super.prototype.castPlayerTeleport.call(this, new Pos(96, 19), new Pos(2, 3));
    };
    CastleRoom3.prototype.configPlayerOrClone = function (entity) {
        entity.setQuestEntityMovement(new QuestEntityMovement(new Pos(-1, 0)));
        entity.getQuestEntityMovement().setGravity(true);
        entity.getQuestEntityMovement().setWormsLike(true);
    };
    CastleRoom3.prototype.endQuest = function (win) {
        // We add some messages
        if (win) {
            this.getGame().getQuestLog().addMessage(new QuestLogMessage("You exit the room."));
        }
        // We call the endQuest method of our mother class
        _super.prototype.endQuest.call(this, win);
    };
    CastleRoom3.prototype.update = function () {
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
        this.getRenderArea().drawArray(Database.getAscii("places/quests/castle/room3/background"), this.getRealQuestPosition().x, this.getRealQuestPosition().y);
        this.drawEntities();
        this.drawAroundQuest();
        this.addExitQuestButton(new CallbackCollection(this.endQuest.bind(this, true), this.getGame().goToCastle.bind(this.getGame())), "buttonExitQuestKeeping");
        this.postDraw();
    };
    // Private methods
    CastleRoom3.prototype.addChest = function () {
        this.addEntity(new Chest(this, new Pos(7, 23), true, new CallbackCollection(this.openChest.bind(this)), Saving.loadBool("gridItemPossessedL")));
    };
    CastleRoom3.prototype.addEggs = function () {
        this.addEntity(new Egg(this, new Pos(16, 23), new CallbackCollection(this.anEggDiedCallback.bind(this))));
        this.addEntity(new Egg(this, new Pos(18, 23), new CallbackCollection(this.anEggDiedCallback.bind(this))));
        this.addEntity(new Egg(this, new Pos(23, 23), new CallbackCollection(this.anEggDiedCallback.bind(this))));
        this.addEntity(new Egg(this, new Pos(25, 23), new CallbackCollection(this.anEggDiedCallback.bind(this))));
        this.addEntity(new Egg(this, new Pos(28, 23), new CallbackCollection(this.anEggDiedCallback.bind(this))));
        this.addEntity(new Egg(this, new Pos(30, 23), new CallbackCollection(this.anEggDiedCallback.bind(this))));
        this.addEntity(new Egg(this, new Pos(38, 23), new CallbackCollection(this.anEggDiedCallback.bind(this))));
        this.addEntity(new Egg(this, new Pos(41, 23), new CallbackCollection(this.anEggDiedCallback.bind(this))));
        this.addEntity(new Egg(this, new Pos(48, 23), new CallbackCollection(this.anEggDiedCallback.bind(this))));
        this.addEntity(new Egg(this, new Pos(52, 23), new CallbackCollection(this.anEggDiedCallback.bind(this))));
        this.addEntity(new Egg(this, new Pos(54, 23), new CallbackCollection(this.anEggDiedCallback.bind(this))));
        this.addEntity(new Egg(this, new Pos(57, 23), new CallbackCollection(this.anEggDiedCallback.bind(this))));
        this.addEntity(new Egg(this, new Pos(63, 23), new CallbackCollection(this.anEggDiedCallback.bind(this))));
        this.addEntity(new Egg(this, new Pos(68, 23), new CallbackCollection(this.anEggDiedCallback.bind(this))));
        this.addEntity(new Egg(this, new Pos(72, 23), new CallbackCollection(this.anEggDiedCallback.bind(this))));
        this.addEntity(new Egg(this, new Pos(78, 23), new CallbackCollection(this.anEggDiedCallback.bind(this))));
    };
    CastleRoom3.prototype.addMonster = function () {
        this.monster = new Monster(this, new Pos(67, 3));
        this.addEntity(this.monster);
    };
    CastleRoom3.prototype.addWalls = function () {
        // Create the wall entity
        var wall = new Wall(this, new Pos(0, 0));
        // Add the boxes
        wall.addBox(new Pos(0, 0), new Pos(100, 3));
        wall.addBox(new Pos(0, 3), new Pos(7, 25));
        wall.addBox(new Pos(7, 24), new Pos(93, 4));
        wall.addBox(new Pos(95, 3), new Pos(5, 18));
        // Add the wall entity
        this.addEntity(wall);
    };
    CastleRoom3.prototype.anEggDiedCallback = function () {
        // We warn the monster that an egg was destroyed
        this.monster.eggDestroyed();
    };
    CastleRoom3.prototype.openChest = function () {
        this.foundGridOrEqItem(new QuestItemFound(this, "gridItemPossessedL", "You opened a chest and found a strange stone.", "You gain a strange stone."));
    };
    return CastleRoom3;
}(Quest));
//# sourceMappingURL=CastleRoom3.js.map