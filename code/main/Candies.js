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
var Candies = /** @class */ (function (_super) {
    __extends(Candies, _super);
    // Constructor
    function Candies(game, savingPrefix) {
        return _super.call(this, game, savingPrefix) || this;
    }
    // Public methods
    Candies.prototype.getCurrentAsString = function (totalSize) {
        if (totalSize === void 0) { totalSize = 10; }
        var n = this.getCurrent();
        var size = totalSize;
        var base = "";
        var prefix = "";
        var suffix = "";
        var comment = "";
        // We set the base or return right now in some special cases
        if (n < 0)
            return "What, negative candies?!";
        else if (n == 1)
            return "You have 1 candy";
        else {
            if (n == 1337)
                base = "leet";
            else
                base = Algo.numberToStringButNicely(n);
        }
        // How much space do we still have ?
        size = totalSize - base.length;
        // We set the suffix
        if (size >= 8) {
            suffix = " candies";
            // We add a prefix
            // How much space do we still have ?
            size = totalSize - base.length - suffix.length;
            // We set the prefix
            if (size >= 9)
                prefix = "You have ";
            else if (size >= 3)
                prefix = "-> ";
        }
        else if (size >= 4)
            suffix = " cnd";
        else if (size >= 2)
            suffix = " c";
        // How much space do we still have ?
        size = totalSize - base.length - prefix.length - suffix.length;
        // We possibly set a comment
        if (n == 42 && size >= 4)
            comment = " \\o/";
        else if ((n == 65535 || n == 314159) && size >= 1)
            comment = "!";
        return prefix + base + suffix + comment;
    };
    return Candies;
}(StatusBarResource));
//# sourceMappingURL=Candies.js.map