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
var TheSeaPattern_BigSharks = /** @class */ (function (_super) {
    __extends(TheSeaPattern_BigSharks, _super);
    // Constructor
    function TheSeaPattern_BigSharks(theSea, initialDistance) {
        return _super.call(this, theSea, initialDistance) || this;
    }
    // Public methods
    TheSeaPattern_BigSharks.prototype.isPatternDone = function () {
        if (this.getTheSea().getDistance() > this.getInitialDistance() + 125)
            return true;
        return false;
    };
    TheSeaPattern_BigSharks.prototype.run = function (x1, x2) {
        if (this.getTheSea().getDistance() % 60 == 0)
            this.getTheSea().addBigShark(new Pos(x2, Random.fromArray([2, 6])));
    };
    return TheSeaPattern_BigSharks;
}(TheSeaPattern));
//# sourceMappingURL=TheSeaPattern_BigSharks.js.map