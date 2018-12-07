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
var TheSeaPattern_JellyFishStorm = /** @class */ (function (_super) {
    __extends(TheSeaPattern_JellyFishStorm, _super);
    // Constructor
    function TheSeaPattern_JellyFishStorm(theSea, initialDistance) {
        return _super.call(this, theSea, initialDistance) || this;
    }
    // Public methods
    TheSeaPattern_JellyFishStorm.prototype.isPatternDone = function () {
        if (this.getTheSea().getDistance() > this.getInitialDistance() + 100)
            return true;
        return false;
    };
    TheSeaPattern_JellyFishStorm.prototype.run = function (x1, x2) {
        if (Random.oneChanceOutOf(10))
            this.getTheSea().addJellyFish(new Pos(Random.between(x1, x2), Random.between(0, this.getTheSea().getRealQuestSize().y - this.getTheSea().getFloorMaxHeight() - 6)));
    };
    return TheSeaPattern_JellyFishStorm;
}(TheSeaPattern));
//# sourceMappingURL=TheSeaPattern_JellyFishStorm.js.map