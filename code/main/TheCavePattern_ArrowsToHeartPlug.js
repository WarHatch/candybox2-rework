///<reference path="TheCavePattern.ts"/>
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
var TheCavePattern_ArrowsToHeartPlug = /** @class */ (function (_super) {
    __extends(TheCavePattern_ArrowsToHeartPlug, _super);
    // Constructor
    function TheCavePattern_ArrowsToHeartPlug(theCave) {
        var _this = _super.call(this, theCave) || this;
        // Is the pattern stopped?
        _this.stopped = false;
        // Should we draw an arrow?
        _this.arrow = true;
        // Number of times the player correctly followed the arrows
        _this.followedNumber = 0;
        // Did we find the heart plug?
        _this.foundPlug = false;
        // Did we get the heart plug? (true if the player clicked on it)
        _this.gotPlug = false;
        // Choose a random direction
        _this.arrowAtRight = Random.flipACoin();
        return _this;
    }
    // Public methods
    TheCavePattern_ArrowsToHeartPlug.prototype.draw = function (renderArea, x, y) {
        // If we should draw an arrow
        if (this.arrow) {
            // Draw a different arrow depending on the direction
            if (this.arrowAtRight == true) {
                renderArea.drawString("->", x + 71, y + 17);
            }
            else {
                renderArea.drawString("<-", x + 26, y + 17);
            }
        }
        // If we found the plug and didn't pick it up yet
        if (this.foundPlug == true && this.gotPlug == false) {
            // Draw the plug ascii art
            renderArea.drawArray(Database.getAscii("places/theCave/heartPlug"), x + 46, y + 14);
            // Draw the button over the plug
            renderArea.addMultipleAsciiButtons("theCavePattern_ArrowsToHeartPlugButton", x + 46, x + 53, y + 14, x + 46, x + 53, y + 15);
            // Add the button link
            renderArea.addLinkCall(".theCavePattern_ArrowsToHeartPlugButton", new CallbackCollection(this.getPlug.bind(this)));
        }
    };
    TheCavePattern_ArrowsToHeartPlug.prototype.ended = function () {
        return this.stopped;
    };
    TheCavePattern_ArrowsToHeartPlug.prototype.getSentence = function () {
        // If we found the plug but didn't get it yet, we return the sentence
        if (this.foundPlug == true && this.gotPlug == false) {
            return "theCavePattern_ArrowsToHeartPlugSeeStrangePlug";
        }
        // Else, we return null
        return null;
    };
    TheCavePattern_ArrowsToHeartPlug.prototype.move = function (type) {
        // If the arrow is at right and we just went right or the arrow is at left and we just went left, we continue
        if ((this.arrowAtRight == true && type == TheCaveMoveType.RIGHT) ||
            (this.arrowAtRight == false && type == TheCaveMoveType.LEFT)) {
            // If we didn't find the plug yet
            if (this.foundPlug == false) {
                // If we followed at least six arrows
                if (this.followedNumber > 6) {
                    this.foundPlug = true;
                    this.arrow = false;
                }
                else {
                    // Possibly change the arrow direction
                    this.arrowAtRight = Random.flipACoin();
                    // Increase the followed number
                    this.followedNumber += 1;
                }
            }
            // Else, we found the plug, so we stop this pattern
            else
                this.stopped = true;
        }
        // Else, we stop
        else {
            this.stopped = true;
        }
    };
    // Private methods
    TheCavePattern_ArrowsToHeartPlug.prototype.getPlug = function () {
        // Get the plug
        this.getTheCave().getGame().gainItem("gridItemPossessedHeartPlug");
        this.gotPlug = true;
        // Ask the cave for an update
        this.getTheCave().aPatternNeedsUpdating();
    };
    return TheCavePattern_ArrowsToHeartPlug;
}(TheCavePattern));
//# sourceMappingURL=TheCavePattern_ArrowsToHeartPlug.js.map