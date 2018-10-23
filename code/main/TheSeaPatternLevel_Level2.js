///<reference path="TheSeaPatternLevel.ts"/>
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
var TheSeaPatternLevel_Level2 = /** @class */ (function (_super) {
    __extends(TheSeaPatternLevel_Level2, _super);
    // Constructor
    function TheSeaPatternLevel_Level2(theSea) {
        return _super.call(this, theSea) || this;
    }
    // Public methods
    TheSeaPatternLevel_Level2.prototype.getNextLevel = function () {
        return new TheSeaPatternLevel_Level2(this.getTheSea());
    };
    TheSeaPatternLevel_Level2.prototype.getPattern = function (initialDistance) {
        this.increaseHowManyPatterns();
        // If this is the first pattern, then we return the big sharks pattern
        if (this.getHowManyPatterns() == 1)
            return new TheSeaPattern_BigSharks(this.getTheSea(), initialDistance);
        // Else, we return the sea snakes pattern
        else
            return new TheSeaPattern_SeaSnakesForever(this.getTheSea(), initialDistance);
    };
    TheSeaPatternLevel_Level2.prototype.isLevelDone = function () {
        return false;
    };
    return TheSeaPatternLevel_Level2;
}(TheSeaPatternLevel));
//# sourceMappingURL=TheSeaPatternLevel_Level2.js.map