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
var TheSeaPatternLevel_Boss1 = /** @class */ (function (_super) {
    __extends(TheSeaPatternLevel_Boss1, _super);
    // Constructor
    function TheSeaPatternLevel_Boss1(theSea) {
        return _super.call(this, theSea) || this;
    }
    // Public methods
    TheSeaPatternLevel_Boss1.prototype.getNextLevel = function () {
        return new TheSeaPatternLevel_Level2(this.getTheSea());
    };
    TheSeaPatternLevel_Boss1.prototype.getPattern = function (initialDistance) {
        this.increaseHowManyPatterns();
        return new TheSeaPattern_Boss1_Seahorses(this.getTheSea(), initialDistance);
    };
    TheSeaPatternLevel_Boss1.prototype.isLevelDone = function () {
        if (this.getHowManyPatterns() >= 1)
            return true;
        return false;
    };
    return TheSeaPatternLevel_Boss1;
}(TheSeaPatternLevel));
//# sourceMappingURL=TheSeaPatternLevel_Boss1.js.map