var CauldronActionLogEntry = /** @class */ (function () {
    // Constructor
    function CauldronActionLogEntry(action, time, candies, lollipops) {
        this.action = action;
        this.time = time;
        this.candies = candies;
        this.lollipops = lollipops;
    }
    // Public getters
    CauldronActionLogEntry.prototype.getAction = function () {
        return this.action;
    };
    CauldronActionLogEntry.prototype.getCandies = function () {
        return this.candies;
    };
    CauldronActionLogEntry.prototype.getLollipops = function () {
        return this.lollipops;
    };
    CauldronActionLogEntry.prototype.getTime = function () {
        return this.time;
    };
    return CauldronActionLogEntry;
}());
//# sourceMappingURL=CauldronActionLogEntry.js.map