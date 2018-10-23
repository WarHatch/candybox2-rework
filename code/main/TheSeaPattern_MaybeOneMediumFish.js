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
var TheSeaPattern_MaybeOneMediumFish = /** @class */ (function (_super) {
    __extends(TheSeaPattern_MaybeOneMediumFish, _super);
    // Constructor
    function TheSeaPattern_MaybeOneMediumFish(theSea, initialDistance) {
        return _super.call(this, theSea, initialDistance) || this;
    }
    // Public methods
    TheSeaPattern_MaybeOneMediumFish.prototype.isPatternDone = function () {
        if (this.getTheSea().getDistance() > this.getInitialDistance() + 100)
            return true;
        return false;
    };
    TheSeaPattern_MaybeOneMediumFish.prototype.run = function (x1, x2) {
        if (Random.oneChanceOutOf(5)) {
            this.getTheSea().addMediumFish(new Pos(Random.between(x1, x2), Random.between(0, this.getTheSea().getRealQuestSize().y - this.getTheSea().getFloorMaxHeight() - 4)));
        }
    };
    return TheSeaPattern_MaybeOneMediumFish;
}(TheSeaPattern));
//# sourceMappingURL=TheSeaPattern_MaybeOneMediumFish.js.map