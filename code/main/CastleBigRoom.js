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
// Is the hoven happy? He is if he cooked something at least once
Saving.registerBool("castleBigRoomHovenHappy", false);
var CastleBigRoom = /** @class */ (function (_super) {
    __extends(CastleBigRoom, _super);
    // Constructor
    function CastleBigRoom(game) {
        var _this = _super.call(this, game) || this;
        // The render area
        _this.renderArea = new RenderArea();
        // At first the hoven is waiting
        _this.hovenWaiting = true;
        // Set the default speech, depending on if the hoven is happy or not
        if (Saving.loadBool("castleBigRoomHovenHappy") == false) {
            _this.currentSpeech = "castleBigRoomHovenSpeechSad";
        }
        else {
            _this.currentSpeech = "castleBigRoomHovenSpeechHappy";
        }
        // Resize the area and update
        _this.renderArea.resize(160, 30);
        _this.update();
        return _this;
    }
    // getRenderArea()
    CastleBigRoom.prototype.getRenderArea = function () {
        return this.renderArea;
    };
    // update()
    CastleBigRoom.prototype.update = function () {
        // Reset the area
        this.renderArea.resetAllButSize();
        // Add the button to go back to the castle
        this.addBackToTheCastleButton(this.renderArea, "castleBigRoomBackToTheCastleButton");
        // Draw the background
        this.drawBackground(0, 3);
        // Draw the speech
        this.drawSpeech(83, 10);
        // If the hoven is waiting, we add the button to give it the sweets
        if (this.hovenWaiting) {
            this.renderArea.addAsciiRealButton(Database.getText("castleBigRoomHovenLetHovenTakeButton"), 83, 19, "castleBigRoomLetHovenTakeButton", Database.getTranslatedText("castleBigRoomHovenLetHovenTakeButton"), true);
            this.renderArea.addLinkCall(".castleBigRoomLetHovenTakeButton", new CallbackCollection(this.letHovenTake.bind(this)));
        }
        // Else, we add the "thanks" button
        else {
            this.renderArea.addAsciiRealButton(Database.getText("castleBigRoomHovenThanks"), 83, 19, "castleBigRoomThanksButton", Database.getTranslatedText("castleBigRoomHovenThanks"), true);
            this.renderArea.addLinkCall(".castleBigRoomThanksButton", new CallbackCollection(this.thanksHoven.bind(this)));
        }
    };
    // Private methods
    CastleBigRoom.prototype.drawBackground = function (x, y) {
        // Draw the background ascii art
        this.renderArea.drawArray(Database.getAscii("places/castle/bigRoom/background"), x, y);
        // If the hoven is happy, change its face
        if (Saving.loadBool("castleBigRoomHovenHappy")) {
            this.renderArea.drawString("^       ^", x + 61, y + 9);
            this.renderArea.drawString("         ", x + 61, y + 10);
            this.renderArea.drawString("  '-.-'  ", x + 61, y + 11);
        }
    };
    CastleBigRoom.prototype.drawSpeech = function (x, y) {
        this.renderArea.drawSpeech(Database.getText(this.currentSpeech), y, x, x + 30, "CastleBigRoomHovenSpeech", Database.getTranslatedText(this.currentSpeech));
    };
    CastleBigRoom.prototype.letHovenTake = function () {
        // If we have enough sweets
        if (this.getGame().getCandies().getCurrent() >= 100 && this.getGame().getChocolateBars().getCurrent() >= 1) {
            // We spend the sweets
            this.getGame().getCandies().add(-100);
            this.getGame().getChocolateBars().add(-1);
            // The hoven is now happy
            Saving.saveBool("castleBigRoomHovenHappy", true);
            // The hoven isn't waiting anymore
            this.hovenWaiting = false;
            // We set the new speech
            this.currentSpeech = "castleBigRoomHovenSpeechMadePainAuChocolat";
            // We add the pain au chocolat
            this.getGame().getPainsAuChocolat().add(1);
        }
        // Else, we don't have enough sweets
        else {
            // If the hoven isn't happy
            if (Saving.loadBool("castleBigRoomHovenHappy") == false) {
                this.currentSpeech = "castleBigRoomHovenNotEnough";
            }
            // Else, if it is happy
            else {
                this.currentSpeech = "castleBigRoomHovenSpeechHappyNotEnough";
            }
        }
        // We update
        this.update();
        this.getGame().updatePlace();
    };
    CastleBigRoom.prototype.thanksHoven = function () {
        // The hoven is now waiting
        this.hovenWaiting = true;
        // Set the new speech
        this.currentSpeech = "castleBigRoomHovenSpeechHappy";
        // Update
        this.update();
        this.getGame().updatePlace();
    };
    return CastleBigRoom;
}(CastleRoom));
//# sourceMappingURL=CastleBigRoom.js.map