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
Saving.registerBool("TheCavePattern_ChocolateBarNowGotTheBar", false);
var TheCavePattern_ChocolateBarNow = /** @class */ (function (_super) {
    __extends(TheCavePattern_ChocolateBarNow, _super);
    // Constructor
    function TheCavePattern_ChocolateBarNow(theCave) {
        var _this = _super.call(this, theCave) || this;
        // Did we clicked to get the bar?
        _this.gotTheBar = false;
        return _this;
    }
    // Public methods
    TheCavePattern_ChocolateBarNow.prototype.draw = function (renderArea, x, y) {
        // If we didn't pick the bar yet
        if (this.gotTheBar == false) {
            // Draw the bar ascii art
            renderArea.drawArray(Database.getAscii("places/theCave/chocolateBar"), x + 40, y + 25);
            // Draw the button over the plug
            renderArea.addMultipleAsciiButtons("theCavePattern_ChocolateBarNowButton", x + 40, x + 57, y + 26, x + 40, x + 57, y + 27);
            // Add the button link
            renderArea.addLinkCall(".theCavePattern_ChocolateBarNowButton", new CallbackCollection(this.getTheBar.bind(this)));
        }
    };
    TheCavePattern_ChocolateBarNow.prototype.ended = function () {
        return true;
    };
    TheCavePattern_ChocolateBarNow.prototype.getSentence = function () {
        // If we didn't pick the bar yet, we return the sentence
        if (this.gotTheBar == false) {
            return "theCavePattern_ChocolateBarNowSeeChocolateBar";
        }
        // Else, we return null
        return null;
    };
    // Private methods
    TheCavePattern_ChocolateBarNow.prototype.getTheBar = function () {
        // Get the bar
        this.getTheCave().getGame().getChocolateBars().add(1);
        this.gotTheBar = true;
        // We can't get the bar anymore (we can't start this pattern)
        Saving.saveBool("TheCavePattern_ChocolateBarNowGotTheBar", true);
        // Ask the cave for an update
        this.getTheCave().aPatternNeedsUpdating();
    };
    return TheCavePattern_ChocolateBarNow;
}(TheCavePattern));
//# sourceMappingURL=TheCavePattern_ChocolateBarNow.js.map