var Pos = /** @class */ (function () {
    // Constructor
    function Pos(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    // Public methods
    Pos.prototype.add = function (pos) {
        this.x += pos.x;
        this.y += pos.y;
    };
    Pos.prototype.copy = function () {
        return new Pos(this.x, this.y);
    };
    Pos.prototype.getDistance = function (pos) {
        return new Pos(this.x - pos.x, this.y - pos.y);
    };
    Pos.prototype.invert = function () {
        var temp = this.x;
        this.x = this.y;
        this.y = temp;
    };
    Pos.prototype.multiply = function (pos) {
        this.x = this.x * pos.x;
        this.y = this.y * pos.y;
        return this;
    };
    Pos.prototype.plus = function (pos) {
        return new Pos(this.x + pos.x, this.y + pos.y);
    };
    return Pos;
}());
//# sourceMappingURL=Pos.js.map