var RenderTransparency = /** @class */ (function () {
    // Constructor
    function RenderTransparency(alphaCharacter, metaAlphaCharacter) {
        if (metaAlphaCharacter === void 0) { metaAlphaCharacter = null; }
        this.alphaCharacter = alphaCharacter;
        this.metaAlphaCharacter = metaAlphaCharacter;
    }
    // Public getters
    RenderTransparency.prototype.getAlphaCharacter = function () {
        return this.alphaCharacter;
    };
    RenderTransparency.prototype.getMetaAlphaCharacter = function () {
        return this.metaAlphaCharacter;
    };
    return RenderTransparency;
}());
//# sourceMappingURL=RenderTransparency.js.map