///<reference path="RenderTag.ts"/>
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
var RenderTagLt = /** @class */ (function (_super) {
    __extends(RenderTagLt, _super);
    // Constructor
    function RenderTagLt(x) {
        return _super.call(this, x, "") || this;
    }
    // Public methods
    RenderTagLt.prototype.clone = function () {
        return _super.prototype.clone.call(this);
    };
    RenderTagLt.prototype.draw = function (str) {
        // Instead of adding ourselves, we delete one character under the x position and then add the "&lt;"
        str = str.replaceAt(this.getX(), "&");
        return str.addAt(this.getX() + 1, "lt;");
    };
    return RenderTagLt;
}(RenderTag));
//# sourceMappingURL=RenderTagLt.js.map