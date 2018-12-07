var TheSeaPatternLevel = /** @class */ (function () {
    // Constructor
    function TheSeaPatternLevel(theSea) {
        // How many patterns launched already ?
        this.howManyPatterns = 0;
        this.theSea = theSea;
    }
    // Public methods
    TheSeaPatternLevel.prototype.getNextLevel = function () {
        return new TheSeaPatternLevel(this.theSea);
    };
    TheSeaPatternLevel.prototype.getPattern = function (initialDistance) {
        return new TheSeaPattern(this.theSea, initialDistance);
    };
    TheSeaPatternLevel.prototype.increaseHowManyPatterns = function () {
        this.howManyPatterns += 1;
    };
    TheSeaPatternLevel.prototype.isLevelDone = function () {
        return false;
    };
    // Public getters
    TheSeaPatternLevel.prototype.getHowManyPatterns = function () {
        return this.howManyPatterns;
    };
    TheSeaPatternLevel.prototype.getTheSea = function () {
        return this.theSea;
    };
    return TheSeaPatternLevel;
}());
//# sourceMappingURL=TheSeaPatternLevel.js.map