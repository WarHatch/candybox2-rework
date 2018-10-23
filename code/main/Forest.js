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
var Forest = /** @class */ (function (_super) {
    __extends(Forest, _super);
    // Constructor
    function Forest(game) {
        var _this = _super.call(this, game) || this;
        // Various timers related to monsters handling
        _this.timeSinceLastWolfAdding = 0;
        _this.timeSinceLastTreeSpiritAdding = 40;
        // The ground y position
        _this.groundYPosition = 20;
        // The mosquito timer (mosquitos will come when the timer reaches 0)
        _this.mosquitoTimer = 250;
        // Resize the quest
        _this.resizeQuest(294, _this.groundYPosition + 2);
        // Add collision boxes around
        _this.addPlayerCollisionBoxes(true, false, true, true);
        // Add the player
        _this.getGame().getPlayer().loadCandyBoxCharacter(_this);
        _this.getGame().getPlayer().setGlobalPosition(new Pos(0, _this.groundYPosition));
        _this.configPlayerOrClone(_this.getGame().getPlayer());
        _this.addEntity(_this.getGame().getPlayer());
        // Add the ground
        _this.addGround();
        // We add some wolves
        for (var i = 0; i < 10; i++) {
            _this.addWolf(Random.between(80, 280));
        }
        // Add the message
        _this.getGame().getQuestLog().addMessage(new QuestLogMessage("You enter the forest."));
        return _this;
    }
    // Public methods
    Forest.prototype.castPlayerTeleport = function () {
        _super.prototype.castPlayerTeleport.call(this, new Pos(0, this.groundYPosition), new Pos(10, 1));
    };
    Forest.prototype.configPlayerOrClone = function (entity) {
        entity.setQuestEntityMovement(new QuestEntityMovement(new Pos(1, 0)));
        entity.getQuestEntityMovement().setGravity(true);
        entity.getQuestEntityMovement().setWormsLike(false);
    };
    Forest.prototype.endQuest = function (win) {
        // We add some messages
        if (win) {
            this.getGame().getQuestLog().addMessage(new QuestLogMessage("You made your way through the forest!"));
            Saving.saveBool("mainMapDoneForest", true); // The desert is done
        }
        else {
            this.getGame().getQuestLog().addMessage(new QuestLogMessage("You died in the forest. The tree's leaves should soon be covering your body."));
        }
        // We call the endQuest method of our mother class
        _super.prototype.endQuest.call(this, win);
    };
    Forest.prototype.update = function () {
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
            // Monsters handling
            this.monstersHandling();
            // Update entities
            this.updateEntities();
        }
        // Draw
        this.preDraw();
        this.getRenderArea().drawArray(Database.getAscii("places/quests/forest/background"), this.getRealQuestPosition().x, this.getRealQuestPosition().y);
        this.getRenderArea().drawArray(Database.getAscii("places/quests/forest/background"), this.getRealQuestPosition().x + 98, this.getRealQuestPosition().y);
        this.getRenderArea().drawArray(Database.getAscii("places/quests/forest/background"), this.getRealQuestPosition().x + 98 * 2, this.getRealQuestPosition().y);
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
    Forest.prototype.addGround = function () {
        var ground = new Wall(this, new Pos(0, 0));
        ground.addBox(new Pos(0, this.groundYPosition + 1), new Pos(350, 1));
        this.addEntity(ground);
    };
    Forest.prototype.addMosquito = function () {
        return this.addEntity(new Mosquito(this, new Pos(0, this.groundYPosition - Random.between(3, 7)), this.groundYPosition));
    };
    Forest.prototype.addTreeSpirit = function (xPosition) {
        if (xPosition === void 0) { xPosition = 294; }
        var treeSpirit = new TreeSpirit(this, new Pos(xPosition, this.groundYPosition - 4), this.groundYPosition);
        treeSpirit.setHealthBar(new QuestEntityHealthBar(treeSpirit, new Pos(5, 1)));
        return this.addEntity(treeSpirit);
    };
    Forest.prototype.addWolf = function (xPosition) {
        if (xPosition === void 0) { xPosition = 294; }
        var wolf = new Wolf(this, new Pos(xPosition, this.groundYPosition - 2));
        wolf.setHealthBar(new QuestEntityHealthBar(wolf, new Pos(7, 1)));
        return this.addEntity(wolf);
    };
    Forest.prototype.monstersHandling = function () {
        // If it's time to add a tree spirit
        if (this.timeSinceLastTreeSpiritAdding > 70 && Random.flipACoin()) {
            this.addTreeSpirit(); // We add it
            this.timeSinceLastTreeSpiritAdding = 0; // We reset the timer
        }
        else
            this.timeSinceLastTreeSpiritAdding += 1; // We increase the timer
        // If it's time to add a wolf
        if (this.timeSinceLastWolfAdding > 30 && Random.oneChanceOutOf(5)) {
            this.addWolf(); // We add it
            this.timeSinceLastWolfAdding = 0; // We reset the timer
        }
        // Else, it's not the time yet
        else
            this.timeSinceLastWolfAdding += 1; // We increase the timer
        // If it's time to add a mosquito
        if (this.mosquitoTimer <= 0) {
            this.addMosquito();
            this.mosquitoTimer = Random.between(5, 10);
        }
        else
            this.mosquitoTimer -= 1;
    };
    Forest.prototype.thePlayerWon = function () {
        // If the player is at the right of the desert, we return true
        if (this.getGame().getPlayer().getGlobalPosition().x >= 294)
            return true;
        // Else we return false
        return false;
    };
    return Forest;
}(Quest));
//# sourceMappingURL=Forest.js.map