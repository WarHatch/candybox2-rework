var TheSeaPattern = /** @class */ (function () {
    // Constructor
    function TheSeaPattern(theSea, initialDistance) {
        this.theSea = theSea;
        this.initialDistance = initialDistance;
    }
    // Public methods
    TheSeaPattern.prototype.isPatternDone = function () {
        return false;
    };
    TheSeaPattern.prototype.run = function (x1, x2) {
    };
    // Public getters
    TheSeaPattern.prototype.getInitialDistance = function () {
        return this.initialDistance;
    };
    TheSeaPattern.prototype.getTheSea = function () {
        return this.theSea;
    };
    return TheSeaPattern;
}());
//# sourceMappingURL=TheSeaPattern.js.map