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
var TheCavePattern_OctopusKing = /** @class */ (function (_super) {
    __extends(TheCavePattern_OctopusKing, _super);
    // Constructor
    function TheCavePattern_OctopusKing(theCave) {
        return _super.call(this, theCave) || this;
    }
    // Public methods
    TheCavePattern_OctopusKing.prototype.draw = function (renderArea, x, y) {
        // Draw the monkey wizard
        renderArea.drawArray(Database.getAscii("places/theCave/octopusKing"), x + 32, y + 6, new RenderTransparency(" ", "%"));
        // Add the button & the link allowing the player to challenge him
        renderArea.addAsciiRealButton(Database.getText("theCavePattern_OctopusKingButton"), x + 39, y + 26, "theCavePattern_OctopusKingButton", Database.getTranslatedText("theCavePattern_OctopusKingButton"));
        renderArea.addLinkCall(".theCavePattern_OctopusKingButton", new CallbackCollection(this.challenge.bind(this)));
    };
    TheCavePattern_OctopusKing.prototype.ended = function () {
        return true;
    };
    TheCavePattern_OctopusKing.prototype.getSentence = function () {
        return "theCavePattern_OctopusKingSentence";
    };
    // Private methods
    TheCavePattern_OctopusKing.prototype.challenge = function () {
        if (this.getTheCave().getGame().canStartQuest())
            this.getTheCave().getGame().setPlace(new OctopusKingQuest(this.getTheCave().getGame()));
    };
    return TheCavePattern_OctopusKing;
}(TheCavePattern));
//# sourceMappingURL=TheCavePattern_OctopusKing.js.map