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
var TheCavePattern_MonkeyWizard = /** @class */ (function (_super) {
    __extends(TheCavePattern_MonkeyWizard, _super);
    // Constructor
    function TheCavePattern_MonkeyWizard(theCave) {
        return _super.call(this, theCave) || this;
    }
    // Public methods
    TheCavePattern_MonkeyWizard.prototype.draw = function (renderArea, x, y) {
        // Draw the monkey wizard
        renderArea.drawArray(Database.getAscii("places/theCave/monkeyWizard"), x + 32, y + 6, new RenderTransparency(" ", "%"));
        // Add the button & the link allowing the player to challenge him
        renderArea.addAsciiRealButton(Database.getText("theCavePattern_MonkeyWizardButton"), x + 39, y + 26, "theCavePattern_MonkeyWizardButton", Database.getTranslatedText("theCavePattern_MonkeyWizardButton"));
        renderArea.addLinkCall(".theCavePattern_MonkeyWizardButton", new CallbackCollection(this.challenge.bind(this)));
    };
    TheCavePattern_MonkeyWizard.prototype.ended = function () {
        return true;
    };
    TheCavePattern_MonkeyWizard.prototype.getSentence = function () {
        return "theCavePattern_MonkeyWizardSentence";
    };
    // Private methods
    TheCavePattern_MonkeyWizard.prototype.challenge = function () {
        if (this.getTheCave().getGame().canStartQuest())
            this.getTheCave().getGame().setPlace(new MonkeyWizardQuest(this.getTheCave().getGame()));
    };
    return TheCavePattern_MonkeyWizard;
}(TheCavePattern));
//# sourceMappingURL=TheCavePattern_MonkeyWizard.js.map