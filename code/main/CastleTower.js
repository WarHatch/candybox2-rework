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
Saving.registerBool("castleTowerFirstVisitDone", false); // True if we already visited the tower at least once
// The following bools are true if we placed the corresponding stones in the tower
Saving.registerBool("castleTowerPStoneDone", false);
Saving.registerBool("castleTowerLStoneDone", false);
Saving.registerBool("castleTowerAStoneDone", false);
Saving.registerBool("castleTowerYStoneDone", false);
// Another one
Saving.registerBool("castleTowerTookTalkingCandy", false);
var CastleTower = /** @class */ (function (_super) {
    __extends(CastleTower, _super);
    // Constructor
    function CastleTower(game) {
        var _this = _super.call(this, game) || this;
        // The render area
        _this.renderArea = new RenderArea();
        // Byt default, the interval ID is set to null
        _this.intervalID = null;
        // Set the cut scene max timer
        _this.cutSceneMaxTimer = 72;
        // If it's the first time we visit the tower, we change the bool, set the timer and start the interval
        if (Saving.loadBool("castleTowerFirstVisitDone") == false) {
            Saving.saveBool("castleTowerFirstVisitDone", true);
            _this.cutSceneTimer = 0;
            _this.intervalID = setInterval(_this.actionInterval.bind(_this), 100);
        }
        // Else, we set the timer to the max timer value, no need to use it
        else {
            _this.cutSceneTimer = _this.cutSceneMaxTimer;
        }
        _this.renderArea.resize(100, 38);
        _this.update();
        return _this;
    }
    // getRenderArea()
    CastleTower.prototype.getRenderArea = function () {
        return this.renderArea;
    };
    // willStopBeingDisplayed()
    CastleTower.prototype.willStopBeingDisplayed = function () {
        // Clear the interval if the interval ID isn't null
        if (this.intervalID != null)
            clearInterval(this.intervalID);
    };
    // Private methods
    CastleTower.prototype.actionInterval = function () {
        // If the timer hasn't reached the max timer yet, we increase it and update
        if (this.cutSceneTimer < this.cutSceneMaxTimer) {
            this.cutSceneTimer += 1;
            this.update();
            this.getGame().updatePlace();
        }
    };
    CastleTower.prototype.clickedOnStone = function (ourSavingName) {
        // This stone is now in the tower
        Saving.saveBool(ourSavingName, true);
        // Update
        this.update();
        this.getGame().updatePlace();
    };
    CastleTower.prototype.drawBackground = function () {
        // Calculate the gap
        var gap = (this.cutSceneMaxTimer - this.cutSceneTimer);
        if (gap > 60)
            gap = 60;
        // Draw the background ascii art
        this.renderArea.drawArray(Database.getAscii("places/castle/tower/castleTower"), 5, 3 - gap);
    };
    CastleTower.prototype.drawTalkingCandy = function () {
        // If all the stones are in the tower AND we didn't already take the talking candy, we draw the key
        if (Saving.loadBool("castleTowerPStoneDone") && Saving.loadBool("castleTowerLStoneDone") && Saving.loadBool("castleTowerAStoneDone") && Saving.loadBool("castleTowerYStoneDone") && Saving.loadBool("castleTowerTookTalkingCandy") == false) {
            // Draw the ascii art
            this.renderArea.drawArray(Database.getAscii("places/castle/tower/talkingCandy"), 47, 22);
            // Draw the button
            this.renderArea.addMultipleAsciiButtons("castleTowerTalkingCandyButton", 47, 50, 22, 47, 50, 23);
            this.renderArea.addLinkCall(".castleTowerTalkingCandyButton", new CallbackCollection(this.takeTalkingCandy.bind(this)));
        }
    };
    CastleTower.prototype.drawStone = function (savingName, ourSavingName, asciiArtName, pos) {
        // If we have the stone but it isn't in the tower yet
        if (Saving.loadBool(savingName) == true && Saving.loadBool(ourSavingName) == false) {
            // We add the button to click on the stone
            this.renderArea.addMultipleAsciiButtons("castleTower" + savingName + "Button", pos.x + 3, pos.x + 8, pos.y, pos.x + 2, pos.x + 9, pos.y + 1, pos.x + 1, pos.x + 10, pos.y + 2, pos.x + 2, pos.x + 9, pos.y + 3, pos.x + 3, pos.x + 8, pos.y + 4);
            // Add the link
            this.renderArea.addLinkCall(".castleTower" + savingName + "Button", new CallbackCollection(this.clickedOnStone.bind(this, ourSavingName)));
        }
        // Else, if we have the stone and it is in the tower
        else if (Saving.loadBool(savingName) == true && Saving.loadBool(ourSavingName) == true) {
            // We draw the stone ascii art on the specified position
            this.renderArea.drawArray(Database.getAscii(asciiArtName), pos.x, pos.y - 1);
        }
    };
    CastleTower.prototype.drawStones = function () {
        // Calculate the gap
        var gap = (this.cutSceneMaxTimer - this.cutSceneTimer);
        if (gap > 60)
            gap = 60;
        // Draw the stones
        this.drawStone("gridItemPossessedP", "castleTowerPStoneDone", "gridItems/p", new Pos(25, 26 - gap));
        this.drawStone("gridItemPossessedL", "castleTowerLStoneDone", "gridItems/l", new Pos(38, 26 - gap));
        this.drawStone("gridItemPossessedA", "castleTowerAStoneDone", "gridItems/a", new Pos(51, 26 - gap));
        this.drawStone("gridItemPossessedY", "castleTowerYStoneDone", "gridItems/y", new Pos(64, 26 - gap));
    };
    CastleTower.prototype.takeTalkingCandy = function () {
        // We take the candy
        Saving.saveBool("castleTowerTookTalkingCandy", true);
        // We gain the corresponding item
        this.getGame().gainItem("gridItemPossessedTalkingCandy");
        // We update
        this.update();
        this.getGame().updatePlace();
    };
    CastleTower.prototype.update = function () {
        // Erase everything
        this.renderArea.resetAllButSize();
        // Back to the map button
        this.addBackToTheCastleButton(this.renderArea, "castleTowerBackToTheCastleButton");
        // Draw the background
        this.drawBackground();
        // Draw the stones related stuff
        this.drawStones();
        // Draw the talking candy related stuff
        this.drawTalkingCandy();
    };
    return CastleTower;
}(CastleRoom));
//# sourceMappingURL=CastleTower.js.map