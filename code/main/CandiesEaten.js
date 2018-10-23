///<reference path="StatusBarResource.ts"/>
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
var CandiesEaten = /** @class */ (function (_super) {
    __extends(CandiesEaten, _super);
    // Constructor
    function CandiesEaten(game, savingPrefix) {
        return _super.call(this, game, savingPrefix) || this;
    }
    // Public methods
    CandiesEaten.prototype.getCurrentAsString = function () {
        var n = this.getCurrent();
        if (n < 0)
            return "You have eaten negative candies ?!";
        else if (n == 1)
            return "You have eaten 1 candy";
        else {
            return "You have eaten " + Algo.numberToStringButNicely(n) + " candies";
        }
    };
    // Public setters
    CandiesEaten.prototype.setCurrent = function (n) {
        _super.prototype.setCurrent.call(this, n, true);
    };
    return CandiesEaten;
}(StatusBarResource));
//# sourceMappingURL=CandiesEaten.js.map