var PondLine = /** @class */ (function () {
    // Constructor
    function PondLine(x1, x2) {
        // Is the line currently used by a lolligator ?
        this.isUsed = false;
        this.x1 = x1;
        this.x2 = x2;
    }
    // Public getters
    PondLine.prototype.getIsUsed = function () {
        return this.isUsed;
    };
    PondLine.prototype.getX1 = function () {
        return this.x1;
    };
    PondLine.prototype.getX2 = function () {
        return this.x2;
    };
    // Public setters
    PondLine.prototype.setIsUsed = function (isUsed) {
        this.isUsed = isUsed;
    };
    return PondLine;
}());
//# sourceMappingURL=PondLine.js.map