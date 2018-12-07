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
function PeacefulForest_getNewQuest(game) {
    return new PeacefulForest_Quest(game);
}
TheArenaModule.addQuest(new TheArenaModuleQuest("peacefulForest", PeacefulForest_getNewQuest.bind(this)));
// ---------------------------------------------------------------------------
// We create our PeacefulForest_Quest class, which herits from the Quest class 
// ---------------------------------------------------------------------------
var PeacefulForest_Quest = /** @class */ (function (_super) {
    __extends(PeacefulForest_Quest, _super);
    // -----------
    // Constructor
    // -----------
    function PeacefulForest_Quest(game) {
        var _this = 
        // Call the constructor of our mother class, the Quest class (don't change that)
        _super.call(this, game) || this;
        // Resize the quest
        _this.resizeQuest(100, 10); // 100 characters width, 10 characters height
        // Add collision boxes around
        _this.addPlayerCollisionBoxes(true, false, true, true); // this means that the player will only be able to get out of the quest on the right side
        // Handle the player
        _this.getGame().getPlayer().loadCandyBoxCharacter(_this); // this means that we load the small ("\o/") character, not the big one used in the sea
        _this.getGame().getPlayer().setGlobalPosition(new Pos(0, 9)); // the player will begin the quest at the x position of 0 and the y position of 9
        _this.configPlayerOrClone(_this.getGame().getPlayer()); // configure the player (see below in the public methods part)
        _this.addEntity(_this.getGame().getPlayer()); // finally add the player to the quest
        // Add some treeeeees (it uses a private method below)
        _this.addATree(12);
        _this.addATree(25);
        _this.addATree(28);
        _this.addATree(35);
        _this.addATree(39);
        _this.addATree(42);
        _this.addATree(48);
        _this.addATree(56);
        _this.addATree(59);
        _this.addATree(65);
        _this.addATree(79);
        _this.addATree(87);
        _this.addATree(91);
        // Add a ground because we don't want our trees to fall down (it uses a private method below)
        _this.addGround();
        // Add the first message in the quest log
        _this.getGame().getQuestLog().addMessage(new QuestLogMessage("You enter the peaceful forest. Trees all around you. It's a great place to calm down."));
        return _this;
    }
    // --------------
    // Public methods
    // --------------
    // Method used to configure the player (called in the constructor)
    PeacefulForest_Quest.prototype.configPlayerOrClone = function (entity) {
        entity.setQuestEntityMovement(new QuestEntityMovement(new Pos(1, 0))); // the player is going to the right
        entity.getQuestEntityMovement().setGravity(true); // it is affected by gravity
        entity.getQuestEntityMovement().setWormsLike(false); // the player won't be able to walk over one character high steps (so that it will not walk over trees..)
    };
    // Method called by the update method when the quest is over
    PeacefulForest_Quest.prototype.endQuest = function (win) {
        // If we won the quest
        if (win) {
            this.getGame().getQuestLog().addMessage(new QuestLogMessage("You reached the end of the peaceful forest. It really wasn't too hard."));
        }
        // Else, we didn't win the quest
        else {
            this.getGame().getQuestLog().addMessage(new QuestLogMessage("You died in the peaceful forest. How did you even manage to do that?"));
        }
        // Call the endQuest method of our mother class, the Quest class
        _super.prototype.endQuest.call(this, win);
    };
    // Method called automatically ten times per second. It updates everything in the quest
    PeacefulForest_Quest.prototype.update = function () {
        // If the quest isn't finished yet
        if (this.getQuestEnded() == false) {
            // Test if the player won the quest, if so, end the quest and return
            if (this.thePlayerWon()) {
                this.endQuest(true); // true = we won
                return;
            }
            // Test if the player is dead, if so, end the quest and return
            if (this.getGame().getPlayer().shouldDie()) {
                this.endQuest(false); // false = we failed
                return;
            }
            // Update entities (it makes everything move, it handles collisions, gravity, damage...)
            this.updateEntities();
        }
        // Draw everything
        this.preDraw(); // a special method we need to call before drawing anything
        this.drawEntities(); // draw all entities
        this.drawAroundQuest(); // draw the stuff around (the spells, etc)
        this.addExitQuestButton(new CallbackCollection(this.endQuest.bind(this, false), this.getGame().goToMainMap.bind(this.getGame()), this.getGame().getStatusBar().selectTabByType.bind(this.getGame().getStatusBar(), StatusBarTabType.THE_ARENA), this.getGame().goToTheArena.bind(this.getGame())), "buttonExitQuestKeeping"); // draw the button to exit the quest
        this.postDraw(); // a special method we need to call after drawing everything
    };
    // --------------
    // Public methods
    // --------------
    // Method called in the constructor. It is used to add a tree at a given x position.
    PeacefulForest_Quest.prototype.addATree = function (x) {
        // Create the tree
        var tree = new PeacefulForest_Tree(this, new Pos(x, 9)); // We use the x position given in parameter, the y position match the ground's position
        // Set the tree's health bar
        tree.setHealthBar(new QuestEntityHealthBar(tree, new Pos(3, 1))); // 3 characters width, 1 character height
        // Finally add the tree to the quest
        this.addEntity(tree);
    };
    // Method called in the constructor. It is used to add a ground to the quest, therefore preventing the trees to fall down.
    PeacefulForest_Quest.prototype.addGround = function () {
        // Create the ground entity
        var ground = new Wall(this, new Pos(0, 10)); // position 0, 10
        // Add the ground box (100 characters width, 1 character height)
        ground.addBox(new Pos(0, 0), new Pos(100, 1));
        // Add the ground entity
        this.addEntity(ground);
    };
    // Method called by the update method above to know if the player won the quest
    PeacefulForest_Quest.prototype.thePlayerWon = function () {
        // If the player reached the right limit of the quest, we return true because he won the quest
        if (this.getGame().getPlayer().getGlobalPosition().x >= 100)
            return true;
        // Else we return false
        return false;
    };
    return PeacefulForest_Quest;
}(Quest));
//# sourceMappingURL=PeacefulForest_Quest.js.map