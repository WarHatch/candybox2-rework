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
var Desert = /** @class */ (function (_super) {
    __extends(Desert, _super);
    // Constructor
    function Desert(game) {
        var _this = _super.call(this, game) || this;
        // Resize the quest
        _this.resizeQuest(149, 30);
        // Add collision boxes around
        _this.addPlayerCollisionBoxes(true, false, true, true);
        // Add the player
        _this.getGame().getPlayer().loadCandyBoxCharacter(_this);
        _this.getGame().getPlayer().setGlobalPosition(new Pos(0, 26));
        _this.configPlayerOrClone(_this.getGame().getPlayer());
        _this.addEntity(_this.getGame().getPlayer());
        // Add the ground
        _this.addGround(0, 3, 1, // From x = 0 to x = 3, the ground will start at y = 1
        4, 12, 0, // From x = 4 to x = 12, the ground will start at y = 0
        13, 18, 1, // Etc
        19, 24, 2, 25, 30, 3, 31, 36, 2, 37, 42, 1, 43, 51, 0, 52, 57, 1, 58, 62, 2, 63, 68, 3, 69, 75, 2, 76, 82, 1, 83, 92, 0, 93, 97, 1, 98, 101, 2, 102, 107, 3, 108, 113, 2, 114, 119, 1, 120, 128, 0, 129, 134, 1, 135, 139, 2, 140, 145, 3, 146, 148, 2);
        // Bird adding stuff
        _this.currentBirdTime = 0;
        _this.setNextBirdAt();
        // Add the camels
        _this.addCamel(new Pos(44, 24));
        _this.addCamel(new Pos(65, 26));
        _this.addCamel(new Pos(84, 24));
        _this.addCamel(new Pos(106, 26));
        _this.addCamel(new Pos(118, 24));
        _this.addCamel(new Pos(144, 26));
        // Add the message
        _this.getGame().getQuestLog().addMessage(new QuestLogMessage("You enter the desert, camels and palm trees as far as the eye can see."));
        return _this;
    }
    // Public methods
    Desert.prototype.configPlayerOrClone = function (entity) {
        entity.setQuestEntityMovement(new QuestEntityMovement(new Pos(1, 0)));
        entity.getQuestEntityMovement().setGravity(true);
        entity.getQuestEntityMovement().setWormsLike(true);
    };
    Desert.prototype.endQuest = function (win) {
        // We add some messages
        if (win) {
            this.getGame().getQuestLog().addMessage(new QuestLogMessage("You made your way through the desert!"));
            Saving.saveBool("mainMapDoneDesert", true); // The desert is done
        }
        else {
            this.getGame().getQuestLog().addMessage(new QuestLogMessage("You died in the desert. Alone."));
        }
        // We call the endQuest method of our mother class
        _super.prototype.endQuest.call(this, win);
    };
    Desert.prototype.update = function () {
        if (this.getQuestEnded() == false) {
            // Possibly add a bird
            if (this.currentBirdTime >= this.nextBirdAt) {
                this.currentBirdTime = 0;
                this.setNextBirdAt();
                this.addBird();
            }
            else
                this.currentBirdTime += 1;
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
        this.getRenderArea().drawArray(Database.getAscii("places/quests/desert/background"), this.getRealQuestPosition().x, this.getRealQuestPosition().y + 21);
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
    Desert.prototype.addBird = function () {
        // We create the variable which will contain our bird
        var bird;
        // We choose the y position of our bird
        var yPos = Random.upTo(14);
        // We check if we could collide with another bird using this y position
        for (var i = 0; i < this.getEntities().length; i++) {
            if (this.getEntities()[i].getCbc() != null && this.getEntities()[i].getCbc().collidesWith(new CollisionBoxCollection(new CollisionBox(new QuestEntity(this, new Pos(0, 0)), new Pos(0, yPos), new Pos(149, 4)))))
                return;
        }
        // We add a bird going right
        if (Random.flipACoin()) {
            bird = new DesertBird(this, new Pos(-9, yPos), true);
        }
        // Or a bird going left
        else {
            bird = new DesertBird(this, new Pos(149, yPos), false);
        }
        // We add the health bar and finally add the bird to the entities
        bird.setHealthBar(new QuestEntityHealthBar(bird, new Pos(9, 1)));
        this.addEntity(bird);
    };
    Desert.prototype.addCamel = function (pos) {
        var camel;
        if (Random.oneChanceOutOf(20))
            camel = new TripodCamel(this, pos);
        else
            camel = new Camel(this, pos);
        camel.setHealthBar(new QuestEntityHealthBar(camel, new Pos(7, 1)));
        this.addEntity(camel);
    };
    Desert.prototype.addGround = function () {
        var positions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            positions[_i] = arguments[_i];
        }
        // Create the wall entity
        this.addEntity(new Wall(this, new Pos(0, 26)));
        var wall = (this.getLastEntity());
        // Add the boxes
        for (var i = 0; i < positions.length / 3; i++) {
            wall.addBox(new Pos(positions[i * 3], positions[i * 3 + 2]), new Pos(positions[i * 3 + 1] - positions[i * 3] + 1, 4 - positions[i * 3 + 2]));
        }
    };
    Desert.prototype.setNextBirdAt = function () {
        this.nextBirdAt = 20 + Random.upTo(30);
    };
    Desert.prototype.thePlayerWon = function () {
        // If the player is at the right of the desert, we return true
        if (this.getGame().getPlayer().getGlobalPosition().x >= 149)
            return true;
        // Else we return false
        return false;
    };
    return Desert;
}(Quest));
//# sourceMappingURL=Desert.js.map