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
var TheCaveExit = /** @class */ (function (_super) {
    __extends(TheCaveExit, _super);
    // Constructor
    function TheCaveExit(game) {
        var _this = _super.call(this, game) || this;
        // The render area
        _this.renderArea = new RenderArea();
        _this.renderArea.resizeFromArray(Database.getAscii("places/theCave/exit"), 42, 3);
        _this.update();
        return _this;
    }
    // getRenderArea()
    TheCaveExit.prototype.getRenderArea = function () {
        return this.renderArea;
    };
    // Private methods
    TheCaveExit.prototype.update = function () {
        // Erase everything
        this.renderArea.resetAllButSize();
        // Draw the background
        this.renderArea.drawArray(Database.getAscii("places/theCave/exit"), 21, 3);
        // Draw the text
        this.renderArea.drawString(Database.getText("theCaveExitText0"), 30, 3);
        this.renderArea.drawString(Database.getText("theCaveExitText1"), 30, 4);
        // Draw the translated text
        this.renderArea.drawString(Database.getTranslatedText("theCaveExitText0"), 30, 6, true);
        this.renderArea.drawString(Database.getTranslatedText("theCaveExitText1"), 30, 7, true);
        // Add the button to return to the main map
        this.renderArea.addAsciiRealButton(Database.getText("theCaveExitButtonText"), 41, 20, "theCaveExitReturnToMapButton", Database.getTranslatedText("theCaveExitButtonText"), true);
        this.renderArea.addLinkCall(".theCaveExitReturnToMapButton", new CallbackCollection(this.getGame().goToMainMap.bind(this.getGame())));
    };
    return TheCaveExit;
}(Place));
//# sourceMappingURL=TheCaveExit.js.map