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
var Pier = /** @class */ (function (_super) {
    __extends(Pier, _super);
    // Constructor
    function Pier(game) {
        var _this = _super.call(this, game) || this;
        // The render area
        _this.renderArea = new RenderArea();
        _this.renderArea.resizeFromArray(Database.getAscii("places/pier"), 0, 6);
        _this.update();
        return _this;
    }
    // getRenderArea()
    Pier.prototype.getRenderArea = function () {
        return this.renderArea;
    };
    // Private methods
    Pier.prototype.addLighthouseButton = function (x, y) {
        this.renderArea.addAsciiRealButton(Database.getText("pierLighthouseButton"), x, y, "pierLighthouseButton", Database.getTranslatedText("pierLighthouseButton"), true);
        this.renderArea.addLinkCall(".pierLighthouseButton", new CallbackCollection(this.clickedOnLighthouseButton.bind(this), this.getGame().goToLighthouse.bind(this.getGame())));
    };
    Pier.prototype.addTheSeaButton = function (x, y) {
        this.renderArea.addAsciiRealButton(Database.getText("pierTheSeaButton"), x, y, "pierTheSeaButton", Database.getTranslatedText("pierTheSeaButton"), true);
        this.renderArea.addLinkCall(".pierTheSeaButton", new CallbackCollection(this.goToTheSea.bind(this)));
    };
    Pier.prototype.clickedOnLighthouseButton = function () {
        Saving.saveBool("mainMapDonePier", true);
    };
    Pier.prototype.goToTheSea = function () {
        if (this.getGame().canStartQuest())
            this.getGame().setPlace(new TheSea(this.getGame()));
    };
    Pier.prototype.update = function () {
        // Erase everything
        this.renderArea.resetAllButSize();
        // Back to the map button
        this.addBackToMainMapButton(this.renderArea, "thePierBackToTheMapButton");
        // Draw the pier
        this.renderArea.drawArray(Database.getAscii("places/pier"), 0, 3);
        // Add the button to go to the lighthouse
        this.addLighthouseButton(3, 27);
        // Add the button to jump into the sea
        this.addTheSeaButton(52, 9);
    };
    return Pier;
}(Place));
//# sourceMappingURL=Pier.js.map