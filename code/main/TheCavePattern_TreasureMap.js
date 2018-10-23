///<reference path="TheCavePattern.ts"/>
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
Saving.registerBool("TheCavePattern_TreasureMapSawMap", false);
Saving.registerBool("TheCavePattern_TreasureMapFoundTreasure", false);
var TheCavePattern_TreasureMap = /** @class */ (function (_super) {
    __extends(TheCavePattern_TreasureMap, _super);
    // Constructor
    function TheCavePattern_TreasureMap(theCave) {
        var _this = _super.call(this, theCave) || this;
        // We saw the map!
        Saving.saveBool("TheCavePattern_TreasureMapSawMap", true);
        return _this;
    }
    // Public methods
    TheCavePattern_TreasureMap.prototype.draw = function (renderArea, x, y) {
        renderArea.drawArray(Database.getAscii("places/theCave/treasureMap"), x + 38, y + 22);
    };
    TheCavePattern_TreasureMap.prototype.ended = function () {
        return true;
    };
    TheCavePattern_TreasureMap.prototype.getSentence = function () {
        return "theCavePattern_TreasureMapSentence";
    };
    return TheCavePattern_TreasureMap;
}(TheCavePattern));
//# sourceMappingURL=TheCavePattern_TreasureMap.js.map