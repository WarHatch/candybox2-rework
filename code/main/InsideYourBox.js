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
var InsideYourBox = /** @class */ (function (_super) {
    __extends(InsideYourBox, _super);
    // Constructor
    function InsideYourBox(game) {
        var _this = _super.call(this, game) || this;
        // The render area
        _this.renderArea = new RenderArea();
        // The sweets
        _this.sweets = [];
        // Launch the interval
        _this.intervalID = setInterval(_this.actionInterval.bind(_this), 100);
        // Resize and update
        _this.renderArea.resize(100, 40);
        _this.update();
        return _this;
    }
    // getRenderArea()
    InsideYourBox.prototype.getRenderArea = function () {
        return this.renderArea;
    };
    // willStopBeingDisplayed()
    InsideYourBox.prototype.willStopBeingDisplayed = function () {
        clearInterval(this.intervalID);
    };
    // Private methods
    InsideYourBox.prototype.actionInterval = function () {
        // Update
        this.update();
        this.getGame().updatePlace();
    };
    InsideYourBox.prototype.update = function () {
        // Erase everything
        this.renderArea.resetAllButSize();
        // Add a sweet
        this.sweets.push(new InsideYourBoxSweet());
        // Update the sweets and delete the one which need to be deleted
        for (var i = 0; i < this.sweets.length; i++) {
            if (this.sweets[i].update()) {
                this.sweets.splice(i, 1);
                i--;
            }
        }
        // Draw the sweets
        for (var i = 0; i < this.sweets.length; i++) {
            this.sweets[i].draw(this.renderArea);
        }
        // Draw the text
        this.renderArea.drawArray(Database.getAscii("general/insideYourBox/text"), 0, 5, new RenderTransparency(" ", "%"));
    };
    return InsideYourBox;
}(Place));
//# sourceMappingURL=InsideYourBox.js.map