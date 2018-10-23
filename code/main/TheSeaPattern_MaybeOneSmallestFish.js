///<reference path="TheSeaPattern.ts"/>
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
var TheSeaPattern_MaybeOneSmallestFish = /** @class */ (function (_super) {
    __extends(TheSeaPattern_MaybeOneSmallestFish, _super);
    // Constructor
    function TheSeaPattern_MaybeOneSmallestFish(theSea, initialDistance) {
        return _super.call(this, theSea, initialDistance) || this;
    }
    // Public methods
    TheSeaPattern_MaybeOneSmallestFish.prototype.isPatternDone = function () {
        if (this.getTheSea().getDistance() > this.getInitialDistance() + 100)
            return true;
        return false;
    };
    TheSeaPattern_MaybeOneSmallestFish.prototype.run = function (x1, x2) {
        if (Random.flipACoin()) {
            this.getTheSea().addSmallestFish(new Pos(Random.between(x1, x2), Random.between(0, this.getTheSea().getRealQuestSize().y - this.getTheSea().getFloorMaxHeight() - 2)));
        }
    };
    return TheSeaPattern_MaybeOneSmallestFish;
}(TheSeaPattern));
//# sourceMappingURL=TheSeaPattern_MaybeOneSmallestFish.js.map