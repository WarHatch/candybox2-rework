///<reference path="./../../main/Quest.ts"/>
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
// -------------------------------
// We register on the Arena module
// -------------------------------
function HardcorePlatformer_getNewQuest(game) {
    return new HardcorePlatformer_Quest(game);
}
TheArenaModule.addQuest(new TheArenaModuleQuest("hardcorePlatformer", HardcorePlatformer_getNewQuest.bind(this)));
// -------------------------------------------------------------------------------
// We create our HardcorePlatformer_Quest class, which herits from the Quest class 
// -------------------------------------------------------------------------------
var HardcorePlatformer_Quest = /** @class */ (function (_super) {
    __extends(HardcorePlatformer_Quest, _super);
    // Constructor
    function HardcorePlatformer_Quest(game) {
        var _this = _super.call(this, game) || this;
        // Resize the quest
        _this.resizeQuest(240, 13);
        // Add collision boxes around
        _this.addPlayerCollisionBoxes(true, false, true, true);
        // Add the player
        _this.getGame().getPlayer().loadCandyBoxCharacter(_this);
        _this.getGame().getPlayer().setGlobalPosition(new Pos(0, 8));
        _this.configPlayerOrClone(_this.getGame().getPlayer());
        _this.addEntity(_this.getGame().getPlayer());
        // Add the ground
        _this.addGround();
        // Add the spikes
        _this.addAllSpikes(_this.getGame().getPlayer().getMaxHp() * 100);
        // Add the message
        _this.getGame().getQuestLog().addMessage(new QuestLogMessage("This is going to be HARDCORE."));
        return _this;
    }
    // Public methods
    HardcorePlatformer_Quest.prototype.castPlayerAntiGravityPotion = function () {
        this.getGame().getQuestLog().addMessage(new QuestLogMessage("Damn. These potions don't seem to work here :("));
    };
    HardcorePlatformer_Quest.prototype.castPlayerTeleport = function () {
        _super.prototype.castPlayerTeleport.call(this, new Pos(0, 8), new Pos(1, 1));
    };
    HardcorePlatformer_Quest.prototype.configPlayerOrClone = function (entity) {
        entity.setQuestEntityMovement(new QuestEntityMovement(new Pos(1, 0)));
        entity.getQuestEntityMovement().setGravity(true);
        entity.getQuestEntityMovement().setWormsLike(true);
    };
    HardcorePlatformer_Quest.prototype.endQuest = function (win) {
        // We add some messages
        if (win) {
            this.getGame().getQuestLog().addMessage(new QuestLogMessage("Yay, you made it!! You can now tell all your friends."));
        }
        else {
            this.getGame().getQuestLog().addMessage(new QuestLogMessage("You failed. Try again :)"));
        }
        // We call the endQuest method of our mother class
        _super.prototype.endQuest.call(this, win);
    };
    HardcorePlatformer_Quest.prototype.update = function () {
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
        this.getRenderArea().drawArray(Database.getAscii("arena/hardcorePlatformer/background"), this.getRealQuestPosition().x, this.getRealQuestPosition().y);
        this.drawEntities();
        this.drawAroundQuest();
        this.addExitQuestButton(new CallbackCollection(this.endQuest.bind(this, false), this.getGame().goToMainMap.bind(this.getGame()), this.getGame().getStatusBar().selectTabByType.bind(this.getGame().getStatusBar(), StatusBarTabType.THE_ARENA), this.getGame().goToTheArena.bind(this.getGame())), "buttonExitQuestKeeping");
        this.postDraw();
    };
    // Private methods
    HardcorePlatformer_Quest.prototype.addAllSpikes = function (damage) {
        // Add long spikes on the roof (to avoid the usage of rocket boots)
        this.addSpikes(new Spikes(this, new Pos(0, 0), 300, damage, true));
        // Add the first group of spikes
        this.addSpikes(new Spikes(this, new Pos(25, 8), 4, damage));
        this.addSpikes(new Spikes(this, new Pos(37, 8), 6, damage));
        this.addSpikes(new Spikes(this, new Pos(49, 8), 6, damage));
        this.addSpikes(new Spikes(this, new Pos(60, 8), 6, damage));
        this.addSpikes(new Spikes(this, new Pos(71, 8), 6, damage));
        // Add the second group
        this.addSpikes(new Spikes(this, new Pos(112, 8), 6, damage));
        this.addSpikes(new Spikes(this, new Pos(121, 8), 2, damage));
        this.addSpikes(new Spikes(this, new Pos(127, 8), 2, damage));
        this.addSpikes(new Spikes(this, new Pos(133, 8), 2, damage));
        this.addSpikes(new Spikes(this, new Pos(139, 8), 2, damage));
        // Add the third group
        this.addSpikes(new HardcorePlatformer_Spikes(this, new Pos(196, 8), 2, damage));
        this.addSpikes(new HardcorePlatformer_Spikes(this, new Pos(198, 8), 2, damage));
        this.addSpikes(new HardcorePlatformer_Spikes(this, new Pos(200, 8), 2, damage));
        this.addSpikes(new HardcorePlatformer_Spikes(this, new Pos(202, 8), 2, damage));
        this.addSpikes(new HardcorePlatformer_Spikes(this, new Pos(204, 8), 2, damage));
        this.addSpikes(new HardcorePlatformer_Spikes(this, new Pos(206, 8), 2, damage));
        this.addSpikes(new HardcorePlatformer_Spikes(this, new Pos(208, 8), 2, damage));
        this.addSpikes(new HardcorePlatformer_Spikes(this, new Pos(210, 8), 2, damage));
        this.addSpikes(new HardcorePlatformer_Spikes(this, new Pos(212, 8), 2, damage));
        this.addSpikes(new HardcorePlatformer_Spikes(this, new Pos(214, 8), 2, damage));
        this.addSpikes(new HardcorePlatformer_Spikes(this, new Pos(216, 8), 2, damage));
        this.addSpikes(new HardcorePlatformer_Spikes(this, new Pos(218, 8), 2, damage));
        this.addSpikes(new HardcorePlatformer_Spikes(this, new Pos(220, 8), 2, damage));
        this.addSpikes(new Spikes(this, new Pos(222, 8), 2, damage));
    };
    HardcorePlatformer_Quest.prototype.addGround = function () {
        var wall = new Wall(this, new Pos(0, 0));
        wall.addBox(new Pos(0, 9), new Pos(240, 3));
        this.addEntity(wall);
    };
    HardcorePlatformer_Quest.prototype.addSpikes = function (spikes) {
        this.addEntity(spikes);
    };
    HardcorePlatformer_Quest.prototype.thePlayerWon = function () {
        // If the player is at the right of the desert, we return true
        if (this.getGame().getPlayer().getGlobalPosition().x >= 240)
            return true;
        // Else we return false
        return false;
    };
    return HardcorePlatformer_Quest;
}(Quest));
//# sourceMappingURL=HardcorePlatformer_Quest.js.map