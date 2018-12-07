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
var TheSeaPattern_LotOfMiniSharks = /** @class */ (function (_super) {
    __extends(TheSeaPattern_LotOfMiniSharks, _super);
    // Constructor
    function TheSeaPattern_LotOfMiniSharks(theSea, initialDistance) {
        var _this = _super.call(this, theSea, initialDistance) || this;
        // Variables
        _this.sharksAdded = false;
        return _this;
    }
    // Public methods
    TheSeaPattern_LotOfMiniSharks.prototype.isPatternDone = function () {
        if (this.getTheSea().getDistance() > this.getInitialDistance() + 60)
            return true;
        return false;
    };
    TheSeaPattern_LotOfMiniSharks.prototype.run = function (x1, x2) {
        if (this.getTheSea().getDistance() > this.getInitialDistance() + 30 && this.sharksAdded == false) {
            this.sharksAdded = true;
            this.getTheSea().addMiniShark(new Pos(x1 + Random.upTo(6), 2));
            this.getTheSea().addMiniShark(new Pos(x1 + Random.upTo(6), 8));
            this.getTheSea().addMiniShark(new Pos(x1 + Random.upTo(6), 14));
        }
    };
    return TheSeaPattern_LotOfMiniSharks;
}(TheSeaPattern));
//# sourceMappingURL=TheSeaPattern_LotOfMiniSharks.js.map