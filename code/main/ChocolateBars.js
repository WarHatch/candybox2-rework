///<reference path="StatusBarResource.ts"/>
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
var ChocolateBars = /** @class */ (function (_super) {
    __extends(ChocolateBars, _super);
    // Constructor
    function ChocolateBars(game, savingPrefix) {
        return _super.call(this, game, savingPrefix) || this;
    }
    // Public methods
    ChocolateBars.prototype.getCurrentAsString = function (totalSize) {
        if (totalSize === void 0) { totalSize = 10; }
        var n = this.getCurrent();
        var size = totalSize;
        var base = "";
        var prefix = "";
        var suffix = "";
        // We set the base or return right now in some special cases
        if (n < 0)
            return "What, negative chocolate bars?!";
        else if (n == 1)
            return "You have 1 chocolate bar";
        else
            base = Algo.numberToStringButNicely(n);
        // How much space do we still have ?
        size = totalSize - base.length;
        // We set the suffix
        if (size >= 15) {
            suffix = " chocolate bars";
            // We add a suffix
            // How much space do we still have ?
            size = totalSize - base.length - suffix.length;
            // We set the prefix
            if (size >= 9)
                prefix = "You have ";
            else if (size >= 3)
                prefix = "-> ";
        }
        else if (size >= 3)
            suffix = " cb";
        // How much space do we still have ?
        size = totalSize - base.length - prefix.length - suffix.length;
        return prefix + base + suffix;
    };
    return ChocolateBars;
}(StatusBarResource));
//# sourceMappingURL=ChocolateBars.js.map