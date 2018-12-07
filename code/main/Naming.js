var Naming = /** @class */ (function () {
    // Constructor
    function Naming(beginning, anywhere) {
        if (anywhere === void 0) { anywhere = null; }
        this.beginning = beginning;
        if (anywhere != null)
            this.anywhere = anywhere;
        else
            this.anywhere = this.beginning;
    }
    // Public getters
    Naming.prototype.getAnywhere = function () {
        return this.anywhere;
    };
    Naming.prototype.getBeginning = function () {
        return this.beginning;
    };
    return Naming;
}());
//# sourceMappingURL=Naming.js.map