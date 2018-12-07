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
var Yourself = /** @class */ (function (_super) {
    __extends(Yourself, _super);
    // Constructor
    function Yourself(game) {
        var _this = _super.call(this, game) || this;
        // Sentences flying across the screen
        _this.sentences = [];
        // Sentences timer (to avoid having sentences at the very beginning of the quest)
        _this.sentencesTimer = 30;
        // Resize the quest
        _this.resizeQuest(100, 20);
        // Add collision boxes around
        _this.addPlayerCollisionBoxes(true, true, true, true);
        // Add the player
        _this.getGame().getPlayer().loadCandyBoxCharacter(_this);
        _this.getGame().getPlayer().setGlobalPosition(new Pos(0, 19));
        _this.configPlayerOrClone(_this.getGame().getPlayer());
        _this.addEntity(_this.getGame().getPlayer());
        // Add yourself
        _this.addYourself();
        // Add the walls
        _this.addWalls();
        // Add the message
        _this.getGame().getQuestLog().addMessage(new QuestLogMessage("You are now fighting yourself."));
        return _this;
    }
    // Public methods
    Yourself.prototype.configPlayerOrClone = function (entity) {
        entity.setQuestEntityMovement(new QuestEntityMovement(new Pos(1, 0)));
        entity.getQuestEntityMovement().setGravity(true);
    };
    Yourself.prototype.endQuest = function (win) {
        // We add some messages
        if (win) {
            this.getGame().getQuestLog().addMessage(new QuestLogMessage("You managed to beat yourself!"));
            Saving.saveBool("mainMapDoneDesert", true); // The desert is done
        }
        else {
            this.getGame().getQuestLog().addMessage(new QuestLogMessage("You died trying to beat yourself."));
        }
        // We call the endQuest method of our mother class
        _super.prototype.endQuest.call(this, win);
    };
    Yourself.prototype.update = function () {
        if (this.getQuestEnded() == false) {
            // Test if the player is dead, if so, end the quest and return
            if (this.getGame().getPlayer().shouldDie()) {
                this.endQuest(false);
                return;
            }
            // Test if the player won the quest, if so, end the quest and return
            if (this.thePlayerWon()) {
                this.endQuest(true);
                return;
            }
            // Handle sentences
            this.handleSentences();
            // Update entities
            this.updateEntities();
        }
        // Draw
        this.preDraw();
        this.drawEntities();
        this.drawSentences(); // Draw the sentences
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
    Yourself.prototype.addYourself = function () {
        this.yourself = new YourselfEntity(this, new Pos(96, 19));
        this.yourself.setHealthBar(new QuestEntityHealthBar(this.yourself, new Pos(100, 1), new Pos(0, 0), QuestEntityHealthBarPositionType.FIXED_ON_PAGE, true, true, BarType.HEALTH));
        this.addEntity(this.yourself);
    };
    Yourself.prototype.addWalls = function () {
        // Create the wall entity
        this.addEntity(new Wall(this, new Pos(0, 0)));
        var wall = (this.getLastEntity());
        // Add the boxes
        wall.addBox(new Pos(-1, -1), new Pos(102, 1));
        wall.addBox(new Pos(-1, 0), new Pos(1, 21));
        wall.addBox(new Pos(0, 20), new Pos(101, 1));
        wall.addBox(new Pos(101, 0), new Pos(1, 20));
    };
    Yourself.prototype.drawSentences = function () {
        // Call the sentences update methods
        for (var i = 0; i < this.sentences.length; i++) {
            this.sentences[i].draw(this.getRenderArea());
        }
    };
    Yourself.prototype.handleSentences = function () {
        // If it's time to add sentences
        if (this.sentencesTimer <= 0) {
            // If we don't have the crown
            if (this.getGame().isEquipped("hat", "eqItemHatOctopusKingCrown") == false) {
                // We possibly add a randomly-chosen sentence
                if (this.sentences.length == 0 || Random.oneChanceOutOf(10))
                    this.sentences.push(new YourselfSentence(this, Random.fromArray(["You need to be more self-confident",
                        "You need more confidence!",
                        "My crown is called content, a crown that seldom kings enjoy",
                        "Self-confidence is having confidence in oneself",
                        "The Octopus King helps those who help themselves",
                        "It's hard to beat yourself",
                        "If my head looks like an \"o\", what does my belly look like?",
                        "What does the squirrel do all the day?",
                        "I wonder what is inside the first house",
                        "I guess it's time for me to become a King",
                        "With a crown on your head, you just feel they will never hurt you",
                        "Look at all these flying sentences",
                        "Am I talking to myself?",
                        "There are three shark fins",
                        "Did you look under the carpet?",
                        "Look at this bar above",
                        "Maybe you could change its corners",
                        "Nonsense",
                        "Confidence confidence confidence",
                        "If there be no enemy there's no fight. If no fight, no victory and if no victory there is no crown",
                        "A crown is merely a hat that lets the rain in",
                        "I spent a lot of time with a crown on my head",
                        "Sometime I wish the aliens would abduct me and crown me as their leader",
                        "The crown of life is neither happiness nor annihilation; it is understanding",
                        "Tentacles tentacles tentacles"]), Random.flipACoin(), Random.between(1, 12)));
            }
            // Else, we have the crown
            else {
                // We possibly add the sentence
                if (this.sentences.length == 0 || Random.oneChanceOutOf(20))
                    this.sentences.push(new YourselfSentence(this, Random.fromArray(["You are very self-confident."]), Random.flipACoin(), Random.between(1, 12)));
            }
        }
        // Else, we decrease the timer
        else {
            this.sentencesTimer -= 1;
        }
        // Call the sentences update methods
        for (var i = 0; i < this.sentences.length; i++) {
            // If it should be deleted, we remove it from the array
            if (this.sentences[i].update()) {
                this.sentences.splice(i, 1);
                i--;
            }
        }
    };
    Yourself.prototype.thePlayerWon = function () {
        // If yourself is dead, we return true
        if (this.yourself.shouldDie())
            return true;
        // Else we return false
        return false;
    };
    return Yourself;
}(Quest));
//# sourceMappingURL=Yourself.js.map