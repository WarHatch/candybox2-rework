///<reference path="GridItem.ts"/>
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
var Feather = /** @class */ (function (_super) {
    __extends(Feather, _super);
    function Feather() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Feather.prototype.getDatabaseDescriptionName = function () {
        // If we don't have the pogo stick yet, we return a special message
        if (Saving.loadBool("gridItemPossessedPogoStick") == false)
            return "gridItemFeatherDescriptionNoPogoStick";
        // Else we return the normal description name
        return _super.prototype.getDatabaseDescriptionName.call(this);
    };
    return Feather;
}(GridItem));
//# sourceMappingURL=Feather.js.map