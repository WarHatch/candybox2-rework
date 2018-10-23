///<reference path="CastleRoom.ts"/>
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
Saving.registerBool("dragonDone", false); // If true, it means we began talking to the dragon
Saving.registerBool("dragonUnlockedCyclops", false); // If true, we can ask the cyclops about the dragon
var Dragon = /** @class */ (function (_super) {
    __extends(Dragon, _super);
    // Constructor
    function Dragon(game) {
        var _this = _super.call(this, game) || this;
        // The render area
        _this.renderArea = new RenderArea();
        // Set the default step and player position
        if (Saving.loadBool("dragonDone") == false) { // If we never talked with the dragon yet
            _this.step = DragonStep.PLAYER_MOVING;
            _this.playerPos = 0;
        }
        else { // Else, we already talked with the dragon
            _this.step = DragonStep.TALKING;
            _this.playerPos = 60;
        }
        // Launch the interval and get the ID
        _this.timerIntervalID = setInterval(_this.actionInterval.bind(_this), 100);
        // Resize and update
        _this.renderArea.resizeFromArray(Database.getAscii("places/dragonFoot"), 0, 3);
        _this.update();
        return _this;
    }
    // getRenderArea()
    Dragon.prototype.getRenderArea = function () {
        return this.renderArea;
    };
    // willStopBeingDisplayed()
    Dragon.prototype.willStopBeingDisplayed = function () {
        clearInterval(this.timerIntervalID);
    };
    // Private methods
    Dragon.prototype.actionInterval = function () {
        // Do something different depending on the step
        switch (this.step) {
            case DragonStep.PLAYER_MOVING:
                // Move the player
                this.playerPos += 1;
                if (this.playerPos >= 60) { // If we made it to the dragon
                    // We're now attacking
                    this.step = DragonStep.PLAYER_ATTACKING;
                    // Set the countdown
                    this.playerAttackingCountdown = 40;
                }
                // Update
                this.update();
                this.getGame().updatePlace();
                break;
            case DragonStep.PLAYER_ATTACKING:
                // Lower the countdown
                this.playerAttackingCountdown -= 1;
                if (this.playerAttackingCountdown < 0) { // If it's time to stop attacking
                    // We're now "stop tickling"
                    this.step = DragonStep.STOP_TICKLING;
                }
                // Update
                this.update();
                this.getGame().updatePlace();
                break;
        }
    };
    Dragon.prototype.chooseCandies = function () {
        // Change the step
        this.step = DragonStep.TALKING_CANDIES;
        // Set the bool
        Saving.saveBool("dragonUnlockedCyclops", true);
        // Update
        this.update();
        this.getGame().updatePlace();
    };
    Dragon.prototype.chooseChallenge = function () {
        // Change the step
        this.step = DragonStep.TALKING_CHALLENGE;
        // Update
        this.update();
        this.getGame().updatePlace();
    };
    Dragon.prototype.chooseFame = function () {
        // Change the step
        this.step = DragonStep.TALKING_FAME;
        // Update
        this.update();
        this.getGame().updatePlace();
    };
    Dragon.prototype.drawPlayer = function (x, y) {
        if (y === void 0) { y = 26; }
        this.renderArea.drawString("\\o/", x, y);
    };
    Dragon.prototype.goToDeveloper = function () {
        this.getGame().setPlace(new Developer(this.getGame()));
    };
    Dragon.prototype.goToHell = function () {
        this.getGame().setPlace(new Hell(this.getGame()));
    };
    Dragon.prototype.okayStopTickling = function () {
        if (this.step == DragonStep.STOP_TICKLING) {
            // Change the step
            this.step = DragonStep.TALKING;
            // Set the bool
            Saving.saveBool("dragonDone", true);
            // Update
            this.update();
            this.getGame().updatePlace();
        }
    };
    Dragon.prototype.update = function () {
        // Erase everything
        this.renderArea.resetAllButSize();
        // Back to the map button
        this.addBackToTheCastleButton(this.renderArea, "dragonBackToTheCastleButton");
        // Draw the ascii
        this.renderArea.drawArray(Database.getAscii("places/dragonFoot"), 0, 3);
        // Draw something different depending on the step
        switch (this.step) {
            case DragonStep.PLAYER_MOVING:
                // Draw the player (eventually going down the stairs at the beginning)
                this.drawPlayer(this.playerPos, 20 + (this.playerPos < 21 ? (Math.floor(this.playerPos / 3)) : 6));
                break;
            case DragonStep.PLAYER_ATTACKING:
                // Draw the player
                this.drawPlayer(this.playerPos);
                // Draw the dragon fake health bar
                this.renderArea.drawString("|             A dragon foot : so much hp/so much hp             |", 45, 11);
                this.renderArea.addBackgroundColor(46, 109, 11, new Color(ColorType.HEALTH_GREEN));
                break;
            case DragonStep.STOP_TICKLING:
                // Draw the player
                this.drawPlayer(this.playerPos);
                // Draw the speech
                this.renderArea.drawSpeech(Database.getText("dragonStopTickling"), 5, 50, 78, "dragonStopTicklingSpeech", Database.getTranslatedText("dragonStopTickling"));
                // Add the button
                this.renderArea.addAsciiRealButton(Database.getText("dragonStopTicklingButton"), 50, 9, "dragonStopTicklingButton", Database.getTranslatedText("dragonStopTicklingButton"), true);
                this.renderArea.addLinkCall(".dragonStopTicklingButton", new CallbackCollection(this.okayStopTickling.bind(this)));
                break;
            case DragonStep.TALKING:
                // Draw the player
                this.drawPlayer(this.playerPos);
                // Draw the speech
                this.renderArea.drawSpeech(Database.getText("dragonTalking"), 5, 50, 78, "dragonTalkingSpeech", Database.getTranslatedText("dragonTalking"));
                // Add the challenge button
                this.renderArea.addAsciiRealButton(Database.getText("dragonTalkingChallengeButton"), 82, 5, "dragonTalkingChallengeButton", Database.getTranslatedText("dragonTalkingChallengeButton"));
                this.renderArea.addLinkCall(".dragonTalkingChallengeButton", new CallbackCollection(this.chooseChallenge.bind(this)));
                // Add the fame button
                this.renderArea.addAsciiRealButton(Database.getText("dragonTalkingFameButton"), 82, 7, "dragonTalkingFameButton", Database.getTranslatedText("dragonTalkingFameButton"));
                this.renderArea.addLinkCall(".dragonTalkingFameButton", new CallbackCollection(this.chooseFame.bind(this)));
                // Add the candies button
                this.renderArea.addAsciiRealButton(Database.getText("dragonTalkingCandiesButton"), 82, 9, "dragonTalkingCandiesButton", Database.getTranslatedText("dragonTalkingCandiesButton"));
                this.renderArea.addLinkCall(".dragonTalkingCandiesButton", new CallbackCollection(this.chooseCandies.bind(this)));
                break;
            case DragonStep.TALKING_CHALLENGE:
                // Draw the player
                this.drawPlayer(this.playerPos);
                // Draw the speech
                this.renderArea.drawSpeech(Database.getText("dragonTalkingChallengeSpeech"), 5, 50, 78, "dragonTalkingChallengeSpeech", Database.getTranslatedText("dragonTalkingChallengeSpeech"));
                // Add the button
                this.renderArea.addAsciiRealButton(Database.getText("dragonTalkingChallengeAnswer"), 82, 5, "dragonTalkingChallengeAnswer", Database.getTranslatedText("dragonTalkingChallengeAnswer"));
                this.renderArea.addLinkCall(".dragonTalkingChallengeAnswer", new CallbackCollection(this.goToHell.bind(this)));
                break;
            case DragonStep.TALKING_FAME:
                // Draw the player
                this.drawPlayer(this.playerPos);
                // Draw the speech
                this.renderArea.drawSpeech(Database.getText("dragonTalkingFameSpeech"), 5, 50, 78, "dragonTalkingFameSpeech", Database.getTranslatedText("dragonTalkingFameSpeech"));
                // Add the button
                this.renderArea.addAsciiRealButton(Database.getText("dragonTalkingFameAnswer"), 82, 7, "dragonTalkingFameAnswer", Database.getTranslatedText("dragonTalkingFameAnswer"));
                this.renderArea.addLinkCall(".dragonTalkingFameAnswer", new CallbackCollection(this.goToDeveloper.bind(this)));
                break;
            case DragonStep.TALKING_CANDIES:
                // Draw the player
                this.drawPlayer(this.playerPos);
                // Draw the speech
                this.renderArea.drawSpeech(Database.getText("dragonTalkingCandiesSpeech"), 5, 50, 78, "dragonTalkingCandiesSpeech", Database.getTranslatedText("dragonTalkingCandiesSpeech"));
                // Add the button
                this.renderArea.addAsciiRealButton(Database.getText("dragonTalkingCandiesAnswer"), 82, 9, "dragonTalkingCandiesAnswer", Database.getTranslatedText("dragonTalkingCandiesAnswer"));
                this.renderArea.addLinkCall(".dragonTalkingCandiesAnswer", new CallbackCollection(this.getGame().goToCastle.bind(this.getGame())));
                break;
        }
    };
    return Dragon;
}(CastleRoom));
//# sourceMappingURL=Dragon.js.map