var CauldronFlame = /** @class */ (function () {
    // Constructor
    function CauldronFlame(pos, character) {
        this.pos = pos;
        this.character = character;
    }
    // Public methods
    CauldronFlame.prototype.draw = function (renderArea, x, y) {
        renderArea.drawString(this.character, x + this.pos.x, y + this.pos.y);
    };
    return CauldronFlame;
}());
//# sourceMappingURL=CauldronFlame.js.map