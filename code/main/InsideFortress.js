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
var InsideFortress = /** @class */ (function (_super) {
    __extends(InsideFortress, _super);
    // Constructor
    function InsideFortress(game) {
        var _this = _super.call(this, game) || this;
        // The render area
        _this.renderArea = new RenderArea();
        _this.renderArea.resizeFromArray(Database.getAscii("places/fortress/inside"), 0, 4);
        _this.update();
        return _this;
    }
    // getRenderArea()
    InsideFortress.prototype.getRenderArea = function () {
        return this.renderArea;
    };
    // Private methods
    InsideFortress.prototype.addFirstDoorButton = function (x, y) {
        // Add the button
        this.renderArea.addMultipleAsciiButtons("fortressInsideFirstDoorButton", x + 11, x + 14, y, x + 7, x + 14, y + 1, x + 3, x + 14, y + 2, x, x + 14, y + 3, x, x + 14, y + 4, x, x + 14, y + 5, x, x + 14, y + 6, x, x + 14, y + 7, x, x + 14, y + 8, x, x + 14, y + 9, x, x + 14, y + 10, x, x + 14, y + 11, x, x + 14, y + 12, x, x + 14, y + 13, x, x + 14, y + 14, x, x + 14, y + 15, x, x + 14, y + 16, x, x + 14, y + 17, x, x + 10, y + 18, x, x + 6, y + 19, x, x + 2, y + 20, x, x + 1, y + 21);
        // Add the link
        this.renderArea.addLinkCall(".fortressInsideFirstDoorButton", new CallbackCollection(this.goToFirstRoom.bind(this)));
    };
    InsideFortress.prototype.addSecondDoorButton = function (x, y) {
        // Add the button
        this.renderArea.addMultipleAsciiButtons("fortressInsideSecondDoorButton", x, x + 15, y, x, x + 15, y + 1, x, x + 15, y + 2, x, x + 15, y + 3, x, x + 15, y + 4, x, x + 15, y + 5, x, x + 15, y + 6, x, x + 15, y + 7, x, x + 15, y + 8, x, x + 15, y + 9, x, x + 15, y + 10, x, x + 15, y + 11, x, x + 15, y + 12, x, x + 15, y + 13, x, x + 15, y + 14, x, x + 15, y + 15, x, x + 15, y + 16, x, x + 15, y + 17);
        // Add the link
        this.renderArea.addLinkCall(".fortressInsideSecondDoorButton", new CallbackCollection(this.goToSecondRoom.bind(this)));
    };
    InsideFortress.prototype.addThirdDoorButton = function (x, y) {
        // Add the button
        this.renderArea.addMultipleAsciiButtons("fortressInsideThirdDoorButton", x, x + 3, y, x, x + 7, y + 1, x, x + 11, y + 2, x, x + 14, y + 3, x, x + 14, y + 4, x, x + 14, y + 5, x, x + 14, y + 6, x, x + 14, y + 7, x, x + 14, y + 8, x, x + 14, y + 9, x, x + 14, y + 10, x, x + 14, y + 11, x, x + 14, y + 12, x, x + 14, y + 13, x, x + 14, y + 14, x, x + 14, y + 15, x, x + 14, y + 16, x, x + 14, y + 17, x + 4, x + 14, y + 18, x + 8, x + 14, y + 19, x + 12, x + 14, y + 20, x + 13, x + 14, y + 21);
        // Add the link
        this.renderArea.addLinkCall(".fortressInsideThirdDoorButton", new CallbackCollection(this.goToThirdRoom.bind(this)));
    };
    InsideFortress.prototype.goToFirstRoom = function () {
        if (this.getGame().canStartQuest())
            this.getGame().setPlace(new FortressRoom1(this.getGame()));
    };
    InsideFortress.prototype.goToSecondRoom = function () {
        if (this.getGame().canStartQuest())
            this.getGame().setPlace(new FortressRoom2(this.getGame()));
    };
    InsideFortress.prototype.goToThirdRoom = function () {
        if (this.getGame().canStartQuest())
            this.getGame().setPlace(new FortressRoom3(this.getGame()));
    };
    InsideFortress.prototype.update = function () {
        // Erase everything
        this.renderArea.resetAllButSize();
        // Back to the map button
        this.addBackToMainMapButton(this.renderArea, "insideFortressBackToTheMapButton");
        // Draw the ascii
        this.renderArea.drawArray(Database.getAscii("places/fortress/inside"), 0, 3);
        // Add the text
        this.renderArea.drawString(Database.getText("fortressInsideText0"), 22, 29);
        this.renderArea.drawString(Database.getText("fortressInsideText1"), 22, 30);
        this.renderArea.drawString(Database.getText("fortressInsideText2"), 22, 31);
        // Add the translated text
        this.renderArea.drawString(Database.getTranslatedText("fortressInsideText0"), 22, 33, true);
        this.renderArea.drawString(Database.getTranslatedText("fortressInsideText1"), 22, 34, true);
        this.renderArea.drawString(Database.getTranslatedText("fortressInsideText2"), 22, 35, true);
        // Add the doors buttons
        this.addFirstDoorButton(8, 10);
        this.addSecondDoorButton(42, 8);
        this.addThirdDoorButton(78, 10);
    };
    return InsideFortress;
}(Place));
//# sourceMappingURL=InsideFortress.js.map