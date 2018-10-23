///<reference path="Place.ts"/>
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
var Moutains = /** @class */ (function (_super) {
    __extends(Moutains, _super);
    // Constructor
    function Moutains(game) {
        var _this = _super.call(this, game) || this;
        // The render area
        _this.renderArea = new RenderArea();
        _this.renderArea.resizeFromArray(Database.getAscii("places/mountains"), 0, 10);
        _this.update();
        return _this;
    }
    // getRenderArea()
    Moutains.prototype.getRenderArea = function () {
        return this.renderArea;
    };
    // Private methods
    Moutains.prototype.getPogoStick = function () {
        // Get the pogo stick
        this.getGame().gainItem("gridItemPossessedPogoStick");
        // Update
        this.update();
        this.getGame().updatePlace();
    };
    Moutains.prototype.update = function () {
        // Erase everything
        this.renderArea.resetAllButSize();
        // Back to the map button
        this.addBackToMainMapButton(this.renderArea, "mountainsBackToTheMapButton");
        // Draw the moutains
        this.renderArea.drawArray(Database.getAscii("places/mountains"), 0, 3);
        // If we didn't get the pogo stick yet
        if (Saving.loadBool("gridItemPossessedPogoStick") == false) {
            // Add the "*" showing that there's a pogo stick here
            this.renderArea.drawString("*", 52, 11);
            // Draw the text
            this.renderArea.drawString(Database.getText("mountainsText0"), 19, 22);
            this.renderArea.drawString(Database.getText("mountainsText1"), 19, 23);
            // Add the button
            this.renderArea.addAsciiRealButton(Database.getText("mountainsTextButton"), 19, 25, "mountainsClimbButton", Database.getTranslatedText("mountainsTextButton"));
            this.renderArea.addLinkCall(".mountainsClimbButton", new CallbackCollection(this.getPogoStick.bind(this)));
            // Draw the translated text
            this.renderArea.drawString(Database.getTranslatedText("mountainsText0"), 19, 27, true);
            this.renderArea.drawString(Database.getTranslatedText("mountainsText1"), 19, 28, true);
        }
        // Else, we already found it
        else {
            this.renderArea.drawString(Database.getText("mountainsTextAfter"), 19, 22);
            this.renderArea.drawString(Database.getTranslatedText("mountainsTextAfter"), 19, 24, true);
        }
    };
    return Moutains;
}(Place));
//# sourceMappingURL=Moutains.js.map