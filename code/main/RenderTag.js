var RenderTag = /** @class */ (function () {
    // Constructor
    function RenderTag(x, tagString) {
        this.x = x;
        this.tagString = tagString;
    }
    // Public methods
    RenderTag.prototype.clone = function () {
        return new RenderTag(this.x, this.tagString);
    };
    RenderTag.prototype.draw = function (str) {
        return str.addAt(this.x, this.tagString);
    };
    // Public getters
    RenderTag.prototype.getString = function () {
        return this.tagString;
    };
    RenderTag.prototype.getX = function () {
        return this.x;
    };
    // Public setters
    RenderTag.prototype.setX = function (x) {
        this.x = x;
        return this;
    };
    return RenderTag;
}());
//# sourceMappingURL=RenderTag.js.map