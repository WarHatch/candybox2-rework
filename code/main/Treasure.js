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
var Treasure = /** @class */ (function (_super) {
    __extends(Treasure, _super);
    // Constructor
    function Treasure(game) {
        var _this = _super.call(this, game) || this;
        // The render area
        _this.renderArea = new RenderArea();
        _this.renderArea.resizeFromArray(Database.getAscii("places/treasure"), 57, 3);
        _this.update();
        return _this;
    }
    // getRenderArea()
    Treasure.prototype.getRenderArea = function () {
        return this.renderArea;
    };
    // Private methods
    Treasure.prototype.dig = function () {
        // We found the treasure
        Saving.saveBool("TheCavePattern_TreasureMapFoundTreasure", true);
        // Get it
        this.getGame().getChocolateBars().add(3);
        // Update
        this.update();
        this.getGame().updatePlace();
    };
    Treasure.prototype.update = function () {
        // Erase everything
        this.renderArea.resetAllButSize();
        // Back to the map button
        this.addBackToMainMapButton(this.renderArea, "treasureBackToTheMapButton");
        // Draw the ascii
        this.renderArea.drawArray(Database.getAscii("places/treasure"), 28, 3);
        // If we didn't find the treasure yet
        if (Saving.loadBool("TheCavePattern_TreasureMapFoundTreasure") == false) {
            // Add the button to get the treasure
            this.renderArea.addAsciiRealButton(Database.getText("treasureButtonDig"), 49, 14, "treasureButton", Database.getTranslatedText("treasureButtonDig"), true, -1, null, false);
            this.renderArea.addLinkCall(".treasureButton", new CallbackCollection(this.dig.bind(this)));
        }
        // Else, we found the treasure
        else {
            // Add the text
            this.renderArea.drawString(Database.getText("treasureButtonYouFound"), 49, 14);
            this.renderArea.drawString(Database.getTranslatedText("treasureButtonYouFound"), 49, 15, true);
        }
    };
    return Treasure;
}(Place));
//# sourceMappingURL=Treasure.js.map