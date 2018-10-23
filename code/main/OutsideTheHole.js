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
var OutsideTheHole = /** @class */ (function (_super) {
    __extends(OutsideTheHole, _super);
    // Constructor
    function OutsideTheHole(game) {
        var _this = _super.call(this, game) || this;
        // The render area
        _this.renderArea = new RenderArea();
        _this.renderArea.resizeFromArray(Database.getAscii("places/outsideTheHole"), 0, 4);
        _this.update();
        return _this;
    }
    // getRenderArea()
    OutsideTheHole.prototype.getRenderArea = function () {
        return this.renderArea;
    };
    // Private methods 
    OutsideTheHole.prototype.jump = function () {
        this.getGame().setPlace(new TheHole(this.getGame()));
    };
    OutsideTheHole.prototype.update = function () {
        // Erase everything
        this.renderArea.resetAllButSize();
        // Back to the map button
        this.addBackToMainMapButton(this.renderArea, "theHoleBackToTheMapButton");
        // Draw the ascii
        this.renderArea.drawArray(Database.getAscii("places/outsideTheHole"), 0, 3);
        // Add the button to jump in the hole
        this.renderArea.addAsciiRealButton(Database.getText("outsideTheHoleButton"), 34, 23, "outsideTheHoleButton", Database.getTranslatedText("outsideTheHoleButton"), true);
        this.renderArea.addLinkCall(".outsideTheHoleButton", new CallbackCollection(this.jump.bind(this)));
    };
    return OutsideTheHole;
}(Place));
//# sourceMappingURL=OutsideTheHole.js.map