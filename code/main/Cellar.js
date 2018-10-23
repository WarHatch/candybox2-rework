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
Saving.registerBool("cellarDone", false);
var Cellar = /** @class */ (function (_super) {
    __extends(Cellar, _super);
    // Constructor
    function Cellar(game) {
        var _this = _super.call(this, game) || this;
        // Resize the quest
        _this.resizeQuest(100, 3);
        // Add collision boxes around
        _this.addPlayerCollisionBoxes(true, false, true, true);
        // Add the player
        _this.getGame().getPlayer().loadCandyBoxCharacter(_this);
        _this.getGame().getPlayer().setGlobalPosition(new Pos(0, 2));
        _this.getGame().getPlayer().setQuestEntityMovement(new QuestEntityMovement(new Pos(1, 0)));
        _this.getGame().getPlayer().getQuestEntityMovement().setGravity(true);
        _this.getGame().getPlayer().getQuestEntityMovement().setWormsLike(false);
        _this.addEntity(_this.getGame().getPlayer());
        // Add the ground
        _this.addGround();
        // Add the rats
        _this.addRats();
        // Add a delimiter and the message
        _this.getGame().getQuestLog().addMessage(new QuestLogMessage("You enter the cellar. It's dark and you hear rats squeaking all around you."));
        return _this;
    }
    // Public methods
    Cellar.prototype.endQuest = function (win) {
        // We add some messages
        if (win) {
            this.getGame().getQuestLog().addMessage(new QuestLogMessage("You managed to kill all the rats!"));
            Saving.saveBool("cellarDone", true);
            // We gain the main map
            this.getGame().gainItem("gridItemPossessedMainMap");
        }
        else {
            this.getGame().getQuestLog().addMessage(new QuestLogMessage("You died in the cellar. Rats are probably going to eat your body."));
        }
        // We call the endQuest method of our mother class
        _super.prototype.endQuest.call(this, win);
    };
    Cellar.prototype.update = function () {
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
        this.drawEntities();
        this.drawAroundQuest();
        if (this.getQuestEnded())
            this.addExitQuestButton(new CallbackCollection(this.goToFifthHouse.bind(this)), "buttonExitQuestKeeping");
        this.postDraw();
    };
    // Private methods
    Cellar.prototype.addGround = function () {
        var wall = new Wall(this, new Pos(0, this.getRealQuestSize().y));
        wall.addBox(new Pos(0, 0), new Pos(this.getRealQuestSize().x, 1));
        this.addEntity(wall);
    };
    Cellar.prototype.addRat = function (pos) {
        var rat = new Rat(this, pos);
        rat.setHealthBar(new QuestEntityHealthBar(rat, new Pos(3, 1)));
        this.addEntity(rat);
    };
    Cellar.prototype.addRats = function () {
        for (var i = 5; i <= 95; i++) {
            // One chance out of 3
            if (Random.oneChanceOutOf(3)) {
                // We add a rat
                this.addRat(new Pos(i, 2));
                // We increase i to avoid adding a rat above the last one
                i += 2;
            }
        }
    };
    Cellar.prototype.goToFifthHouse = function () {
        this.getGame().setPlace(new FifthHouse(this.getGame()));
    };
    Cellar.prototype.thePlayerWon = function () {
        // If the player is at the right of the desert, we return true
        if (this.getGame().getPlayer().getGlobalPosition().x >= 100)
            return true;
        // Else we return false
        return false;
    };
    return Cellar;
}(Quest));
//# sourceMappingURL=Cellar.js.map